import type { Moment } from 'moment';
import moment from 'moment';
import type { DropResult } from 'react-beautiful-dnd';

import type { TaskItem, TaskStatus } from '../data/types';

export const nextTaskId = (tasks: TaskItem[]) =>
  tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;

const isOverdueTask = (t: TaskItem) => {
  if (t.status === 'done') return false;
  return moment(t.deadline).endOf('day').isBefore(moment());
};

export interface DashboardTaskStats {
  total: number;
  completed: number;
  overdue: number;
}

export const getDashboardStats = (tasks: TaskItem[]): DashboardTaskStats => ({
  total: tasks.length,
  completed: tasks.filter((t) => t.status === 'done').length,
  overdue: tasks.filter(isOverdueTask).length,
});

export { isOverdueTask };

/** Kéo thả Kanban: cập nhật status + order trong từng cột. */
export const applyDragResult = (tasks: TaskItem[], result: DropResult): TaskItem[] => {
  const { destination, source, draggableId } = result;
  if (!destination) return tasks;

  const taskId = Number(draggableId);
  const sourceCol = source.droppableId as TaskStatus;
  const destCol = destination.droppableId as TaskStatus;

  const group = (s: TaskStatus) =>
    tasks.filter((t) => t.status === s).sort((a, b) => a.order - b.order);

  if (sourceCol === destCol) {
    const col = [...group(sourceCol)];
    const [item] = col.splice(source.index, 1);
    if (!item || item.id !== taskId) return tasks;
    col.splice(destination.index, 0, item);
    const renumbered = col.map((t, i) => ({ ...t, order: i }));
    const rest = tasks.filter((t) => t.status !== sourceCol);
    return [...rest, ...renumbered];
  }

  const src = [...group(sourceCol)];
  const dst = [...group(destCol)];
  const [item] = src.splice(source.index, 1);
  if (!item || item.id !== taskId) return tasks;
  dst.splice(destination.index, 0, { ...item, status: destCol });

  const renumberedSrc = src.map((t, i) => ({ ...t, order: i }));
  const renumberedDst = dst.map((t, i) => ({ ...t, status: destCol, order: i }));
  const rest = tasks.filter((t) => t.status !== sourceCol && t.status !== destCol);
  return [...rest, ...renumberedSrc, ...renumberedDst];
};

export type FormSubmitValues = {
  /** Có khi chỉnh sửa */
  id?: number;
  name: string;
  description: string;
  deadline: Moment;
  priority: TaskItem['priority'];
  tags: string[];
  status: TaskStatus;
};

export const upsertTaskFromForm = (tasks: TaskItem[], values: FormSubmitValues): TaskItem[] => {
  const deadline = values.deadline.format('YYYY-MM-DD');
  if (values.id) {
    const existing = tasks.find((t) => t.id === values.id);
    if (!existing) return tasks;
    const statusChanged = existing.status !== values.status;
    let order = existing.order;
    if (statusChanged) {
      const col = tasks.filter((t) => t.status === values.status && t.id !== values.id);
      order = col.length ? Math.max(...col.map((t) => t.order)) + 1 : 0;
    }
    return tasks.map((t) =>
      t.id === values.id
        ? {
            ...t,
            name: values.name,
            description: values.description,
            deadline,
            priority: values.priority,
            tags: values.tags ?? [],
            status: values.status,
            order,
          }
        : t,
    );
  }
  const col = tasks.filter((t) => t.status === values.status);
  const order = col.length ? Math.max(...col.map((t) => t.order)) + 1 : 0;
  return [
    ...tasks,
    {
      id: nextTaskId(tasks),
      name: values.name,
      description: values.description,
      deadline,
      priority: values.priority,
      tags: values.tags ?? [],
      status: values.status,
      order,
    },
  ];
};

export type TableFilter = {
  status: TaskStatus | 'all';
  search: string;
};

export const filterTasksForTable = (tasks: TaskItem[], filter: TableFilter) => {
  let list = [...tasks];
  if (filter.status !== 'all') {
    list = list.filter((t) => t.status === filter.status);
  }
  const q = filter.search.trim().toLowerCase();
  if (q) {
    list = list.filter((t) => t.name.toLowerCase().includes(q));
  }
  return list;
};
