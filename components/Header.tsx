
import React from 'react';
import { Link } from 'react-router-dom';
import { UploadIcon } from './icons';
import type { User } from '../types';

interface HeaderProps {
    currentUser: User;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              AfriTube
            </Link>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative text-gray-400 focus-within:text-gray-100">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  className="block w-full bg-slate-800 border border-transparent rounded-md py-2 pl-10 pr-3 text-white placeholder-slate-400 focus:outline-none focus:bg-slate-700 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <Link
                to="/upload"
                className="hidden sm:flex items-center p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
                title="Upload Video"
              >
                <UploadIcon className="h-6 w-6"/>
             </Link>
            <Link to={`/profile/${currentUser.id}`} className="flex items-center space-x-2">
              <img className="h-9 w-9 rounded-full object-cover" src={currentUser.avatar} alt={currentUser.name} />
              <span className="hidden md:block text-sm font-medium text-slate-200">{currentUser.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
