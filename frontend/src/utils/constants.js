// Mock data - in production, this would come from an API
export const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    postedDate: '2025-11-12',
    description: 'We are looking for a Senior React Developer to build world-class user interfaces. You will be responsible for leading frontend development, mentoring junior developers, and working closely with product managers.',
    requirements: ['5+ years of React experience', 'Expert in JavaScript, HTML, CSS', 'Experience with Redux or similar state management', 'Strong problem-solving skills'],
    employerId: 1,
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    type: 'Contract',
    postedDate: '2025-11-11',
    description: 'DesignHub is seeking a creative UX/UI Designer to craft beautiful and intuitive web and mobile applications. You will work on all stages of the design process, from user research to high-fidelity mockups.',
    requirements: ['3+ years of UX/UI design experience', 'Strong portfolio showcasing your work', 'Proficiency in Figma, Sketch, or Adobe XD', 'Excellent communication skills'],
    employerId: 2,
  },
  {
    id: 3,
    title: 'Node.js Backend Engineer',
    company: 'ServerSide Solutions',
    location: 'Austin, TX',
    type: 'Full-time',
    postedDate: '2025-11-10',
    description: 'Join our backend team to build scalable and efficient APIs using Node.js. You will work on a microservices architecture and interact with MongoDB databases.',
    requirements: ['4+ years of Node.js experience', 'Experience with Express.js or similar frameworks', 'Knowledge of MongoDB and Mongoose', 'Understanding of RESTful APIs'],
    employerId: 1,
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'GrowFast Inc.',
    location: 'Chicago, IL',
    locationType: 'Hybrid',
    type: 'Full-time',
    postedDate: '2025-11-09',
    description: 'We are looking for a data-driven Marketing Manager to lead our growth strategy. You will be responsible for SEO, SEM, content marketing, and email campaigns.',
    requirements: ['5+ years of digital marketing experience', 'Proven track record of successful campaigns', 'Expertise in Google Analytics and SEO tools', 'Strong leadership skills'],
    employerId: 2,
  },
];

export const MOCK_USERS = {
  candidate: { id: 101, type: 'candidate', name: 'Alex Johnson', email: 'alex@email.com' },
  employer: { id: 1, type: 'employer', name: 'TechCorp Admin', email: 'admin@techcorp.com', company: 'TechCorp' },
};

