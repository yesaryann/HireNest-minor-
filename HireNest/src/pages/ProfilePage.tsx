import React from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import ResumeUploader from '../components/profile/ResumeUploader';
import { mockResume } from '../utils/mockData';

const ProfilePage = () => {
  const { user } = useAuth();

  const handleResumeUpload = async (file: File) => {
    // In a real app, this would upload the file to a server
    console.log('Uploading resume:', file.name);
    
    // Simulate API call
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={user?.profilePicture || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  
                  <button className="mt-4 text-blue-800 hover:text-blue-900 text-sm font-medium">
                    Edit Profile
                  </button>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Account Settings</h3>
                  
                  <div className="space-y-3">
                    <button className="text-blue-800 hover:text-blue-900 text-sm font-medium block">
                      Change Password
                    </button>
                    <button className="text-blue-800 hover:text-blue-900 text-sm font-medium block">
                      Notification Settings
                    </button>
                    <button className="text-blue-800 hover:text-blue-900 text-sm font-medium block">
                      Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Section */}
            <ResumeUploader onUpload={handleResumeUpload} currentResume={mockResume} />
            
            {/* Job Preferences */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Desired Job Titles</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Software Engineer</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Full Stack Developer</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Frontend Developer</span>
                    <button className="text-gray-500 hover:text-gray-700 px-2 py-1 text-sm">+ Add more</button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Desired Locations</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">San Francisco, CA</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Remote</span>
                    <button className="text-gray-500 hover:text-gray-700 px-2 py-1 text-sm">+ Add more</button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Employment Types</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Full-time</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Remote</span>
                    <button className="text-gray-500 hover:text-gray-700 px-2 py-1 text-sm">+ Add more</button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Salary Expectations</h3>
                  <p className="text-gray-700">$100,000 - $150,000 per year</p>
                  <button className="text-blue-800 hover:text-blue-900 text-sm font-medium mt-1">Edit</button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Update Job Preferences
                  </button>
                </div>
              </div>
            </div>
            
            {/* Job Applications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                <a href="/applications" className="text-blue-800 hover:text-blue-900 text-sm font-medium">
                  View all
                </a>
              </div>
              
              <div className="space-y-4">
                {/* Sample Application */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <img 
                        src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=150" 
                        alt="Company Logo" 
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">Senior Frontend Developer</h3>
                        <p className="text-sm text-gray-600">TechNova Solutions • San Francisco, CA</p>
                        <p className="text-xs text-gray-500 mt-1">Applied on Apr 15, 2023</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Interviewing
                    </span>
                  </div>
                </div>
                
                {/* Sample Application */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <img 
                        src="https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=150" 
                        alt="Company Logo" 
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">Full Stack Engineer</h3>
                        <p className="text-sm text-gray-600">CodeCraft Systems • Remote</p>
                        <p className="text-xs text-gray-500 mt-1">Applied on Apr 10, 2023</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Offered
                    </span>
                  </div>
                </div>
                
                {/* Sample Application */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <img 
                        src="https://images.pexels.com/photos/3182828/pexels-photo-3182828.jpeg?auto=compress&cs=tinysrgb&w=150" 
                        alt="Company Logo" 
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">UI/UX Designer</h3>
                        <p className="text-sm text-gray-600">Pixel Perfect • New York, NY</p>
                        <p className="text-xs text-gray-500 mt-1">Applied on Apr 5, 2023</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Rejected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;