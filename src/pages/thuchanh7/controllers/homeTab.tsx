import { Card, Empty, Input, Pagination, Space, Tag, Typography } from 'antd';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';

import type { BlogPost, TagItem } from '../data/types';

const { Text, Paragraph } = Typography;

interface HomeTabProps {
  posts: BlogPost[];
  tags: TagItem[];
  searchText: string;
  activeTag: string;
  page: number;
  total: number;
  pageSize: number;
  onSearchChange: (value: string) => void;
  onTagChange: (tagId: string) => void;
  onPageChange: (page: number) => void;
  onReadDetail: (post: BlogPost) => void;
}

export default function HomeTab(props: HomeTabProps) {
  const {
    posts,
    tags,
    searchText,
    activeTag,
    page,
    total,
    pageSize,
    onSearchChange,
    onTagChange,
    onPageChange,
    onReadDetail,
  } = props;

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearchChange(value);
      }, 300),
    [onSearchChange],
  );

  return (
    <div>
      <Space wrap style={{ marginBottom: 12 }}>
        <Input.Search
          allowClear
          placeholder="Tim theo tu khoa (tieu de, tom tat, tac gia...)"
          defaultValue={searchText}
          style={{ width: 320 }}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Tag
          color={activeTag ? 'default' : 'blue'}
          onClick={() => onTagChange('')}
          style={{ cursor: 'pointer' }}
        >
          Tat ca
        </Tag>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            color={activeTag === tag.id ? 'blue' : 'default'}
            onClick={() => onTagChange(tag.id)}
            style={{ cursor: 'pointer' }}
          >
            {tag.name}
          </Tag>
        ))}
      </Space>

      {posts.length === 0 ? (
        <Empty description="Khong co bai viet phu hop" />
      ) : (
        <div className="th7-card-grid">
          {posts.map((post) => (
            <Card
              key={post.id}
              hoverable
              className="th7-card"
              cover={<img alt={post.title} src={post.coverImage} className="th7-cover" />}
              onClick={() => onReadDetail(post)}
            >
              <Typography.Title level={5}>{post.title}</Typography.Title>
              <Paragraph ellipsis={{ rows: 2 }}>{post.summary}</Paragraph>
              <Text type="secondary">
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString()} - {post.author}
              </Text>
              <div style={{ marginTop: 8 }}>
                {post.tags.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  return <Tag key={tagId}>{tag?.name || tagId}</Tag>;
                })}
              </div>
            </Card>
          ))}
        </div>
      )}

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
