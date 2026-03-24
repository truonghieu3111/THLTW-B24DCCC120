import { List } from 'antd';

export default function DiplomaList({ diplomas }: any) {
  return (
    <List
      bordered
      header="Văn bằng"
      dataSource={diplomas}
      renderItem={(d: any) => (
        <List.Item>
          {d.soVaoSo} | {d.soHieu} | {d.msv} | {d.name}
        </List.Item>
      )}
    />
  );
}