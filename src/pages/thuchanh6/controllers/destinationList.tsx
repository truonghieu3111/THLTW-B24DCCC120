import { Card, Rate, Button } from 'antd';

export default function DestinationList({ data, onAdd, onDelete }: any) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: 16
    }}>
      {data.map((d: any) => (
        <Card
          key={d.id}
          cover={<img src={d.image} style={{ height: 150, objectFit: "cover" }} />}
        >
          <h3>{d.name}</h3>
          <p>{d.desc}</p>
          <p>Thời gian: {d.duration} ngày</p>

          <p>Ăn: {d.food}</p>
          <p>Khách sạn: {d.hotel}</p>
          <p>Di chuyển: {d.transport}</p>

          <Rate value={d.rating} disabled />

          <div style={{ marginTop: 10 }}>
            <Button danger onClick={() => onDelete(d.id)}>Xóa</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}