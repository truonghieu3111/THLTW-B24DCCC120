import type { AuthorProfile, BlogPost, TagItem } from './types';

const POSTS_KEY = 'thuchanh7_posts';
const TAGS_KEY = 'thuchanh7_tags';

const seedTags: TagItem[] = [
  { id: 'react', name: 'React' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'life', name: 'Life' },
  { id: 'frontend', name: 'Frontend' },
];

const seedPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Bat dau voi React theo cach don gian',
    slug: 'bat-dau-voi-react',
    summary: 'Tong hop cac buoc de tao mot ung dung React dau tien.',
    content:
      '# React co gi hay?\nReact giup tach UI thanh cac component nho gon.\n\n## Buoc dau tien\n- Tao component\n- Quan ly state\n- Tich hop API',
    coverImage: 'https://picsum.photos/seed/react-blog/600/360',
    tags: ['react', 'frontend'],
    status: 'published',
    author: 'Nguyen Van A',
    createdAt: '2026-04-10T09:00:00.000Z',
    publishedAt: '2026-04-10T09:00:00.000Z',
    views: 12,
  },
  {
    id: 2,
    title: 'Kinh nghiem viet TypeScript de bao tri de dang',
    slug: 'kinh-nghiem-typescript',
    summary: 'Mot so meo dat ten type va interface de code de doc hon.',
    content:
      '# TypeScript trong du an that\nDung type ro rang giup giam bug.\n\n```ts\ninterface User {\n  id: number;\n  name: string;\n}\n```',
    coverImage: 'https://picsum.photos/seed/ts-blog/600/360',
    tags: ['typescript', 'frontend'],
    status: 'published',
    author: 'Nguyen Van A',
    createdAt: '2026-04-13T08:30:00.000Z',
    publishedAt: '2026-04-13T08:30:00.000Z',
    views: 8,
  },
  {
    id: 3,
    title: 'Mau nhap bai viet moi',
    slug: 'mau-nhap-bai-viet-moi',
    summary: 'Bai nhap de demo tinh nang quan ly trang thai.',
    content: '# Ban nhap\nNoi dung dang duoc cap nhat.',
    coverImage: 'https://picsum.photos/seed/draft-blog/600/360',
    tags: ['life'],
    status: 'draft',
    author: 'Nguyen Van A',
    createdAt: '2026-04-16T11:10:00.000Z',
    views: 0,
  },
];

export const authorProfile: AuthorProfile = {
  name: 'Nguyen Van A',
  avatar: 'https://i.pravatar.cc/200?img=13',
  bio: 'Frontend developer yeu thich chia se kien thuc va nhat ky hoc tap moi ngay.',
  skills: ['React', 'TypeScript', 'Ant Design', 'Node.js'],
  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'Facebook', url: 'https://www.facebook.com/' },
  ],
};

export function loadPosts(): BlogPost[] {
  const raw = localStorage.getItem(POSTS_KEY);
  if (!raw) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return seedPosts;
  }
}

export function savePosts(data: BlogPost[]) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(data));
}

export function loadTags(): TagItem[] {
  const raw = localStorage.getItem(TAGS_KEY);
  if (!raw) {
    localStorage.setItem(TAGS_KEY, JSON.stringify(seedTags));
    return seedTags;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return seedTags;
  }
}

export function saveTags(data: TagItem[]) {
  localStorage.setItem(TAGS_KEY, JSON.stringify(data));
}
