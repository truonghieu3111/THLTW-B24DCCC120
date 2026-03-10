import List from 'antd/es/list'

export default function QuestionList({ questions }: any) {
  return (
    <List
      bordered
      dataSource={questions}
      renderItem={(item: any) => (
        <List.Item>
          {item.content} - {item.subject} - {item.difficulty}
        </List.Item>
      )}
    />
  );
}