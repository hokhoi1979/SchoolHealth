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

  const {
    medicineSupplyManager = [],
    loading,
    error,
  } = useSelector((state) => state.getAllMedicineSupplyManager);
  const dispatch = useDispatch();

  const [categoryOptions, setCategoryOptions] = useState([]);

  const updateStatus = (stock) => {
    if (stock > 50) return "Bình thường";
    if (stock <= 50 && stock > 20) return "Cần bổ sung";
    return "Sắp hết";
  };

  const formatSupply = () => {
    if (Array.isArray(medicineSupplyManager?.data?.medicineSupply)) {
      const tempSupply = medicineSupplyManager.data.medicineSupply.map(
        (item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description,
          usage: item.usage,
          image: item.image,
          stock: item.stock,
          status: updateStatus(item.stock),
        })
      );
      // llayy category ra
      const uniqueCategories = [
        ...new Set(tempSupply.map((item) => item.category)),
      ];
      setSupply(tempSupply);
      setCategoryOptions(uniqueCategories);
    }
  };

  useEffect(() => {
    dispatch(fetchAllMedicineSupplyManager({ page: 1, limit: 15 }));
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
      title: "Mặt hàng",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "HDSD",
      dataIndex: "usage",
      key: "usage",
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) =>
        image ? (
          <img
            src={image}
            alt="Ảnh"
            style={{
              width: 200,
              height: 100,
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
        if (status === "Bình thường") {
          color = "bg-green-500";
        } else if (status === "Cần bổ sung") {
          color = "bg-pink-300";
        } else if (status === "Sắp hết") {
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
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                />
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Xác nhận xoá?"
            description={`Bạn có chắc muốn xoá bản ghi này?`}
            okText="Đồng ý"
            cancelText="Huỷ"
            onConfirm={() => {
              dispatch(deleteManagerSupply({ id: record?.id }));
            }}
          >
            <Tooltip placement="bottom" title="Delete">
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 3v1H4v2h16V4h-5V3H9m1 4v12h4V7h-4z"
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
      dispatch(
        putManagerSupply({
          id: selectedRecord.id,
          name: selectedRecord.name,
          description: selectedRecord.description,
          usage: selectedRecord.usage,
          category: selectedRecord.category,
          stock: String(selectedRecord.stock),
        })
      );
      setIsModalOpen(false);
      setSelectedRecord(null);
      message.success("Cập nhật thành công!");
    }
  };

  const handleUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedRecord({ ...selectedRecord, image: imageUrl });
    return false;
  };

  return (
    <div>
      <Table
        className="mt-5"
        columns={columns}
        dataSource={supply}
        rowClassName="text-center text-sm"
        rowKey="id"
        bordered
      />

      <Modal
        title="Cập nhật thông tin"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedRecord(null);
            }}
          >
            Hủy
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Cập nhật
          </Button>,
        ]}
      >
        <div className="p-4">
          <div className="mb-2">
            <label className="block mb-1">Tên thuốc:</label>
            <Input
              value={selectedRecord?.name}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Mô tả:</label>
            <Input
              value={selectedRecord?.description}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Hướng dẫn sử dụng:</label>
            <Input
              value={selectedRecord?.usage}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  usage: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Danh mục:</label>
            <Select
              className="w-full"
              value={selectedRecord?.category}
              onChange={(value) =>
                setSelectedRecord({
                  ...selectedRecord,
                  category: value,
                })
              }
            >
              {categoryOptions.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Số lượng:</label>
            <Input
              type="number"
              min={0}
              value={selectedRecord?.stock}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  stock: e.target.value || "",
                })
              }
            />
          </div>
          {/* 
          <div className="mb-2">
            <label className="block mb-1">Ảnh:</label>
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Chọn file ảnh</Button>
            </Upload>
            {selectedRecord?.image && (
              <img
                src={selectedRecord.image}
                alt="Preview"
                style={{ marginTop: 10, width: 100, height: 100 }}
              />
            )}
          </div> */}
        </div>
      </Modal>
    </div>
  );
}

export default InventoryManager;
