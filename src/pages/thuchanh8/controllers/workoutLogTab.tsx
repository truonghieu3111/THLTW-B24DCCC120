import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment, { type Moment } from 'moment';
import { useMemo, useState } from 'react';

import type { WorkoutLog } from '../data/types';
import { workoutStatusOptions, workoutTypeOptions } from '../data/types';

interface WorkoutLogTabProps {
  workouts: WorkoutLog[];
  onChange: (next: WorkoutLog[]) => void;
}

export default function WorkoutLogTab({ workouts, onChange }: WorkoutLogTabProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>();
  const [range, setRange] = useState<Moment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WorkoutLog | null>(null);
  const [form] = Form.useForm();

  const data = useMemo(() => {
    return workouts
      .filter((item) => item.type.toLowerCase().includes(search.toLowerCase().trim()))
      .filter((item) => (typeFilter ? item.type === typeFilter : true))
      .filter((item) => {
        if (!range || range.length !== 2) return true;
        const [from, to] = range;
        return moment(item.date).isBetween(from.startOf('day'), to.endOf('day'), undefined, '[]');
      })
      .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
  }, [range, search, typeFilter, workouts]);

  const columns: ColumnsType<WorkoutLog> = [
    { title: 'Ngày', dataIndex: 'date', key: 'date', render: (value: string) => moment(value).format('DD/MM/YYYY') },
    { title: 'Loại bài tập', dataIndex: 'type', key: 'type' },
    { title: 'Thời lượng (phút)', dataIndex: 'duration', key: 'duration' },
    { title: 'Calo đốt', dataIndex: 'calories', key: 'calories' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note', render: (value: string) => value || '-' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => <Tag color={value === 'completed' ? 'green' : 'volcano'}>{value === 'completed' ? 'Hoàn thành' : 'Bỏ lỡ'}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            size='small'
            onClick={() => {
              setEditing(record);
              form.setFieldsValue({ ...record, date: moment(record.date) });
              setModalOpen(true);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title='Bạn chắc chắn muốn xóa buổi tập này?'
            onConfirm={() => {
              onChange(workouts.filter((item) => item.id !== record.id));
              message.success('Đã xóa buổi tập');
            }}
          >
            <Button danger size='small'>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 12 }} wrap>
        <Input.Search allowClear placeholder='Tìm theo tên bài tập' style={{ width: 260 }} onSearch={setSearch} onChange={(e) => setSearch(e.target.value)} />
        <Select
          allowClear
          style={{ width: 180 }}
          placeholder='Lọc loại bài tập'
          onChange={setTypeFilter}
          options={workoutTypeOptions.map((item) => ({ value: item, label: item }))}
        />
        <DatePicker.RangePicker onChange={(value) => setRange((value as Moment[]) || [])} />
        <Button
          type='primary'
          onClick={() => {
            setEditing(null);
            form.resetFields();
            form.setFieldsValue({ status: 'completed' });
            setModalOpen(true);
          }}
        >
          Thêm buổi tập
        </Button>
      </Space>

      <Table rowKey='id' columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />

      <Modal
        title={editing ? 'Sửa buổi tập' : 'Thêm buổi tập'}
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            const payload: WorkoutLog = {
              id: editing?.id ?? Date.now(),
              date: values.date.format('YYYY-MM-DD'),
              type: values.type,
              duration: values.duration,
              calories: values.calories,
              note: values.note,
              status: values.status,
            };
            onChange(editing ? workouts.map((item) => (item.id === editing.id ? payload : item)) : [payload, ...workouts]);
            setModalOpen(false);
            message.success(editing ? 'Đã cập nhật buổi tập' : 'Đã thêm buổi tập');
          }}
        >
          <Form.Item name='date' label='Ngày tập' rules={[{ required: true, message: 'Vui lòng chọn ngày tập' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='type' label='Loại bài tập' rules={[{ required: true, message: 'Vui lòng chọn loại bài tập' }]}>
            <Select options={workoutTypeOptions.map((item) => ({ value: item, label: item }))} />
          </Form.Item>
          <Form.Item name='duration' label='Thời lượng (phút)' rules={[{ required: true, message: 'Vui lòng nhập thời lượng' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='calories' label='Calo đốt' rules={[{ required: true, message: 'Vui lòng nhập calo' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='note' label='Ghi chú'>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
            <Select
              options={workoutStatusOptions.map((item) => ({
                value: item,
                label: item === 'completed' ? 'Hoàn thành' : 'Bỏ lỡ',
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
