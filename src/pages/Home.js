import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Home() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = {
      admin: { password: 'admin', role: 'admin' },
      user: { password: 'user', role: 'user' }
    };

    if (credentials.role === 'admin' && credentials.username !== 'admin') {
      setError('Invalid username for admin role');
      return;
    }

    if (credentials.role === 'user' && credentials.username === 'admin') {
      setError('Invalid username for user role');
      return;
    }

    const user = users[credentials.role];
    
    if (user && user.password === credentials.password) {
      login(credentials.username, user.role);
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero Content */}
          <div>
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block text-gray-900">Streamline Your</span>
              <span className="block text-violet-600">
                Communication Tracking
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl">
              Efficiently manage and track all your business communications in one place. 
              Stay organized, never miss a follow-up, and build stronger relationships.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-violet-100 rounded-full">
                    <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-base text-gray-600">Track all communications in one place</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-violet-100 rounded-full">
                    <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-base text-gray-600">Manage company relationships</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-violet-100 rounded-full">
                    <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-base text-gray-600">Generate detailed reports</p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="bg-white p-8 shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Role
                </label>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="user-role"
                      name="role"
                      type="radio"
                      value="user"
                      checked={credentials.role === 'user'}
                      onChange={(e) => setCredentials({ 
                        ...credentials, 
                        role: e.target.value
                      })}
                      className="focus:ring-violet-500 h-4 w-4 text-violet-600 border-gray-300"
                    />
                    <label htmlFor="user-role" className="ml-2 block text-sm text-gray-700">
                      User
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="admin-role"
                      name="role"
                      type="radio"
                      value="admin"
                      checked={credentials.role === 'admin'}
                      onChange={(e) => setCredentials({ 
                        ...credentials, 
                        role: e.target.value
                      })}
                      className="focus:ring-violet-500 h-4 w-4 text-violet-600 border-gray-300"
                    />
                    <label htmlFor="admin-role" className="ml-2 block text-sm text-gray-700">
                      Admin
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-auto border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold text-violet-600 mb-4">CommTrack</h3>
              <p className="text-gray-500 text-sm">
                Your comprehensive solution for managing and tracking business communications efficiently.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-gray-500 hover:text-violet-600 text-sm transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-500 hover:text-violet-600 text-sm transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-500 hover:text-violet-600 text-sm transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-500 text-sm">
                  <svg className="h-5 w-5 mr-2 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@commtrack.com
                </li>
                <li className="flex items-center text-gray-500 text-sm">
                  <svg className="h-5 w-5 mr-2 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6">
                <a href="#privacy" className="text-gray-400 hover:text-violet-600 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-violet-600 text-sm transition-colors">
                  Terms of Service
                </a>
              </div>
              <div className="flex space-x-6">
                <a href="#twitter" className="text-gray-400 hover:text-violet-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#linkedin" className="text-gray-400 hover:text-violet-600 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#github" className="text-gray-400 hover:text-violet-600 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home; 