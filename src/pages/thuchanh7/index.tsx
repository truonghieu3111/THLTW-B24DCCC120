import { Card, Tabs, Typography, message } from 'antd';
import { useMemo, useState } from 'react';

import AboutTab from './controllers/aboutTab';
import HomeTab from './controllers/homeTab';
import PostDetailTab from './controllers/postDetailTab';
import PostManagerTab from './controllers/postManagerTab';
import TagManagerTab from './controllers/tagManagerTab';
import { authorProfile, loadPosts, loadTags, savePosts, saveTags } from './data/storage';
import type { BlogPost, TagItem } from './data/types';
import { filterPublishedPosts, getRelatedPosts, paginatePosts } from './logic/logic';

import './style/style.css';

const PAGE_SIZE = 9;

export default function Thuchanh7Page() {
  const [posts, setPosts] = useState<BlogPost[]>(() => loadPosts());
  const [tags, setTags] = useState<TagItem[]>(() => loadTags());
  const [activeTab, setActiveTab] = useState('home');
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>(undefined);

  const filtered = useMemo(
    () => filterPublishedPosts(posts, { search, tag: activeTag, page }),
    [posts, search, activeTag, page],
  );
  const pagedPosts = useMemo(() => paginatePosts(filtered, page, PAGE_SIZE), [filtered, page]);
  const selectedPost = useMemo(() => posts.find((p) => p.id === selectedPostId), [posts, selectedPostId]);
  const related = useMemo(() => getRelatedPosts(posts, selectedPost), [posts, selectedPost]);

  const openDetail = (post: BlogPost) => {
    setPosts((prev) => {
      const next = prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p));
      savePosts(next);
      return next;
    });
    setSelectedPostId(post.id);
    setActiveTab('detail');
  };

  const savePost = (payload: Omit<BlogPost, 'id' | 'views' | 'createdAt'> & { id?: number }) => {
    setPosts((prev) => {
      let next: BlogPost[] = [];
      const now = new Date().toISOString();
      if (payload.id != null) {
        next = prev.map((p) =>
          p.id === payload.id
            ? {
                ...p,
                ...payload,
                publishedAt: payload.status === 'published' ? p.publishedAt || now : undefined,
              }
            : p,
        );
      } else {
        const newPost: BlogPost = {
          id: Date.now(),
          views: 0,
          createdAt: now,
          ...payload,
          publishedAt: payload.status === 'published' ? now : undefined,
        };
        next = [newPost, ...prev];
      }
      savePosts(next);
      return next;
    });
  };

  const deletePost = (id: number) => {
    setPosts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      savePosts(next);
      return next;
    });
    message.success('Da xoa bai viet');
  };

  const createTag = (name: string) => {
    const id = name.toLowerCase().trim().replace(/\s+/g, '-');
    if (tags.some((t) => t.id === id)) {
      message.warning('The da ton tai');
      return;
    }
    const next = [...tags, { id, name }];
    setTags(next);
    saveTags(next);
  };

  const updateTag = (id: string, name: string) => {
    const nextTags = tags.map((t) => (t.id === id ? { ...t, name } : t));
    setTags(nextTags);
    saveTags(nextTags);
  };

  const deleteTag = (id: string) => {
    if (posts.some((p) => p.tags.includes(id))) {
      message.warning('Khong the xoa tag dang duoc su dung');
      return;
    }
    const nextTags = tags.filter((t) => t.id !== id);
    setTags(nextTags);
    saveTags(nextTags);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={3}>Blog ca nhan</Typography.Title>
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Trang chu" key="home">
            <HomeTab
              posts={pagedPosts}
              tags={tags}
              searchText={search}
              activeTag={activeTag}
              page={page}
              total={filtered.length}
              pageSize={PAGE_SIZE}
              onSearchChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              onTagChange={(tagId) => {
                setActiveTag(tagId === activeTag ? '' : tagId);
                setPage(1);
              }}
              onPageChange={setPage}
              onReadDetail={openDetail}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Chi tiet bai viet" key="detail">
            <PostDetailTab
              post={selectedPost}
              tags={tags}
              related={related}
              onBack={() => setActiveTab('home')}
              onReadRelated={openDetail}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Gioi thieu" key="about">
            <AboutTab profile={authorProfile} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Quan ly bai viet" key="post-admin">
            <PostManagerTab posts={posts} tags={tags} onSave={savePost} onDelete={deletePost} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Quan ly the" key="tag-admin">
            <TagManagerTab
              tags={tags}
              posts={posts}
              onCreate={createTag}
              onUpdate={updateTag}
              onDelete={deleteTag}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
