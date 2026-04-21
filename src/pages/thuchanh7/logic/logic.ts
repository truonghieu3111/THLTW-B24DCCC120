import type { BlogPost, TagItem } from '../data/types';

export interface HomeFilterState {
  search: string;
  tag: string;
  page: number;
}

export function normalizeText(text: string) {
  return text.toLowerCase().trim();
}

export function filterPublishedPosts(posts: BlogPost[], filter: HomeFilterState) {
  const q = normalizeText(filter.search);
  return posts
    .filter((p) => p.status === 'published')
    .filter((p) => (filter.tag ? p.tags.includes(filter.tag) : true))
    .filter((p) => {
      if (!q) return true;
      const target = `${p.title} ${p.summary} ${p.author} ${p.tags.join(' ')}`.toLowerCase();
      return target.includes(q);
    })
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
}

export function paginatePosts(posts: BlogPost[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return posts.slice(start, start + pageSize);
}

export function getRelatedPosts(posts: BlogPost[], target?: BlogPost) {
  if (!target) return [];
  return posts
    .filter((p) => p.id !== target.id && p.status === 'published')
    .filter((p) => p.tags.some((tag) => target.tags.includes(tag)))
    .slice(0, 4);
}

export function buildTagUsage(posts: BlogPost[], tags: TagItem[]) {
  return tags.map((tag) => ({
    ...tag,
    totalPosts: posts.filter((p) => p.tags.includes(tag.id)).length,
  }));
}
