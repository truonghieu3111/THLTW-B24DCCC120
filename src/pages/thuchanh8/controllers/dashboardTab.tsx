import { Card, Col, Row, Statistic, Timeline } from 'antd';
import { useMemo } from 'react';
import moment from 'moment';

import ColumnChart from '@/components/Chart/ColumnChart';
import LineChart from '@/components/Chart/LineChart';
import type { GoalItem, HealthLog, WorkoutLog } from '../data/types';
import { buildDashboardStats, buildWeeklyWorkoutChart, buildWeightChart, getRecentWorkouts } from '../logic/logic';

interface DashboardTabProps {
  workouts: WorkoutLog[];
  healthLogs: HealthLog[];
  goals: GoalItem[];
}

export default function DashboardTab({ workouts, healthLogs, goals }: DashboardTabProps) {
  const dashboard = useMemo(() => buildDashboardStats(workouts, goals), [goals, workouts]);
  const weeklyChart = useMemo(() => buildWeeklyWorkoutChart(dashboard.currentMonthWorkouts), [dashboard.currentMonthWorkouts]);
  const weightChart = useMemo(() => buildWeightChart(healthLogs), [healthLogs]);
  const recentWorkouts = useMemo(() => getRecentWorkouts(workouts), [workouts]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Tổng buổi tập trong tháng' value={dashboard.totalSessions} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Tổng calo đã đốt' value={dashboard.totalCalories} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Số ngày tập liên tiếp' value={dashboard.streak} suffix='ngày' />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Mục tiêu hoàn thành' value={dashboard.totalGoalProgress} suffix='%' />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
        <Col xs={24} lg={12}>
          <Card title='Số buổi tập theo tuần trong tháng'>
            <ColumnChart xAxis={weeklyChart.xAxis} yAxis={weeklyChart.yAxis} yLabel={['Buổi tập']} formatY={(v) => `${v} buổi`} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title='Biến động cân nặng theo thời gian'>
            <LineChart xAxis={weightChart.xAxis} yAxis={weightChart.yAxis} yLabel={['Cân nặng']} formatY={(v) => `${v.toFixed(1)} kg`} />
          </Card>
        </Col>
      </Row>

      <Card title='5 buổi tập gần nhất' style={{ marginTop: 12 }}>
        <Timeline>
          {recentWorkouts.map((item) => (
            <Timeline.Item key={item.id} color={item.status === 'completed' ? 'green' : 'red'}>
              {moment(item.date).format('DD/MM/YYYY')} - {item.type} ({item.duration} phút, {item.calories} calo)
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </>
  );
}
