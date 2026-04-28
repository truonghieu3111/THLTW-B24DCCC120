import moment from 'moment';

import type { GoalItem, HealthLog, WorkoutLog } from '../data/types';

export const computeBmi = (weight: number, heightCm: number) => weight / ((heightCm / 100) * (heightCm / 100));

export const getBmiTag = (bmi: number) => {
  if (bmi < 18.5) return { label: 'Thiếu cân', color: 'blue' };
  if (bmi < 25) return { label: 'Bình thường', color: 'green' };
  if (bmi < 30) return { label: 'Thừa cân', color: 'gold' };
  return { label: 'Béo phì', color: 'red' };
};

export const calculateGoalProgressPercent = (goal: GoalItem) =>
  Math.min(Math.round((goal.currentValue / Math.max(goal.targetValue, 1)) * 100), 100);

export const buildDashboardStats = (workouts: WorkoutLog[], goals: GoalItem[]) => {
  const now = moment();
  const currentMonthWorkouts = workouts.filter((item) => moment(item.date).isSame(now, 'month') && item.status === 'completed');
  const totalSessions = currentMonthWorkouts.length;
  const totalCalories = currentMonthWorkouts.reduce((sum, item) => sum + item.calories, 0);
  const totalGoalProgress =
    goals.length === 0
      ? 0
      : Math.round(goals.reduce((sum, goal) => sum + calculateGoalProgressPercent(goal), 0) / goals.length);

  const completedSet = new Set(workouts.filter((w) => w.status === 'completed').map((w) => w.date));
  let streak = 0;
  let cursor = moment().startOf('day');
  while (completedSet.has(cursor.format('YYYY-MM-DD'))) {
    streak += 1;
    cursor = cursor.subtract(1, 'day');
  }

  return { totalSessions, totalCalories, totalGoalProgress, streak, currentMonthWorkouts };
};

export const buildWeeklyWorkoutChart = (currentMonthWorkouts: WorkoutLog[]) => {
  const totalWeeks = Math.ceil(moment().daysInMonth() / 7);
  const buckets = new Array(totalWeeks).fill(0);
  currentMonthWorkouts.forEach((item) => {
    const day = moment(item.date).date();
    const weekIndex = Math.floor((day - 1) / 7);
    buckets[weekIndex] += 1;
  });
  return {
    xAxis: buckets.map((_, idx) => `Tuần ${idx + 1}`),
    yAxis: [buckets],
  };
};

export const buildWeightChart = (healthLogs: HealthLog[]) => {
  const sorted = [...healthLogs].sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());
  return {
    xAxis: sorted.map((item) => moment(item.date).format('DD/MM')),
    yAxis: [sorted.map((item) => item.weight)],
  };
};

export const getRecentWorkouts = (workouts: WorkoutLog[]) =>
  [...workouts].sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()).slice(0, 5);
