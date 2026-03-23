
import React from 'react';
import VideoCard from '../components/VideoCard';
import type { Video } from '../types';

interface HomeProps {
  videos: Video[];
}

const Home: React.FC<HomeProps> = ({ videos }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Recommended For You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
