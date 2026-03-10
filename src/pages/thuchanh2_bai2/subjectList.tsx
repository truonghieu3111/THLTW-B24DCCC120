import { List } from 'antd';

export default function SubjectList({ data }: any) {
  return (
    <List
      bordered
      header="Danh mục môn học"
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          {item.code} - {item.name} ({item.credits} tín chỉ)
        </List.Item>
      )}
    />
  );
}