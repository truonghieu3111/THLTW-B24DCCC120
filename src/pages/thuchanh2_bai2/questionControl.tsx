import { Input, Select, Space, Button } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default function QuestionControl({ onSearch }: any) {

  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <Space>
      <Input
        placeholder="Môn học"
        onChange={(e) => setSubject(e.target.value)}
      />

      <Select
        placeholder="Mức độ"
        style={{ width: 150 }}
        onChange={(v) => setDifficulty(v)}
      >
        <Option value="Dễ">Dễ</Option>
        <Option value="Trung bình">Trung bình</Option>
        <Option value="Khó">Khó</Option>
      </Select>

      <Button type="primary" onClick={() => onSearch(subject, difficulty)}>
        Tìm
      </Button>
    </Space>
  );
}