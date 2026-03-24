import { Input, Button } from 'antd';
import { useState } from 'react';

export default function SearchControl({ onSearch }: any) {

  const [soHieu, setSoHieu] = useState("");
  const [msv, setMsv] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <Input placeholder="Số hiệu" onChange={e=>setSoHieu(e.target.value)} />
      <Input placeholder="MSV" onChange={e=>setMsv(e.target.value)} />
      <Input placeholder="Tên" onChange={e=>setName(e.target.value)} />

      <Button onClick={()=>onSearch({ soHieu, msv, name })}>
        Tra cứu
      </Button>
    </div>
  );
}