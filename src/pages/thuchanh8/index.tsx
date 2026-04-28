import { Card, Tabs, Typography } from 'antd';
import { useState } from 'react';

import DashboardTab from './controllers/dashboardTab';
import ExerciseLibraryTab from './controllers/exerciseLibraryTab';
import GoalsTab from './controllers/goalsTab';
import HealthLogTab from './controllers/healthLogTab';
import WorkoutLogTab from './controllers/workoutLogTab';
import { loadExercises, loadGoals, loadHealthLogs, loadWorkouts, saveExercises, saveGoals, saveHealthLogs, saveWorkouts } from './data/storage';
import type { ExerciseItem, GoalItem, HealthLog, WorkoutLog } from './data/types';

export default function Thuchanh8Page() {
  const [workouts, setWorkouts] = useState<WorkoutLog[]>(() => loadWorkouts());
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>(() => loadHealthLogs());
  const [goals, setGoalsState] = useState<GoalItem[]>(() => loadGoals());
  const [exercises, setExercisesState] = useState<ExerciseItem[]>(() => loadExercises());

  const updateWorkouts = (next: WorkoutLog[]) => {
    setWorkouts(next);
    saveWorkouts(next);
  };
  const updateHealthLogs = (next: HealthLog[]) => {
    setHealthLogs(next);
    saveHealthLogs(next);
  };
  const updateGoals = (next: GoalItem[]) => {
    setGoalsState(next);
    saveGoals(next);
  };
  const updateExercises = (next: ExerciseItem[]) => {
    setExercisesState(next);
    saveExercises(next);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={3}>Ứng dụng thể dục - theo dõi sức khỏe</Typography.Title>
      <Card>
        <Tabs defaultActiveKey='dashboard'>
          <Tabs.TabPane tab='Dashboard' key='dashboard'>
            <DashboardTab workouts={workouts} healthLogs={healthLogs} goals={goals} />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Nhật ký tập luyện' key='workout'>
            <WorkoutLogTab workouts={workouts} onChange={updateWorkouts} />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Nhật ký chỉ số sức khỏe' key='health'>
            <HealthLogTab healthLogs={healthLogs} onChange={updateHealthLogs} />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Quản lý mục tiêu' key='goal'>
            <GoalsTab goals={goals} onChange={updateGoals} />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Thư viện bài tập' key='library'>
            <ExerciseLibraryTab exercises={exercises} onChange={updateExercises} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
