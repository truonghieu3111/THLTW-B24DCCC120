import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from 'antd';
import { useMemo, useState } from 'react';

import type { BlogPost, TagItem } from '../data/types';

interface TagManagerTabProps {
  tags: TagItem[];
  posts: BlogPost[];
  onCreate: (name: string) => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export default function TagManagerTab({ tags, posts, onCreate, onUpdate, onDelete }: TagManagerTabProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TagItem | null>(null);
  const [form] = Form.useForm<{ name: string }>();

  const data = useMemo(
    () =>
      tags.map((tag) => ({
        ...tag,
        totalPosts: posts.filter((p) => p.tags.includes(tag.id)).length,
      })),
    [tags, posts],
  );

  const openCreate = () => {
    setEditing(null);
    form.setFieldsValue({ name: '' });
    setOpen(true);
  };

  const openEdit = (tag: TagItem) => {
    setEditing(tag);
    form.setFieldsValue({ name: tag.name });
    setOpen(true);
  };

  const submit = async () => {
    const values = await form.validateFields();
    if (editing) {
      onUpdate(editing.id, values.name);
      message.success('Da cap nhat the');
    } else {
      onCreate(values.name);
      message.success('Da them the');
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={openCreate} style={{ marginBottom: 12 }}>
        Them the
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        pagination={false}
        columns={[
          { title: 'Ten the', dataIndex: 'name' },
          { title: 'So bai viet su dung', dataIndex: 'totalPosts' },
          {
            title: 'Hanh dong',
            render: (_, record: TagItem & { totalPosts: number }) => (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
                <Popconfirm title="Xoa the nay?" onConfirm={() => onDelete(record.id)}>
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editing ? 'Sua the' : 'Them the'}
        open={open}
        onOk={submit}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Ten the" rules={[{ required: true, whitespace: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
