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
    if (stock > 50) return "Bình thường";
    if (stock <= 50 && stock > 20) return "Cần bổ sung";
    return "Sắp hết";
  };

  useEffect(() => {
    // Ví dụ fix cứng nếu enum có sẵn:
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
          <div className="text-center text-lg font-semibold text-gray-900">
            Cập nhật thông tin
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
            className="rounded-md px-4 py-1 text-sm"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedRecord(null);
            }}
          >
            Hủy
          </Button>,
          <Button
            key="update"
            type="primary"
            className="bg-blue-600 hover:bg-blue-700 border-none rounded-md px-4 py-1 text-sm"
            onClick={handleUpdate}
          >
            Cập nhật
          </Button>,
        ]}
        centered
        width={460}
        className="custom-update-modal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-4">
          {/* Tên thuốc */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Tên thuốc <span className="text-red-500">*</span>
            </label>
            <Input
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
              value={selectedRecord?.name}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, name: e.target.value })
              }
            />
          </div>

          {/* Mô tả */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Mô tả
            </label>
            <Input
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
              value={selectedRecord?.description}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Hướng dẫn sử dụng */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Hướng dẫn sử dụng
            </label>
            <Input
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
              value={selectedRecord?.usage}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, usage: e.target.value })
              }
            />
          </div>

          {/* Danh mục */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Danh mục
            </label>
            <Select
              className="w-full text-sm"
              dropdownClassName="text-sm"
              popupClassName="text-sm"
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

          {/* Số lượng */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Số lượng
            </label>
            <Input
              type="number"
              min={0}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
              value={selectedRecord?.stock}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  stock: e.target.value || "",
                })
              }
            />
          </div>

          {/* Ảnh minh họa */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Ảnh minh họa
            </label>
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button
                icon={<UploadOutlined />}
                className="rounded-md text-sm bg-white hover:bg-gray-50"
              >
                Chọn ảnh
              </Button>
            </Upload>

            {previewImage && (
              <div className="flex justify-center mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-40 h-28 rounded-lg border object-cover shadow-md"
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
