import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Input, Select, Modal } from "antd";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import TextArea from "antd/es/input/TextArea";
import { AppFooter } from "../../../components/Footer/AppFooter";

function MaterialManage() {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState("inventory");
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  let material = [
    {
      total: "79",
      stock: "99",
    },
  ];
  const [selectedClassify, setSelectedClassify] = useState("");
  const [newClassify, setNewClassify] = useState("");

  const classifyOptions = [
    "Painkiller",
    "Antibiotic",
    "Supplement",
    "Antiseptic",
    "Other",
  ];

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
                <Link
                  onClick={() => setClick("inventory")}
                  to={"inventoryManager"}
                >
                  Inventory
                </Link>
              </div>
              <div
                className={`hover:bg-white p-1 rounded-md ${
                  click === "import" ? "bg-white text-black" : ""
                }`}
              >
                <Link onClick={() => setClick("import")} to={"importManager"}>
                  Import
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
                Import medicine/ medical
              </h1>
              <Input />
            </div>

            <div className="grid grid-cols-2 gap-3 font-serif">
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Quantity imported
                </h1>
                <Input type="number" placeholder="Enter number" />
              </div>
              <div className="w-[100px] pt-[38px]">
                <Select className="w-full">
                  <Select.Option value="pellets">Pellets</Select.Option>
                  <Select.Option value="bottle">Bottle</Select.Option>
                  <Select.Option value="jar">Jar</Select.Option>
                </Select>
              </div>
            </div>

            <div>
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Description
              </h1>
              <Input />
            </div>

            <div>
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Note
              </h1>
              <TextArea placeholder="Note if you have" />
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
                onClick={() => setOpen(false)}
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

            <div className="grid grid-cols-2 gap-4 font-serif">
              {/* Name */}
              <div>
                <label className="text-[16px] font-medium">
                  Medicine Name *
                </label>
                <Input placeholder="Enter medicine name" />
              </div>

              {/* Stock */}
              <div>
                <label className="text-[16px] font-medium">Stock *</label>
                <Input type="number" placeholder="Enter stock quantity" />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="text-[16px] font-medium">Description</label>
                <TextArea placeholder="e.g., Provides vitamin C for the body" />
              </div>

              {/* Type */}
              <div>
                <label className="text-[16px] font-medium">Type *</label>
                <Select placeholder="Choose type" className="w-full">
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
                  value={selectedClassify}
                  onChange={(value) => setSelectedClassify(value)}
                >
                  {classifyOptions.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
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
                <TextArea placeholder="e.g., Take one pill after meal" />
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
                className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                onClick={() => {
                  // Handle save logic here
                  console.log({
                    classifyID: selectedClassify,
                    newClassifyName:
                      selectedClassify === "Other" ? newClassify : null,
                  });
                  setOpen(false);
                }}
              >
                <p className="text-white text-xl font-serif p-1">Save</p>
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
                  onClick={() => {
                    if (categoryName.trim()) {
                      if (!classifyOptions.includes(categoryName)) {
                        setClassifyOptions([...classifyOptions, categoryName]);
                        setSelectedClassify(categoryName);
                      }
                      setCategoryName("");
                      setOpenCategoryModal(false);
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
