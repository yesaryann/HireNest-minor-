import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import JobsList from '../components/jobs/JobsList';
import JobFilters from '../components/jobs/JobFilters';
import { useJobs } from '../contexts/JobContext';
import { Filter } from '../types';
import { RefreshCw } from 'lucide-react';

const JobsPage = () => {
  const { filteredJobs, isLoading, totalJobs, setFilter, filter, refreshJobs } = useJobs();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update filters from URL params on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlFilters: Partial<Filter> = {};
    
    if (searchParams.has('q')) urlFilters.query = searchParams.get('q') || '';
    if (searchParams.has('location')) urlFilters.location = searchParams.get('location') || '';
    if (searchParams.has('type')) urlFilters.employmentType = searchParams.getAll('type');
    if (searchParams.has('level')) urlFilters.experienceLevel = searchParams.getAll('level');
    if (searchParams.has('posted')) urlFilters.datePosted = searchParams.get('posted') || '';
    if (searchParams.has('sort')) urlFilters.sortBy = searchParams.get('sort') as Filter['sortBy'] || 'relevance';
    
    if (Object.keys(urlFilters).length > 0) {
      setFilter({ ...filter, ...urlFilters });
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams();
    
    if (filter.query) searchParams.set('q', filter.query);
    if (filter.location) searchParams.set('location', filter.location);
    if (filter.employmentType && filter.employmentType.length > 0) {
      filter.employmentType.forEach(type => searchParams.append('type', type));
    }
    if (filter.experienceLevel && filter.experienceLevel.length > 0) {
      filter.experienceLevel.forEach(level => searchParams.append('level', level));
    }
    if (filter.datePosted) searchParams.set('posted', filter.datePosted);
    if (filter.sortBy) searchParams.set('sort', filter.sortBy);
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [filter]);

  const handleFilterChange = (newFilters: Filter) => {
    setFilter(newFilters);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshJobs();
    setIsRefreshing(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Jobs</h1>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center text-blue-800 hover:text-blue-900 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
        
        <div className="mb-6">
          <JobFilters initialFilters={filter} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">
            {isLoading 
              ? 'Loading jobs...' 
              : `Showing ${filteredJobs.length} out of ${totalJobs} jobs`
            }
          </p>
        </div>
        
        <JobsList jobs={filteredJobs} loading={isLoading} />
        
        {!isLoading && filteredJobs.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Load More
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;