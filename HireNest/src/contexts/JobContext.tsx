import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Filter } from '../types';
import { generateMockJobs } from '../utils/mockData';

interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  isLoading: boolean;
  filter: Filter;
  totalJobs: number;
  setFilter: (filter: Filter) => void;
  refreshJobs: () => Promise<void>;
  getJobById: (id: string) => Job | undefined;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: React.ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>({
    query: '',
    location: '',
    employmentType: [],
    experienceLevel: [],
    datePosted: '',
    sortBy: 'relevance',
  });
  const [totalJobs, setTotalJobs] = useState(0);

  // Initialize jobs on mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [filter, jobs]);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch from an API
      // For this demo, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const mockJobs = generateMockJobs(50);
      setJobs(mockJobs);
      setTotalJobs(mockJobs.length);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshJobs = async () => {
    await loadJobs();
  };

  const applyFilters = () => {
    let result = [...jobs];
    
    // Apply query filter
    if (filter.query) {
      const query = filter.query.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }
    
    // Apply location filter
    if (filter.location) {
      const location = filter.location.toLowerCase();
      result = result.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }
    
    // Apply employment type filter
    if (filter.employmentType && filter.employmentType.length > 0) {
      result = result.filter(job => 
        filter.employmentType!.includes(job.employmentType)
      );
    }
    
    // Apply experience level filter
    if (filter.experienceLevel && filter.experienceLevel.length > 0) {
      result = result.filter(job => 
        filter.experienceLevel!.includes(job.experienceLevel)
      );
    }
    
    // Apply date posted filter
    if (filter.datePosted) {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (filter.datePosted) {
        case 'last24hours':
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case 'lastWeek':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'lastMonth':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      result = result.filter(job => {
        const postedDate = new Date(job.postedDate);
        return postedDate >= cutoffDate;
      });
    }
    
    // Apply sorting
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case 'date':
          result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
          break;
        case 'salary':
          // This is a simplified sort for mock data
          // In reality, you would parse the salary into a number
          result.sort((a, b) => {
            const aSalary = a.salary ? parseInt(a.salary.replace(/[^0-9]/g, '')) : 0;
            const bSalary = b.salary ? parseInt(b.salary.replace(/[^0-9]/g, '')) : 0;
            return bSalary - aSalary;
          });
          break;
        case 'relevance':
        default:
          // For relevance, we might sort by match percentage if available
          result.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
          break;
      }
    }
    
    setFilteredJobs(result);
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const value = {
    jobs,
    filteredJobs,
    isLoading,
    filter,
    totalJobs,
    setFilter,
    refreshJobs,
    getJobById,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};