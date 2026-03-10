import Button from 'antd/es/button'

export default function ExamControl({ onCreate }: any) {
  return (
    <Button type="primary" onClick={onCreate}>
      Tạo đề thi
    </Button>
  );
}