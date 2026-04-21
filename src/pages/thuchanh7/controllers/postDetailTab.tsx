import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Space, Tag, Typography } from 'antd';
import { marked } from 'marked';

import type { BlogPost, TagItem } from '../data/types';

interface PostDetailTabProps {
  post?: BlogPost;
  tags: TagItem[];
  related: BlogPost[];
  onBack: () => void;
  onReadRelated: (post: BlogPost) => void;
}

export default function PostDetailTab(props: PostDetailTabProps) {
  const { post, tags, related, onBack, onReadRelated } = props;

  if (!post) {
    return <Empty description="Chua chon bai viet" />;
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
        Quay lai danh sach
      </Button>

      <Card>
        <img alt={post.title} src={post.coverImage} className="th7-detail-cover" />
        <Typography.Title level={3} style={{ marginTop: 16 }}>
          {post.title}
        </Typography.Title>
        <Typography.Text type="secondary">
          Tac gia: {post.author} - Ngay dang:{' '}
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
        </Typography.Text>
        <div style={{ marginTop: 8 }}>
          <EyeOutlined /> {post.views} luot xem
        </div>
        <div style={{ marginTop: 8 }}>
          {post.tags.map((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            return <Tag key={tagId}>{tag?.name || tagId}</Tag>;
          })}
        </div>

        <div
          className="th7-markdown"
          // Noi dung markdown duoc parse sang HTML de hien thi bai viet.
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) as string }}
          style={{ marginTop: 16 }}
        />
      </Card>

      <Card title="Bai viet lien quan">
        {related.length === 0 ? (
          <Empty description="Khong co bai viet lien quan" />
        ) : (
          <Space direction="vertical" style={{ width: '100%' }}>
            {related.map((item) => (
              <Button key={item.id} type="link" style={{ padding: 0 }} onClick={() => onReadRelated(item)}>
                {item.title}
              </Button>
            ))}
          </Space>
        )}
      </Card>
    </Space>
  );
}
