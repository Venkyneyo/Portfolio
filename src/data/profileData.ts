export interface ProfileData {
  name: string;
  brandName: string;
  title: string;
  roles: string[];
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  stats: {
    yearsExperience: number;
    shippedProjects: number;
    uptime: number;
    activeUsers: string;
  };
}

export const profileData: ProfileData = {
  name: "Alex",
  brandName: "ALEX.DEV",
  title: "Senior Full-Stack Architect & AI Systems Engineer",
  roles: [
    "Senior Full-Stack Architect",
    "AI Systems & Multi-Agent Engineer",
    "UI/UX Design Systems Specialist",
    "Cloud Native Infrastructure Lead"
  ],
  bio: "Architect with 5+ years of experience designing ultra-scalable full-stack web applications, zero-latency multi-agent AI tools, and sleek digital interfaces.",
  email: "alex@developer.io",
  location: "San Francisco, CA • Global Remote",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  stats: {
    yearsExperience: 5,
    shippedProjects: 35,
    uptime: 99.9,
    activeUsers: "100k+"
  }
};
