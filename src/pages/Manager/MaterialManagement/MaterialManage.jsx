import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Input, Select, Modal, Upload, message } from "antd";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import TextArea from "antd/es/input/TextArea";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { useDispatch, useSelector } from "react-redux";
import { postManagerClasstify } from "../../../redux/manager/CreateManagerClassify/createManagerClassifySlice";
import { fetchMedicineClasstifyManager } from "../../../redux/manager/GetManagerMedineClassify/getManagerMedicineClassifySlice";
import { postManagerMedicine } from "../../../redux/manager/CreateManagerMedicine/createManagerMedicineSlice";
import { CloudHail, FolderPlus, Package, Pill } from "lucide-react";
import { postManagerSupply } from "../../../redux/manager/CreateManagerSuppy/createManagerSupplySlice";
import toast from "react-hot-toast";

function MaterialManage() {
  const [medicineName, setMedicineName] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [usage, setUsage] = useState("");
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState("inventory");
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [newMedicineImage, setNewMedicineImage] = useState(null);
  const dispatch = useDispatch();
  const [saveLoading, setSaveLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedClassifyID, setSelectedClassifyID] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [classifyOptions, setClassifyOptions] = useState([]);
  const [store, setStore] = useState([]);
  const [newClassifyToFind, setNewClassifyToFind] = useState(null);
  const [classifyIDToUse, setClassifyIDToUse] = useState(null);

  useEffect(() => {
    if (open) {
      dispatch(fetchMedicineClasstifyManager({ page: 1, limit: 100 }));
    }
  }, [open]);

  const { classtify } = useSelector(
    (state) => state.getMedicineClasstifyManager
  );
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

    setStore(format);
    console.log("List", store);
  }, [medicineClasstifyManager]);

  const { medicineSupplyManager = [] } = useSelector(
    (state) => state.getAllMedicineSupplyManager
  );

  useEffect(() => {
    const CATEGORY_ENUM = ["Vật tư", "Thiết bị", "Tiêu hao"];
    setCategoryOptions(CATEGORY_ENUM);
  }, []);

  useEffect(() => {
    const rawList = medicineClasstifyManager?.data?.medicineClassify || [];
    const format = rawList.map((item) => ({
      id: item.id,
      name: item.name,
      medicinesCount: item._count?.medicines || 0,
    }));

    setCategories(format);
  }, [medicineClasstifyManager]);

  const [selectedClassify, setSelectedClassify] = useState("");
  const [newClassify, setNewClassify] = useState("");
  const resetForm = () => {
    setMedicineName("");
    setStock(0);
    setDescription("");
    setType("");
    setUsage("");
    setSelectedClassify("");
    setSelectedClassifyID("");
    setNewClassify("");
    setNewMedicineImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-xl font-inria font-medium mb-4">
          <CommonBreadcrumb role={"Manager"} page={"materials"} />
        </h1>

        <div className="flex justify-between mt-5">
          <div className="flex bg-[#F3F3F3] font-kameron w-[200px] h-10 items-center rounded-md ml-5">
            <div className="m-auto flex gap-5">
              <div
                className={`hover:bg-white p-1 rounded-md ${
                  click === "inventory" ? "bg-white text-black" : ""
                }`}
              >
                <Link onClick={() => setClick("inventory")} to={""}>
                  Supply
                </Link>
              </div>
              <div
                className={`hover:bg-white p-1 rounded-md ${
                  click === "import" ? "bg-white text-black" : ""
                }`}
              >
                <Link onClick={() => setClick("import")} to={"importManager"}>
                  Medicine
                </Link>
              </div>
            </div>
          </div>

          {click === "inventory" && (
            <Button
              type="primary"
              size="large"
              className="!bg-gradient-to-r !from-slate-800 !to-black hover:!from-slate-700 hover:!to-gray-800 !border-none !shadow-lg hover:!shadow-xl !transition-all !duration-300 !rounded-xl !h-12 !px-6"
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-1">
                  <Package size={16} className="text-white" />
                </div>
                <span className="text-white font-semibold tracking-wide">
                  Import Supply
                </span>
              </div>
            </Button>
          )}

          {click === "import" && (
            <div className="flex gap-4">
              <Button
                type="primary"
                size="large"
                className="!bg-gradient-to-r !from-gray-900 !to-black hover:!from-gray-800 hover:!to-gray-700 !border-none !shadow-lg hover:!shadow-xl !transition-all !duration-300 !rounded-xl !h-12 !px-6"
                onClick={() => setOpen(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500 rounded-full p-1.5">
                    <Pill size={14} className="text-white" />
                  </div>
                  <span className="text-white font-semibold">
                    Add Medicine for Student
                  </span>
                </div>
              </Button>

              <Button
                type="primary"
                size="large"
                className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !border-none !shadow-lg hover:!shadow-xl !transition-all !duration-300 !rounded-xl !h-12 !px-6"
                onClick={() => setOpenCategoryModal(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-1.5">
                    <FolderPlus size={14} className="text-white" />
                  </div>
                  <span className="text-white font-semibold">
                    Add New Category
                  </span>
                </div>
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5 mb-10">
          <Outlet />
        </div>

        {/* ======== Modal for Import Inventory ======== */}
        {click === "inventory" && (
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={false}
            centered
            width={650}
            className="custom-import-supply-modal"
          >
            <div style={{ padding: "8px 0" }}>
              {/* Title */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "32px",
                  paddingBottom: "16px",
                  borderBottom: "2px solid #f0f0f0",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    fontFamily: "serif",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: "0 0 8px 0",
                  }}
                >
                  Import Medical Supply
                </h1>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                  Fill in the supply details below
                </p>
              </div>

              {/* Upload Image */}
              <div style={{ marginBottom: "24px", textAlign: "center" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "12px",
                    textAlign: "left",
                  }}
                >
                  Supply Image
                </label>
                <Upload
                  listType="picture"
                  maxCount={1}
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={(info) => {
                    const file = info.fileList[0]?.originFileObj;
                    setImage(file);
                  }}
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      style={{
                        width: "96px",
                        height: "96px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #e5e7eb",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                  ) : (
                    <Button
                      style={{
                        height: "96px",
                        width: "96px",
                        borderRadius: "8px",
                        border: "2px dashed #d1d5db",
                        backgroundColor: "#f9fafb",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      Upload Image
                    </Button>
                  )}
                </Upload>
              </div>

              {/* Grid Fields */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  fontFamily: "serif",
                }}
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name of Supply
                  </label>
                  <Input
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ height: 40, fontSize: 14, borderRadius: 6 }}
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity Imported
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    style={{ height: 40, fontSize: 14, borderRadius: 6 }}
                  />
                </div>

                {/* Category */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Select
                    className="w-full"
                    placeholder="Select category"
                    value={category}
                    onChange={(value) => setCategory(value)}
                    style={{ fontSize: 14 }}
                  >
                    {categoryOptions.map((cat) => (
                      <Select.Option key={cat} value={cat}>
                        {cat}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                {/* Description */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ height: 40, fontSize: 14, borderRadius: 6 }}
                  />
                </div>

                {/* Usage */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usage
                  </label>
                  <TextArea
                    rows={3}
                    placeholder="How to use..."
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                    style={{ fontSize: 14, borderRadius: 6 }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "20px",
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <Button
                  onClick={() => setOpen(false)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "500",
                    height: "40px",
                    width: "100px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    dispatch(
                      postManagerSupply({
                        name,
                        stock,
                        description,
                        usage,
                        category,
                        image,
                      })
                    );
                    setName("");
                    setStock("");
                    setDescription("");
                    setUsage("");
                    setCategory(null);
                    setImage(null);
                    setOpen(false);
                  }}
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "500",
                    height: "40px",
                    width: "100px",
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* ======== Modal for Add Medicine  ======== */}
        {click === "import" && (
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={false}
            centered
            width={650}
            className="custom-add-medicine-modal"
          >
            <div style={{ padding: "8px 0" }}>
              {/* Title */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "32px",
                  paddingBottom: "16px",
                  borderBottom: "2px solid #f0f0f0",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    fontFamily: "serif",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: "0 0 8px 0",
                  }}
                >
                  Add New Medicine
                </h1>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: "0",
                  }}
                >
                  Fill in the medicine details below
                </p>
              </div>

              {/* Upload Image */}
              <div style={{ marginBottom: "24px", textAlign: "center" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "12px",
                    textAlign: "left",
                  }}
                >
                  Medicine Image <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    setNewMedicineImage(file);
                    return false;
                  }}
                >
                  {newMedicineImage ? (
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={
                          URL.createObjectURL(newMedicineImage) ||
                          "/placeholder.svg"
                        }
                        alt="medicine preview"
                        style={{
                          width: "96px",
                          height: "96px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #e5e7eb",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </div>
                    </div>
                  ) : (
                    <Button
                      style={{
                        height: "96px",
                        width: "96px",
                        borderRadius: "8px",
                        border: "2px dashed #d1d5db",
                        backgroundColor: "#f9fafb",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      Upload Image
                    </Button>
                  )}
                </Upload>
              </div>

              {/* Grid Fields */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  fontFamily: "serif",
                }}
              >
                {/* Medicine Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Medicine Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Input
                    placeholder="Enter medicine name"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    style={{
                      fontSize: "14px",
                      borderRadius: "6px",
                      height: "40px",
                    }}
                  />
                </div>

                {/* Stock */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Stock <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter stock quantity"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    style={{
                      fontSize: "14px",
                      borderRadius: "6px",
                      height: "40px",
                    }}
                  />
                </div>

                {/* Type */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Type <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Select
                    placeholder="Choose type"
                    style={{
                      width: "100%",
                      fontSize: "14px",
                    }}
                    value={type}
                    onChange={(value) => setType(value)}
                  >
                    <Option value="PELLETS">Pellets</Option>
                    <Option value="BOTTLE">Bottle</Option>
                    <Option value="JAR">Jar</Option>
                  </Select>
                </div>

                {/* Classify Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Classify Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Select
                    placeholder="Select classify name"
                    style={{
                      width: "100%",
                      fontSize: "14px",
                    }}
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

                {/* Description */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Description
                  </label>
                  <TextArea
                    rows={3}
                    placeholder="e.g., Provides vitamin C for the body"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      fontSize: "14px",
                      borderRadius: "6px",
                      resize: "none",
                    }}
                  />
                </div>

                {/* New Classify Name */}
                {selectedClassify === "Other" && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      New Classify Name
                    </label>
                    <Input
                      placeholder="Enter new classify name"
                      value={newClassify}
                      onChange={(e) => setNewClassify(e.target.value)}
                      style={{
                        fontSize: "14px",
                        borderRadius: "6px",
                        height: "40px",
                      }}
                    />
                  </div>
                )}

                {/* Usage */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Usage <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <TextArea
                    rows={3}
                    placeholder="e.g., Take one pill after meal"
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                    style={{
                      fontSize: "14px",
                      borderRadius: "6px",
                      resize: "none",
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "20px",
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <Button
                  onClick={() => setOpen(false)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "500",
                    height: "40px",
                    width: "100px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      let classifyIDToUse = null;

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
                              limit: 100,
                              onSuccess: (id) => {
                                console.log("===> onSuccess with id:", id);
                                classifyIDToUse = id;
                                resolve();
                              },
                            })
                          );
                        });
                      } else {
                        classifyIDToUse = selectedClassifyID;
                      }

                      if (!classifyIDToUse) {
                        toast.error(
                          "Bạn chưa chọn hoặc tạo loại thuốc hợp lệ!"
                        );
                        return;
                      }

                      const typeToUse = type?.toUpperCase?.();
                      if (!typeToUse) {
                        toast.error("Loại thuốc không hợp lệ!");
                        return;
                      }

                      const medicineResult = await dispatch(
                        postManagerMedicine({
                          name: medicineName,
                          stock,
                          description,
                          type: typeToUse,
                          classifyID: classifyIDToUse,
                          usage,
                          image: newMedicineImage,
                        })
                      );

                      const medicinePayload = medicineResult?.payload;

                      if (!medicinePayload || medicinePayload?.error) {
                        toast.error(
                          "Tạo thuốc thất bại, kiểm tra lại thông tin!"
                        );
                        return;
                      }

                      resetForm();
                      setOpen(false);
                    } catch (err) {
                      console.error("Lỗi khi tạo thuốc:", err);
                      toast.error(
                        "Không thể tạo thuốc. Vui lòng kiểm tra lại!"
                      );
                    }
                  }}
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "500",
                    height: "40px",
                    width: "100px",
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>
        )}
        {/* ======== Modal for Add CategoryCategory  ======== */}

        {click === "import" && (
          <Modal
            open={openCategoryModal}
            onCancel={() => setOpenCategoryModal(false)}
            footer={null}
            title={
              <div className="text-xl font-bold text-center text-gray-800 font-serif">
                Add New Medicine Category
              </div>
            }
            style={{ marginTop: 110 }}
          >
            <div className="font-serif">
              <label className="block text-[16px] font-medium mb-2">
                Category Name *
              </label>
              <Input
                placeholder="e.g., Stomach pain"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                  onClick={() => {
                    setCategoryName("");
                    setOpenCategoryModal(false);
                  }}
                >
                  <p className="text-white text-base font-serif">Cancel</p>
                </Button>
                <Button
                  className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                  onClick={async () => {
                    if (categoryName.trim()) {
                      if (!classifyOptions.includes(categoryName)) {
                        try {
                          setSaveLoading(true);
                          await dispatch(
                            postManagerClasstify({
                              body: { name: categoryName },
                              limit: 100,
                              page: 1,
                            })
                          );
                          window.success("Create Success");
                          setClassifyOptions([
                            ...classifyOptions,
                            categoryName,
                          ]);
                          setSelectedClassify(categoryName);
                        } catch (err) {
                          message.error("Error Create");
                        } finally {
                          setSaveLoading(false);
                          setCategoryName("");
                          setOpenCategoryModal(false);
                        }
                      } else {
                        setCategoryName("");
                        setOpenCategoryModal(false);
                      }
                    }
                  }}
                >
                  <p className="text-white text-base font-serif">Save</p>
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <AppFooter />
    </div>
  );
}

export default MaterialManage;
