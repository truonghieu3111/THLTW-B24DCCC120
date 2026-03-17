import { Button, Select, Input } from 'antd';
import { useState } from 'react';

export default function BookingControl({ employees, services, onCreate }: any) {

  const [employeeId, setEmployee] = useState();
  const [serviceId, setService] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div>

      <Select
        placeholder="Nhân viên"
        style={{ width: 200 }}
        onChange={setEmployee}
        options={employees.map((e: any) => ({
          value: e.id,
          label: e.name
        }))}
      />

      <Select
        placeholder="Dịch vụ"
        style={{ width: 200 }}
        onChange={setService}
        options={services.map((s: any) => ({
          value: s.id,
          label: s.name
        }))}
      />

      <Input placeholder="Ngày" onChange={(e)=>setDate(e.target.value)} />
      <Input placeholder="Giờ" onChange={(e)=>setTime(e.target.value)} />

      <Button onClick={() => onCreate({ employeeId, serviceId, date, time })}>
        Đặt lịch
      </Button>

    </div>
  );
}