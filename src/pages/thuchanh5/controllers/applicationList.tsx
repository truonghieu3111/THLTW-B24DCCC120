import { Table, Button } from 'antd';
import { useState } from 'react';

export default function ApplicationList({ data, onApprove, onReject }: any) {

  const [selectedRowKeys, setSelected] = useState<React.Key[]>([]);

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Trạng thái", dataIndex: "status" }
  ];

  return (
    <div>

      <Button onClick={()=>onApprove(selectedRowKeys)}>
        Duyệt
      </Button>

      <Button danger onClick={()=>onReject(selectedRowKeys)}>
        Từ chối
      </Button>

      <Table
        rowKey="id"
        rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelected(keys)
}}
        columns={columns}
        dataSource={data}
      />

    </div>
  );
}