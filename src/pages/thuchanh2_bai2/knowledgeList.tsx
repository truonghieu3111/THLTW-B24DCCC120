import { List } from 'antd';

export default function KnowledgeList({ data }: any) {
  return (
    <List
      bordered
      header="Danh mục khối kiến thức"
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          {item.name}
        </List.Item>
      )}
    />
  );
}