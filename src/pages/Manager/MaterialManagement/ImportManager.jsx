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
      fetchDetailManagerClassify({ id: category.id, page: 1, limit: 100 })
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

  const handleUpdate = () => {
    if (selectedMedicine) {
      const formData = new FormData();
      if (!selectedMedicine?.id) {
        console.error("No medicine selected! Cannot update.");
        return;
      }
      formData.append("name", selectedMedicine.name);
      formData.append("stock", selectedMedicine.stock);
      formData.append("usage", selectedMedicine.usage);
      formData.append("description", selectedMedicine.description);
      formData.append("type", selectedMedicine.type);
      formData.append(
        "classifyID",
        selectedMedicine.classifyID || selectedClassifyID || ""
      );

      if (selectedMedicine.image instanceof File) {
        formData.append("image", selectedMedicine.image);
      }

      dispatch(
        putManagerClassify({
          id: selectedMedicine?.id,
          formData: formData,
        })
      );
      console.log(formData);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      setSelectedMedicine(null);
      setSelectedClassifyID(null);
      setNewClassify("");
    }
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
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Update">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setSelectedMedicine(record)}
            >
              Update
            </Button>
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
            title={`Are you sure to delete "${record.name}"?`}
            okText="Yes"
            cancelText="No"
            okType="danger"
            onConfirm={() => {
              console.log("Deleting medicine ID:", record.id);
              dispatch(deleteMedicineManager({ id: record.id }));
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
      <div className="grid grid-cols-4 gap-5 mt-5 w-full px-5 font-kameron">
        {categories.map((category) => (
          <div
            key={category?.id}
            className="h-[120px] bg-white rounded-2xl shadow-md cursor-pointer relative"
          >
            <p
              className="flex justify-center mt-5 text-lg font-semibold"
              onClick={() => showModal(category)}
            >
              {category?.name}
            </p>
            <p className="flex justify-center text-[50px] font-bold">
              {category?.medicinesCount}
            </p>

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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="absolute right-1 bottom-1"
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
        <Input
          placeholder="Search medicine by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <Table
          columns={columns}
          dataSource={detail}
          rowKey="id"
          pagination={false}
          bordered
        />
      </Modal>

      {/* Update Medicine Modal */}
      {selectedMedicine && (
        <Modal
          title={`Update medicine: ${selectedMedicine?.name}`}
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
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1 font-medium">Image</label>
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
                {selectedMedicine?.previewImage || selectedMedicine?.image ? (
                  <img
                    src={
                      selectedMedicine?.previewImage
                        ? selectedMedicine?.previewImage
                        : selectedMedicine?.image
                    }
                    alt="medicine"
                    style={{ width: 150, height: 100 }}
                  />
                ) : (
                  <Button icon={<PlusOutlined />}>Upload</Button>
                )}
              </Upload>
            </div>

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
                min={0}
                onChange={(e) =>
                  handleFieldChange("stock", parseInt(e.target.value) || 0)
                }
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
              <div>
                <label className="text-[16px] font-medium">
                  Classify Name *
                </label>
                <Select
                  placeholder="Select classify name"
                  className="w-full"
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
                  <label className="text-[16px] font-medium">
                    New Classify Name
                  </label>
                  <Input
                    placeholder="Enter new classify name"
                    value={newClassify}
                    onChange={(e) => setNewClassify(e.target.value)}
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
