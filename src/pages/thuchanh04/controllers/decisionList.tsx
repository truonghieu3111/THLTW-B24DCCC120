import { List } from 'antd';

export default function DecisionList({ decisions }: any) {
  return (
    <List
      bordered
      header="Quyết định tốt nghiệp"
      dataSource={decisions}
      renderItem={(d: any) => (
        <List.Item>
          Số QĐ: {d.soQD} | Ngày: {d.date} | {d.desc} | Năm: {d.year}
          <br />
          Lượt tra cứu: {d.views}
        </List.Item>
      )}
    />
  );
}