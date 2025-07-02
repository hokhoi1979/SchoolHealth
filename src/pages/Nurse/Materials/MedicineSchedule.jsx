import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Tooltip,
  Space,
  Modal,
  Button,
  Input,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicineSchedule } from "../../../redux/materialsNurse/getMedicineSchedule/getMedicineScheduleSlice";
import { giveMedicineStudent } from "../../../redux/materialsNurse/giveMedicineStudent/giveMedicineStudentSlice";
import { Select } from "antd";
import { fetchLowStock } from "../../../redux/materialsNurse/getLowStock/getLowStockSlice";
import { patchQuantityStock } from "../../../redux/materialsNurse/patchMedicineStock/patchMedicineStockSlice";
const { Option } = Select;

const MedicineSchedule = () => {
  const [open, setOpen] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [select, setSelect] = useState([]);
  const [type, setType] = useState("schedule");

  const dispatch = useDispatch();
  const { lowStock = [] } = useSelector((state) => state.getLowStock);

  const { medicineSchedule } = useSelector((state) => state.medicineSchedule);

  useEffect(() => {
    dispatch(fetchMedicineSchedule());
    dispatch(fetchLowStock());
  }, [dispatch]);

  const rawData = medicineSchedule?.data || [];
  const lowStockData = lowStock?.data || [];

  const handleCreate = () => {
    const id = select.id;
    const payload = {
      timeToTake: select.timeToTake,
      note: select.note,
    };

    dispatch(giveMedicineStudent({ id: id, body: payload }));
    setOpen(false);
  };

  const handleQuantity = () => {
    const id = select?.medicineItemID;
    const payload = {
      quantityToAdd: String(quantity),
    };

    dispatch(patchQuantityStock({ id: id, body: payload }));
    setOpenStock(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Student Code",
      dataIndex: "student_code",
      key: "student_code",
      align: "center",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      align: "center",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },
    {
      title: "Medicine",
      dataIndex: "medicineName",
      key: "medicineName",
      align: "center",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      align: "center",
    },
    {
      title: "Time to Take",
      dataIndex: "timeToTake",
      key: "timeToTake",
      align: "center",
    },
    {
      title: "Already Taken",
      dataIndex: "alreadyTaken",
      key: "alreadyTaken",
      align: "center",
      render: (taken) =>
        taken ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (note) => note || <i style={{ color: "#aaa" }}>None</i>,
    },
    {
      title: "Quantity Remaining",
      dataIndex: "quantityRemaining",
      key: "quantityRemaining",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <div style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                onClick={() => {
                  setSelect(record);
                  setOpen(true);

                  console.log("RECORD:", record);
                }}
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
  ];

  const lowStockColumns = [
    {
      title: "Student Code",
      dataIndex: "student_code",
      key: "student_code",
      align: "center",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      align: "center",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
      align: "center",
    },
    {
      title: "Parent",
      dataIndex: "parentname",
      key: "parentname",
      align: "center",
    },
    {
      title: "Parent Phone",
      dataIndex: "parentPhone",
      key: "parentPhone",
      align: "center",
    },
    {
      title: "Medicine",
      dataIndex: "medicineName",
      key: "medicineName",
      align: "center",
    },
    {
      title: "Quantity Remaining",
      dataIndex: "quantityRemaining",
      key: "quantityRemaining",
      align: "center",
      render: (qty) => <Tag color={qty <= 3 ? "red" : "orange"}>{qty}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <div style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                onClick={() => {
                  setSelect(record);
                  console.log("RECORD", record);
                  setOpenStock(true);
                }}
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
  ];

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-between mb-5">
        <div></div>
        <div>
          <Select
            defaultValue="A"
            style={{ width: 200 }}
            value={type}
            onChange={(value) => setType(value)}
          >
            <Option value="schedule">Medicine Schedule</Option>
            <Option value="lowStock">Low Stock</Option>
          </Select>
        </div>
      </div>
      {type === "schedule" && (
        <>
          <Table
            dataSource={rawData}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            closable={false}
            className="!p-0 !rounded-xl !overflow-hidden w-[600px]"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white text-center rounded-2xl">
              <img
                src="https://img.icons8.com/emoji/48/pill-emoji.png"
                alt="pill-icon"
                className="mx-auto mb-2"
              />
              <h2 className="text-2xl font-bold">Medicine Administration</h2>
              <p className="text-sm">Confirm medicine delivery to student</p>
            </div>

            <div className="bg-white p-6 space-y-4">
              <div className="border-l-4 border-[#1bd0d8]  rounded-xl p-5 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#434343"
                    d="m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.9 47.9 0 0 1 176 120m-48-32.43L57.3 64L128 40.43L198.7 64Z"
                  />
                </svg>

                <div>
                  <h3 className="font-semibold text-lg">
                    {select?.studentName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Code: <b>{select?.student_code}</b> &nbsp; | &nbsp; Class:{" "}
                    <b>{select?.class}</b> &nbsp; | &nbsp; Gender:{" "}
                    <b>{select?.gender}</b>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-gradient-to-br from-cyan-100 to-pink-100 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Medicine</div>
                  <div className="text-base font-semibold text-gray-700">
                    {select?.medicineName}
                  </div>
                  <div className="text-sm text-gray-600">
                    Dosage: {select?.dosage}
                  </div>
                </div>
                <div className="rounded-lg p-4 bg-gradient-to-br from-orange-100 to-red-100 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">
                    Scheduled Time
                  </div>
                  <div className="text-base font-semibold text-gray-700">
                    {select?.timeToTake}
                  </div>
                  <div className="text-sm text-gray-600">
                    Remaining: {select?.quantityRemaining}
                  </div>
                </div>
              </div>

              {select?.note && (
                <div className="rounded-lg p-4 bg-gradient-to-br from-pink-100 to-yellow-100">
                  <div className="text-sm text-gray-500 mb-1 font-medium">
                    Special Instructions
                  </div>
                  <div className="text-sm text-gray-800">{select?.note}</div>
                </div>
              )}

              <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md text-sm text-yellow-800">
                ⚠️ <b>Confirmation Required:</b> Please confirm that the
                medicine has been administered to the student.
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                {select?.alreadyTaken === false && (
                  <Button
                    type="secondary"
                    className="!bg-gradient-to-r from-green-400 to-blue-600 !text-white"
                    onClick={handleCreate}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        </>
      )}

      {type === "lowStock" && (
        <>
          <Table
            dataSource={lowStockData}
            columns={lowStockColumns}
            rowKey="medicineItemID"
            pagination={{ pageSize: 10 }}
          />
          <Modal
            open={openStock}
            onCancel={() => setOpenStock(false)}
            footer={
              <>
                <>
                  <Button
                    className="!bg-[#6CC76F] hover:!bg-[#29CD2F]  !text-white"
                    onClick={() => {
                      handleQuantity();
                    }}
                  >
                    Request Medicine
                  </Button>
                </>
              </>
            }
          >
            <h1 className="text-2xl flex justify-center font-serif">
              Request Medicine
            </h1>
            <div className=" flex mt-5 gap-0.5 items-center">
              <p className="font-bold font-serif w-[30%]">Import quantity:</p>
              <InputNumber
                min={1}
                max={1000}
                className="w-full"
                value={quantity}
                onChange={(value) => setQuantity(value)}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                    "Tab",
                  ];
                  const isNumber = /^[0-9]$/.test(e.key);
                  if (!isNumber && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default MedicineSchedule;
