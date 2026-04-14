import type { Course, CourseStatus } from '../data/types';

export type SortStudents = 'none' | 'asc' | 'desc';

export type FilterState = {
  search: string;
  instructorId: string | 'all';
  status: CourseStatus | 'all';
  sortStudents: SortStudents;
};

export function applyCourseFilters(courses: Course[], f: FilterState): Course[] {
  let list = [...courses];

  const q = f.search.trim().toLowerCase();
  if (q) {
    list = list.filter((c) => c.name.toLowerCase().includes(q));
  }

  if (f.instructorId !== 'all') {
    list = list.filter((c) => c.instructorId === f.instructorId);
  }

  if (f.status !== 'all') {
    list = list.filter((c) => c.status === f.status);
  }

  if (f.sortStudents === 'asc') {
    list.sort((a, b) => a.students - b.students);
  } else if (f.sortStudents === 'desc') {
    list.sort((a, b) => b.students - a.students);
  }

  return list;
}


export function isCourseNameTaken(
  courses: Course[],
  name: string,
  excludeId?: number,
): boolean {
  const n = name.trim().toLowerCase();
  return courses.some(
    (c) =>
      c.id !== excludeId && c.name.trim().toLowerCase() === n,
  );
}
