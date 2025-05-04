import React from 'react';
import { Job } from '../../types';
import { BookmarkPlus, BookmarkCheck, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
  saved?: boolean;
  onSave?: (jobId: string) => void;
  onShare?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, saved = false, onSave, onShare }) => {
  // Calculate days ago from posted date
  const getDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  // Get source color for badge
  const getSourceColor = (source: Job['source']) => {
    switch (source) {
      case 'LinkedIn':
        return 'bg-blue-100 text-blue-800';
      case 'Naukri':
        return 'bg-teal-100 text-teal-800';
      case 'Indeed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get match color based on percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img 
                src={job.logo || 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                alt={job.company} 
                className="w-12 h-12 rounded-md object-cover"
              />
            </div>
            <div>
              <Link to={`/jobs/${job.id}`}>
                <h3 className="text-lg font-medium text-gray-900 hover:text-blue-800">{job.title}</h3>
              </Link>
              <div className="mt-1">
                <Link to={`/companies/${job.company.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm text-gray-700 hover:text-blue-900">
                  {job.company}
                </Link>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">{job.location}</span>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {job.employmentType}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {job.experienceLevel}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(job.source)}`}>
                  {job.source}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right flex flex-col items-end">
            {job.matchPercentage !== undefined && (
              <div className={`text-sm font-semibold ${getMatchColor(job.matchPercentage)}`}>
                {job.matchPercentage}% Match
              </div>
            )}
            <div className="text-sm text-gray-500 mt-1">
              {getDaysAgo(job.postedDate)}
            </div>
            {job.salary && (
              <div className="mt-1 text-sm font-medium text-gray-900">
                {job.salary}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {job.description}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((requirement, index) => (
              <span 
                key={index}
                className="inline-block text-xs text-gray-600 border border-gray-200 rounded-full px-2.5 py-0.5"
              >
                {requirement.split(' ')[0]}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="inline-block text-xs text-gray-500 px-2">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onSave?.(job.id)} 
              className="text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100"
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-blue-500" />
              ) : (
                <BookmarkPlus className="h-5 w-5" />
              )}
            </button>
            <button 
              onClick={() => onShare?.(job.id)} 
              className="text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-900 to-teal-600 h-1 w-full mt-2"></div>
    </div>
  );
};

export default JobCard;