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
            footer={
              <>
                {" "}
                {select?.alreadyTaken === false && (
                  <>
                    <Button
                      className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px] !text-white"
                      onClick={() => {
                        handleCreate();
                      }}
                    >
                      Perform
                    </Button>
                  </>
                )}
              </>
            }
          >
            <h1 className="text-2xl flex justify-center font-serif">
              Give medicine to students
            </h1>
            <div className="font-bold font-serif">
              <p>Time: {select?.timeToTake}</p>
              <p>Note:{select?.note}</p>
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
