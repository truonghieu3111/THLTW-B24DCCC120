import { Input, Button, InputNumber, Rate } from 'antd';
import { useState } from 'react';

export default function DestinationForm({ onAdd }: any) {

  const [form, setForm] = useState<any>({
    name: "",
    type: "",
    image: "",
    desc: "",
    duration: 1,
    food: 0,
    hotel: 0,
    transport: 0,
    rating: 3
  });

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 10 }}>

      <Input placeholder="Tên" onChange={e => handleChange("name", e.target.value)} />
      <Input placeholder="Loại" onChange={e => handleChange("type", e.target.value)} />

      {/* upload ảnh */}
      <Input
        type="file"
        onChange={(e: any) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => handleChange("image", reader.result);
          reader.readAsDataURL(file);
        }}
      />

      <Input.TextArea placeholder="Mô tả" onChange={e => handleChange("desc", e.target.value)} />

      <InputNumber placeholder="Thời gian (ngày)" onChange={v => handleChange("duration", v)} />

      <InputNumber placeholder="Chi ăn uống" onChange={v => handleChange("food", v)} />
      <InputNumber placeholder="Chi lưu trú" onChange={v => handleChange("hotel", v)} />
      <InputNumber placeholder="Chi di chuyển" onChange={v => handleChange("transport", v)} />

      <div>
        Rating: <Rate onChange={(v) => handleChange("rating", v)} />
      </div>

      <Button type="primary" onClick={() => onAdd(form)}>
        Thêm điểm đến
      </Button>
    </div>
  );
}