import { Input, Button, Select } from 'antd';
import { useState } from 'react';



export default function DiplomaControl({ onAdd, decisions }: any) {

  const [msv, setMsv] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("2024");
  const [decision, setDecision] = useState();
  return (
    <div>
      <Input placeholder="MSV" onChange={e=>setMsv(e.target.value)} />
      <Input placeholder="Họ tên" onChange={e=>setName(e.target.value)} />
      <Input placeholder="Năm" onChange={e=>setYear(e.target.value)} />

      <Select
             placeholder="Quyết định"
             style={{ width: 200 }}
             onChange={(v) => setDecision(v)}
             options={decisions.map((d: any) => ({
             value: d.id,
             label: d.soQD
        }))}
      />

      <Button onClick={() => onAdd({ msv, name, year: Number(year), decisionId: decision })}>
        Thêm văn bằng
      </Button>
    </div>
  );
}