import React, { useState } from 'react';
import { Filter } from '../../types';
import { Search, MapPin, Briefcase, ChevronDown, X, RefreshCw } from 'lucide-react';

interface JobFiltersProps {
  initialFilters?: Partial<Filter>;
  onFilterChange: (filters: Filter) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ initialFilters = {}, onFilterChange }) => {
  const [filters, setFilters] = useState<Filter>({
    query: initialFilters.query || '',
    location: initialFilters.location || '',
    employmentType: initialFilters.employmentType || [],
    experienceLevel: initialFilters.experienceLevel || [],
    datePosted: initialFilters.datePosted || '',
    sortBy: initialFilters.sortBy || 'relevance',
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFilters(prev => {
      const currentValues = prev[name as keyof Filter] as string[] || [];
      
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const resetFilters: Filter = {
      query: '',
      location: '',
      employmentType: [],
      experienceLevel: [],
      datePosted: '',
      sortBy: 'relevance',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        {/* Main search fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="query"
              value={filters.query}
              onChange={handleInputChange}
              placeholder="Job title, keywords, or company"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              placeholder="City, state, or 'Remote'"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Toggle for advanced filters */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-blue-800 text-sm font-medium flex items-center focus:outline-none"
          >
            <ChevronDown className={`h-4 w-4 mr-1 transform ${isAdvancedOpen ? 'rotate-180' : ''} transition-transform`} />
            {isAdvancedOpen ? 'Less filters' : 'More filters'}
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={clearFilters}
              className="text-gray-600 text-sm flex items-center hover:text-gray-900 focus:outline-none"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </button>
            
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Advanced filters */}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-gray-200">
            {/* Employment Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Employment Type</h3>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      name="employmentType"
                      value={type}
                      checked={(filters.employmentType || []).includes(type)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Experience Level */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Experience Level</h3>
              <div className="space-y-2">
                {['Entry', 'Mid', 'Senior', 'Executive'].map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      name="experienceLevel"
                      value={level}
                      checked={(filters.experienceLevel || []).includes(level)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Date Posted & Sort By */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Date Posted</h3>
                <select
                  name="datePosted"
                  value={filters.datePosted}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Any time</option>
                  <option value="last24hours">Past 24 hours</option>
                  <option value="lastWeek">Past week</option>
                  <option value="lastMonth">Past month</option>
                </select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Date (newest)</option>
                  <option value="salary">Salary (highest)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobFilters;