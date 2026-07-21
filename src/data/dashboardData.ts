import { AnalyticsData, MessageItem } from '../types';

export const mockAnalyticsData: AnalyticsData = {
  pageViews: 148920,
  uniqueVisitors: 42850,
  conversionRate: 8.4,
  avgDuration: '3m 42s',
  dailyTraffic: [
    { date: 'Mon', views: 14200, visitors: 4100 },
    { date: 'Tue', views: 18900, visitors: 5800 },
    { date: 'Wed', views: 22400, visitors: 7200 },
    { date: 'Thu', views: 25100, visitors: 8100 },
    { date: 'Fri', views: 28900, visitors: 9400 },
    { date: 'Sat', views: 19800, visitors: 4900 },
    { date: 'Sun', views: 19620, visitors: 3350 }
  ],
  trafficSources: [
    { source: 'Direct / Portfolio URL', percentage: 42, color: '#3B82F6' },
    { source: 'GitHub Profile', percentage: 28, color: '#8B5CF6' },
    { source: 'LinkedIn & Twitter', percentage: 18, color: '#06B6D4' },
    { source: 'Recruiter Referrals', percentage: 12, color: '#EC4899' }
  ],
  deviceBreakdown: [
    { device: 'Desktop Mac/PC', percentage: 68 },
    { device: 'Mobile iOS/Android', percentage: 24 },
    { device: 'Tablet & iPad', percentage: 8 }
  ]
};

export const mockMessages: MessageItem[] = [
  {
    id: 'msg-1',
    name: 'Alexandra Wright',
    email: 'alexandra.wright@stripe.com',
    subject: 'Staff Software Engineer Role - Platform Team',
    message: 'Hi! Loved your Nexus AI and FinTech architecture work. We are expanding our Core Platform team at Stripe and would love to chat about a lead role.',
    date: '10 mins ago',
    status: 'unread',
    priority: 'high'
  },
  {
    id: 'msg-2',
    name: 'Jonathan Miller',
    email: 'jonathan@vercel.com',
    subject: 'Consulting Contract for UI/UX Design System',
    message: 'Hey! We have an upcoming client project requiring top-grade Awwwards level frontend performance and 3D interactions. Are you available for freelance consulting next month?',
    date: '2 hours ago',
    status: 'unread',
    priority: 'high'
  },
  {
    id: 'msg-3',
    name: 'Sophia Martinez',
    email: 's.martinez@sequoia.com',
    subject: 'Introduction & AI Startup Inquiry',
    message: 'Impressive portfolio. Our portfolio startup is looking for a fractional CTO to design their initial cloud and multi-agent infrastructure.',
    date: '1 day ago',
    status: 'read',
    priority: 'medium'
  },
  {
    id: 'msg-4',
    name: 'Tech Recruiter Bot',
    email: 'contact@talentsearch.io',
    subject: 'Weekly Portfolio Views Alert',
    message: 'Your portfolio reached top 5% engagement across tech recruiter searches this week.',
    date: '3 days ago',
    status: 'replied',
    priority: 'low'
  }
];
