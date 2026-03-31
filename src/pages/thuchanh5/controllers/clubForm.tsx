import { Input, Button, DatePicker, Switch } from 'antd';
import { useState } from 'react';

export default function ClubForm({ onAdd }: any) {

  const [name, setName] = useState("");
  const [leader, setLeader] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [active, setActive] = useState(true);

  return (
    <div style={{ marginBottom: 20 }}>

      <Input
        placeholder="Tên CLB"
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Chủ nhiệm"
        onChange={(e) => setLeader(e.target.value)}
      />

      <Input
        placeholder="Link ảnh"
        onChange={(e) => setImage(e.target.value)}
      />

      <Input.TextArea
        placeholder="Mô tả (HTML)"
        onChange={(e) => setDesc(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        Hoạt động: <Switch checked={active} onChange={setActive} />
      </div>

      <Button
        type="primary"
        onClick={() => onAdd({ name, leader, image, desc, active })}
        style={{ marginTop: 10 }}
      >
        Thêm CLB
      </Button>

    </div>
  );
}