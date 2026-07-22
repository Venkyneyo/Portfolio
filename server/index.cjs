const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const leetcodeSync = require('./leetcodeSync.cjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'local_portfolio_cms_secret_key_99182';

// Middleware
app.use(cors());
app.use(express.json());

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Connect to SQLite DB
const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err);
  } else {
    console.log('Connected to local SQLite database at server/portfolio.db');
    initializeDatabase();
  }
});

// Helper for Promisified Queries
const dbQuery = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

// Initialize DB Tables & Seeds
async function initializeDatabase() {
  try {
    // 1. Users table (Admin auth)
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);

    // Create default admin user if none exists
    const adminExists = await dbQuery.get('SELECT * FROM users WHERE email = ?', ['admin@developer.io']);
    if (!adminExists) {
      const hashedPw = await bcrypt.hash('admin123', 10);
      await dbQuery.run('INSERT INTO users (email, password) VALUES (?, ?)', ['admin@developer.io', hashedPw]);
      console.log('Default admin account created: admin@developer.io / admin123');
    }

    // 2. Profile
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS profile (
      id TEXT PRIMARY KEY,
      fullName TEXT,
      brandName TEXT,
      roleTitle TEXT,
      heroHeadline1 TEXT,
      heroHeadlineGradient1 TEXT,
      heroHeadline2 TEXT,
      heroHeadlineGradient2 TEXT,
      roles TEXT, -- JSON array
      bio TEXT,
      aboutText TEXT,
      profileImage TEXT,
      resumeUrl TEXT,
      email TEXT,
      location TEXT,
      availability TEXT,
      githubUrl TEXT,
      linkedinUrl TEXT,
      twitterUrl TEXT,
      yearsExperience INTEGER,
      shippedProjects INTEGER,
      uptimePercentage REAL,
      activeUsers TEXT,
      themeConfig TEXT, -- JSON
      seoMetadata TEXT, -- JSON
      bannerImage TEXT
    )`);

    // Seed profile if empty
    const profileCount = await dbQuery.get('SELECT COUNT(*) as count FROM profile');
    const seeds = require('./seeds.cjs');
    if (profileCount.count === 0) {
      const p = seeds.profile;
      await dbQuery.run(`INSERT INTO profile (
        id, fullName, brandName, roleTitle, heroHeadline1, heroHeadlineGradient1, heroHeadline2, heroHeadlineGradient2,
        roles, bio, aboutText, profileImage, resumeUrl, email, location, availability, githubUrl, linkedinUrl, twitterUrl,
        yearsExperience, shippedProjects, uptimePercentage, activeUsers, themeConfig, seoMetadata, bannerImage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        'profile-1', p.fullName, p.brandName, p.roleTitle, p.heroHeadline1, p.heroHeadlineGradient1, p.heroHeadline2, p.heroHeadlineGradient2,
        p.roles, p.bio, p.aboutText, p.profileImage, p.resumeUrl, p.email, p.location, p.availability, p.githubUrl, p.linkedinUrl, p.twitterUrl,
        p.yearsExperience, p.shippedProjects, p.uptimePercentage, p.activeUsers, p.themeConfig, p.seoMetadata, p.bannerImage
      ]);
    }

    // 3. Skills
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      level INTEGER NOT NULL,
      category TEXT NOT NULL,
      icon TEXT,
      color TEXT,
      description TEXT
    )`);

    const skillsCount = await dbQuery.get('SELECT COUNT(*) as count FROM skills');
    if (skillsCount.count === 0) {
      for (const skill of seeds.skills) {
        await dbQuery.run('INSERT INTO skills (id, name, level, category, icon, color, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [
          skill.id, skill.name, skill.level, skill.category, skill.icon, skill.color, skill.description
        ]);
      }
    }

    // 4. Projects
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      longDescription TEXT,
      category TEXT NOT NULL,
      coverImage TEXT,
      images TEXT, -- JSON array
      demoVideo TEXT,
      tags TEXT, -- JSON array
      stats TEXT, -- JSON
      features TEXT, -- JSON array
      architectureDiagram TEXT, -- JSON
      databaseDiagram TEXT, -- JSON
      workflowDiagram TEXT, -- JSON
      liveUrl TEXT,
      githubUrl TEXT,
      featured INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published'
    )`);

    const projCount = await dbQuery.get('SELECT COUNT(*) as count FROM projects');
    if (projCount.count === 0) {
      for (const p of seeds.projects) {
        await dbQuery.run(`INSERT INTO projects (
          id, title, subtitle, description, longDescription, category, coverImage, images, demoVideo, tags, stats, features,
          architectureDiagram, databaseDiagram, workflowDiagram, liveUrl, githubUrl, featured, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
          p.id, p.title, p.subtitle, p.description, p.longDescription, p.category, p.coverImage, p.images, p.demoVideo, p.tags, p.stats, p.features,
          p.architectureDiagram, p.databaseDiagram, p.workflowDiagram, p.liveUrl, p.githubUrl, p.featured, p.status
        ]);
      }
    }

    // 5. Experience
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS experience (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      period TEXT NOT NULL,
      location TEXT,
      description TEXT,
      highlights TEXT, -- JSON array
      techStack TEXT, -- JSON array
      logo TEXT
    )`);

    const expCount = await dbQuery.get('SELECT COUNT(*) as count FROM experience');
    if (expCount.count === 0) {
      for (const e of seeds.experiences) {
        await dbQuery.run('INSERT INTO experience (id, role, company, period, location, description, highlights, techStack, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
          e.id, e.role, e.company, e.period, e.location, e.description, e.highlights, e.techStack, e.logo
        ]);
      }
    }

    // 6. Education
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS education (
      id TEXT PRIMARY KEY,
      degree TEXT NOT NULL,
      field TEXT,
      institution TEXT NOT NULL,
      period TEXT NOT NULL,
      location TEXT,
      grade TEXT,
      description TEXT,
      highlights TEXT -- JSON array
    )`);

    const eduCount = await dbQuery.get('SELECT COUNT(*) as count FROM education');
    if (eduCount.count === 0) {
      for (const edu of seeds.education) {
        await dbQuery.run('INSERT INTO education (id, degree, field, institution, period, location, grade, description, highlights) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
          edu.id, edu.degree, edu.field, edu.institution, edu.period, edu.location, edu.grade, edu.description, edu.highlights
        ]);
      }
    }

    // 7. Certifications
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS certifications (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      issueDate TEXT NOT NULL,
      credentialId TEXT,
      credentialUrl TEXT,
      fileUrl TEXT
    )`);

    const certCount = await dbQuery.get('SELECT COUNT(*) as count FROM certifications');
    if (certCount.count === 0) {
      for (const c of seeds.certifications) {
        await dbQuery.run('INSERT INTO certifications (id, title, issuer, issueDate, credentialId, credentialUrl, fileUrl) VALUES (?, ?, ?, ?, ?, ?, ?)', [
          c.id, c.title, c.issuer, c.issueDate, c.credentialId, c.credentialUrl, c.fileUrl
        ]);
      }
    }

    // 8. Achievements
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      organization TEXT,
      date TEXT NOT NULL,
      description TEXT,
      metric TEXT,
      icon TEXT
    )`);

    const achCount = await dbQuery.get('SELECT COUNT(*) as count FROM achievements');
    if (achCount.count === 0) {
      for (const a of seeds.achievements) {
        await dbQuery.run('INSERT INTO achievements (id, title, organization, date, description, metric, icon) VALUES (?, ?, ?, ?, ?, ?, ?)', [
          a.id, a.title, a.organization, a.date, a.description, a.metric, a.icon
        ]);
      }
    }

    // 9. Blogs
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT,
      coverImage TEXT,
      tags TEXT, -- JSON array
      publishedAt TEXT,
      status TEXT DEFAULT 'published'
    )`);

    // 10. Navigation
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS navigation (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      path TEXT NOT NULL,
      orderIndex INTEGER DEFAULT 0
    )`);

    // 11. Messages
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      date TEXT,
      status TEXT DEFAULT 'unread',
      priority TEXT DEFAULT 'medium'
    )`);

    // 12. Coding Profiles
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS coding_profiles (
      id TEXT PRIMARY KEY,
      platform TEXT UNIQUE NOT NULL,
      username TEXT,
      profileUrl TEXT,
      autoSyncEnabled INTEGER DEFAULT 1,
      lastSyncTime TEXT,
      lastSyncStatus TEXT DEFAULT 'success',
      stats TEXT, -- JSON string
      updatedAt TEXT
    )`);

    // 13. Sync Logs
    await dbQuery.run(`CREATE TABLE IF NOT EXISTS sync_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      status TEXT NOT NULL,
      message TEXT,
      timestamp TEXT NOT NULL
    )`);

    // Seed default coding profiles if empty
    const profileCountCP = await dbQuery.get('SELECT COUNT(*) as count FROM coding_profiles');
    if (profileCountCP.count === 0) {
      const defaultProfiles = [
        {
          id: 'cp-leetcode',
          platform: 'leetcode',
          username: 'alex_codes',
          profileUrl: 'https://leetcode.com/u/alex_codes/',
          autoSyncEnabled: 1,
          lastSyncTime: new Date().toISOString(),
          lastSyncStatus: 'success',
          stats: JSON.stringify({
            username: 'alex_codes',
            profileUrl: 'https://leetcode.com/u/alex_codes/',
            totalSolved: 850,
            easySolved: 310,
            mediumSolved: 420,
            hardSolved: 120,
            totalSubmissions: 1240,
            acceptanceRate: 68.5,
            ranking: 'Top 1.2%',
            contestRating: 2150,
            streakDays: 145,
            badgesCount: 5,
            badges: [
              { name: 'Knight', date: '2025' },
              { name: '50 Days Badge 2025', date: '2025' }
            ],
            recentSubmissions: [
              { title: 'LRU Cache', slug: 'lru-cache', timestamp: new Date().toISOString() },
              { title: 'Trapping Rain Water', slug: 'trapping-rain-water', timestamp: new Date(Date.now() - 86400000).toISOString() },
              { title: 'Course Schedule II', slug: 'course-schedule-ii', timestamp: new Date(Date.now() - 172800000).toISOString() }
            ],
            submissionCalendar: {},
            fetchedAt: new Date().toISOString()
          })
        },
        { id: 'cp-hackerrank', platform: 'hackerrank', username: 'alex_dev', profileUrl: 'https://hackerrank.com/alex_dev', autoSyncEnabled: 1, lastSyncTime: new Date().toISOString(), lastSyncStatus: 'success', stats: JSON.stringify({ totalSolved: 340, badges: 6 }) },
        { id: 'cp-codechef', platform: 'codechef', username: 'alex_dev', profileUrl: 'https://codechef.com/users/alex_dev', autoSyncEnabled: 1, lastSyncTime: new Date().toISOString(), lastSyncStatus: 'success', stats: JSON.stringify({ rating: 1850, stars: '4★' }) },
        { id: 'cp-codeforces', platform: 'codeforces', username: 'alex_dev', profileUrl: 'https://codeforces.com/profile/alex_dev', autoSyncEnabled: 1, lastSyncTime: new Date().toISOString(), lastSyncStatus: 'success', stats: JSON.stringify({ rating: 1650, rank: 'Specialist' }) },
        { id: 'cp-github', platform: 'github', username: 'alex_dev', profileUrl: 'https://github.com/alex_dev', autoSyncEnabled: 1, lastSyncTime: new Date().toISOString(), lastSyncStatus: 'success', stats: JSON.stringify({ publicRepos: 45, followers: 320 }) }
      ];

      for (const cp of defaultProfiles) {
        await dbQuery.run(`INSERT INTO coding_profiles (id, platform, username, profileUrl, autoSyncEnabled, lastSyncTime, lastSyncStatus, stats, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
          cp.id, cp.platform, cp.username, cp.profileUrl, cp.autoSyncEnabled, cp.lastSyncTime, cp.lastSyncStatus, cp.stats, new Date().toISOString()
        ]);
      }
    }

    console.log('Local SQLite Database Initialization and seeding completed successfully!');
    startDailySyncScheduler();
  } catch (err) {
    console.error('Database Schema setup failed:', err);
  }
}

// Platform Synchronization Engine
async function performPlatformSync(platform = 'leetcode') {
  const profile = await dbQuery.get('SELECT * FROM coding_profiles WHERE platform = ?', [platform]);
  if (!profile) throw new Error(`Platform ${platform} not configured in database.`);

  const username = leetcodeSync.extractUsername(profile.profileUrl || profile.username);
  if (!username) throw new Error(`No valid username or profile URL configured for ${platform}.`);

  console.log(`[Auto-Sync Engine] Running background sync for ${platform} (@${username})...`);

  try {
    let freshStats = {};
    if (platform === 'leetcode') {
      freshStats = await leetcodeSync.fetchLeetCodeStats(username);
    } else {
      freshStats = JSON.parse(profile.stats || '{}');
      freshStats.fetchedAt = new Date().toISOString();
    }

    const nowIso = new Date().toISOString();
    await dbQuery.run(`UPDATE coding_profiles SET username = ?, stats = ?, lastSyncTime = ?, lastSyncStatus = 'success', updatedAt = ? WHERE platform = ?`, [
      username, JSON.stringify(freshStats), nowIso, nowIso, platform
    ]);

    await dbQuery.run(`INSERT INTO sync_logs (platform, status, message, timestamp) VALUES (?, ?, ?, ?)`, [
      platform, 'success', `Successfully synchronized statistics for @${username}`, nowIso
    ]);

    console.log(`[Auto-Sync Engine] ${platform} sync completed for @${username}.`);
    return freshStats;
  } catch (err) {
    console.error(`[Auto-Sync Error] Failed to sync ${platform}:`, err.message);
    const nowIso = new Date().toISOString();
    
    await dbQuery.run(`UPDATE coding_profiles SET lastSyncTime = ?, lastSyncStatus = 'error' WHERE platform = ?`, [
      nowIso, platform
    ]);

    await dbQuery.run(`INSERT INTO sync_logs (platform, status, message, timestamp) VALUES (?, ?, ?, ?)`, [
      platform, 'error', `Sync failed: ${err.message}`, nowIso
    ]);

    throw err;
  }
}

// 24-Hour Background Automatic Synchronization Scheduler
function startDailySyncScheduler() {
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  
  // Initial sync attempt 10s after server startup
  setTimeout(async () => {
    try {
      const profile = await dbQuery.get('SELECT * FROM coding_profiles WHERE platform = ?', ['leetcode']);
      if (profile && profile.autoSyncEnabled === 1) {
        await performPlatformSync('leetcode');
      }
    } catch (e) {
      console.warn('[Auto-Sync Scheduler] Initial background sync deferred:', e.message);
    }
  }, 10000);

  // Interval timer every 24 hours
  setInterval(async () => {
    try {
      const activeProfiles = await dbQuery.all('SELECT * FROM coding_profiles WHERE autoSyncEnabled = 1');
      for (const p of activeProfiles) {
        await performPlatformSync(p.platform).catch(() => {});
      }
    } catch (e) {
      console.error('[Auto-Sync Scheduler Error]:', e);
    }
  }, TWENTY_FOUR_HOURS);
}

// File Upload Engine (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${ext}`);
  }
});
const upload = multer({ storage });

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Auth token missing.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired auth token.' });
    req.user = user;
    next();
  });
};

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Auth Sign In
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    const validPw = await bcrypt.compare(password, user.password);
    if (!validPw) return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: 'ADMIN' } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 1.5 Verify token / Auth status check
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await dbQuery.get('SELECT id, email FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(401).json({ error: 'User not found.' });
    res.json({ user: { id: user.id, email: user.email, role: 'ADMIN' } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 2. Media cloud file uploader (Multer local filesystem)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  const publicUrl = `/uploads/${req.file.filename}`;
  res.json({ publicUrl });
});

// 3. Fetch entire database state (Visitor & Admin read endpoint)
app.get('/api/portfolio', async (req, res) => {
  try {
    const profile = await dbQuery.get('SELECT * FROM profile LIMIT 1');
    const skills = await dbQuery.all('SELECT * FROM skills');
    const projects = await dbQuery.all('SELECT * FROM projects');
    const experiences = await dbQuery.all('SELECT * FROM experience');
    const education = await dbQuery.all('SELECT * FROM education');
    const certifications = await dbQuery.all('SELECT * FROM certifications');
    const achievements = await dbQuery.all('SELECT * FROM achievements');
    const blogs = await dbQuery.all('SELECT * FROM blogs');
    const navigation = await dbQuery.all('SELECT * FROM navigation ORDER BY orderIndex ASC');
    const messages = await dbQuery.all('SELECT * FROM messages');

    // Parse JSON strings to objects/arrays
    if (profile) {
      profile.roles = JSON.parse(profile.roles || '[]');
      profile.themeConfig = JSON.parse(profile.themeConfig || '{}');
      profile.seoMetadata = JSON.parse(profile.seoMetadata || '{}');
    }

    const parsedProjects = projects.map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      tags: JSON.parse(p.tags || '[]'),
      stats: JSON.parse(p.stats || '{}'),
      features: JSON.parse(p.features || '[]'),
      architectureDiagram: JSON.parse(p.architectureDiagram || '{"nodes":[], "connections":[]}'),
      databaseDiagram: JSON.parse(p.databaseDiagram || '{"tables":[]}'),
      workflowDiagram: JSON.parse(p.workflowDiagram || '{"steps":[]}'),
      featured: p.featured === 1
    }));

    const parsedExperiences = experiences.map(e => ({
      ...e,
      highlights: JSON.parse(e.highlights || '[]'),
      techStack: JSON.parse(e.techStack || '[]')
    }));

    const parsedEducation = education.map(edu => ({
      ...edu,
      highlights: JSON.parse(edu.highlights || '[]')
    }));

    const parsedBlogs = blogs.map(b => ({
      ...b,
      tags: JSON.parse(b.tags || '[]')
    }));

    res.json({
      profile: profile || {},
      skills: skills || [],
      projects: parsedProjects,
      experiences: parsedExperiences,
      education: parsedEducation,
      certifications: certifications || [],
      achievements: achievements || [],
      blogs: parsedBlogs,
      navigation: navigation || [],
      messages: messages || []
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Profile Update ---
app.put('/api/profile', authenticateToken, async (req, res) => {
  const p = req.body;
  try {
    await dbQuery.run(`UPDATE profile SET
      fullName = ?, brandName = ?, roleTitle = ?, heroHeadline1 = ?, heroHeadlineGradient1 = ?,
      heroHeadline2 = ?, heroHeadlineGradient2 = ?, roles = ?, bio = ?, aboutText = ?,
      profileImage = ?, resumeUrl = ?, email = ?, location = ?, availability = ?,
      githubUrl = ?, linkedinUrl = ?, twitterUrl = ?, yearsExperience = ?, shippedProjects = ?,
      uptimePercentage = ?, activeUsers = ?, themeConfig = ?, seoMetadata = ?, bannerImage = ?
      WHERE id = 'profile-1'`, [
      p.fullName, p.brandName, p.roleTitle, p.heroHeadline1, p.heroHeadlineGradient1,
      p.heroHeadline2, p.heroHeadlineGradient2, JSON.stringify(p.roles || []), p.bio, p.aboutText,
      p.profileImage, p.resumeUrl, p.email, p.location, p.availability,
      p.githubUrl, p.linkedinUrl, p.twitterUrl, p.yearsExperience, p.shippedProjects,
      p.uptimePercentage, p.activeUsers, JSON.stringify(p.themeConfig || {}), JSON.stringify(p.seoMetadata || {}), p.bannerImage
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Skills CRUD ---
app.post('/api/skills', authenticateToken, async (req, res) => {
  const s = req.body;
  try {
    await dbQuery.run('INSERT INTO skills (id, name, level, category, icon, color, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [
      s.id, s.name, s.level, s.category, s.icon, s.color, s.description
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/skills/:id', authenticateToken, async (req, res) => {
  const s = req.body;
  try {
    await dbQuery.run('UPDATE skills SET name = ?, level = ?, category = ?, icon = ?, color = ?, description = ? WHERE id = ?', [
      s.name, s.level, s.category, s.icon, s.color, s.description, req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/skills/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Projects CRUD ---
app.post('/api/projects', authenticateToken, async (req, res) => {
  const p = req.body;
  try {
    await dbQuery.run(`INSERT INTO projects (
      id, title, subtitle, description, longDescription, category, coverImage, images, demoVideo, tags, stats, features,
      architectureDiagram, databaseDiagram, workflowDiagram, liveUrl, githubUrl, featured, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      p.id, p.title, p.subtitle, p.description, p.longDescription, p.category, p.coverImage,
      JSON.stringify(p.images || []), p.demoVideo, JSON.stringify(p.tags || []), JSON.stringify(p.stats || {}), JSON.stringify(p.features || []),
      JSON.stringify(p.architectureDiagram || {nodes:[], connections:[]}), JSON.stringify(p.databaseDiagram || {tables:[]}),
      JSON.stringify(p.workflowDiagram || {steps:[]}), p.liveUrl, p.githubUrl, p.featured ? 1 : 0, p.status || 'published'
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  const p = req.body;
  try {
    await dbQuery.run(`UPDATE projects SET
      title = ?, subtitle = ?, description = ?, longDescription = ?, category = ?, coverImage = ?,
      images = ?, demoVideo = ?, tags = ?, stats = ?, features = ?,
      architectureDiagram = ?, databaseDiagram = ?, workflowDiagram = ?, liveUrl = ?, githubUrl = ?,
      featured = ?, status = ? WHERE id = ?`, [
      p.title, p.subtitle, p.description, p.longDescription, p.category, p.coverImage,
      JSON.stringify(p.images || []), p.demoVideo, JSON.stringify(p.tags || []), JSON.stringify(p.stats || {}), JSON.stringify(p.features || []),
      JSON.stringify(p.architectureDiagram || {nodes:[], connections:[]}), JSON.stringify(p.databaseDiagram || {tables:[]}),
      JSON.stringify(p.workflowDiagram || {steps:[]}), p.liveUrl, p.githubUrl, p.featured ? 1 : 0, p.status || 'published', req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Experience CRUD ---
app.post('/api/experience', authenticateToken, async (req, res) => {
  const e = req.body;
  try {
    await dbQuery.run('INSERT INTO experience (id, role, company, period, location, description, highlights, techStack, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      e.id, e.role, e.company, e.period, e.location, e.description, JSON.stringify(e.highlights || []), JSON.stringify(e.techStack || []), e.logo
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/experience/:id', authenticateToken, async (req, res) => {
  const e = req.body;
  try {
    await dbQuery.run('UPDATE experience SET role = ?, company = ?, period = ?, location = ?, description = ?, highlights = ?, techStack = ?, logo = ? WHERE id = ?', [
      e.role, e.company, e.period, e.location, e.description, JSON.stringify(e.highlights || []), JSON.stringify(e.techStack || []), e.logo, req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/experience/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM experience WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Education CRUD ---
app.post('/api/education', authenticateToken, async (req, res) => {
  const edu = req.body;
  try {
    await dbQuery.run('INSERT INTO education (id, degree, field, institution, period, location, grade, description, highlights) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      edu.id, edu.degree, edu.field, edu.institution, edu.period, edu.location, edu.grade, edu.description, JSON.stringify(edu.highlights || [])
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/education/:id', authenticateToken, async (req, res) => {
  const edu = req.body;
  try {
    await dbQuery.run('UPDATE education SET degree = ?, field = ?, institution = ?, period = ?, location = ?, grade = ?, description = ?, highlights = ? WHERE id = ?', [
      edu.degree, edu.field, edu.institution, edu.period, edu.location, edu.grade, edu.description, JSON.stringify(edu.highlights || []), req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/education/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM education WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Certifications CRUD ---
app.post('/api/certifications', authenticateToken, async (req, res) => {
  const c = req.body;
  try {
    await dbQuery.run('INSERT INTO certifications (id, title, issuer, issueDate, credentialId, credentialUrl, fileUrl) VALUES (?, ?, ?, ?, ?, ?, ?)', [
      c.id, c.title, c.issuer, c.issueDate, c.credentialId, c.credentialUrl, c.fileUrl
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/certifications/:id', authenticateToken, async (req, res) => {
  const c = req.body;
  try {
    await dbQuery.run('UPDATE certifications SET title = ?, issuer = ?, issueDate = ?, credentialId = ?, credentialUrl = ?, fileUrl = ? WHERE id = ?', [
      c.title, c.issuer, c.issueDate, c.credentialId, c.credentialUrl, c.fileUrl, req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/certifications/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM certifications WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Achievements CRUD ---
app.post('/api/achievements', authenticateToken, async (req, res) => {
  const a = req.body;
  try {
    await dbQuery.run('INSERT INTO achievements (id, title, organization, date, description, metric, icon) VALUES (?, ?, ?, ?, ?, ?, ?)', [
      a.id, a.title, a.organization, a.date, a.description, a.metric, a.icon
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/achievements/:id', authenticateToken, async (req, res) => {
  const a = req.body;
  try {
    await dbQuery.run('UPDATE achievements SET title = ?, organization = ?, date = ?, description = ?, metric = ?, icon = ? WHERE id = ?', [
      a.title, a.organization, a.date, a.description, a.metric, a.icon, req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/achievements/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM achievements WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Blogs CRUD ---
app.post('/api/blogs', authenticateToken, async (req, res) => {
  const b = req.body;
  try {
    await dbQuery.run('INSERT INTO blogs (id, title, slug, excerpt, content, coverImage, tags, publishedAt, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      b.id, b.title, b.slug, b.excerpt, b.content, b.coverImage, JSON.stringify(b.tags || []), b.publishedAt, b.status || 'published'
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/blogs/:id', authenticateToken, async (req, res) => {
  const b = req.body;
  try {
    await dbQuery.run('UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, coverImage = ?, tags = ?, status = ? WHERE id = ?', [
      b.title, b.slug, b.excerpt, b.content, b.coverImage, JSON.stringify(b.tags || []), b.status || 'published', req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/blogs/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM blogs WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Navigation Items CRUD ---
app.put('/api/navigation', authenticateToken, async (req, res) => {
  const items = req.body; // Array of Navigation Items
  try {
    await dbQuery.run('DELETE FROM navigation');
    for (const item of items) {
      await dbQuery.run('INSERT INTO navigation (id, label, path, orderIndex) VALUES (?, ?, ?, ?)', [
        item.id, item.label, item.path, item.orderIndex
      ]);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Messages CRUD ---
app.post('/api/messages', async (req, res) => {
  const m = req.body;
  try {
    await dbQuery.run('INSERT INTO messages (id, name, email, subject, message, date, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
      m.id, m.name, m.email, m.subject, m.message, m.date, m.status || 'unread', m.priority || 'medium'
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/messages/:id', authenticateToken, async (req, res) => {
  const m = req.body;
  try {
    await dbQuery.run('UPDATE messages SET status = ?, priority = ? WHERE id = ?', [
      m.status, m.priority, req.params.id
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  try {
    await dbQuery.run('DELETE FROM messages WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Coding Profiles API Endpoints ---
app.get('/api/coding-profiles', async (req, res) => {
  try {
    const profiles = await dbQuery.all('SELECT * FROM coding_profiles');
    const parsed = profiles.map(p => ({
      ...p,
      autoSyncEnabled: p.autoSyncEnabled === 1,
      stats: JSON.parse(p.stats || '{}')
    }));
    res.json(parsed);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/coding-profiles/:platform', authenticateToken, async (req, res) => {
  const { username, profileUrl, autoSyncEnabled } = req.body;
  const platform = req.params.platform;
  try {
    const cleanUser = leetcodeSync.extractUsername(profileUrl || username);
    const existing = await dbQuery.get('SELECT * FROM coding_profiles WHERE platform = ?', [platform]);
    const nowIso = new Date().toISOString();

    if (existing) {
      await dbQuery.run(`UPDATE coding_profiles SET username = ?, profileUrl = ?, autoSyncEnabled = ?, updatedAt = ? WHERE platform = ?`, [
        cleanUser, profileUrl || `https://leetcode.com/u/${cleanUser}/`, autoSyncEnabled ? 1 : 0, nowIso, platform
      ]);
    } else {
      await dbQuery.run(`INSERT INTO coding_profiles (id, platform, username, profileUrl, autoSyncEnabled, stats, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
        `cp-${platform}`, platform, cleanUser, profileUrl || `https://leetcode.com/u/${cleanUser}/`, autoSyncEnabled ? 1 : 0, '{}', nowIso
      ]);
    }
    res.json({ success: true, username: cleanUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/coding-profiles/:platform/sync', authenticateToken, async (req, res) => {
  const platform = req.params.platform;
  try {
    const freshStats = await performPlatformSync(platform);
    res.json({ success: true, stats: freshStats });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/coding-profiles/logs', authenticateToken, async (req, res) => {
  try {
    const logs = await dbQuery.all('SELECT * FROM sync_logs ORDER BY id DESC LIMIT 50');
    res.json(logs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SPA Production Static Serving & Route Fallback for /admin and subpages
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Local Express API Server running on port ${PORT}`);
});
