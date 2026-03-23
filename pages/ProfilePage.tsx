
import React from 'react';
import { useParams } from 'react-router-dom';
import type { User, Video } from '../types';
import VideoCard from '../components/VideoCard';

interface ProfilePageProps {
  users: User[];
  videos: Video[];
  onFollow: (userId: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ users, videos, onFollow }) => {
  const { id } = useParams<{ id: string }>();
  const user = users.find(u => u.id === id);
  const userVideos = videos.filter(v => v.uploader.id === id);

  if (!user) {
    return <div className="p-8 text-center text-xl">User not found.</div>;
  }

  return (
    <div>
      {/* Banner */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-amber-500 to-orange-600">
        <img src={`https://picsum.photos/seed/${user.id}banner/1600/400`} alt="Banner" className="w-full h-full object-cover opacity-50"/>
      </div>
      
      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
        <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-5">
          <img 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-slate-900 ring-4 ring-amber-500" 
            src={user.avatar} 
            alt={user.name} 
          />
          <div className="mt-4 sm:mt-0 sm:pb-4 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-slate-400">@{user.name.toLowerCase().replace(' ', '')}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-slate-300">
                <div className="text-center">
                    <span className="font-bold text-white text-lg">{userVideos.length}</span>
                    <span className="ml-1">Videos</span>
                </div>
                <div className="text-center">
                    <span className="font-bold text-white text-lg">{user.followers.toLocaleString()}</span>
                    <span className="ml-1">Followers</span>
                </div>
                <div className="text-center">
                    <span className="font-bold text-white text-lg">{user.following.toLocaleString()}</span>
                    <span className="ml-1">Following</span>
                </div>
            </div>
             <button 
                onClick={() => onFollow(user.id)}
                className="bg-amber-600 text-white font-bold py-2 px-6 rounded-full hover:bg-amber-500 transition-colors duration-300"
            >
                Follow
            </button>
        </div>

        <div className="mt-6 max-w-2xl">
            <h2 className="font-semibold text-white">About</h2>
            <p className="text-slate-300 mt-1">{user.bio}</p>
        </div>

      </div>

      {/* User's Videos */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b-2 border-amber-500 pb-2 inline-block">Uploads</h2>
        {userVideos.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {userVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        ) : (
            <p className="text-slate-400 mt-4">This user hasn't uploaded any videos yet.</p>
        )}
      </div>

    </div>
  );
};

export default ProfilePage;
