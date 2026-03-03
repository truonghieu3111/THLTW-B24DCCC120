import {
  Button, Form, Input, DatePicker, Select,
  Table, Modal
} from 'antd';
import { useState } from 'react';
import moment from 'moment';

export default function studySessionManager({
  subjects,
  sessions,
  setSessions,
}: any) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const submit = (values: any) => {
    setSessions([
      ...sessions,
      {
        ...values,
        id: Date.now(),
        date: values.date.format('YYYY-MM-DD HH:mm'),
      },
    ]);
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm lịch học
      </Button>

      <Table
        style={{ marginTop: 20 }}
        rowKey="id"
        dataSource={sessions}
        columns={[
          { title: 'Môn', dataIndex: 'subject' },
          { title: 'Ngày giờ', dataIndex: 'date' },
          { title: 'Thời lượng (phút)', dataIndex: 'duration' },
          { title: 'Nội dung', dataIndex: 'content' },
          { title: 'Ghi chú', dataIndex: 'note' },
        ]}
      />

      <Modal
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={submit}>
          <Form.Item name="subject" label="Môn" rules={[{ required: true }]}>
            <Select options={subjects.map((s: string) => ({ value: s }))} />
          </Form.Item>

          <Form.Item name="date" label="Ngày giờ" rules={[{ required: true }]}>
            <DatePicker showTime />
          </Form.Item>

          <Form.Item name="duration" label="Thời lượng (phút)">
            <Input />
          </Form.Item>

          <Form.Item name="content" label="Nội dung">
            <Input />
          </Form.Item>

          <Form.Item name="note" label="Ghi chú">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}