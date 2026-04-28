import { Button, Card, DatePicker, Drawer, Form, Input, InputNumber, Popconfirm, Progress, Row, Segmented, Select, Space, Tag, Typography, Col, message } from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';

import type { GoalItem } from '../data/types';
import { goalStatusOptions, goalTypeOptions } from '../data/types';
import { calculateGoalProgressPercent } from '../logic/logic';

interface GoalsTabProps {
  goals: GoalItem[];
  onChange: (next: GoalItem[]) => void;
}

export default function GoalsTab({ goals, onChange }: GoalsTabProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<GoalItem | null>(null);
  const [filter, setFilter] = useState<string>('Tất cả');
  const [form] = Form.useForm();

  const filteredGoals = useMemo(
    () => goals.filter((goal) => (filter === 'Tất cả' ? true : goal.status === filter)),
    [filter, goals],
  );

  const openDrawer = (goal?: GoalItem) => {
    if (goal) {
      setEditing(goal);
      form.setFieldsValue({ ...goal, deadline: moment(goal.deadline) });
    } else {
      setEditing(null);
      form.resetFields();
      form.setFieldsValue({ status: 'Đang thực hiện' });
    }
    setDrawerOpen(true);
  };

  return (
    <>
      <Space style={{ marginBottom: 12 }} wrap>
        <Segmented value={filter} onChange={(value) => setFilter(String(value))} options={['Tất cả', ...goalStatusOptions]} />
        <Button type='primary' onClick={() => openDrawer()}>
          Thêm mục tiêu
        </Button>
      </Space>

      <Row gutter={[16, 16]}>
        {filteredGoals.map((goal) => {
          const progressPercent = calculateGoalProgressPercent(goal);
          return (
            <Col xs={24} md={12} xl={8} key={goal.id}>
              <Card
                title={goal.name}
                extra={<Tag color={goal.status === 'Đã đạt' ? 'green' : goal.status === 'Đã hủy' ? 'red' : 'blue'}>{goal.status}</Tag>}
                actions={[
                  <Button key='edit' type='link' onClick={() => openDrawer(goal)}>
                    Sửa
                  </Button>,
                  <Popconfirm
                    key='delete'
                    title='Bạn chắc chắn muốn xóa mục tiêu này?'
                    onConfirm={() => {
                      onChange(goals.filter((item) => item.id !== goal.id));
                      message.success('Đã xóa mục tiêu');
                    }}
                  >
                    <Button type='link' danger>
                      Xóa
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Loại: {goal.type}</Typography.Text>
                  <Typography.Text>Mục tiêu: {goal.targetValue}</Typography.Text>
                  <Space>
                    <Typography.Text>Giá trị hiện tại:</Typography.Text>
                    <InputNumber
                      min={0}
                      value={goal.currentValue}
                      onChange={(value) => {
                        const nextValue = Number(value || 0);
                        const nextStatus = nextValue >= goal.targetValue ? 'Đã đạt' : goal.status === 'Đã đạt' ? 'Đang thực hiện' : goal.status;
                        onChange(goals.map((item) => (item.id === goal.id ? { ...item, currentValue: nextValue, status: nextStatus } : item)));
                      }}
                    />
                  </Space>
                  <Progress percent={progressPercent} />
                  <Typography.Text>Deadline: {moment(goal.deadline).format('DD/MM/YYYY')}</Typography.Text>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Drawer title={editing ? 'Sửa mục tiêu' : 'Thêm mục tiêu mới'} visible={drawerOpen} width={420} onClose={() => setDrawerOpen(false)} destroyOnClose>
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            const payload: GoalItem = {
              id: editing?.id ?? Date.now(),
              name: values.name,
              type: values.type,
              targetValue: values.targetValue,
              currentValue: values.currentValue,
              deadline: values.deadline.format('YYYY-MM-DD'),
              status: values.status,
            };
            onChange(editing ? goals.map((item) => (item.id === editing.id ? payload : item)) : [payload, ...goals]);
            setDrawerOpen(false);
            message.success(editing ? 'Đã cập nhật mục tiêu' : 'Đã thêm mục tiêu');
          }}
        >
          <Form.Item name='name' label='Tên mục tiêu' rules={[{ required: true, message: 'Vui lòng nhập tên mục tiêu' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='type' label='Loại' rules={[{ required: true, message: 'Vui lòng chọn loại mục tiêu' }]}>
            <Select options={goalTypeOptions.map((item) => ({ value: item, label: item }))} />
          </Form.Item>
          <Form.Item name='targetValue' label='Giá trị mục tiêu' rules={[{ required: true, message: 'Vui lòng nhập giá trị mục tiêu' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='currentValue' label='Giá trị hiện tại' rules={[{ required: true, message: 'Vui lòng nhập giá trị hiện tại' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='deadline' label='Deadline' rules={[{ required: true, message: 'Vui lòng chọn deadline' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
            <Select options={goalStatusOptions.map((item) => ({ value: item, label: item }))} />
          </Form.Item>
          <Button type='primary' htmlType='submit' block>
            {editing ? 'Lưu cập nhật' : 'Tạo mục tiêu'}
          </Button>
        </Form>
      </Drawer>
    </>
  );
}
