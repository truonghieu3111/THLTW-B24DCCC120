import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table, Tag } from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';

import type { TaskItem, TaskStatus } from '../data/types';
import { TASK_STATUS_LABEL } from '../data/types';
import { filterTasksForTable, isOverdueTask } from '../logic/logic';

interface TaskListTabProps {
  tasks: TaskItem[];
  onEditTask: (task: TaskItem) => void;
  onAddTask: () => void;
}

export default function TaskListTab({ tasks, onEditTask, onAddTask }: TaskListTabProps) {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const dataSource = useMemo(
    () => filterTasksForTable(tasks, { status: statusFilter, search }),
    [tasks, statusFilter, search],
  );

  return (
    <>
      <Space style={{ marginBottom: 12 }} wrap>
        <Input.Search
          allowClear
          placeholder='Tìm theo tên task'
          style={{ width: 260 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select<TaskStatus | 'all'> value={statusFilter} onChange={setStatusFilter} style={{ width: 200 }}>
          <Select.Option value='all'>Tất cả trạng thái</Select.Option>
          <Select.Option value='todo'>{TASK_STATUS_LABEL.todo}</Select.Option>
          <Select.Option value='in_progress'>{TASK_STATUS_LABEL.in_progress}</Select.Option>
          <Select.Option value='done'>{TASK_STATUS_LABEL.done}</Select.Option>
        </Select>
        <Button type='primary' icon={<PlusOutlined />} onClick={onAddTask}>
          Thêm task
        </Button>
      </Space>

      <Table<TaskItem>
        rowKey='id'
        dataSource={dataSource}
        pagination={{ pageSize: 8 }}
        columns={[
          {
            title: 'Tên task',
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: 'Deadline',
            dataIndex: 'deadline',
            sorter: (a, b) => moment(a.deadline).valueOf() - moment(b.deadline).valueOf(),
            defaultSortOrder: 'ascend',
            render: (d: string, record) => (
              <Space>
                {moment(d).format('DD/MM/YYYY')}
                {isOverdueTask(record) ? <Tag color='red'>Quá hạn</Tag> : null}
              </Space>
            ),
          },
          {
            title: 'Ưu tiên',
            dataIndex: 'priority',
            width: 120,
            render: (p: TaskItem['priority']) => {
              const color = p === 'Cao' ? 'red' : p === 'Trung bình' ? 'gold' : 'default';
              return <Tag color={color}>{p}</Tag>;
            },
          },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 130,
            render: (s: TaskStatus) => <Tag>{TASK_STATUS_LABEL[s]}</Tag>,
          },
          {
            title: 'Tag',
            dataIndex: 'tags',
            render: (tags: string[]) =>
              (tags ?? []).map((t) => (
                <Tag key={t} color='blue'>
                  {t}
                </Tag>
              )),
          },
          {
            title: '',
            key: 'actions',
            width: 100,
            render: (_, record) => (
              <Button type='link' icon={<EditOutlined />} onClick={() => onEditTask(record)}>
                Sửa
              </Button>
            ),
          },
        ]}
      />
    </>
  );
}
