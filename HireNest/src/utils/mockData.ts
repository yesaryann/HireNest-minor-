import { Job, User, Resume } from '../types';
import { Search, Briefcase, Database, Code, LineChart, PenTool, Server, Microscope } from 'lucide-react';

// Generate a random date within the last 30 days
const getRandomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0];
};

// Generate random salary range
const getRandomSalary = () => {
  const base = Math.floor(Math.random() * 150) + 50;
  return `$${base}K - $${base + Math.floor(Math.random() * 50)}K`;
};

// Mock company logos from Pexels
const companyLogos = [
  'https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/3182828/pexels-photo-3182828.jpeg?auto=compress&cs=tinysrgb&w=150',
];

// Mock job descriptions for different roles
const jobDescriptions = {
  frontend: 'Looking for a talented Frontend Developer to join our dynamic team. You\'ll be responsible for building responsive user interfaces and implementing modern web technologies to create seamless user experiences.',
  backend: 'We are seeking a skilled Backend Developer to help build and maintain our server infrastructure. You\'ll work with databases, APIs, and server-side logic to power our applications.',
  fullstack: 'Join our engineering team as a Full Stack Developer. You\'ll work across the entire technology stack, from frontend interfaces to backend systems, databases, and infrastructure.',
  data: 'Seeking a Data Scientist to help us extract insights from our vast datasets. You\'ll use machine learning, statistical analysis, and data visualization to solve complex business problems.',
  design: 'We\'re looking for a UI/UX Designer who can create beautiful, intuitive interfaces. You\'ll be responsible for the entire design process from wireframes to final mockups and prototypes.',
  devops: 'Join our DevOps team to help automate and optimize our deployment pipeline. You\'ll work with cloud infrastructure, CI/CD systems, and monitoring tools to ensure high availability.',
  qa: 'We need a Quality Assurance Engineer to ensure our products meet the highest standards. You\'ll develop and execute test plans, automate testing processes, and work closely with developers.',
  pm: 'Seeking a Product Manager to lead our product development efforts. You\'ll work with stakeholders to define product strategy, roadmap, and features to deliver value to our users.',
};

// Common tech skills
const techSkills = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'SQL',
  'AWS', 'Docker', 'Kubernetes', 'REST APIs', 'GraphQL', 'Next.js', 'Vue.js',
  'MongoDB', 'PostgreSQL', 'Redis', 'Express', 'Django', 'Spring Boot',
  'CI/CD', 'Git', 'GitHub Actions', 'Jest', 'Cypress', 'Selenium',
  'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI',
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Android', 'iOS',
];

// Employment types
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'] as const;

// Experience levels
const experienceLevels = ['Entry', 'Mid', 'Senior', 'Executive'] as const;

// Job sources
const jobSources = ['LinkedIn', 'Naukri', 'Indeed'] as const;

// Job titles for different categories
const jobTitles = {
  frontend: [
    'Frontend Developer', 'React Developer', 'JavaScript Developer',
    'UI Developer', 'Web Developer', 'Frontend Engineer'
  ],
  backend: [
    'Backend Developer', 'Node.js Developer', 'Python Developer',
    'Java Developer', 'Backend Engineer', 'API Developer'
  ],
  fullstack: [
    'Full Stack Developer', 'Full Stack Engineer', 'MERN Stack Developer',
    'Web Application Developer', 'Software Engineer'
  ],
  data: [
    'Data Scientist', 'Data Analyst', 'Machine Learning Engineer',
    'Data Engineer', 'Business Intelligence Analyst'
  ],
  design: [
    'UI/UX Designer', 'Product Designer', 'UX Researcher',
    'Interaction Designer', 'Visual Designer'
  ],
  devops: [
    'DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer',
    'Infrastructure Engineer', 'DevSecOps Specialist'
  ],
  qa: [
    'QA Engineer', 'Test Engineer', 'Automation Engineer',
    'Quality Assurance Analyst', 'Software Tester'
  ],
  pm: [
    'Product Manager', 'Project Manager', 'Technical Product Manager',
    'Product Owner', 'Program Manager'
  ],
};

// Companies
const companies = [
  'TechNova Solutions', 'Infinite Bytes', 'DataSphere', 'CloudPulse', 
  'CodeCraft Systems', 'Quantum Software', 'Digital Dynamics', 'Pixel Perfect',
  'InnovateTech', 'ByteForge', 'Neural Networks Inc.', 'Agile Ventures',
  'CyberLogic', 'Devosphere', 'Elastic Engineering', 'FutureTech Labs'
];

// Locations
const locations = [
  'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA',
  'Boston, MA', 'Chicago, IL', 'Denver, CO', 'Los Angeles, CA',
  'Atlanta, GA', 'Remote', 'Hybrid - Washington, DC', 'Hybrid - Miami, FL',
  'Bangalore, India', 'London, UK', 'Toronto, Canada', 'Sydney, Australia'
];

// Generate requirements based on job category
const generateRequirements = (category: string): string[] => {
  const baseRequirements = [
    '3+ years of professional experience',
    'Bachelor\'s degree in Computer Science or related field (or equivalent experience)',
    'Strong communication and teamwork skills',
    'Problem-solving mindset and attention to detail',
  ];

  const categoryRequirements: Record<string, string[]> = {
    frontend: [
      'Proficiency in JavaScript, HTML5, and CSS3',
      'Experience with React and modern frontend frameworks',
      'Understanding of responsive design and cross-browser compatibility',
      'Knowledge of state management (Redux, Context API, etc.)',
    ],
    backend: [
      'Experience with server-side languages (Node.js, Python, Java, etc.)',
      'Database design and management (SQL and NoSQL)',
      'API development and integration experience',
      'Understanding of serverless architectures and microservices',
    ],
    fullstack: [
      'Experience with both frontend and backend technologies',
      'Full software development lifecycle knowledge',
      'Database and API design experience',
      'System architecture and scalability understanding',
    ],
    data: [
      'Experience with statistical analysis and machine learning',
      'Proficiency in Python, R, or similar data analysis tools',
      'Knowledge of data visualization techniques',
      'Experience with SQL and data processing pipelines',
    ],
    design: [
      'Proficiency with design tools (Figma, Sketch, Adobe XD)',
      'Experience creating user-centered designs and prototypes',
      'Understanding of UX research methods and design thinking',
      'Knowledge of design systems and pattern libraries',
    ],
    devops: [
      'Experience with cloud platforms (AWS, Azure, GCP)',
      'Knowledge of containerization and orchestration (Docker, Kubernetes)',
      'CI/CD pipeline implementation experience',
      'Infrastructure as Code (Terraform, CloudFormation) expertise',
    ],
    qa: [
      'Experience with manual and automated testing methodologies',
      'Proficiency with test automation tools',
      'Understanding of QA processes and best practices',
      'Knowledge of performance and security testing',
    ],
    pm: [
      'Experience managing product lifecycle and roadmap',
      'Stakeholder management and communication skills',
      'Agile methodology knowledge (Scrum, Kanban)',
      'Data-driven decision making experience',
    ],
  };

  return [...baseRequirements, ...categoryRequirements[category] || []];
};

// Generate a list of mock jobs
export const generateMockJobs = (count: number): Job[] => {
  const jobs: Job[] = [];
  const categories = Object.keys(jobTitles);

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const titles = jobTitles[category as keyof typeof jobTitles];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const source = jobSources[Math.floor(Math.random() * jobSources.length)] as Job['source'];
    const experienceLevel = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
    const employmentType = employmentTypes[Math.floor(Math.random() * employmentTypes.length)];
    
    jobs.push({
      id: `job-${i}`,
      title,
      company,
      location,
      salary: getRandomSalary(),
      description: jobDescriptions[category as keyof typeof jobDescriptions],
      requirements: generateRequirements(category),
      postedDate: getRandomRecentDate(),
      employmentType: employmentType,
      experienceLevel: experienceLevel as Job['experienceLevel'],
      url: `https://example.com/jobs/${i}`,
      source: source,
      logo: companyLogos[Math.floor(Math.random() * companyLogos.length)],
      matchPercentage: Math.floor(Math.random() * 101),
    });
  }

  return jobs;
};

// Generate mock user
export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
};

// Generate mock resume
export const mockResume: Resume = {
  id: 'resume-1',
  userId: 'user-1',
  fileName: 'John_Doe_Resume.pdf',
  uploadDate: '2023-04-15',
  skills: techSkills.slice(0, 10),
  experience: 5,
};

// Categories with corresponding icons
export const jobCategories = [
  { name: 'Software Development', icon: Code },
  { name: 'Data Science', icon: Database },
  { name: 'Marketing', icon: LineChart },
  { name: 'Design', icon: PenTool },
  { name: 'IT & DevOps', icon: Server },
  { name: 'Research', icon: Microscope },
  { name: 'Business', icon: Briefcase },
  { name: 'All Categories', icon: Search },
];