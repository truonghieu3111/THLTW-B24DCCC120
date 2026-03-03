import { Button, Input, List, Space } from 'antd';
import { useState } from 'react';

export default function subjectManager({ subjects, setSubjects }: any) {
  const [newSubject, setNewSubject] = useState('');

  const addSubject = () => {
    if (!newSubject) return;
    setSubjects([...subjects, newSubject]);
    setNewSubject('');
  };

  const deleteSubject = (name: string) => {
    setSubjects(subjects.filter((s: string) => s !== name));
  };

  return (
    <>
      <Space>
        <Input
          placeholder="Tên môn mới"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <Button type="primary" onClick={addSubject}>
          Thêm
        </Button>
      </Space>

      <List
        style={{ marginTop: 20 }}
        bordered
        dataSource={subjects}
        renderItem={(item: string) => (
          <List.Item
            actions={[
              <Button danger onClick={() => deleteSubject(item)}>
                Xóa
              </Button>,
            ]}
          >
            {item}
          </List.Item>
        )}
      />
    </>
  );
}