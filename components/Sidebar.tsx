
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, FireIcon, CollectionIcon, UserGroupIcon, UploadIcon } from './icons';
import type { User } from '../types';

interface SidebarProps {
    currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
    const navLinkClasses = "flex items-center px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors";
    const activeNavLinkClasses = "bg-slate-700 text-amber-500 font-semibold";

    return (
        <aside className="fixed top-16 left-0 w-64 h-full bg-slate-900 border-r border-slate-800 hidden lg:block z-30">
            <div className="p-4 space-y-2">
                <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} end>
                    <HomeIcon className="mr-3"/>
                    Home
                </NavLink>
                <NavLink to="/trending" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <FireIcon className="mr-3"/>
                    Trending
                </NavLink>
                <NavLink to="/subscriptions" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <CollectionIcon className="mr-3"/>
                    Subscriptions
                </NavLink>
                 <NavLink to="/upload" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <UploadIcon className="mr-3"/>
                    Upload
                </NavLink>
            </div>
            <div className="px-4 mt-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Following</h3>
                <div className="mt-3 space-y-1">
                    {/* Placeholder for followed channels */}
                    <a href="#" className="flex items-center space-x-3 group px-4 py-2">
                        <img className="h-8 w-8 rounded-full object-cover" src="https://picsum.photos/seed/user1/100/100" alt="Channel" />
                        <span className="text-sm text-slate-300 group-hover:text-white">AfroBeats Central</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 group px-4 py-2">
                        <img className="h-8 w-8 rounded-full object-cover" src="https://picsum.photos/seed/user2/100/100" alt="Channel" />
                        <span className="text-sm text-slate-300 group-hover:text-white">Naija Comedy Skits</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 group px-4 py-2">
                        <img className="h-8 w-8 rounded-full object-cover" src="https://picsum.photos/seed/user3/100/100" alt="Channel" />
                        <span className="text-sm text-slate-300 group-hover:text-white">Savannah Wild</span>
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
