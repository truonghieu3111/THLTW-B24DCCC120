import { Form, Input, InputNumber, Modal, Select, message } from 'antd';
import { useEffect } from 'react';
import { INSTRUCTORS } from '../data/instructors';
import { isCourseNameTaken } from '../logic/logic';
import type { Course } from '../data/types';
import { COURSE_STATUS_OPTIONS } from '../data/types';

type Props = {
  open: boolean;
  courses: Course[];
  editing: Course | null;
  onCancel: () => void;
  onSubmit: (values: Omit<Course, 'id'> & { id?: number }) => void;
};

export default function CourseFormModal({
  open,
  courses,
  editing,
  onCancel,
  onSubmit,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;
    if (editing) {
      form.setFieldsValue({
        name: editing.name,
        instructorId: editing.instructorId,
        students: editing.students,
        descriptionHtml: editing.descriptionHtml,
        status: editing.status,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        students: 0,
        status: 'open',
      });
    }
  }, [open, editing, form]);

  const handleOk = async () => {
    try {
      const v = await form.validateFields();
      const excludeId = editing?.id;
      if (isCourseNameTaken(courses, v.name, excludeId)) {
        message.error('Tên khóa học đã tồn tại, vui lòng chọn tên khác.');
        return;
      }
      onSubmit({
        ...(editing ? { id: editing.id } : {}),
        name: v.name.trim(),
        instructorId: v.instructorId,
        students: Number(v.students),
        descriptionHtml: v.descriptionHtml.trim(),
        status: v.status,
      });
      form.resetFields();
    } catch {
      
    }
  };

  return (
    <Modal
      title={editing ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
      visible={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText={editing ? 'Cập nhật' : 'Thêm'}
      width={640}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên khóa học"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên khóa học' },
            { whitespace: true, message: 'Tên không được chỉ gồm khoảng trắng' },
            { max: 100, message: 'Tối đa 100 ký tự' },
          ]}
        >
          <Input placeholder="Tối đa 100 ký tự" maxLength={100} showCount />
        </Form.Item>

        <Form.Item
          label="Giảng viên"
          name="instructorId"
          rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
        >
          <Select placeholder="Chọn giảng viên">
            {INSTRUCTORS.map((i) => (
              <Select.Option key={i.id} value={i.id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Số lượng học viên"
          name="students"
          rules={[
            { required: true, message: 'Vui lòng nhập số học viên' },
            {
              type: 'number',
              min: 0,
              message: 'Số học viên phải ≥ 0',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} min={0} precision={0} />
        </Form.Item>

        <Form.Item
          label="Mô tả khóa học(HTML)"
          name="descriptionHtml"
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả' },
            { whitespace: true, message: 'Mô tả không được chỉ gồm khoảng trắng' },
          ]}
        >
          <Input.TextArea
            rows={5}
            placeholder="<p>Nội dung khóa học...</p>"
          />
        </Form.Item>

        <Form.Item
          label="Trạng thái khóa học"
          name="status"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select>
            {COURSE_STATUS_OPTIONS.map((o) => (
              <Select.Option key={o.value} value={o.value}>
                {o.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
