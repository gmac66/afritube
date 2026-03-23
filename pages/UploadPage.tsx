
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Video, User } from '../types';
import { generateVideoDescription } from '../services/geminiService';

interface UploadPageProps {
  currentUser: User;
  onUpload: (video: Omit<Video, 'id' | 'uploadDate' | 'views' | 'comments'>) => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ currentUser, onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      // For simplicity, we'll use a placeholder as thumbnail.
      // In a real app, you'd generate a thumbnail from the video.
      setThumbnailPreview(`https://picsum.photos/seed/${Date.now()}/480/270`);
    }
  };
  
  const handleGenerateDescription = async () => {
    if (!title) {
        alert("Please enter a title first.");
        return;
    }
    setIsGenerating(true);
    try {
        const generatedDesc = await generateVideoDescription(title);
        setDescription(generatedDesc);
    } catch (error) {
        console.error(error);
        alert("Failed to generate description.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !title || !description) {
      alert("Please fill all fields and select a video file.");
      return;
    }

    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
        const newVideo = {
            title,
            description,
            thumbnailUrl: thumbnailPreview || 'https://picsum.photos/480/270',
            videoUrl: URL.createObjectURL(videoFile),
            uploader: currentUser,
        };
        onUpload(newVideo);
        setIsUploading(false);
        navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Upload Video</h1>
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Video File</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-slate-500">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-amber-500 hover:text-amber-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-amber-500 px-2">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="video/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">MP4, WEBM, OGG up to 500MB</p>
            </div>
          </div>
          {thumbnailPreview && (
            <div className="mt-4">
                <p className="text-sm font-medium text-slate-300 mb-2">Thumbnail Preview:</p>
                <img src={thumbnailPreview} alt="Thumbnail preview" className="rounded-lg aspect-video object-cover" />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300">Title</label>
          <input 
            type="text" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
        
        <div>
            <div className="flex justify-between items-center">
                <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
                <button 
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating || !title}
                    className="text-sm font-semibold text-amber-500 hover:text-amber-400 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isGenerating ? 'Generating...' : '✨ Generate with AI'}
                </button>
            </div>
            <textarea 
                id="description" 
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            />
        </div>

        <div className="flex justify-end">
            <button 
                type="submit"
                disabled={isUploading}
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-500 disabled:bg-slate-600"
            >
                {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
