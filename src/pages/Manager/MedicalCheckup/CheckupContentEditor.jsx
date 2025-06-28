import React from "react";
import { Table, Input, Button, Select } from "antd";

const { Option } = Select;

const CheckupContentTable = ({
  checkupContents,
  setCheckupContents,
  availableContents,
}) => {
  const handleAddExisting = (key) => {
    const selected = availableContents.find((item) => item.key === key);
    if (!selected) return;

    // Tránh trùng lặp theo name
    if (checkupContents.some((item) => item.name === selected.name)) return;

    setCheckupContents([
      ...checkupContents,
      {
        name: selected.name,
        description: selected.description || "",
        inputType: selected.inputType || "TEXT",
      },
    ]);
  };

  // Khi thêm dòng mới: generate key
  const handleAddNewRow = () => {
    setCheckupContents([
      ...checkupContents,
      {
        key: Date.now(), // hoặc dùng uuid()
        name: "",
        description: "",
        inputType: "TEXT",
      },
    ]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...checkupContents];
    updated[index][field] = value;
    setCheckupContents(updated);
  };

  const handleRemove = (index) => {
    const updated = [...checkupContents];
    updated.splice(index, 1);
    setCheckupContents(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Select
          style={{ width: 300 }}
          placeholder="Chọn nội dung có sẵn"
          onChange={handleAddExisting}
          options={availableContents.map((item) => ({
            label: item.name,
            value: item.key,
          }))}
        />
        <Button type="dashed" onClick={handleAddNewRow}>
          + Thêm dòng mới
        </Button>
      </div>

      <Table
        bordered
        size="small"
        dataSource={checkupContents}
        rowKey="key"
        pagination={false}
        columns={[
          {
            title: "Nội dung kiểm tra",
            dataIndex: "name",
            render: (text, _, index) => (
              <Input
                value={text}
                onChange={(e) => handleUpdate(index, "name", e.target.value)}
              />
            ),
            require: true,
          },
          {
            title: "Mô tả",
            dataIndex: "description",
            render: (text, _, index) => (
              <Input
                value={text}
                onChange={(e) =>
                  handleUpdate(index, "description", e.target.value)
                }
              />
            ),
            require: true,
          },
          {
            title: "Kiểu dữ liệu",
            dataIndex: "inputType",
            render: (value, _, index) => (
              <Select
                value={value}
                onChange={(val) => handleUpdate(index, "inputType", val)}
                style={{ width: 120 }}
              >
                <Option value="TEXT">Văn bản</Option>
                <Option value="NUMBER">Số</Option>
                <Option value="BOOLEAN">Có / Không</Option>
              </Select>
            ),
            require: true,
          },
          {
            title: "Xoá",
            render: (_, __, index) => (
              <Button danger type="link" onClick={() => handleRemove(index)}>
                Xoá
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CheckupContentTable;
