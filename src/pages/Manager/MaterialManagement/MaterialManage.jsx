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
import { CloudHail } from "lucide-react";
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

  const {
    medicineClasstifyManager = [],
    loading,
    error,
  } = useSelector((state) => state.getMedicineClasstifyManager);
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
          <CommonBreadcrumb role={"Manager"} page={"materialManage"} />
        </h1>

        <div className="grid grid-cols-2 gap-5 mt-5 w-[50%] pl-5 pr-5 font-kameron ">
          <div className="h-[120px] bg-white rounded-2xl">
            <p className="flex justify-center mt-5">Total Medicine</p>
            <p className="flex justify-center text-[50px]">99</p>
          </div>
          <div className="h-[120px] bg-white rounded-2xl">
            <p className="flex justify-center mt-5">Out of Stock</p>
            <p className="flex justify-center text-[50px]">99</p>
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <div className="flex bg-[#F3F3F3] font-kameron w-[350px] h-10 items-center rounded-md ml-5">
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
              type="secondary"
              className="!bg-black hover:!bg-gray-600"
              onClick={() => setOpen(true)}
            >
              <p className="text-white font-serif p-1">+ Import Medicine</p>
            </Button>
          )}

          {click === "import" && (
            <div className="flex gap-3">
              <Button
                type="secondary"
                className="!bg-black hover:!bg-gray-600"
                onClick={() => setOpen(true)}
              >
                <p className="text-white font-serif p-1">
                  + Add medicine for student
                </p>
              </Button>

              <Button
                type="secondary"
                className="!bg-[#406AFF] hover:!bg-[#2457f3]"
                onClick={() => setOpenCategoryModal(true)}
              >
                <p className="text-white font-serif p-1">+ Add new category</p>
              </Button>
            </div>
          )}
        </div>

        <div className="pl-5 mt-5 flex gap-5">
          <Input
            style={{ borderRadius: "7px", width: "300px" }}
            placeholder="Search drugs, materials..."
          />
          <Button className="!bg-[#90A8B0] !hover:bg-gray-600" type="secondary">
            <p className="text-white font-kameron">Search</p>
          </Button>
        </div>

        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5 mb-10">
          <Outlet />
        </div>

        {/* ======== Modal for Import Inventory ======== */}
        {click === "inventory" && (
          <Modal
            open={open}
            style={{ marginTop: 110 }}
            onCancel={() => setOpen(false)}
            footer={false}
          >
            <h1 className="font-serif text-2xl flex justify-center">
              Import medicine/medical supplies
            </h1>

            <div className="font-serif">
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Name of medicine/supplies
              </h1>
              <Input
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className=" font-serif">
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Quantity imported
                </h1>
                <Input
                  type="number"
                  placeholder="Enter number"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            <div className="font-serif">
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Category
              </h1>
              <Select
                className="w-full"
                placeholder="Select category"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categoryOptions.map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Description
              </h1>
              <Input
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <h1 className="text-[17px] font-medium font-kameron mt-3 ">
                Usage
              </h1>
              <TextArea
                placeholder="Note if you have"
                onChange={(e) => setUsage(e.target.value)}
              />
            </div>

            <div className="font-serif mt-3">
              <h1 className="text-[17px] font-medium font-kameron">
                Upload Image
              </h1>
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={(info) => {
                  // Lấy file đầu tiên
                  const file = info.fileList[0]?.originFileObj;
                  setImage(file);
                }}
              >
                <Button>Click to Upload</Button>
              </Upload>
            </div>

            <div className="mt-5 flex justify-end gap-3 font-serif">
              <Button
                type="secondary"
                className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                onClick={() => setOpen(false)}
              >
                <p className="text-white text-xl font-serif p-1">Cancel</p>
              </Button>
              <Button
                type="secondary"
                className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
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
                  setOpen(false);
                }}
              >
                <p className="text-white text-xl font-serif p-1">Save</p>
              </Button>
            </div>
          </Modal>
        )}

        {/* ======== Modal for Add Medicine  ======== */}
        {click === "import" && (
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={false}
            style={{ marginTop: 110 }}
          >
            <h1 className="font-serif text-2xl flex justify-center mb-4">
              Add New Medicine
            </h1>
            {/* Upload Image */}
            <div>
              <label className="text-[16px] font-medium">Image *</label>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  setNewMedicineImage(file); // Lưu file gốc, không đọc base64 nữa
                  return false; // Ngăn tự upload
                }}
              >
                {newMedicineImage ? (
                  <img
                    src={URL.createObjectURL(newMedicineImage)}
                    alt="medicine preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Button>Upload Image</Button>
                )}
              </Upload>
            </div>

            <div className="grid grid-cols-2 gap-4 font-serif">
              {/* Name */}
              <div>
                <label className="text-[16px] font-medium">
                  Medicine Name *
                </label>
                <Input
                  placeholder="Enter medicine name"
                  onChange={(e) => setMedicineName(e.target.value)}
                  value={medicineName}
                />
              </div>

              {/* Stock */}
              <div>
                <label className="text-[16px] font-medium">Stock *</label>
                <Input
                  type="number"
                  placeholder="Enter stock quantity"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="text-[16px] font-medium">Description</label>
                <TextArea
                  placeholder="e.g., Provides vitamin C for the body"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-[16px] font-medium">Type *</label>
                <Select
                  placeholder="Choose type"
                  className="w-full"
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

              {/* Usage */}
              <div className="col-span-2">
                <label className="text-[16px] font-medium">Usage *</label>
                <TextArea
                  placeholder="e.g., Take one pill after meal"
                  onChange={(e) => setUsage(e.target.value)}
                  value={usage}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3 font-serif">
              <Button
                className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                onClick={() => setOpen(false)}
              >
                <p className="text-white text-xl font-serif p-1">Cancel</p>
              </Button>
              <Button
                className=" bg-[#39fa39] "
                onClick={async () => {
                  try {
                    let classifyIDToUse = null;

                    if (selectedClassify === "Other") {
                      const newClassifyData = await dispatch(
                        postManagerClasstify({
                          body: { name: newClassify },
                          limit: 8,
                          page: 1,
                        })
                      ).unwrap();
                      classifyIDToUse = String(newClassifyData.id);
                    } else {
                      classifyIDToUse = String(selectedClassifyID);
                    }
                    if (!classifyIDToUse || classifyIDToUse === "undefined") {
                      toast.error("Bạn chưa chọn hoặc thêm loại thuốc hợp lệ!");
                      return;
                    }

                    dispatch(
                      postManagerMedicine({
                        name: medicineName,
                        stock,
                        description,
                        type: type?.toUpperCase(),
                        classifyID: classifyIDToUse,
                        usage,
                        image: newMedicineImage,
                      })
                    );
                    toast.success("Tạo thuốc thành công!");
                    resetForm();
                    setOpen(false);
                  } catch (err) {
                    console.error("Failed to save:", err);
                  }
                }}
              >
                <p className="text-white ]  text-xl font-serif p-1">Save</p>
              </Button>
            </div>
          </Modal>
        )}
        {/* ======== Modal for Add CategoryCategory  ======== */}

        {click === "import" && (
          <Modal
            open={openCategoryModal}
            onCancel={() => setOpenCategoryModal(false)}
            footer={null}
            title="Add New Medicine Category"
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
                              limit: 8,
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
