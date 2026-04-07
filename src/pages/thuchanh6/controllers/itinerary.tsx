import { List, Button } from 'antd';

export default function Itinerary({ list, onRemove }: any) {
  return (
    <List
      header="Lịch trình"
      bordered
      dataSource={list}
      renderItem={(item: any) => (
        <List.Item
          actions={[
            <Button danger onClick={() => onRemove(item.id)}>Xóa</Button>
          ]}
        >
          {item.name}
        </List.Item>
      )}
    />
  );
}