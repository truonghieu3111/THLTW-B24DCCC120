import { Col, Input, Row, Select, Space } from 'antd';
import { INSTRUCTORS } from '../data/instructors';
import { COURSE_STATUS_OPTIONS } from '../data/types';
import type { CourseStatus } from '../data/types';
import type { FilterState, SortStudents } from '../logic/logic';

const { Search } = Input;

type Props = {
  filter: FilterState;
  onChange: (next: FilterState) => void;
};

export default function CourseToolbar({ filter, onChange }: Props) {
  const patch = (partial: Partial<FilterState>) =>
    onChange({ ...filter, ...partial });

  return (
    <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
      <Col xs={24} md={8}>
        <Search
          allowClear
          placeholder="Tìm kiếm theo tên khóa học"
          value={filter.search}
          onChange={(e) => patch({ search: e.target.value })}
        />
      </Col>
      <Col xs={24} md={5}>
        <Select
          style={{ width: '100%' }}
          placeholder="Lọc giảng viên"
          value={filter.instructorId}
          onChange={(v) => patch({ instructorId: v })}
        >
          <Select.Option value="all">Tất cả giảng viên</Select.Option>
          {INSTRUCTORS.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} md={5}>
        <Select
          style={{ width: '100%' }}
          placeholder="Lọc trạng thái"
          value={filter.status}
          onChange={(v) => patch({ status: v as CourseStatus | 'all' })}
        >
          <Select.Option value="all">Tất cả trạng thái</Select.Option>
          {COURSE_STATUS_OPTIONS.map((o) => (
            <Select.Option key={o.value} value={o.value}>
              {o.label}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} md={6}>
        <Space>
          <span>Sắp xếp theo số học viên:</span>
          <Select
            style={{ minWidth: 160 }}
            value={filter.sortStudents}
            onChange={(v: SortStudents) => patch({ sortStudents: v })}
          >
            <Select.Option value="none">Mặc định</Select.Option>
            <Select.Option value="asc">Tăng dần</Select.Option>
            <Select.Option value="desc">Giảm dần</Select.Option>
          </Select>
        </Space>
      </Col>
    </Row>
  );
}
