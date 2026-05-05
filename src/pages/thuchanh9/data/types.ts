export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'Cao' | 'Trung bình' | 'Thấp';

export interface TaskItem {
  id: number;
  name: string;
  description: string;
  deadline: string;
  priority: TaskPriority;
  tags: string[];
  status: TaskStatus;
  /** Thứ tự trong cột Kanban */
  order: number;
}

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'Cần làm',
  in_progress: 'Đang làm',
  done: 'Hoàn thành',
};

export const taskStatusOptions: TaskStatus[] = ['todo', 'in_progress', 'done'];
export const priorityOptions: TaskPriority[] = ['Cao', 'Trung bình', 'Thấp'];
