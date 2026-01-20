import { Card, Button, Input, message } from 'antd';
import { useState } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './form';

const TodoList = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
    { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
    { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
  ]);

  const handleAdd = (values: any) => {
    setProducts([...products, { id: Date.now(), ...values }]);
    message.success('Thêm sản phẩm thành công');
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    message.success('Xóa thành công');
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card title="Bài tập ReactJS – Quản lý sản phẩm" style={{ margin: 24 }}>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <Input.Search
            placeholder="Tìm theo tên sản phẩm"
            style={{ width: 300 }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginLeft: 16 }}
            onClick={() => setOpen(true)}
          >
            Thêm sản phẩm
          </Button>
        </div>

        <ProductTable data={filtered} onDelete={handleDelete} />

        <ProductForm
          open={open}
          onCancel={() => setOpen(false)}
          onSubmit={handleAdd}
        />
      </Card>
    </div>
  );
};

export default TodoList;
