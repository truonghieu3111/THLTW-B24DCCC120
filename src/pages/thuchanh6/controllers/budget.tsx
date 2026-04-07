import { Card } from 'antd';
import { calcBudget } from '../logic/logic';

export default function Budget({ list }: any) {

  const total = calcBudget(list);

  return (
    <Card>
      <p>Tổng chi phí: {total}</p>

      {total > 3000000 && (
        <p style={{ color: "red" }}>⚠️ Vượt ngân sách</p>
      )}
    </Card>
  );
}