import { Button, Space } from 'antd';

export default function gameControl({ onSelect }: any) {
  return (
    <Space>
      <Button type="primary" onClick={() => onSelect('Kéo')}>
        Kéo
      </Button>

      <Button type="primary" onClick={() => onSelect('Búa')}>
        Búa
      </Button>

      <Button type="primary" onClick={() => onSelect('Bao')}>
        Bao
      </Button>
    </Space>
  );
}