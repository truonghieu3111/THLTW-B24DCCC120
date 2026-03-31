import { Input, Select, Button } from 'antd';
import { useState } from 'react';

export default function ApplicationForm({ clubs, onAdd }: any) {

  const [name, setName] = useState("");
  const [clubId, setClub] = useState();

  return (
    <div>

      <Input placeholder="Họ tên" onChange={e=>setName(e.target.value)} />

      <Select
        placeholder="Chọn CLB"
        style={{ width: 200 }}
        onChange={setClub}
        options={(clubs || []).map((c:any)=>({
          value: c.id,
          label: c.name
        }))}
      />

      <Button onClick={()=>onAdd({ name, clubId })}>
        Đăng ký
      </Button>

    </div>
  );
}