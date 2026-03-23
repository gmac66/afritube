
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Video, User, Comment as CommentType } from '../types';

interface VideoPageProps {
  videos: Video[];
  currentUser: User;
  onFollow: (userId: string) => void;
  onComment: (videoId: string, commentText: string) => void;
}

const VideoPage: React.FC<VideoPageProps> = ({ videos, currentUser, onFollow, onComment }) => {
  const { id } = useParams<{ id: string }>();
  const video = videos.find(v => v.id === id);
  const [newComment, setNewComment] = useState('');

  if (!video) {
    return <div className="p-8 text-center text-xl">Video not found.</div>;
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(video.id, newComment);
      setNewComment('');
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 gap-8">
      {/* Main Content */}
      <div className="flex-grow">
        <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Placeholder for video player */}
          <img src={`https://picsum.photos/seed/${video.id}/1280/720`} className="w-full h-full object-cover" alt={video.title} />
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-white">{video.title}</h1>
          <div className="flex items-center text-slate-400 text-sm mt-2">
            <span>{video.views.toLocaleString()} views</span>
            <span className="mx-2">&middot;</span>
            <span>{video.uploadDate}</span>
          </div>
        </div>

        {/* Uploader Info & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 py-4 border-y border-slate-700">
            <Link to={`/profile/${video.uploader.id}`} className="flex items-center space-x-4 mb-4 sm:mb-0">
                <img src={video.uploader.avatar} alt={video.uploader.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <h2 className="text-lg font-semibold text-slate-100">{video.uploader.name}</h2>
                    <p className="text-sm text-slate-400">{video.uploader.followers.toLocaleString()} followers</p>
                </div>
            </Link>
            <button 
                onClick={() => onFollow(video.uploader.id)}
                className="bg-amber-600 text-white font-bold py-2 px-6 rounded-full hover:bg-amber-500 transition-colors duration-300 self-start sm:self-center"
            >
                Follow
            </button>
        </div>

        {/* Description */}
        <div className="mt-6 bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-300 whitespace-pre-wrap">{video.description}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">{video.comments.length} Comments</h3>
          <form onSubmit={handleCommentSubmit} className="flex items-start space-x-4 mb-6">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <input 
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..." 
                className="w-full bg-transparent border-b-2 border-slate-600 focus:border-amber-500 outline-none pb-2 text-white transition-colors"
              />
              <div className="flex justify-end mt-2">
                <button type="submit" className="bg-amber-600 text-white font-semibold py-2 px-5 rounded-full hover:bg-amber-500 transition-colors text-sm disabled:bg-slate-600" disabled={!newComment.trim()}>
                    Comment
                </button>
              </div>
            </div>
          </form>
          <div className="space-y-6">
            {video.comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-4">
                    <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <div className="flex items-center space-x-2">
                            <p className="font-semibold text-slate-200 text-sm">{comment.user.name}</p>
                            <p className="text-xs text-slate-400">{comment.timestamp}</p>
                        </div>
                        <p className="text-slate-300 mt-1">{comment.text}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
