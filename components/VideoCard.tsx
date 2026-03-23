
import React from 'react';
import { Link } from 'react-router-dom';
import type { Video } from '../types';
import { PlayIcon } from './icons';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/video/${video.id}`} className="group block">
      <div className="relative">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-auto object-cover rounded-xl aspect-video transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <PlayIcon className="w-16 h-16 text-white text-opacity-80"/>
        </div>
      </div>
      <div className="mt-3 flex items-start space-x-3">
        <Link to={`/profile/${video.uploader.id}`}>
          <img src={video.uploader.avatar} alt={video.uploader.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        </Link>
        <div>
          <h3 className="text-base font-semibold text-slate-100 group-hover:text-amber-500 transition-colors leading-snug">{video.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{video.uploader.name}</p>
          <p className="text-sm text-slate-400">{video.views.toLocaleString()} views &middot; {video.uploadDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
