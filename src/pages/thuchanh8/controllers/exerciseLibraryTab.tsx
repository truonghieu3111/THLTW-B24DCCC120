import { Button, Card, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Space, Tag, Typography, message } from 'antd';
import { useMemo, useState } from 'react';

import type { ExerciseItem } from '../data/types';
import { difficultyOptions, muscleOptions } from '../data/types';

interface ExerciseLibraryTabProps {
  exercises: ExerciseItem[];
  onChange: (next: ExerciseItem[]) => void;
}

export default function ExerciseLibraryTab({ exercises, onChange }: ExerciseLibraryTabProps) {
  const [search, setSearch] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<string>();
  const [difficultyFilter, setDifficultyFilter] = useState<string>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailModalItem, setDetailModalItem] = useState<ExerciseItem | null>(null);
  const [editing, setEditing] = useState<ExerciseItem | null>(null);
  const [form] = Form.useForm();

  const filteredExercises = useMemo(
    () =>
      exercises
        .filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
        .filter((item) => (muscleFilter ? item.muscleGroup === muscleFilter : true))
        .filter((item) => (difficultyFilter ? item.difficulty === difficultyFilter : true)),
    [difficultyFilter, exercises, muscleFilter, search],
  );

  return (
    <>
      <Space style={{ marginBottom: 12 }} wrap>
        <Input.Search allowClear placeholder='Tìm theo tên bài tập' style={{ width: 260 }} onSearch={setSearch} onChange={(e) => setSearch(e.target.value)} />
        <Select
          allowClear
          style={{ width: 180 }}
          placeholder='Lọc nhóm cơ'
          onChange={setMuscleFilter}
          options={muscleOptions.map((item) => ({ value: item, label: item }))}
        />
        <Select
          allowClear
          style={{ width: 180 }}
          placeholder='Lọc độ khó'
          onChange={setDifficultyFilter}
          options={difficultyOptions.map((item) => ({ value: item, label: item }))}
        />
        <Button
          type='primary'
          onClick={() => {
            setEditing(null);
            form.resetFields();
            form.setFieldsValue({ difficulty: 'Dễ', muscleGroup: 'Chest' });
            setEditModalOpen(true);
          }}
        >
          Thêm bài tập
        </Button>
      </Space>

      <Row gutter={[16, 16]}>
        {filteredExercises.map((item) => (
          <Col xs={24} md={12} xl={8} key={item.id}>
            <Card
              hoverable
              onClick={() => setDetailModalItem(item)}
              title={item.name}
              extra={<Tag color={item.difficulty === 'Dễ' ? 'green' : item.difficulty === 'Trung bình' ? 'gold' : 'red'}>{item.difficulty}</Tag>}
              actions={[
                <Button
                  key='edit'
                  type='link'
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(item);
                    form.setFieldsValue(item);
                    setEditModalOpen(true);
                  }}
                >
                  Sửa
                </Button>,
                <Popconfirm
                  key='delete'
                  title='Bạn chắc chắn muốn xóa bài tập này?'
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    onChange(exercises.filter((exercise) => exercise.id !== item.id));
                    message.success('Đã xóa bài tập');
                  }}
                  onCancel={(e) => e?.stopPropagation()}
                >
                  <Button type='link' danger onClick={(e) => e.stopPropagation()}>
                    Xóa
                  </Button>
                </Popconfirm>,
              ]}
            >
              <Space direction='vertical'>
                <Typography.Text>Nhóm cơ: {item.muscleGroup}</Typography.Text>
                <Typography.Text>{item.description}</Typography.Text>
                <Typography.Text strong>{item.caloriesPerHour} calo/giờ</Typography.Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal title='Chi tiết bài tập' visible={!!detailModalItem} footer={null} onCancel={() => setDetailModalItem(null)}>
        {detailModalItem && (
          <Space direction='vertical'>
            <Typography.Title level={4}>{detailModalItem.name}</Typography.Title>
            <Typography.Text>Nhóm cơ: {detailModalItem.muscleGroup}</Typography.Text>
            <Typography.Text>Mức độ: {detailModalItem.difficulty}</Typography.Text>
            <Typography.Text>{detailModalItem.details}</Typography.Text>
            <Typography.Text strong>{detailModalItem.caloriesPerHour} calo/giờ</Typography.Text>
          </Space>
        )}
      </Modal>

      <Modal
        title={editing ? 'Sửa bài tập' : 'Thêm bài tập'}
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            const payload: ExerciseItem = {
              id: editing?.id ?? Date.now(),
              name: values.name,
              muscleGroup: values.muscleGroup,
              difficulty: values.difficulty,
              description: values.description,
              details: values.details,
              caloriesPerHour: values.caloriesPerHour,
            };
            onChange(editing ? exercises.map((item) => (item.id === editing.id ? payload : item)) : [payload, ...exercises]);
            setEditModalOpen(false);
            message.success(editing ? 'Đã cập nhật bài tập' : 'Đã thêm bài tập');
          }}
        >
          <Form.Item name='name' label='Tên bài tập' rules={[{ required: true, message: 'Vui lòng nhập tên bài tập' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='muscleGroup' label='Nhóm cơ tác động' rules={[{ required: true, message: 'Vui lòng chọn nhóm cơ' }]}>
            <Select options={muscleOptions.map((item) => ({ value: item, label: item }))} />
          </Form.Item>
          <Form.Item name='difficulty' label='Mức độ khó' rules={[{ required: true, message: 'Vui lòng chọn mức độ' }]}>
            <Select options={difficultyOptions.map((item) => ({ value: item, label: item }))} />
          </Form.Item>
          <Form.Item name='description' label='Mô tả ngắn' rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name='details' label='Hướng dẫn chi tiết' rules={[{ required: true, message: 'Vui lòng nhập hướng dẫn' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name='caloriesPerHour' label='Calo đốt trung bình/giờ' rules={[{ required: true, message: 'Vui lòng nhập calo trung bình' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
