import { Card, Form, Tabs, Typography, message } from 'antd';
import { useState } from 'react';

import DashboardTab from './controllers/dashboardTab';
import KanbanBoardTab from './controllers/kanbanBoardTab';
import TaskFormModal from './controllers/taskFormModal';
import TaskListTab from './controllers/taskListTab';
import { loadTasks, saveTasks } from './data/storage';
import type { TaskItem } from './data/types';
import type { FormSubmitValues } from './logic/logic';
import { upsertTaskFromForm } from './logic/logic';

export default function Thuchanh9Page() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadTasks());
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TaskItem | null>(null);
  const [form] = Form.useForm<FormSubmitValues>();

  const updateTasks = (next: TaskItem[]) => {
    setTasks(next);
    saveTasks(next);
  };

  const handleSubmitForm = (values: FormSubmitValues) => {
    updateTasks(upsertTaskFromForm(tasks, values));
    message.success(editing ? 'Đã cập nhật task' : 'Đã thêm task');
    setFormOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (task: TaskItem) => {
    setEditing(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={3}>Theo dõi công việc cá nhân (Kanban)</Typography.Title>
      <Card>
        <Tabs defaultActiveKey='dashboard'>
          <Tabs.TabPane tab='Dashboard' key='dashboard'>
            <DashboardTab tasks={tasks} />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Kanban Board' key='kanban'>
            <KanbanBoardTab tasks={tasks} onChange={updateTasks} onAddTask={openAdd} onEditTask={openEdit} />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Danh sách task' key='list'>
            <TaskListTab tasks={tasks} onAddTask={openAdd} onEditTask={openEdit} />
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <TaskFormModal open={formOpen} task={editing} onCancel={closeForm} onSubmit={handleSubmitForm} form={form} />
    </div>
  );
}
