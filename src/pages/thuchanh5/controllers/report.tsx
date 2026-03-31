import { Card, Table } from 'antd';

// type rõ ràng
type App = {
  id: number;
  name: string;
  clubId: number;
  status: string;
  note: string;
};

type Club = {
  id: number;
  name: string;
};

export default function Report({ apps, clubs }: { apps: App[]; clubs: Club[] }) {

  const appList = apps || [];
  const clubList = clubs || [];

  // thống kê tổng
  const totalClub = clubList.length;

  const pending = appList.filter((a: App) => a.status === "Pending").length;
  const approved = appList.filter((a: App) => a.status === "Approved").length;
  const rejected = appList.filter((a: App) => a.status === "Rejected").length;

  // data cho bảng thống kê theo CLB
  const data = clubList.map((c: Club) => {
    const list = appList.filter((a: App) => a.clubId === c.id);

    return {
      key: c.id,
      club: c.name,
      pending: list.filter((a: App) => a.status === "Pending").length,
      approved: list.filter((a: App) => a.status === "Approved").length,
      rejected: list.filter((a: App) => a.status === "Rejected").length
    };
  });

  const columns = [
    {
      title: "Tên CLB",
      dataIndex: "club"
    },
    {
      title: "Pending",
      dataIndex: "pending"
    },
    {
      title: "Approved",
      dataIndex: "approved"
    },
    {
      title: "Rejected",
      dataIndex: "rejected"
    }
  ];

  return (
    <div>

      {/* Tổng quan */}
      <Card style={{ marginBottom: 20 }}>
        <p><b>Số CLB:</b> {totalClub}</p>
        <p><b>Pending:</b> {pending}</p>
        <p><b>Approved:</b> {approved}</p>
        <p><b>Rejected:</b> {rejected}</p>
      </Card>

      {/* Bảng thống kê theo CLB */}
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
      />

    </div>
  );
}