import { DatePicker, Form, Input, Modal, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import moment from 'moment';
import { useEffect } from 'react';

import type { TaskItem } from '../data/types';
import { TASK_STATUS_LABEL, priorityOptions, taskStatusOptions } from '../data/types';
import type { FormSubmitValues } from '../logic/logic';

interface TaskFormModalProps {
  open: boolean;
  task: TaskItem | null;
  onCancel: () => void;
  onSubmit: (values: FormSubmitValues) => void;
  form: FormInstance<FormSubmitValues>;
}

export default function TaskFormModal({ open, task, onCancel, onSubmit, form }: TaskFormModalProps) {
  useEffect(() => {
    if (!open) return;
    if (task) {
      form.setFieldsValue({
        id: task.id,
        name: task.name,
        description: task.description,
        deadline: moment(task.deadline),
        priority: task.priority,
        tags: task.tags ?? [],
        status: task.status,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        status: 'todo',
        tags: [],
        priority: 'Trung bình',
        deadline: moment().add(1, 'day'),
      });
    }
  }, [open, task, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  return (
    <Modal
      title={task ? 'Chỉnh sửa task' : 'Thêm task'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText='Lưu'
      cancelText='Hủy'
      destroyOnClose
      width={560}
    >
      <Form<FormSubmitValues> form={form} layout='vertical' preserve={false}>
        <Form.Item name='id' hidden>
          <Input type='hidden' />
        </Form.Item>
        <Form.Item name='name' label='Tên task' rules={[{ required: true, message: 'Nhập tên task' }]}>
          <Input placeholder='Tên công việc' maxLength={200} />
        </Form.Item>
        <Form.Item name='description' label='Mô tả'>
          <Input.TextArea rows={3} placeholder='Mô tả ngắn' />
        </Form.Item>
        <Form.Item name='deadline' label='Deadline' rules={[{ required: true, message: 'Chọn deadline' }]}>
          <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item name='priority' label='Mức độ ưu tiên' rules={[{ required: true }]}>
          <Select options={priorityOptions.map((p) => ({ label: p, value: p }))} />
        </Form.Item>
        <Form.Item name='tags' label='Tag'>
          <Select mode='tags' placeholder='Nhập tag, Enter để thêm' tokenSeparators={[',']} />
        </Form.Item>
        <Form.Item name='status' label='Trạng thái' rules={[{ required: true }]}>
          <Select
            options={taskStatusOptions.map((s) => ({
              label: TASK_STATUS_LABEL[s],
              value: s,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
