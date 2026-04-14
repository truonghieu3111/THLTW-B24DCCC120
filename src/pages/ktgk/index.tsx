import { Button, Card, message, Typography } from 'antd';
import { useMemo, useState } from 'react';

import CourseFormModal from './controllers/courseFormModal';
import CourseTable from './controllers/courseTable';
import CourseToolbar from './controllers/courseToolbar';
import { loadCourses, saveCourses } from './data/storage';
import type { Course } from './data/types';
import { applyCourseFilters, type FilterState } from './logic/logic';

import './style/style.css';

const { Title } = Typography;

const initialFilter: FilterState = {
  search: '',
  instructorId: 'all',
  status: 'all',
  sortStudents: 'none',
};

export default function KtgkPage() {
  const [courses, setCourses] = useState<Course[]>(() => loadCourses());
  const [filter, setFilter] = useState<FilterState>(initialFilter);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);

  const displayed = useMemo(
    () => applyCourseFilters(courses, filter),
    [courses, filter],
  );

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (c: Course) => {
    setEditing(c);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = (
    payload: Omit<Course, 'id'> & { id?: number },
  ) => {
    setCourses((prev) => {
      let next: Course[];
      if (payload.id != null) {
        next = prev.map((c) =>
          c.id === payload.id
            ? {
                ...c,
                name: payload.name,
                instructorId: payload.instructorId,
                students: payload.students,
                descriptionHtml: payload.descriptionHtml,
                status: payload.status,
              }
            : c,
        );
      } else {
        const newCourse: Course = {
          id: Date.now(),
          name: payload.name,
          instructorId: payload.instructorId,
          students: payload.students,
          descriptionHtml: payload.descriptionHtml,
          status: payload.status,
        };
        next = [newCourse, ...prev];
      }
      saveCourses(next);
      return next;
    });
    message.success(payload.id ? 'Đã cập nhật khóa học.' : 'Đã thêm khóa học mới.');
    closeModal();
  };

  const handleDelete = (c: Course) => {
    setCourses((prev) => {
      const next = prev.filter((x) => x.id !== c.id);
      saveCourses(next);
      return next;
    });
    message.success('Đã xóa khóa học.');
  };

  return (
    <div className="ktgk-page" style={{ padding: 16 }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Quản lý khóa học online
      </Title>

      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 8,
          }}
        >
          <span style={{ color: '#666' }}>
            Danh sách khóa học: tìm kiếm, lọc, sắp xếp theo số học viên
          </span>
          <Button type="primary" onClick={openAdd}>
            Thêm khóa học
          </Button>
        </div>

        <CourseToolbar filter={filter} onChange={setFilter} />
        <CourseTable data={displayed} onEdit={openEdit} onDelete={handleDelete} />
      </Card>

      <CourseFormModal
        open={modalOpen}
        courses={courses}
        editing={editing}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
