import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Input,
  Select,
  Button,
  Upload,
  Space,
  Tooltip,
  message,
  Popconfirm,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMedicineSupplyManager } from "../../../redux/manager/GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";
import { putManagerSupply } from "../../../redux/manager/UpdateManagerSupply/updateManagerSupplySlice";
import { deleteManagerSupply } from "../../../redux/manager/DeleteManagerSupply/deleteManagerSupplySlice";

const { Option } = Select;

function InventoryManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [supply, setSupply] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    medicineSupplyManager = [],
    loading,
    error,
  } = useSelector((state) => state.getAllMedicineSupplyManager);
  const dispatch = useDispatch();

  const [categoryOptions, setCategoryOptions] = useState([]);

  const updateStatus = (stock) => {
    if (stock > 50) return "Normal";
    if (stock <= 50 && stock > 20) return "Need To Add";
    return "Running low";
  };

  useEffect(() => {
    const CATEGORY_ENUM = ["Vật tư", "Thiết bị", "Tiêu hao"];
    setCategoryOptions(CATEGORY_ENUM);
  }, []);

  const formatSupply = () => {
    if (Array.isArray(medicineSupplyManager?.data?.medicineSupply)) {
      const tempSupply = medicineSupplyManager.data.medicineSupply.map(
        (item) => ({
          id: item.id,
          name: item.name,
          category: item.category || item.categoryName || "",
          description: item.description,
          usage: item.usage,
          image: item.image,
          stock: item.stock,
          status: updateStatus(item.stock),
        })
      );
      // llayy category ra
      // const uniqueCategories = [
      //   ...new Set(tempSupply.map((item) => item.category).filter(Boolean)),
      // ];
      // console.log(uniqueCategories);
      setSupply(tempSupply);
      // setCategoryOptions(uniqueCategories);
    }
  };

  useEffect(() => {
    dispatch(fetchAllMedicineSupplyManager({ page: 1 }));
  }, []);

  useEffect(() => {
    formatSupply();
  }, [medicineSupplyManager]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Supply",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) =>
        image ? (
          <img
            src={image}
            alt="Ảnh"
            style={{
              width: 150,
              height: 80,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        ) : (
          "Không có"
        ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      render: (stock) => `${stock} `,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        let color;
        if (status === "Normal") {
          color = "bg-green-500";
        } else if (status === "Need To Add") {
          color = "bg-pink-300";
        } else if (status === "Running low") {
          color = "bg-yellow-300";
        }
        return (
          <span
            className={`inline-block px-2 py-1 rounded text-white text-xs ${color}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip placement="bottom" title="Update">
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedRecord({ ...record });
                setIsModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                </g>
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="	Confirm Deletion?"
            description={`Are you sure you want to delete?`}
            okText="Yes"
            cancelText="Cancel"
            onConfirm={() => {
              dispatch(deleteManagerSupply({ id: record?.id }));
            }}
          >
            <Tooltip placement="bottom" title="Delete">
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                  />
                </svg>
              </div>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleUpdate = () => {
    if (selectedRecord) {
      const stockValue = Number(selectedRecord.stock);
      if (isNaN(stockValue) || stockValue < 0) {
        message.error("Stock phải là số hợp lệ!");
        return;
      }

      dispatch(
        putManagerSupply({
          id: selectedRecord.id,
          name: selectedRecord.name,
          description: selectedRecord.description,
          usage: selectedRecord.usage,
          category: selectedRecord.category,
          stock: String(stockValue),
          image: selectedRecord.image,
        })
      );

      setIsModalOpen(false);
      setSelectedRecord(null);
      message.success("Cập nhật thành công!");
    }
  };

  const handleUpload = (file) => {
    setSelectedRecord((prev) => ({
      ...prev,
      image: file,
    }));

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    return false; // Chặn upload mặc định nếu dùng Ant Upload
  };
  useEffect(() => {
    if (selectedRecord) {
      if (selectedRecord.image && !(selectedRecord.image instanceof File)) {
        setPreviewImage(selectedRecord.image);
      }
    }
  }, [selectedRecord]);

  return (
    <div>
      <Table
        className="mt-5"
        columns={columns}
        dataSource={supply}
        rowClassName="text-center text-sm"
        rowKey="id"
        pagination={{ pageSize: 4 }}
      />

      <Modal
        title={
          <div className="text-center text-lg font-bold text-gray-800">
            Update Medicine Info
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        footer={[
          <Button
            key="cancel"
            className="rounded px-4 py-1.5 text-sm"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedRecord(null);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="update"
            type="primary"
            className="bg-blue-600 hover:bg-blue-700 border-none rounded px-4 py-1.5 text-sm"
            onClick={handleUpdate}
          >
            Update
          </Button>,
        ]}
        centered
        width={220}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-3 py-3">
          {/* Name */}
          <div className="col-span-2 flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Medicine Name <span className="text-red-500">*</span>
            </label>
            <Input
              size="small"
              placeholder="Enter name"
              className="rounded border-gray-300 text-xs"
              value={selectedRecord?.name}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, name: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="col-span-2 flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <Input
              size="small"
              placeholder="Short description..."
              className="rounded border-gray-300 text-xs"
              value={selectedRecord?.description}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Usage */}
          <div className="col-span-2 flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Usage Instruction
            </label>
            <Input
              size="small"
              placeholder="How to use..."
              className="rounded border-gray-300 text-xs"
              value={selectedRecord?.usage}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, usage: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              size="small"
              className="w-full text-xs"
              dropdownClassName="text-xs"
              popupClassName="text-xs"
              value={selectedRecord?.category}
              onChange={(value) =>
                setSelectedRecord({ ...selectedRecord, category: value })
              }
            >
              {categoryOptions.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <Input
              size="small"
              type="number"
              min={0}
              placeholder="Enter stock"
              className="rounded border-gray-300 text-xs"
              value={selectedRecord?.stock}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  stock: e.target.value || "",
                })
              }
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2 flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-2">
              Medicine Image
            </label>
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button
                size="small"
                icon={<UploadOutlined />}
                className="rounded text-xs bg-white hover:bg-gray-50 border border-gray-300"
              >
                Pick Image
              </Button>
            </Upload>

            {previewImage && (
              <div className="flex justify-center mt-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-36 h-24 rounded-md object-cover border shadow"
                />
              </div>
            )}
          </div>
        </div>
      </Modal>

      <div className="w-full h-10"></div>
    </div>
  );
}

export default InventoryManager;
