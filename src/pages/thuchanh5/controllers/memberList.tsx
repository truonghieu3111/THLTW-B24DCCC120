import { Table, Button, Modal, Select } from 'antd';
import { useState } from 'react';

export default function MemberList({ data, clubs, onChangeClub }: any) {

  const members = (data || []).filter((a: any) => a.status === "Approved");

  const [selectedRowKeys, setSelected] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);
  const [clubId, setClubId] = useState<number>();

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "CLB", render: (item: any) => {
        const club = clubs.find((c:any)=>c.id === item.clubId);
        return club?.name;
      }
    }
  ];

  return (
    <div>

      <Button
        disabled={selectedRowKeys.length === 0}
        onClick={() => setOpen(true)}
      >
        Chuyển CLB ({selectedRowKeys.length})
      </Button>

      <Table
        rowKey="id"
        dataSource={members}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelected
        }}
      />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          onChangeClub(selectedRowKeys, clubId);
          setOpen(false);
        }}
        title={`Chuyển ${selectedRowKeys.length} thành viên`}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn CLB"
          onChange={(v) => setClubId(v)}
          options={(clubs || []).map((c:any)=>({
            value: c.id,
            label: c.name
          }))}
        />
      </Modal>

    </div>
  );
}