import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";

function Materials() {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState("inventory");
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-xl font-inria font-medium mb-4">
            <CommonBreadcrumb role={"Nurse"} page={"materials"} />
          </h1>

          <div className="grid grid-cols-2 gap-5 mt-5 w-[50%] pl-5 pr-5 font-kameron ">
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Total Medicine</p>
              <p className="flex justify-center text-[50px]">7</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Out of Stock</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex bg-[#F3F3F3] font-kameron w-[350px] h-10 items-center rounded-md ml-5">
              <div className="m-auto flex gap-5">
                <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "inventory"
                      ? "bg-white rounded-md text-black"
                      : ""
                  }`}
                >
                  <Link onClick={() => setClick("inventory")} to={""}>
                    Inventory
                  </Link>
                </div>
                <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "import" ? "bg-white rounded-md text-black" : ""
                  }`}
                >
                  <Link onClick={() => setClick("import")} to={"import"}>
                    Import
                  </Link>
                </div>
                {/* <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "export" ? "bg-white rounded-md text-black" : ""
                  }`}
                >
                  <Link onClick={() => setClick("export")} to={"export"}>
                    Export
                  </Link>
                </div> */}
                <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "medicine" ? "bg-white rounded-md text-black" : ""
                  }`}
                >
                  <Link onClick={() => setClick("medicine")} to={"medicine"}>
                    Drugs for Student
                  </Link>
                </div>
              </div>
            </div>

            {click === "inventory" && (
              <>
                {" "}
                <Button
                  type="secondary"
                  className="!bg-black hover:!bg-gray-600"
                  onClick={() => setOpen(true)}
                >
                  <p className="text-white font-serif p-1">+ Import Medicine</p>
                </Button>
              </>
            )}

            {click === "medicine" && (
              <>
                {" "}
                <Button
                  type="secondary"
                  className="!bg-black hover:!bg-gray-600"
                  onClick={() => setOpen(true)}
                >
                  <p className="text-white font-serif p-1">
                    + Add medicine for student
                  </p>
                </Button>
              </>
            )}
          </div>
          <div className="pl-5 mt-5 flex gap-5">
            <Input
              style={{ borderRadius: "7px", width: "300px" }}
              placeholder="Search drugs, materials..."
            />
            <Button
              className="!bg-[#90A8B0] !hover:bg-gray-600"
              type="secondary"
            >
              <p className="text-white font-kameron"> Search</p>
            </Button>
          </div>

          <div className="flex-1 overflow-auto mt-5 ml-5 mr-5 mb-10">
            <Outlet />
          </div>
          <div className="mt-20"></div>

          {click === "inventory" && (
            <>
              {" "}
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

                <div className="grid grid-cols-2 gap-3 font-serif">
                  <div>
                    <h1 className="text-[17px] font-medium font-kameron mt-3">
                      Quantity imported
                      <Input type="number" placeholder="Enter number" />
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[17px] font-medium font-kameron mt-3">
                      Expiry
                      <Input type="date" />
                    </h1>
                  </div>
                </div>

                <div>
                  <h1 className="text-[17px] font-medium font-kameron mt-3 font-serif">
                    Note
                    <TextArea placeholder="Note if you have" />
                  </h1>
                </div>

                <div className="mt-5 flex justify-between font-serif">
                  <div></div>
                  <div className="flex gap-3">
                    <Button
                      type="secondary"
                      className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                      onClick={() => setOpen(false)}
                    >
                      <p className="text-white text-xl font-serif p-1">
                        Cancel
                      </p>
                    </Button>
                    <Button
                      type="secondary"
                      className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                      onClick={() => setOpen(true)}
                    >
                      <p className="text-white text-xl font-serif p-1">Save</p>
                    </Button>
                  </div>
                </div>
              </Modal>
            </>
          )}

          {click === "medicine" && (
            <>
              {" "}
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
                      <Input type="text" placeholder="Enter ID" />
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[17px] font-medium font-kameron mt-3">
                      Enter Name student
                      <Input type="text" placeholder="Enter Name" />
                    </h1>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-serif">
                  <div>
                    <h1 className="text-[17px] font-medium font-kameron mt-3">
                      Enter grade
                      <Input type="text" placeholder="Enter Grade" />
                    </h1>
                  </div>
                  <div className="font-serif">
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
                      <Input type="number" placeholder="Enter number" />
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[17px] font-medium font-kameron mt-3">
                      Dosage
                      <Input type="text" placeholder="Enter dosage" />
                    </h1>
                  </div>
                </div>

                <div>
                  <h1 className="text-[17px] font-medium font-kameron mt-3 font-serif">
                    Status
                    <TextArea placeholder="Note if you have" />
                  </h1>
                </div>

                <div className="mt-5 flex justify-between font-serif">
                  <div></div>
                  <div className="flex gap-3">
                    <Button
                      type="secondary"
                      className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                      onClick={() => setOpen(false)}
                    >
                      <p className="text-white text-xl font-serif p-1">
                        Cancel
                      </p>
                    </Button>
                    <Button
                      type="secondary"
                      className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                      onClick={() => setOpen(true)}
                    >
                      <p className="text-white text-xl font-serif p-1">Save</p>
                    </Button>
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>

        {/* Footer nằm dưới cùng */}
        <AppFooter />
      </div>
    </>
  );
}

export default Materials;
