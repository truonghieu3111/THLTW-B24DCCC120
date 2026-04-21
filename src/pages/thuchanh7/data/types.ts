export type PostStatus = 'draft' | 'published';

export interface TagItem {
  id: string;
  name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: PostStatus;
  author: string;
  createdAt: string;
  publishedAt?: string;
  views: number;
}

export interface AuthorProfile {
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  socials: { label: string; url: string }[];
}
