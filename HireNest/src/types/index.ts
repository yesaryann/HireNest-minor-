// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  uploadDate: string;
  skills: string[];
  experience: number; // in years
  parsedData?: Record<string, any>;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicationDeadline?: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Executive';
  url: string;
  source: 'LinkedIn' | 'Naukri' | 'Indeed' | 'Other';
  logo?: string;
  matchPercentage?: number;
}

export interface Filter {
  query: string;
  location?: string;
  employmentType?: string[];
  experienceLevel?: string[];
  salary?: {
    min?: number;
    max?: number;
  };
  datePosted?: string; // e.g., "last24hours", "lastWeek", "lastMonth"
  sortBy?: 'relevance' | 'date' | 'salary';
}

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  status: 'Applied' | 'Interviewing' | 'Offered' | 'Rejected' | 'Accepted';
  applicationDate: string;
  notes?: string;
}