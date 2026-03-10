import List from 'antd/es/list'

export default function ExamList({ exams }: any) {
  return (
    <List
      header="Đề thi"
      bordered
      dataSource={exams}
      renderItem={(item: any) => (
        <List.Item>
          {item.questions.map((q: any) => q.content).join(" | ")}
        </List.Item>
      )}
    />
  );
}