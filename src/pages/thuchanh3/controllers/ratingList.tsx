import { List, Input, Button } from 'antd';
import { useState } from 'react';
import { avgRating } from '../logic/logic';

export default function RatingList({ ratings, employees, onReply }: any) {

  const [replyText, setReplyText] = useState("");

  return (
    <List
      bordered
      header="Đánh giá"
      dataSource={ratings}
      renderItem={(r: any) => {
        const emp = employees.find((e: any) => e.id === r.employeeId);

        return (
          <List.Item>
            <div>

              <b>{emp?.name}</b> | sao {r.score} | {r.comment}

              <div>Trung bình: {avgRating(ratings, r.employeeId)}</div>

              {r.reply ? (
                <div>Phản hồi: {r.reply}</div>
              ) : (
                <div>
                  <Input
                    placeholder="Phản hồi..."
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button onClick={() => onReply(r.id, replyText)}>
                    Trả lời
                  </Button>
                </div>
              )}

            </div>
          </List.Item>
        );
      }}
    />
  );
}