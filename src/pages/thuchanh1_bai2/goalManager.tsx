import { Button, Input, List, Space, Tag } from 'antd';
import { useState } from 'react';

export default function goalManager({ goals, setGoals, sessions }: any) {
  const [target, setTarget] = useState('');

  const totalDuration = sessions.reduce(
    (sum: number, s: any) => sum + Number(s.duration || 0),
    0
  );

  const addGoal = () => {
    if (!target) return;
    setGoals([...goals, { id: Date.now(), target: Number(target) }]);
    setTarget('');
  };

  return (
    <>
      <Space>
        <Input
          placeholder="Tổng phút mục tiêu tháng"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <Button type="primary" onClick={addGoal}>
          Đặt mục tiêu
        </Button>
      </Space>

      <List
        style={{ marginTop: 20 }}
        bordered
        dataSource={goals}
        renderItem={(g: any) => (
          <List.Item>
            Mục tiêu: {g.target} phút — Đã học: {totalDuration} phút —
            {totalDuration >= g.target ? (
              <Tag color="green">Hoàn thành</Tag>
            ) : (
              <Tag color="red">Chưa đạt</Tag>
            )}
          </List.Item>
        )}
      />
    </>
  );
}