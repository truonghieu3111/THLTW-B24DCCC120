import { Button, Modal, Popover, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getInstructorName } from '../data/instructors';
import type { Course, CourseStatus } from '../data/types';
import { getStatusLabel } from '../data/types';

const { Text } = Typography;

function statusColor(s: CourseStatus): string {
  if (s === 'open') return 'green';
  if (s === 'paused') return 'orange';
  return 'default';
}

type Props = {
  data: Course[];
  onEdit: (c: Course) => void;
  onDelete: (c: Course) => void;
};

export default function CourseTable({ data, onEdit, onDelete }: Props) {
  const confirmDelete = (c: Course) => {
    if (c.students > 0) {
      Modal.warning({
        title: 'Không thể xóa',
        content: `Khóa học "${c.name}" đang có ${c.students} học viên. Chỉ xóa được khóa học chưa có học viên.`,
      });
      return;
    }
    Modal.confirm({
      title: 'Xác nhận xóa khóa học',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc muốn xóa "${c.name}"? Thao tác không thể hoàn tác.`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => onDelete(c),
    });
  };

  const columns: ColumnsType<Course> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 72,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'Giảng viên',
      dataIndex: 'instructorId',
      render: (id: string) => getInstructorName(id),
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'students',
      width: 140,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 130,
      render: (s: CourseStatus) => (
        <Tag color={statusColor(s)}>{getStatusLabel(s)}</Tag>
      ),
    },
    {
      title: 'Mô tả khóa học(HTML)',
      dataIndex: 'descriptionHtml',
      ellipsis: true,
      render: (html: string) => (
        <Popover
          content={
            <div
              style={{ maxWidth: 360, maxHeight: 240, overflow: 'auto' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          }
          title="Xem trước HTML"
          trigger="click"
        >
          <Text type="secondary" style={{ cursor: 'pointer' }}>
            Xem nội dung
          </Text>
        </Popover>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space>
          <Button size="small" type="link" onClick={() => onEdit(record)}>
            Sửa
          </Button>
          <Button
            size="small"
            danger
            type="link"
            disabled={record.students > 0}
            onClick={() => confirmDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table<Course>
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 8, showSizeChanger: true }}
    />
  );
}
