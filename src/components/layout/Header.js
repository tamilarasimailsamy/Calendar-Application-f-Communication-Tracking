import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from '../context/AppContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useApp();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Calendar', href: '/calendar' },
    ...(isAdmin() ? [
      { name: 'Reports', href: '/reports' },
      { name: 'Admin', href: '/admin' }
    ] : [])
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <span className="text-4xl font-extrabold tracking-tight">
                  <span className="text-violet-600">Comm</span>
                  <span className="text-gray-900">Track</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'border-violet-500 text-violet-600'
                      : 'border-transparent text-gray-500 hover:text-violet-600 hover:border-violet-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-full text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors relative">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center transform transition-transform hover:scale-110">
                3
              </span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-violet-50 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-violet-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-violet-600">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">Sign out</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-violet-50 border-violet-500 text-violet-700'
                    : 'border-transparent text-gray-500 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 transition-colors duration-200"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;