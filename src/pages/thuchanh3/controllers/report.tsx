import { Card } from 'antd';
import {
  countByDate,
  countByMonth,
  revenueByService,
  revenueByEmployee
} from '../logic/logic';

export default function Report({ bookings, services, employees }: any) {

  const byDate = countByDate(bookings);
  const byMonth = countByMonth(bookings);
  const byService = revenueByService(bookings, services);
  const byEmployee = revenueByEmployee(bookings, services, employees);

  return (
    <div>

      <Card title="Số lịch theo ngày">
        {Object.entries(byDate).map(([k, v]: any) => (
          <div key={k}>{k}: {v}</div>
        ))}
      </Card>

      <Card title="Số lịch theo tháng">
        {Object.entries(byMonth).map(([k, v]: any) => (
          <div key={k}>{k}: {v}</div>
        ))}
      </Card>

      <Card title="Doanh thu theo dịch vụ">
        {Object.entries(byService).map(([k, v]: any) => (
          <div key={k}>{k}: {v} đ</div>
        ))}
      </Card>

      <Card title="Doanh thu theo nhân viên">
        {Object.entries(byEmployee).map(([k, v]: any) => (
          <div key={k}>{k}: {v} đ</div>
        ))}
      </Card>

    </div>
  );
}