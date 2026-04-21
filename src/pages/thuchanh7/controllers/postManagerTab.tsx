import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  message,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';

import type { BlogPost, PostStatus, TagItem } from '../data/types';

interface PostManagerTabProps {
  posts: BlogPost[];
  tags: TagItem[];
  onSave: (data: Omit<BlogPost, 'id' | 'views' | 'createdAt'> & { id?: number }) => void;
  onDelete: (id: number) => void;
}

interface FormValues {
  id?: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: PostStatus;
  author: string;
}

export default function PostManagerTab({ posts, tags, onSave, onDelete }: PostManagerTabProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PostStatus>('all');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        id: editing.id,
        title: editing.title,
        slug: editing.slug,
        summary: editing.summary,
        content: editing.content,
        coverImage: editing.coverImage,
        tags: editing.tags,
        status: editing.status,
        author: editing.author,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'draft', tags: [], author: 'Nguyen Van A' });
    }
  }, [editing, form, open]);

  const data = useMemo(() => {
    const q = search.toLowerCase().trim();
    return posts
      .filter((p) => p.title.toLowerCase().includes(q))
      .filter((p) => (statusFilter === 'all' ? true : p.status === statusFilter))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [posts, search, statusFilter]);

  const submit = async () => {
    const values = await form.validateFields();
    onSave(values);
    message.success(values.id ? 'Da cap nhat bai viet' : 'Da them bai viet');
    setOpen(false);
    setEditing(null);
  };

  return (
    <>
      <Space style={{ marginBottom: 12 }} wrap>
        <Input.Search
          allowClear
          placeholder="Tim theo tieu de"
          style={{ width: 260 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select<'all' | PostStatus> value={statusFilter} onChange={setStatusFilter} style={{ width: 180 }}>
          <Select.Option value="all">Tat ca trang thai</Select.Option>
          <Select.Option value="draft">Nhap</Select.Option>
          <Select.Option value="published">Da dang</Select.Option>
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Them bai viet
        </Button>
      </Space>

      <Table<BlogPost>
        rowKey="id"
        dataSource={data}
        pagination={{ pageSize: 8 }}
        columns={[
          { title: 'Tieu de', dataIndex: 'title' },
          {
            title: 'Trang thai',
            dataIndex: 'status',
            render: (status: PostStatus) =>
              status === 'published' ? <Tag color="green">Da dang</Tag> : <Tag>Nhap</Tag>,
          },
          {
            title: 'The',
            dataIndex: 'tags',
            render: (value: string[]) => (
              <>
                {value.map((tagId) => (
                  <Tag key={tagId}>{tags.find((t) => t.id === tagId)?.name || tagId}</Tag>
                ))}
              </>
            ),
          },
          { title: 'Luot xem', dataIndex: 'views', width: 100 },
          {
            title: 'Ngay tao',
            dataIndex: 'createdAt',
            render: (value: string) => new Date(value).toLocaleDateString(),
          },
          {
            title: 'Hanh dong',
            render: (_, record) => (
              <Space>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditing(record);
                    setOpen(true);
                  }}
                />
                <Popconfirm title="Xoa bai viet nay?" onConfirm={() => onDelete(record.id)}>
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editing ? 'Sua bai viet' : 'Them bai viet moi'}
        open={open}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onOk={submit}
        width={760}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="id" hidden>
            <InputNumber />
          </Form.Item>
          <Form.Item name="title" label="Tieu de" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="summary" label="Tom tat" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="content" label="Noi dung (Markdown)" rules={[{ required: true }]}>
            <Input.TextArea rows={8} />
          </Form.Item>
          <Form.Item name="coverImage" label="Anh dai dien (URL)" rules={[{ required: true, type: 'url' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="The" rules={[{ required: true }]}>
            <Select mode="multiple" optionFilterProp="children">
              {tags.map((tag) => (
                <Select.Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Trang thai" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="draft">Nhap</Select.Option>
              <Select.Option value="published">Da dang</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="author" label="Tac gia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
