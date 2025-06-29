import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  Table,
  Space,
  Tooltip,
  Upload,
  Select,
  Pagination,
  notification,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import "./style1.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicineClasstifyManager } from "../../../redux/manager/GetManagerMedineClassify/getManagerMedicineClassifySlice";
import { fetchDetailManagerClassify } from "../../../redux/manager/GetDetallManagerClassify/getDetailManagerClassifySlice";
import {
  putManagerClassify,
  putManagerClassifyFail,
} from "../../../redux/manager/UpdateDetailClassifyManager/updateDetailClassifyManagerSlice";
import { deleteManagerMedicineClassify } from "../../../redux/manager/DeleteManagerClassify/deleteManagerMedicineClassifySlice";
import { deleteMedicineManager } from "../../../redux/manager/DeleteManagerMedicine/deleteManagerMedicineSlice";
import toast from "react-hot-toast";
import { postManagerClasstify } from "../../../redux/manager/CreateManagerClassify/createManagerClassifySlice";
const { Option } = Select;

function ImportManager() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [total, setTotal] = useState(0);
  const [detail, setDetail] = useState([]);
  const [selectedClassifyID, setSelectedClassifyID] = useState("");
  const [selectedClassify, setSelectedClassify] = useState("");
  const [newClassify, setNewClassify] = useState("");
  const paginatedCategories = categories;

  const { detailManagerClassify = [] } = useSelector(
    (state) => state.getDetailManagerClassify
  );
  useEffect(() => {
    dispatch(fetchDetailManagerClassify());
  }, [dispatch]);

  useEffect(() => {
    const detail = detailManagerClassify?.data?.medicines || [];
    const format = detail.map((item) => ({
      id: item?.id,
      name: item?.name,
      description: item?.description,
      stock: item?.stock,
      type: item?.type,
      usage: item?.usage,
      image: item?.image,
      classifyID: selectedCategory?.id || "",
      status: updateStatus(item?.stock),
    }));

    setDetail(format);
  }, [detailManagerClassify]);

  const {
    medicineClasstifyManager = [],
    loading,
    error,
  } = useSelector((state) => state.getMedicineClasstifyManager);

  useEffect(() => {
    const rawList = medicineClasstifyManager?.data?.medicineClassify || [];
    const format = rawList.map((item) => ({
      id: item.id,
      name: item.name,
      medicinesCount: item._count?.medicines || 0,
    }));

    setTotal(medicineClasstifyManager?.data?.pagination?.total || 0);
    setCategories(format);
  }, [medicineClasstifyManager]);

  useEffect(() => {
    dispatch(
      fetchMedicineClasstifyManager({ page: currentPage, limit: pageSize })
    );
  }, [dispatch, currentPage, pageSize]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const paginatedCategories = categories;

  const updateStatus = (stock) => {
    if (stock > 50) return "Normal";
    if (stock <= 50 && stock > 20) return "Needs Restocking";
    if (stock <= 20) return "Running Low";
  };

  const showModal = (category) => {
    console.log("===> showModal: category = ", category);
    if (!category?.id) {
      console.error("🚨 Category ID is missing! Cannot fetch detail");
      return; // Chặn luôn, tránh gọi BEs
    }

    setSelectedCategory(category);
    setIsModalVisible(true);
    dispatch(
      fetchDetailManagerClassify({ id: category.id, page: 1, limit: 8 })
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
    setSelectedMedicine(null);
  };

  const handleFieldChange = (field, value) => {
    setSelectedMedicine({
      ...selectedMedicine,
      [field]: value,
    });
  };

  const handleUpdate = async () => {
    if (!selectedMedicine?.id) {
      console.error("No medicine selected! Cannot update.");
      return;
    }

    let classifyIDToUse =
      selectedMedicine.classifyID || selectedClassifyID || "";

    // Nếu chọn "Other" thì tạo mới classify
    if (selectedClassify === "Other") {
      if (!newClassify?.trim()) {
        toast.error("Bạn chưa nhập tên loại thuốc mới!");
        return;
      }

      await new Promise((resolve) => {
        dispatch(
          postManagerClasstify({
            body: { name: newClassify.trim() },
            page: 1,
            limit: 8,
            onSuccess: (id) => {
              classifyIDToUse = id;
              console.log("==> New classify ID created for update:", id);
              resolve();
            },
          })
        );
      });

      if (!classifyIDToUse) {
        toast.error("Không thể lấy ID của classify mới!");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", selectedMedicine.name);
    formData.append("stock", selectedMedicine.stock);
    formData.append("usage", selectedMedicine.usage);
    formData.append("description", selectedMedicine.description);
    formData.append("type", selectedMedicine.type);
    formData.append("classifyID", classifyIDToUse);

    if (selectedMedicine.image instanceof File) {
      formData.append("image", selectedMedicine.image);
    }

    dispatch(
      putManagerClassify({
        id: selectedMedicine.id,
        formData: formData,
      })
    );

    console.log("Updating with formData:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": ", pair[1]);
    }

    setSelectedMedicine(null);
    setSelectedClassifyID(null);
    setNewClassify("");
    setIsModalVisible(false);
  };

  const { deletedMedicineClassify } = useSelector(
    (state) => state.deleteManagerMedicineClassify
  );

  useEffect(() => {
    if (deletedMedicineClassify && !loading && !error) {
      notification.success({
        message: "Xóa thành công",
        description: "Phân loại thuốc đã được xóa thành công.",
      });
    }
    if (error && !loading) {
      notification.error({
        message: "Xóa thất bại",
        description: error,
      });
    }
  }, [deletedMedicineClassify, loading, error]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "ID",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image, record) => (
        <div>
          <img src={record?.image} alt="" />
        </div>
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
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 200,
    },
    {
      title: "Update",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Update">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => {
                setSelectedMedicine(record);
                setSelectedClassifyID(record.classifyID);
                const found = categories.find(
                  (item) => item.id === record.classifyID
                );
                setSelectedClassify(found?.name || "");
              }}
            >
              Update
            </Button>
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
            title={`Are you sure to delete "${record.name}"?`}
            okText="Yes"
            cancelText="No"
            okType="danger"
            onConfirm={() => {
              console.log("Deleting medicine ID:", record.id);
              dispatch(deleteMedicineManager({ id: record.id }));
              setIsModalVisible(false);
            }}
          >
            <Button className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mt-4 w-full px-4 font-kameron">
        {categories.map((category) => (
          <div
            key={category?.id}
            className="h-[100px] bg-white rounded-xl shadow hover:shadow-md cursor-pointer relative  transition-shadow"
          >
            <div
              className="flex flex-col items-center justify-center h-full"
              onClick={() => showModal(category)}
            >
              <p className="text-sm font-semibold text-gray-700 mb-1 text-center px-2">
                {category?.name}
              </p>
              <p className="text-3xl font-bold ">{category?.medicinesCount}</p>
            </div>

            <Popconfirm
              title={`Are you sure DELETE "${category.name}"?`}
              okText="Delete"
              cancelText="Cancel"
              okType="danger"
              onConfirm={() => {
                dispatch(
                  deleteManagerMedicineClassify({
                    id: category.id,
                    page: currentPage,
                    limit: pageSize,
                  })
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="absolute right-2 bottom-2 text-red-400 hover:text-red-600"
              >
                <path
                  fill="currentColor"
                  d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </Popconfirm>
          </div>
        ))}
      </div>
      <div className="w-full h-10"></div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page) => {
          setCurrentPage(page);
        }}
        showSizeChanger={false}
        className="mt-[20px] flex justify-center "
      />

      {/* Category Modal */}
      <Modal
        title={`Medicines in ${selectedCategory?.name}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
      >
        <Table
          columns={columns}
          dataSource={detail}
          rowKey="id"
          pagination={false}
        />
      </Modal>

      {/* Update Medicine Modal */}
      {selectedMedicine && (
        <Modal
          title={
            <div className="text-xl font-semibold text-center text-gray-800">
              Update Medicine: {selectedMedicine?.name}
            </div>
          }
          open={!!selectedMedicine}
          onCancel={() => setSelectedMedicine(null)}
          footer={[
            <Button
              key="cancel"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => setSelectedMedicine(null)}
            >
              Cancel
            </Button>,
            <Button
              key="update"
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleUpdate}
            >
              Update
            </Button>,
          ]}
          width={700}
        >
          <div className="flex flex-col md:flex-row gap-6 mt-2">
            {/* Upload ảnh bên trái */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Image
              </label>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const newImage = e.target.result;
                    handleFieldChange("image", file);
                    handleFieldChange("previewImage", newImage);
                  };
                  reader.readAsDataURL(file);
                  return false;
                }}
              >
                <div className="w-40 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-blue-400 cursor-pointer overflow-hidden">
                  {selectedMedicine?.previewImage || selectedMedicine?.image ? (
                    <img
                      src={
                        selectedMedicine?.previewImage ||
                        selectedMedicine?.image
                      }
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PlusOutlined className="text-2xl text-gray-400" />
                  )}
                </div>
              </Upload>
            </div>

            {/* Thông tin thuốc bên phải */}
            <div className="w-full md:w-2/3 grid grid-cols-1 gap-4 font-serif">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  value={selectedMedicine?.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <Input
                  type="number"
                  min={0}
                  value={selectedMedicine?.stock}
                  onChange={(e) =>
                    handleFieldChange("stock", parseInt(e.target.value) || 0)
                  }
                  className="text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usage
                </label>
                <Input
                  value={selectedMedicine?.usage}
                  onChange={(e) => handleFieldChange("usage", e.target.value)}
                  className="text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <TextArea
                  rows={2}
                  value={selectedMedicine?.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  className="text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <Select
                  className="w-full text-sm"
                  value={selectedMedicine?.type || "PELLETS"}
                  onChange={(value) => handleFieldChange("type", value)}
                >
                  <Option value="PELLETS">Pellets</Option>
                  <Option value="BOTTLE">Bottle</Option>
                  <Option value="JAR">Jar</Option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classify Name *
                </label>
                <Select
                  placeholder="Select classify name"
                  className="w-full text-sm"
                  value={selectedClassifyID}
                  onChange={(value) => {
                    if (value === "Other") {
                      setSelectedClassifyID("Other");
                      setSelectedClassify("Other");
                    } else {
                      const found = categories.find(
                        (item) => item.id === value
                      );
                      setSelectedClassifyID(value);
                      setSelectedClassify(found?.name || "");
                    }
                  }}
                >
                  {categories.map((item) => (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  ))}
                  <Option value="Other">Other</Option>
                </Select>
              </div>

              {selectedClassify === "Other" && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Classify Name
                  </label>
                  <Input
                    placeholder="Enter new classify name"
                    value={newClassify}
                    onChange={(e) => setNewClassify(e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ImportManager;
