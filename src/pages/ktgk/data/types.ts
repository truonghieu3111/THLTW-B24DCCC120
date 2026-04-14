/** Trạng thái khóa học (enum theo đề bài) */
export type CourseStatus = 'open' | 'ended' | 'paused';

export const COURSE_STATUS_OPTIONS: { value: CourseStatus; label: string }[] = [
  { value: 'open', label: 'Đang mở' },
  { value: 'ended', label: 'Đã kết thúc' },
  { value: 'paused', label: 'Tạm dừng' },
];

export function getStatusLabel(status: CourseStatus): string {
  return COURSE_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export type Course = {
  id: number;
  name: string;
  instructorId: string;
  students: number;
  descriptionHtml: string;
  status: CourseStatus;
};

export type Instructor = { id: string; name: string };
