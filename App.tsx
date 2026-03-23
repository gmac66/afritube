
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';
import type { User, Video, Comment } from './types';

// --- MOCK DATA ---
const usersData: User[] = [
    { id: 'u1', name: 'Chinua Achebe', avatar: 'https://picsum.photos/seed/u1/200/200', followers: 12000, following: 15, bio: 'Storyteller from Nigeria. Sharing tales of our land and people. 🇳🇬' },
    { id: 'u2', name: 'Fatou Diome', avatar: 'https://picsum.photos/seed/u2/200/200', followers: 8500, following: 22, bio: 'Senegalese culinary artist exploring West African cuisine. 🇸🇳 Chef life!' },
    { id: 'u3', name: 'Jomo Kenyatta', avatar: 'https://picsum.photos/seed/u3/200/200', followers: 25000, following: 3, bio: 'Wildlife photographer based in Kenya. Capturing the beauty of the Savannah. 🇰🇪🦁' },
    { id: 'u4', name: 'Amina Mohamed', avatar: 'https://picsum.photos/seed/u4/200/200', followers: 500, following: 78, bio: 'Your average girl from Accra. Come join my adventures! 🇬🇭' }
];

const videosData: Video[] = [
    { id: 'v1', title: 'Making Jollof Rice the Authentic Senegalese Way', description: 'Join me in my kitchen as I reveal the secrets to the perfect Thieboudienne, the original Jollof!', uploader: usersData[1], thumbnailUrl: 'https://picsum.photos/seed/v1/480/270', videoUrl: '', views: 125000, uploadDate: '2 weeks ago', comments: [
        { id: 'c1', user: usersData[0], text: 'This looks delicious! I have to try this recipe.', timestamp: '1 week ago' },
        { id: 'c2', user: usersData[3], text: 'Team Ghana Jollof forever, but I respect the skills! 😉', timestamp: '3 days ago' }
    ] },
    { id: 'v2', title: 'A Day in the Life of a Maasai Warrior', description: 'Experience the raw beauty and ancient traditions of the Maasai people. A journey into the heart of Kenya.', uploader: usersData[2], thumbnailUrl: 'https://picsum.photos/seed/v2/480/270', videoUrl: '', views: 540000, uploadDate: '1 month ago', comments: [] },
    { id: 'v3', title: 'My First Time Visiting Lagos, Nigeria!', description: 'The organized chaos, the energy, the food! Lagos is an unforgettable experience. Come see it through my eyes.', uploader: usersData[3], thumbnailUrl: 'https://picsum.photos/seed/v3/480/270', videoUrl: '', views: 8900, uploadDate: '5 days ago', comments: [] },
    { id: 'v4', title: 'Reading "Things Fall Apart" - Chapter 1 Analysis', description: 'Diving deep into the masterpiece by the father of African literature. Let\'s discuss the themes and characters.', uploader: usersData[0], thumbnailUrl: 'https://picsum.photos/seed/v4/480/270', videoUrl: '', views: 42000, uploadDate: '3 weeks ago', comments: [] },
    { id: 'v5', title: 'Top 5 Must-Try Street Foods in Accra', description: 'From Kelewele to Banku, I am taking you on a delicious tour of Accra\'s best street food spots.', uploader: usersData[3], thumbnailUrl: 'https://picsum.photos/seed/v5/480/270', videoUrl: '', views: 15000, uploadDate: '1 week ago', comments: [] },
];
// --- END MOCK DATA ---


const App: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>(videosData);
    const [users, setUsers] = useState<User[]>(usersData);
    const [currentUser] = useState<User>(usersData[3]); // Amina Mohamed is the logged in user

    const handleFollow = useCallback((userId: string) => {
        setUsers(prevUsers => prevUsers.map(user => 
            user.id === userId ? { ...user, followers: user.followers + 1 } : user
        ));
        alert(`You are now following this user! (State is updated)`);
    }, []);

    const handleComment = useCallback((videoId: string, commentText: string) => {
        setVideos(prevVideos => prevVideos.map(video => {
            if (video.id === videoId) {
                const newComment: Comment = {
                    id: `c${Date.now()}`,
                    user: currentUser,
                    text: commentText,
                    timestamp: 'Just now'
                };
                return { ...video, comments: [newComment, ...video.comments] };
            }
            return video;
        }));
    }, [currentUser]);

    const handleUpload = useCallback((newVideoData: Omit<Video, 'id' | 'uploadDate' | 'views' | 'comments'>) => {
        const newVideo: Video = {
            ...newVideoData,
            id: `v${Date.now()}`,
            uploadDate: 'Just now',
            views: 0,
            comments: []
        };
        setVideos(prevVideos => [newVideo, ...prevVideos]);
    }, []);

    return (
        <HashRouter>
            <Header currentUser={currentUser} />
            <div className="flex pt-16">
                <Sidebar currentUser={currentUser} />
                <main className="flex-1 lg:ml-64 bg-slate-900 min-h-[calc(100vh-4rem)]">
                    <Routes>
                        <Route path="/" element={<Home videos={videos} />} />
                        <Route path="/video/:id" element={<VideoPage videos={videos} currentUser={currentUser} onFollow={handleFollow} onComment={handleComment}/>} />
                        <Route path="/profile/:id" element={<ProfilePage users={users} videos={videos} onFollow={handleFollow} />} />
                        <Route path="/upload" element={<UploadPage currentUser={currentUser} onUpload={handleUpload} />} />
                        <Route path="/trending" element={<div className="p-8">Trending Page - Coming Soon!</div>} />
                        <Route path="/subscriptions" element={<div className="p-8">Subscriptions Page - Coming Soon!</div>} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
};

export default App;
