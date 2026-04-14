import type { Course } from './types';

export const STORAGE_KEY = 'ktgk_courses';

export const defaultCourses: Course[] = [
  {
    id: 1,
    name: 'Lập trình Web với React',
    instructorId: 'gv1',
    students: 32,
    descriptionHtml: '<p>Khóa học <strong>React</strong> từ cơ bản đến nâng cao.</p>',
    status: 'open',
  },
  {
    id: 2,
    name: 'Cơ sở dữ liệu',
    instructorId: 'gv2',
    students: 0,
    descriptionHtml: '<p>SQL, thiết kế CSDL quan hệ.</p>',
    status: 'paused',
  },
  {
    id: 3,
    name: 'Lập trình hướng đối tượng',
    instructorId: 'gv3',
    students: 18,
    descriptionHtml: '<p>OOP với Java.</p>',
    status: 'ended',
  },
];

export function loadCourses(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Course[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
   
  }
  return defaultCourses;
}

export function saveCourses(list: Course[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
