import { Modal, Form, Input, InputNumber } from 'antd';

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const ProductForm = ({ open, onCancel, onSubmit }: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Thêm sản phẩm"
      visible={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onSubmit(values);
          form.resetFields();
        }}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Nhập tên sản phẩm' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { required: true },
            { type: 'number', min: 1, message: 'Giá phải > 0' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[
            { required: true },
            { type: 'number', min: 1, message: 'Số lượng phải > 0' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
