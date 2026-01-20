import { Table, Button, Popconfirm } from 'antd';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  data: Product[];
  onDelete: (id: number) => void;
}

const ProductTable = ({ data, onDelete }: Props) => {
  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price: number) => price.toLocaleString() + ' đ',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Product) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa?"
          onConfirm={() => onDelete(record.id)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default ProductTable;
