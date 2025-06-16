import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Table,
  Space,
  Tooltip,
  Upload,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

function ImportManager() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [updatedStock, setUpdatedStock] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample category and medicine data
  const categories = [
    {
      id: 1,
      name: "Antipyretics",
      description: "Medicines used to reduce fever",
      medicines: [
        {
          id: "ST001",
          name: "Paracetamol 500mg",
          usage: "Take 1 pill daily",
          stock: 150,
          status: "Normal",
          description: "Pain relief and fever reduction",
          image: null,
        },
        {
          id: "ST003",
          name: "Aspirin 100mg",
          usage: "Take 1 pill daily",
          stock: 10,
          status: "Needs Restocking",
          description: "Pain relief and anti-inflammatory",
          image: null,
        },
      ],
    },
    {
      id: 2,
      name: "Vaccines",
      description: "Vaccines for disease prevention",
      medicines: [
        {
          id: "ST002",
          name: "COVID-19 Vaccine",
          usage: "Single shot",
          stock: 20,
          status: "Needs Restocking",
          description: "COVID-19 prevention vaccine",
          image: null,
        },
      ],
    },
  ];

  const showModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
    setSelectedMedicine(null);
    setUpdatedStock("");
  };

  const updateStatus = (stock) => {
    if (stock > 50) return "Normal";
    if (stock <= 50 && stock > 20) return "Needs Restocking";
    if (stock <= 20) return "Running Low";
  };

  const handleUpdateStock = () => {
    if (selectedMedicine && updatedStock !== "") {
      const newStock = parseInt(updatedStock, 10);
      if (!isNaN(newStock) && newStock >= 0) {
        const updatedData = selectedCategory.medicines.map((medicine) => {
          if (medicine.id === selectedMedicine.id) {
            medicine.stock = newStock;
            medicine.status = updateStatus(newStock);
          }
          return medicine;
        });
        setSelectedCategory({ ...selectedCategory, medicines: updatedData });
        setUpdatedStock("");
        setIsModalVisible(false);
        setSelectedMedicine(null);
      }
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image, record) => (
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const newImage = e.target.result;
              const updatedData = selectedCategory.medicines.map((med) =>
                med.id === record.id ? { ...med, image: newImage } : med
              );
              setSelectedCategory({
                ...selectedCategory,
                medicines: updatedData,
              });
            };
            reader.readAsDataURL(file);
            return false;
          }}
        >
          {image ? (
            <img src={image} alt="medicine" style={{ width: 50, height: 50 }} />
          ) : (
            <Button icon={<PlusOutlined />}>Upload</Button>
          )}
        </Upload>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <span
          className={`inline-block px-2 py-1 rounded text-white text-xs ${
            status === "Normal"
              ? "bg-green-500"
              : status === "Needs Restocking"
              ? "bg-pink-400"
              : "bg-yellow-400"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      render: (stock) => <span>{stock} pills</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Update stock">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => {
                setSelectedMedicine(record);
                setUpdatedStock(record.stock);
              }}
            >
              Update
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 mt-5 w-full px-5 font-kameron">
        {categories.map((category) => (
          <div
            key={category.id}
            className="h-[120px] bg-white rounded-2xl shadow-md cursor-pointer"
            onClick={() => showModal(category)}
          >
            <p className="flex justify-center mt-5 text-lg font-semibold">
              {category.name}
            </p>
            <p className="flex justify-center text-[50px] font-bold">
              {category.medicines.length}
            </p>
          </div>
        ))}
      </div>

      {/* Medicine Modal */}
      <Modal
        title={`Medicines in ${selectedCategory?.name}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
      >
        <Input
          placeholder="Search medicine by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <Table
          columns={columns}
          dataSource={selectedCategory?.medicines.filter((medicine) =>
            medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          rowKey="id"
          pagination={false}
          bordered
        />
      </Modal>

      {/* Update Stock Modal */}
      {selectedMedicine && (
        <Modal
          title={`Update medicine: ${selectedMedicine?.name}`}
          open={selectedMedicine}
          onCancel={handleCancel}
          footer={[
            <Button
              key="cancel"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleCancel}
            >
              Cancel
            </Button>,
            <Button
              key="update"
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => handleUpdate(selectedMedicine)}
            >
              Update
            </Button>,
          ]}
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input
                value={selectedMedicine?.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Stock</label>
              <Input
                type="number"
                value={selectedMedicine?.stock}
                onChange={(e) =>
                  handleFieldChange("stock", parseInt(e.target.value) || 0)
                }
                min={0}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium">Usage</label>
              <Input
                value={selectedMedicine?.usage}
                onChange={(e) => handleFieldChange("usage", e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium">Description</label>
              <TextArea
                value={selectedMedicine?.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium">Type</label>
              <Select
                className="w-full"
                value={selectedMedicine?.type || "PELLETS"}
                onChange={(value) => handleFieldChange("type", value)}
              >
                <Option value="PELLETS">Pellets</Option>
                <Option value="BOTTLE">Bottle</Option>
                <Option value="JAR">Jar</Option>
              </Select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ImportManager;
