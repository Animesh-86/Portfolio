export interface Certificate {
  id: string;
  title: string;
  category: string;
  src: string;
  accent: string;
}

export const certificates: Certificate[] = [
  { id: 'cs-1', title: 'HTML CSS', category: 'Coursera-Meta', src: '/certificates/Coursera-Meta/HTML CSS.jpeg', accent: '#1F70C1' },
  { id: 'cs-2', title: 'JavaScript', category: 'Coursera-Meta', src: '/certificates/Coursera-Meta/JavaScript.jpeg', accent: '#1F70C1' },
  { id: 'hk-1', title: 'NxtWave Hackathon', category: 'Hackathon', src: '/certificates/Hackathon/NxtWave Hackathon.png', accent: '#6366F1' },
  { id: 'hk-2', title: 'NxtWave', category: 'Hackathon', src: '/certificates/Hackathon/NxtWave.jpeg', accent: '#6366F1' },
  { id: 'hr-1', title: 'Java', category: 'HackerRank', src: '/certificates/HackerRank/Java.png', accent: '#2EC866' },
  { id: 'hr-2', title: 'Python', category: 'HackerRank', src: '/certificates/HackerRank/Python.png', accent: '#2EC866' },
  { id: 'lc-1', title: '100 days 2025', category: 'LeetCode', src: '/certificates/LeetCode/100 days 2025.png', accent: '#FFA726' },
  { id: 'lc-2', title: '100 days', category: 'LeetCode', src: '/certificates/LeetCode/100 days.png', accent: '#FFA726' },
  { id: 'lc-3', title: '50 Days', category: 'LeetCode', src: '/certificates/LeetCode/50 Days.png', accent: '#FFA726' },
  { id: 'oth-1', title: 'AI Fundamentals', category: 'Other', src: '/certificates/Other/AI Fundamentals.png', accent: '#0F62FE' },
  { id: 'oth-2', title: 'AWS', category: 'Other', src: '/certificates/Other/AWS.png', accent: '#FF9900' },
  { id: 'sn-1', title: 'Micro Certificate', category: 'ServiceNow', src: '/certificates/ServiceNow/micro certificate.png', accent: '#00A699' },
  { id: 'sn-2', title: 'Certified System Administrator', category: 'ServiceNow', src: '/certificates/ServiceNow/ServiceNow Certified System Administrator (CSA)_page-0001.jpg', accent: '#00A699' },
  { id: 'ud-1', title: 'Flutter', category: 'Udemy', src: '/certificates/Udemy/flutter.jpg', accent: '#02569B' },
  { id: 'ud-2', title: 'SQL', category: 'Udemy', src: '/certificates/Udemy/sql.jpg', accent: '#02569B' },
];

export const categoryNotes: Record<string, string> = {
  'Coursera-Meta': 'Frontend development training from Meta covering core web technologies.',
  Hackathon: 'Practical engineering and problem-solving skills demonstrated in competitive environments.',
  HackerRank: 'Verified proficiency in core programming languages and algorithms.',
  LeetCode: 'Consistent dedication to algorithm practice and complex problem solving.',
  ServiceNow: 'Enterprise platform training for workflow automation and system administration.',
  Udemy: 'Specialized technical courses for mobile development and database management.',
  Other: 'Fundamental cloud and AI credentials from leading industry partners.'
};
