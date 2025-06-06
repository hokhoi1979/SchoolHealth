import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Input, Select, Modal } from "antd";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import TextArea from "antd/es/input/TextArea";
import { AppFooter } from "../../../components/Footer/AppFooter";

function MaterialManage() {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState("inventory"); // ✅ Sửa từ "inventoryManager" → "inventory"
  let material = [
    {
      total: "79",
      stock: "99",
    },
  ];

  useEffect(() => {
    console.log(material);
  }, []);

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
              <div
                className={`hover:bg-white p-1 rounded-md ${
                  click === "medicineManager" ? "bg-white text-black" : ""
                }`}
              >
                <Link
                  onClick={() => setClick("medicineManager")}
                  to={"medicineManager"}
                >
                  Drugs for Student
                </Link>
              </div>
            </div>
          </div>

          {(click === "inventory" || click === "import") && (
            <Button
              type="secondary"
              className="!bg-black hover:!bg-gray-600"
              onClick={() => setOpen(true)}
            >
              <p className="text-white font-serif p-1">
                {click === "inventory"
                  ? "+ Import Medicine"
                  : "+ Add medicine for student"}
              </p>
            </Button>
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

        {/* ======== Modal for Add Medicine to Student ======== */}
        {click === "import" && (
          <Modal
            open={open}
            style={{ marginTop: 110 }}
            onCancel={() => setOpen(false)}
            footer={false}
          >
            <h1 className="font-serif text-2xl flex justify-center">
              Add medicine for student
            </h1>

            <div className="grid grid-cols-2 gap-3 font-serif">
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Enter ID student
                </h1>
                <Input placeholder="Enter ID" />
              </div>
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Enter Name student
                </h1>
                <Input placeholder="Enter Name" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-serif">
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Enter grade
                </h1>
                <Input placeholder="Enter Grade" />
              </div>
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Choose medicine/ medical
                </h1>
                <Select
                  placeholder="--Choose medicine/medical--"
                  className="w-full"
                >
                  <Select.Option value="Paracetamol 250mg">
                    Paracetamol 250mg
                  </Select.Option>
                  <Select.Option value="Betadine 100ml">
                    Betadine 100ml
                  </Select.Option>
                  <Select.Option value="Band-Aid">Band-Aid</Select.Option>
                  <Select.Option value="Cough medicine">
                    Cough medicine
                  </Select.Option>
                  <Select.Option value="Medical cotton">
                    Medical cotton
                  </Select.Option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-serif">
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Quantity imported
                </h1>
                <Input type="number" placeholder="Enter number" />
              </div>
              <div>
                <h1 className="text-[17px] font-medium font-kameron mt-3">
                  Dosage
                </h1>
                <Input placeholder="Enter dosage" />
              </div>
            </div>

            <div>
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Status
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
      </div>

      <AppFooter />
    </div>
  );
}

export default MaterialManage;
