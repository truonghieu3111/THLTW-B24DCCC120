import { Select } from 'antd';

export default function FilterBar({ onFilter }: any) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Select
        placeholder="Loại địa điểm"
        style={{ width: "100%", maxWidth: 300 }}
        onChange={onFilter}
        allowClear
        options={[
          { value: "biển", label: "Biển" },
          { value: "núi", label: "Núi" },
          { value: "thành phố", label: "Thành phố" }
        ]}
      />
    </div>
  );
}