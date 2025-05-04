import React, { useState } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-900 to-teal-600 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="ml-2 text-xl font-bold text-blue-900">HireNest</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/jobs" className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium">
                Find Jobs
              </Link>
              <Link to="/companies" className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium">
                Companies
              </Link>
              <Link to="/insights" className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium">
                Insights
              </Link>
            </nav>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search jobs, skills, companies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <>
                <button className="text-gray-700 p-2 rounded-full hover:bg-gray-100">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="relative ml-3">
                  <Link to="/profile" className="flex items-center">
                    <img 
                      src={user?.profilePicture || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">{user?.name}</span>
                  </Link>
                </div>
                <button 
                  onClick={logout}
                  className="ml-4 bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="ml-3 bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden -mr-2 flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
            >
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
            >
              Companies
            </Link>
            <Link
              to="/insights"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
            >
              Insights
            </Link>

            {/* Mobile search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs, skills, companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile user actions */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img 
                      src={user?.profilePicture || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"}
                      alt="Profile" 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                  <button className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <Bell className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/applications"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
                  >
                    Applications
                  </Link>
                  <Link
                    to="/saved-jobs"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
                  >
                    Saved Jobs
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-1 px-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;