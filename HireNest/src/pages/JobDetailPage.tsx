import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useJobs } from '../contexts/JobContext';
import { useAuth } from '../contexts/AuthContext';
import { Job } from '../types';
import { BookmarkPlus, BookmarkCheck, Share2, ArrowLeft, Send, MapPin, Building, Clock, Briefcase, Users, DollarSign, ExternalLink } from 'lucide-react';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getJobById } = useJobs();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      if (jobData) {
        setJob(jobData);
        // Simulate similar jobs (in a real app, this would be API-based)
        const similar = getJobById('job-1');
        const similar2 = getJobById('job-3');
        if (similar && similar2) {
          setSimilarJobs([similar, similar2]);
        }
      }
      setIsLoading(false);
    }
  }, [id, getJobById]);

  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const shareJob = () => {
    // In a real app, this would open a share dialog or copy a link
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard');
  };
  
  const applyForJob = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=jobs/' + id);
      return;
    }
    
    // In a real app, this would initiate the application process
    window.open(job?.url, '_blank');
  };
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get match color based on percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/5 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-60 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Jobs
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">Home</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-gray-700">Jobs</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium truncate max-w-xs">{job.title}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={job.logo || 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                      alt={job.company} 
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <div className="mt-1">
                      <Link to={`/companies/${job.company.replace(/\s+/g, '-').toLowerCase()}`} className="text-lg text-gray-700 hover:text-blue-800">
                        {job.company}
                      </Link>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.employmentType}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <Users className="h-4 w-4 mr-1" />
                        {job.experienceLevel} Level
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      {job.salary && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                      )}
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted {formatDate(job.postedDate)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <Building className="h-4 w-4 mr-1" />
                      {job.source}
                    </span>
                    
                    {job.matchPercentage !== undefined && (
                      <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchPercentage)}`}>
                        {job.matchPercentage}% Match
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={toggleSaveJob}
                      className="text-gray-400 hover:text-blue-500 p-2 rounded-full hover:bg-gray-100"
                      aria-label={isSaved ? "Unsave job" : "Save job"}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="h-5 w-5 text-blue-500" />
                      ) : (
                        <BookmarkPlus className="h-5 w-5" />
                      )}
                    </button>
                    <button 
                      onClick={shareJob}
                      className="text-gray-400 hover:text-blue-500 p-2 rounded-full hover:bg-gray-100"
                      aria-label="Share job"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">{job.description}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">{requirement}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">About the Company</h3>
                  <p className="text-gray-700">
                    {job.company} is a leading company in its field, dedicated to innovation and excellence.
                    We offer competitive benefits, opportunities for growth, and a supportive work environment.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Similar Jobs</h2>
                
                <div className="space-y-4">
                  {similarJobs.map(similarJob => (
                    <Link 
                      key={similarJob.id} 
                      to={`/jobs/${similarJob.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <img 
                          src={similarJob.logo || 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                          alt={similarJob.company} 
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{similarJob.title}</h3>
                          <p className="text-sm text-gray-600">{similarJob.company} • {similarJob.location}</p>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            Posted {formatDate(similarJob.postedDate)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
              <div className="p-6">
                <button
                  onClick={applyForJob}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Apply Now
                </button>
                
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View on {job.source}
                </a>
              </div>
            </div>
            
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About the Company</h2>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={job.logo || 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                    alt={job.company} 
                    className="w-12 h-12 rounded-md object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{job.company}</h3>
                    <Link to={`/companies/${job.company.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm text-blue-800 hover:underline">
                      View company profile
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-700">Technology • 501-1,000 employees</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-700">Headquarters: {job.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-700">15 active job openings</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Employment Type</h3>
                    <p className="text-gray-700">{job.employmentType}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Experience Level</h3>
                    <p className="text-gray-700">{job.experienceLevel}</p>
                  </div>
                  {job.salary && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Salary</h3>
                      <p className="text-gray-700">{job.salary}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Posted On</h3>
                    <p className="text-gray-700">{formatDate(job.postedDate)}</p>
                  </div>
                  {job.applicationDeadline && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Application Deadline</h3>
                      <p className="text-gray-700">{formatDate(job.applicationDeadline)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetailPage;