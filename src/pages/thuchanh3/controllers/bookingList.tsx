import { List, Button } from 'antd';

export default function BookingList({ bookings, onComplete }: any) {
  return (
    <List
      bordered
      header="Lịch hẹn"
      dataSource={bookings}
      renderItem={(b: any) => (
        <List.Item>

          NV: {b.employeeId} | DV: {b.serviceId} | {b.date} {b.time} | {b.status}

          {b.status !== "Hoàn thành" && (
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => onComplete(b.id)}
            >
              Hoàn thành
            </Button>
          )}

        </List.Item>
      )}
    />
  );
}