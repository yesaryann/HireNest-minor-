import React, { useState } from 'react';
import { Job } from '../../types';
import JobCard from './JobCard';

interface JobsListProps {
  jobs: Job[];
  loading?: boolean;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, loading = false }) => {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prevSavedJobs => {
      if (prevSavedJobs.includes(jobId)) {
        return prevSavedJobs.filter(id => id !== jobId);
      }
      return [...prevSavedJobs, jobId];
    });
  };

  const handleShareJob = (jobId: string) => {
    // In a real application, this would open a share dialog or copy a link
    alert(`Share job with ID: ${jobId}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="flex space-x-2 mt-2">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="w-24">
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search filters or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          job={job} 
          saved={savedJobs.includes(job.id)}
          onSave={handleSaveJob}
          onShare={handleShareJob}
        />
      ))}
    </div>
  );
};

export default JobsList;