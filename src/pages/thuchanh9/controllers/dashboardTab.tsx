import { Card, Col, Row, Statistic } from 'antd';
import { useMemo } from 'react';

import type { TaskItem } from '../data/types';
import { getDashboardStats } from '../logic/logic';

interface DashboardTabProps {
  tasks: TaskItem[];
}

export default function DashboardTab({ tasks }: DashboardTabProps) {
  const stats = useMemo(() => getDashboardStats(tasks), [tasks]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic title='Tổng số task' value={stats.total} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic title='Task hoàn thành' value={stats.completed} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic title='Task quá hạn' value={stats.overdue} valueStyle={stats.overdue > 0 ? { color: '#cf1322' } : undefined} />
        </Card>
      </Col>
    </Row>
  );
}
