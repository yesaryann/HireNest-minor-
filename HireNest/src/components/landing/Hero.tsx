import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase as BriefcaseBusiness, Building2, BarChart } from 'lucide-react';
import { jobCategories } from '../../utils/mockData';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
          <circle cx="16" cy="16" r="1.5" stroke="currentColor" strokeWidth="1"></circle>
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Find Your Perfect Job Match
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl">
              HireNest aggregates job listings from LinkedIn, Naukri, Indeed, and more. Upload your resume to find the best matches for your skills and experience.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 max-w-xl">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative flex-grow mb-3 md:mb-0 md:mr-3">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Find Jobs
                    </Link>
                  </div>
                </div>
                
                {/* Popular searches */}
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <div className="flex flex-wrap items-center text-sm text-gray-600">
                    <span className="mr-2 text-gray-500">Popular:</span>
                    <Link to="/jobs?q=software+developer" className="mr-3 text-blue-700 hover:text-blue-900">Software Developer</Link>
                    <Link to="/jobs?q=data+scientist" className="mr-3 text-blue-700 hover:text-blue-900">Data Scientist</Link>
                    <Link to="/jobs?q=product+manager" className="mr-3 text-blue-700 hover:text-blue-900">Product Manager</Link>
                    <Link to="/jobs?q=remote" className="text-blue-700 hover:text-blue-900">Remote</Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Your Resume
              </Link>
              <span className="ml-4 text-blue-100">and get personalized job matches</span>
            </div>
          </div>
          
          {/* Categories */}
          <div className="hidden lg:block">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Explore Job Categories</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {jobCategories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/jobs?category=${category.name.toLowerCase()}`}
                    className="flex items-center p-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
                  >
                    <div className="bg-white bg-opacity-20 p-2 rounded-md mr-3">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center text-blue-100 mb-2">
              <BriefcaseBusiness className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">Jobs</span>
            </div>
            <p className="text-3xl font-bold text-white">10,000+</p>
            <p className="text-blue-200 text-sm mt-1">Active listings</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center text-blue-100 mb-2">
              <Building2 className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">Companies</span>
            </div>
            <p className="text-3xl font-bold text-white">2,500+</p>
            <p className="text-blue-200 text-sm mt-1">Hiring now</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center text-blue-100 mb-2">
              <Search className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">Sources</span>
            </div>
            <p className="text-3xl font-bold text-white">3+</p>
            <p className="text-blue-200 text-sm mt-1">Top job platforms</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center text-blue-100 mb-2">
              <BarChart className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">Success</span>
            </div>
            <p className="text-3xl font-bold text-white">85%</p>
            <p className="text-blue-200 text-sm mt-1">Match rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;