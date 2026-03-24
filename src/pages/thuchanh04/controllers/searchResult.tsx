import { List } from 'antd';

export default function SearchResult({ data }: any) {
  return (
    <List
      bordered
      header="Kết quả"
      dataSource={data}
      renderItem={(d: any) => (
        <List.Item>
          {d.soHieu} | {d.name} | {d.msv}
        </List.Item>
      )}
    />
  );
}