import { Button, DatePicker, Form, InputNumber, Modal, Popconfirm, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useMemo, useState } from 'react';

import type { HealthLog } from '../data/types';
import { computeBmi, getBmiTag } from '../logic/logic';

interface HealthLogTabProps {
  healthLogs: HealthLog[];
  onChange: (next: HealthLog[]) => void;
}

export default function HealthLogTab({ healthLogs, onChange }: HealthLogTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HealthLog | null>(null);
  const [form] = Form.useForm();

  const data = useMemo(
    () => [...healthLogs].sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()),
    [healthLogs],
  );

  const columns: ColumnsType<HealthLog> = [
    { title: 'Ngày', dataIndex: 'date', key: 'date', render: (value: string) => moment(value).format('DD/MM/YYYY') },
    { title: 'Cân nặng (kg)', dataIndex: 'weight', key: 'weight' },
    { title: 'Chiều cao (cm)', dataIndex: 'height', key: 'height' },
    {
      title: 'BMI',
      key: 'bmi',
      render: (_, record) => {
        const bmi = computeBmi(record.weight, record.height);
        const bmiTag = getBmiTag(bmi);
        return (
          <Space>
            <span>{bmi.toFixed(1)}</span>
            <Tag color={bmiTag.color}>{bmiTag.label}</Tag>
          </Space>
        );
      },
    },
    { title: 'Nhịp tim lúc nghỉ (bpm)', dataIndex: 'restingHeartRate', key: 'restingHeartRate' },
    { title: 'Giờ ngủ', dataIndex: 'sleepHours', key: 'sleepHours' },
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
            title='Bạn chắc chắn muốn xóa bản ghi chỉ số này?'
            onConfirm={() => {
              onChange(healthLogs.filter((item) => item.id !== record.id));
              message.success('Đã xóa chỉ số sức khỏe');
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
      <Space style={{ marginBottom: 12 }}>
        <Button
          type='primary'
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setModalOpen(true);
          }}
        >
          Thêm chỉ số
        </Button>
      </Space>
      <Table rowKey='id' columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />

      <Modal
        title={editing ? 'Sửa chỉ số sức khỏe' : 'Thêm chỉ số sức khỏe'}
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            const payload: HealthLog = {
              id: editing?.id ?? Date.now(),
              date: values.date.format('YYYY-MM-DD'),
              weight: values.weight,
              height: values.height,
              restingHeartRate: values.restingHeartRate,
              sleepHours: values.sleepHours,
            };
            onChange(editing ? healthLogs.map((item) => (item.id === editing.id ? payload : item)) : [payload, ...healthLogs]);
            setModalOpen(false);
            message.success(editing ? 'Đã cập nhật chỉ số' : 'Đã thêm chỉ số');
          }}
        >
          <Form.Item name='date' label='Ngày' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='weight' label='Cân nặng (kg)' rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='height' label='Chiều cao (cm)' rules={[{ required: true, message: 'Vui lòng nhập chiều cao' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='restingHeartRate' label='Nhịp tim lúc nghỉ (bpm)' rules={[{ required: true, message: 'Vui lòng nhập nhịp tim' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='sleepHours' label='Giờ ngủ' rules={[{ required: true, message: 'Vui lòng nhập giờ ngủ' }]}>
            <InputNumber min={0} max={24} step={0.5} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
