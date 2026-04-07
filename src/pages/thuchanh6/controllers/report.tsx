import { Card } from 'antd';

export default function Report({ itineraries }: any) {

  // số lượt tạo theo tháng
  const byMonth: any = {};
  itineraries.forEach((i: any) => {
    const m = new Date().getMonth() + 1;
    byMonth[m] = (byMonth[m] || 0) + 1;
  });

  // địa điểm phổ biến
  const popular: any = {};
  itineraries.forEach((i: any) => {
    popular[i.name] = (popular[i.name] || 0) + 1;
  });

  // tổng tiền
  let total = 0;
  let food = 0, hotel = 0, transport = 0;

  itineraries.forEach((i: any) => {
    total += i.food + i.hotel + i.transport;
    food += i.food;
    hotel += i.hotel;
    transport += i.transport;
  });

  return (
    <Card>
      <h3>Thống kê</h3>

      <p>Số lịch trình theo tháng:</p>
      {Object.entries(byMonth).map(([m, v]) => (
        <p key={m}>Tháng {m}: {v}</p>
      ))}

      <p>Địa điểm phổ biến:</p>
      {Object.entries(popular).map(([k, v]) => (
        <p key={k}>{k}: {v}</p>
      ))}

      <p>Tổng doanh thu: {total}</p>

      <p>Ăn uống: {food}</p>
      <p>Lưu trú: {hotel}</p>
      <p>Di chuyển: {transport}</p>
    </Card>
  );
}