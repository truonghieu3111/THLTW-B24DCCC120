import { List } from 'antd';

export default function HistoryList({ data }: any) {

  return (
    <List
      header="Lịch sử"
      bordered
      dataSource={data || []}
      renderItem={(item: any) => (
        <List.Item>
          {item?.action || "N/A"} - {item?.time || "N/A"} - {item?.note || ""}
        </List.Item>
      )}
    />
  );
}