const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const localApi = {
  // Fetch all state
  async getPortfolio() {
    const res = await fetch(`${API_BASE}/portfolio`);
    if (!res.ok) throw new Error('Failed to fetch portfolio state');
    return res.json();
  },

  // Auth login
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    localStorage.setItem('admin_token', data.token);
    return data;
  },

  // Auth verify token
  async checkAuthMe() {
    const token = localStorage.getItem('admin_token');
    if (!token) throw new Error('No token found');
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) {
      localStorage.removeItem('admin_token');
      throw new Error(data.error || 'Token invalid');
    }
    return data;
  },

  // Upload file
  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('admin_token');
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.publicUrl; // e.g. /uploads/filename.png
  },

  // Profile
  async updateProfile(profileData: any) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Skills
  async addSkill(skill: any) {
    const res = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(skill)
    });
    if (!res.ok) throw new Error('Failed to add skill');
  },
  async updateSkill(id: string, skill: any) {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(skill)
    });
    if (!res.ok) throw new Error('Failed to update skill');
  },
  async deleteSkill(id: string) {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete skill');
  },

  // Projects
  async addProject(project: any) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to add project');
  },
  async updateProject(id: string, project: any) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to update project');
  },
  async deleteProject(id: string) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  // Experience
  async addExperience(exp: any) {
    const res = await fetch(`${API_BASE}/experience`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(exp)
    });
    if (!res.ok) throw new Error('Failed to add experience');
  },
  async updateExperience(id: string, exp: any) {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(exp)
    });
    if (!res.ok) throw new Error('Failed to update experience');
  },
  async deleteExperience(id: string) {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete experience');
  },

  // Education
  async addEducation(edu: any) {
    const res = await fetch(`${API_BASE}/education`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(edu)
    });
    if (!res.ok) throw new Error('Failed to add education');
  },
  async updateEducation(id: string, edu: any) {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(edu)
    });
    if (!res.ok) throw new Error('Failed to update education');
  },
  async deleteEducation(id: string) {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete education');
  },

  // Certifications
  async addCertification(cert: any) {
    const res = await fetch(`${API_BASE}/certifications`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(cert)
    });
    if (!res.ok) throw new Error('Failed to add certification');
  },
  async updateCertification(id: string, cert: any) {
    const res = await fetch(`${API_BASE}/certifications/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(cert)
    });
    if (!res.ok) throw new Error('Failed to update certification');
  },
  async deleteCertification(id: string) {
    const res = await fetch(`${API_BASE}/certifications/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete certification');
  },

  // Achievements
  async addAchievement(ach: any) {
    const res = await fetch(`${API_BASE}/achievements`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(ach)
    });
    if (!res.ok) throw new Error('Failed to add achievement');
  },
  async updateAchievement(id: string, ach: any) {
    const res = await fetch(`${API_BASE}/achievements/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(ach)
    });
    if (!res.ok) throw new Error('Failed to update achievement');
  },
  async deleteAchievement(id: string) {
    const res = await fetch(`${API_BASE}/achievements/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete achievement');
  },

  // Blogs
  async addBlog(blog: any) {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(blog)
    });
    if (!res.ok) throw new Error('Failed to add blog');
  },
  async updateBlog(id: string, blog: any) {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(blog)
    });
    if (!res.ok) throw new Error('Failed to update blog');
  },
  async deleteBlog(id: string) {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete blog');
  },

  // Navigation Items
  async saveNavigation(items: any[]) {
    const res = await fetch(`${API_BASE}/navigation`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(items)
    });
    if (!res.ok) throw new Error('Failed to save navigation list');
  },

  // Messages
  async submitMessage(msg: any) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    });
    if (!res.ok) throw new Error('Failed to submit message');
  },
  async markMessageStatus(id: string, updates: any) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update message');
  },
  async deleteMessage(id: string) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete message');
  },

  // Coding Profiles
  async getCodingProfiles() {
    const res = await fetch(`${API_BASE}/coding-profiles`);
    if (!res.ok) throw new Error('Failed to fetch coding profiles');
    return res.json();
  },
  async updateCodingProfile(platform: string, data: any) {
    const res = await fetch(`${API_BASE}/coding-profiles/${platform}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update coding profile');
    return result;
  },
  async syncCodingProfileNow(platform: string) {
    const res = await fetch(`${API_BASE}/coding-profiles/${platform}/sync`, {
      method: 'POST',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Synchronization failed');
    return data;
  },
  async getSyncLogs() {
    const res = await fetch(`${API_BASE}/coding-profiles/logs`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch sync logs');
    return res.json();
  }
};
