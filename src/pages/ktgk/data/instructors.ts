import type { Instructor } from './types';

/** Danh sách giảng viên  */
export const INSTRUCTORS: Instructor[] = [
  { id: 'gv1', name: 'Nguyễn Văn A' },
  { id: 'gv2', name: 'Trần Thị B' },
  { id: 'gv3', name: 'Lê Văn C' },
  { id: 'gv4', name: 'Phạm Thị D' },
];

export function getInstructorName(id: string): string {
  return INSTRUCTORS.find((i) => i.id === id)?.name ?? id;
}
