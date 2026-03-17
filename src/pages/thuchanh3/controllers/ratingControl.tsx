import { Input, Button, Select } from 'antd';
import { useState } from 'react';

export default function RatingControl({ bookings, onAdd }: any) {

  const [bookingId, setBooking] = useState();
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div>

      <Select
        placeholder="Chọn lịch đã hoàn thành"
        style={{ width: 250 }}
        onChange={setBooking}
        options={bookings
          .filter((b: any) => b.status === "Hoàn thành")
          .map((b: any) => ({
            value: b.id,
            label: `${b.date} ${b.time} (NV ${b.employeeId})`
          }))
        }
      />

      <Select
        style={{ width: 120 }}
        defaultValue={5}
        onChange={setScore}
        options={[1,2,3,4,5].map(v => ({ value: v, label: v + " sao" }))}
      />

      <Input
        placeholder="Nhận xét"
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        type="primary"
        onClick={() => onAdd({ bookingId, score, comment })}
      >
        Đánh giá
      </Button>

    </div>
  );
}