import type { TaskItem } from './types';

const TASK_KEY = 'thuchanh9_tasks';

const defaultTasks: TaskItem[] = [
  {
    id: 1,
    name: 'Thiết kế giao diện Dashboard',
    description: 'Wireframe và palette màu.',
    deadline: '2026-05-10',
    priority: 'Cao',
    tags: ['UI', 'Quan trọng'],
    status: 'todo',
    order: 0,
  },
  {
    id: 2,
    name: 'Viết tài liệu API',
    description: 'Mô tả endpoint cho mobile.',
    deadline: '2026-05-08',
    priority: 'Trung bình',
    tags: ['Docs'],
    status: 'todo',
    order: 1,
  },
  {
    id: 3,
    name: 'Tích hợp Kanban kéo thả',
    description: 'Dùng react-beautiful-dnd.',
    deadline: '2026-05-06',
    priority: 'Cao',
    tags: ['Frontend'],
    status: 'in_progress',
    order: 0,
  },
  {
    id: 4,
    name: 'Bảng danh sách task',
    description: 'Table Ant Design + lọc.',
    deadline: '2026-05-04',
    priority: 'Thấp',
    tags: ['Ant Design'],
    status: 'in_progress',
    order: 1,
  },
  {
    id: 5,
    name: 'Cấu hình localStorage',
    description: 'Persist và seed dữ liệu.',
    deadline: '2026-05-03',
    priority: 'Trung bình',
    tags: ['Storage'],
    status: 'done',
    order: 0,
  },
];

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/** Chuẩn hóa order theo từng cột sau khi load (phòng dữ liệu cũ thiếu order). */
export const normalizeTaskOrders = (tasks: TaskItem[]): TaskItem[] => {
  const cols = ['todo', 'in_progress', 'done'] as const;
  const next: TaskItem[] = [];
  cols.forEach((status) => {
    const group = tasks
      .filter((t) => t.status === status)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    group.forEach((t, i) => next.push({ ...t, order: i }));
  });
  return next;
};

export const loadTasks = (): TaskItem[] => {
  const raw = readStorage<TaskItem[]>(TASK_KEY, defaultTasks);
  const merged = raw.length ? raw : defaultTasks;
  return normalizeTaskOrders(merged);
};

export const saveTasks = (value: TaskItem[]) => writeStorage(TASK_KEY, normalizeTaskOrders(value));
