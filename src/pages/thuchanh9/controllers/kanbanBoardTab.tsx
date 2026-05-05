import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import { DragDropContext, Draggable, Droppable, type DropResult } from 'react-beautiful-dnd';

import type { TaskItem, TaskStatus } from '../data/types';
import { TASK_STATUS_LABEL } from '../data/types';
import { applyDragResult } from '../logic/logic';

const COLUMNS: TaskStatus[] = ['todo', 'in_progress', 'done'];

const priorityColor: Record<TaskItem['priority'], string> = {
  Cao: 'red',
  'Trung bình': 'gold',
  Thấp: 'default',
};

interface KanbanBoardTabProps {
  tasks: TaskItem[];
  onChange: (next: TaskItem[]) => void;
  onAddTask: () => void;
  onEditTask: (task: TaskItem) => void;
}

export default function KanbanBoardTab({ tasks, onChange, onAddTask, onEditTask }: KanbanBoardTabProps) {
  const onDragEnd = (result: DropResult) => {
    onChange(applyDragResult(tasks, result));
  };

  const columnTasks = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status).sort((a, b) => a.order - b.order);

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Button type='primary' icon={<PlusOutlined />} onClick={onAddTask}>
          Thêm task
        </Button>
      </Space>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {COLUMNS.map((colId) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    flex: '1 1 260px',
                    minWidth: 240,
                    minHeight: 280,
                    padding: 8,
                    background: snapshot.isDraggingOver ? '#e6f7ff' : '#fafafa',
                    borderRadius: 8,
                    border: '1px solid #f0f0f0',
                  }}
                >
                  <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 12 }}>
                    {TASK_STATUS_LABEL[colId]}
                  </Typography.Title>
                  {columnTasks(colId).map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          style={{
                            ...dragProvided.draggableProps.style,
                            marginBottom: 8,
                            opacity: dragSnapshot.isDragging ? 0.85 : 1,
                          }}
                        >
                          <Card
                            size='small'
                            title={
                              <Typography.Text ellipsis style={{ maxWidth: 180 }}>
                                {task.name}
                              </Typography.Text>
                            }
                            extra={
                              <Button type='link' size='small' onClick={() => onEditTask(task)}>
                                Sửa
                              </Button>
                            }
                          >
                            <Space direction='vertical' size={4} style={{ width: '100%' }}>
                              <Typography.Paragraph type='secondary' ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                                {task.description || '—'}
                              </Typography.Paragraph>
                              <div>
                                <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
                                <Tag>{moment(task.deadline).format('DD/MM/YYYY')}</Tag>
                              </div>
                              <div>
                                {(task.tags ?? []).map((tag) => (
                                  <Tag key={tag} color='blue'>
                                    {tag}
                                  </Tag>
                                ))}
                              </div>
                            </Space>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
