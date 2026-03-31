import { Table, Button, Popconfirm } from 'antd';

export default function ClubList({ data, onDelete, onViewMember }: any) {

  const columns = [
    {
      title: "Ảnh",
      render: (item: any) =>
        item.image ? (
          <img src={item.image} width={50} />
        ) : "https://tse2.mm.bing.net/th/id/OIP.bjNwBjDQtn3ksLB7A_cZ8QHaEk?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      title: "Tên CLB",
      dataIndex: "name"
    },
    {
      title: "Ngày thành lập",
      dataIndex: "createdAt"
    },
    {
      title: "Chủ nhiệm",
      dataIndex: "leader"
    },
    {
      title: "Hoạt động",
      render: (item: any) => item.active ? "Có" : "Không"
    },
    {
      title: "Mô tả",
      render: (item: any) => (
        <div dangerouslySetInnerHTML={{ __html: item.description }} />
      )
    },
    {
      title: "Thao tác",
      render: (item: any) => (
        <>
          <Button onClick={() => onViewMember(item.id)}>
            Thành viên
          </Button>

          <Popconfirm
            title="Xóa?"
            onConfirm={() => onDelete(item.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data || []}
      columns={columns}
    />
  );
}