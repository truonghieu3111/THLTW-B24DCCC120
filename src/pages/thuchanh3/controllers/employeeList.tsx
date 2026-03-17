import { List } from 'antd';

export default function EmployeeList({ employees }: any) {
  return (
    <List
      bordered
      header="Danh sách nhân viên"
      dataSource={employees}
      renderItem={(e: any) => (
        <List.Item>
          {e.name} | Giới hạn: {e.maxPerDay}/ngày | Giờ: {e.workingHours}
        </List.Item>
      )}    
    />
  );
}