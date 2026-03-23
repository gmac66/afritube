
export interface User {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  following: number;
  bio: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // Placeholder
  uploader: User;
  views: number;
  uploadDate: string;
  comments: Comment[];
}
