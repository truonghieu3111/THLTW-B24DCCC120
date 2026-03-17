import { List } from 'antd';

export default function ServiceList({ services }: any) {
  return (
    <List
      bordered
      header="Danh sách dịch vụ"
      dataSource={services}
      renderItem={(s: any) => (
        <List.Item>
          {s.name} | Giá: {s.price}đ | Thời gian: {s.duration} phút
        </List.Item>
      )}
    />
  );
}