const https = require('https');

/**
 * Extracts clean username from raw input or full profile URLs
 * e.g. "https://leetcode.com/u/john_doe/" -> "john_doe"
 * e.g. "leetcode.com/john_doe" -> "john_doe"
 * e.g. "john_doe" -> "john_doe"
 */
function extractUsername(input) {
  if (!input) return '';
  let str = input.trim();

  // Strip trailing slashes
  str = str.replace(/\/+$/, '');

  // Extract from URL pattern
  const urlMatch = str.match(/leetcode\.com\/(?:u\/|profile\/)?([^\/\?#]+)/i);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1].trim();
  }

  // Strip leading @ if present
  return str.replace(/^@/, '').trim();
}

/**
 * Helper for making HTTPS POST/GET requests in Node.js
 */
function makeHttpRequest(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body.substring(0, 200)}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

/**
 * Fetches LeetCode statistics via GraphQL with secondary fallback APIs
 */
async function fetchLeetCodeStats(usernameOrUrl) {
  const username = extractUsername(usernameOrUrl);
  if (!username) {
    throw new Error('Invalid LeetCode username or profile URL provided.');
  }

  console.log(`[LeetCode Sync] Initiating fetch for username: @${username}`);

  let resultData = {
    username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSubmissions: 0,
    acceptanceRate: 0,
    ranking: 'Top 5%',
    contestRating: 0,
    streakDays: 0,
    badgesCount: 0,
    badges: [],
    recentSubmissions: [],
    submissionCalendar: {},
    fetchedAt: new Date().toISOString()
  };

  // 1. Try Primary LeetCode Official GraphQL API
  try {
    const graphqlQuery = {
      query: `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              userAvatar
              reputation
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
              totalSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            badges {
              id
              displayName
              icon
              hoverText
              creationDate
            }
            submissionCalendar
          }
          userContestRanking(username: $username) {
            rating
            globalRanking
            topPercentage
          }
          recentAcSubmissionList(username: $username, limit: 10) {
            title
            titleSlug
            timestamp
          }
        }
      `,
      variables: { username }
    };

    const response = await makeHttpRequest('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://leetcode.com'
      }
    }, graphqlQuery);

    if (response && response.data && response.data.matchedUser) {
      const user = response.data.matchedUser;
      const acStats = user.submitStats?.acSubmissionNum || [];
      const totalStats = user.submitStats?.totalSubmissionNum || [];
      const contest = response.data.userContestRanking;

      const getAcCount = (diff) => {
        const item = acStats.find(s => s.difficulty.toLowerCase() === diff.toLowerCase());
        return item ? item.count : 0;
      };

      const getTotalSubmissions = () => {
        const item = totalStats.find(s => s.difficulty.toLowerCase() === 'all');
        return item ? item.submissions : 0;
      };

      const getAcSubmissions = () => {
        const item = acStats.find(s => s.difficulty.toLowerCase() === 'all');
        return item ? item.submissions : 0;
      };

      const totalAc = getAcCount('all');
      const totalSubs = getTotalSubmissions();
      const acSubs = getAcSubmissions();

      resultData.totalSolved = totalAc || (getAcCount('easy') + getAcCount('medium') + getAcCount('hard'));
      resultData.easySolved = getAcCount('easy');
      resultData.mediumSolved = getAcCount('medium');
      resultData.hardSolved = getAcCount('hard');
      resultData.totalSubmissions = totalSubs;
      resultData.acceptanceRate = totalSubs > 0 ? Number(((acSubs / totalSubs) * 100).toFixed(1)) : 0;

      if (user.profile?.ranking) {
        resultData.ranking = `#${user.profile.ranking.toLocaleString()}`;
      }
      if (contest && contest.rating) {
        resultData.contestRating = Math.round(contest.rating);
        if (contest.topPercentage) {
          resultData.ranking = `Top ${contest.topPercentage.toFixed(1)}%`;
        }
      }

      if (user.badges) {
        resultData.badgesCount = user.badges.length;
        resultData.badges = user.badges.map(b => ({
          id: b.id,
          name: b.displayName,
          icon: b.icon?.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`,
          hoverText: b.hoverText,
          date: b.creationDate
        }));
      }

      if (user.submissionCalendar) {
        try {
          resultData.submissionCalendar = typeof user.submissionCalendar === 'string'
            ? JSON.parse(user.submissionCalendar)
            : user.submissionCalendar;
        } catch (e) {
          resultData.submissionCalendar = {};
        }
      }

      if (response.data.recentAcSubmissionList) {
        resultData.recentSubmissions = response.data.recentAcSubmissionList.map(item => ({
          title: item.title,
          slug: item.titleSlug,
          timestamp: item.timestamp ? new Date(Number(item.timestamp) * 1000).toISOString() : new Date().toISOString()
        }));
      }

      // Compute streak days from submission calendar
      resultData.streakDays = calculateStreak(resultData.submissionCalendar);

      console.log(`[LeetCode Sync] Successfully fetched GraphQL stats for @${username}: ${resultData.totalSolved} solved.`);
      return resultData;
    }
  } catch (err) {
    console.warn(`[LeetCode Sync] Primary GraphQL fetch failed (${err.message}). Trying fallback stats API...`);
  }

  // 2. Secondary Fallback: Open LeetCode REST Proxy API
  try {
    const fallbackData = await makeHttpRequest(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (fallbackData && fallbackData.status === 'success') {
      resultData.totalSolved = fallbackData.totalSolved || 0;
      resultData.easySolved = fallbackData.easySolved || 0;
      resultData.mediumSolved = fallbackData.mediumSolved || 0;
      resultData.hardSolved = fallbackData.hardSolved || 0;
      resultData.acceptanceRate = fallbackData.acceptanceRate || 0;
      resultData.ranking = fallbackData.ranking ? `#${fallbackData.ranking.toLocaleString()}` : 'Top 5%';

      if (fallbackData.submissionCalendar) {
        resultData.submissionCalendar = fallbackData.submissionCalendar;
        resultData.streakDays = calculateStreak(resultData.submissionCalendar);
      }

      console.log(`[LeetCode Sync] Fallback REST stats acquired for @${username}: ${resultData.totalSolved} solved.`);
      return resultData;
    }
  } catch (err) {
    console.warn(`[LeetCode Sync] Secondary fallback API failed: ${err.message}`);
  }

  // If all live APIs fail or rate limit occurs, throw Error to preserve existing DB data
  throw new Error(`Failed to fetch LeetCode statistics for user @${username}. Check internet connection or username.`);
}

/**
 * Calculates current active streak in days from submissionCalendar unix timestamp map
 */
function calculateStreak(calendarObj) {
  if (!calendarObj || Object.keys(calendarObj).length === 0) return 0;

  const timestamps = Object.keys(calendarObj)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending (newest first)

  if (timestamps.length === 0) return 0;

  const oneDaySec = 86400;
  const nowSec = Math.floor(Date.now() / 1000);
  const todayStartSec = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);

  let streak = 0;
  let checkDay = todayStartSec;

  // Check if there's a submission today or yesterday
  const latestSub = timestamps[0];
  if (latestSub < todayStartSec - oneDaySec) {
    return 0; // Streak broken if no submission today or yesterday
  }

  // Count consecutive days
  for (let i = 0; i < 365; i++) {
    const dayStart = checkDay - (i * oneDaySec);
    const dayEnd = dayStart + oneDaySec;

    const hasSubmission = timestamps.some(t => t >= dayStart && t < dayEnd);
    if (hasSubmission) {
      streak++;
    } else if (i > 0) {
      // If missing a day after today, break streak
      break;
    }
  }

  return streak || 1;
}

module.exports = {
  extractUsername,
  fetchLeetCodeStats
};
