import { Button, Input, Modal, Select, Space, Table, Tag, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicineRequest } from "../../../redux/medicineRequestNurse/getMedicineRequest/getMedicineRequestSlice";
import { fetchMedicineDetailRequest } from "../../../redux/medicineRequestNurse/getDetailMedicineRequest/getMedicineDetailRequestSlice";
import { rejectMedicineRequest } from "../../../redux/medicineRequestNurse/rejectMedicineRequest/rejectMedicineRequestSlice";
import { acceptMedicineRequest } from "../../../redux/medicineRequestNurse/acceptMedicineRequest/acceptMedicineRequestSlice";
import { receiveMedicineRequest } from "../../../redux/medicineRequestNurse/receiveMedicineRequest/receiveMedicineRequestSlice";
import { fetchLowStock } from "../../../redux/materialsNurse/getLowStock/getLowStockSlice";
function MedicineForStudent() {
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);

  const [id, setId] = useState(null);
  const [idAccept, setIdAccept] = useState(null);
  const [idReceive, setIdReceive] = useState(null);

  const { getMedicineRequest = [] } = useSelector(
    (state) => state.medicineRequest
  );

  const { getMedicineDetailRequest = [] } = useSelector(
    (state) => state.medicineDeTailRequest
  );
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchMedicineRequest());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatData = () => {
    const raw = getMedicineRequest?.data?.medicineRequestWithStudentInfo;
    if (!Array.isArray(raw)) return;

    const formatted = raw
      .map((item, index) => {
        const student = item.studentInfo || {};
        const parent = student.ParentInfo || {};
        const studentClass = student.lastAcamedicYear.class || {};

        return {
          key: index,
          requestId: item.id || "-",
          studentCode: student.student_code || "-",
          studentName: student.account.fullname || "-",
          gender: student.gender || "-",
          dob: student.dateOfBirth
            ? new Date(student.dateOfBirth).toLocaleDateString("vi-VN")
            : "-",
          className: studentClass?.name || "-",
          parentName: parent.fullname || "-",
          parentPhone: parent.phone || "-",
          parentEmail: parent.email || "-",
          status: item.status || "-",
          note: item.note || "-",
          createdAt: item.createdAt
            ? new Date(item.createdAt).toLocaleString("vi-VN")
            : "-",
        };
      })
      .reverse();

    setStore(formatted);
  };
  useEffect(() => {
    if (getMedicineRequest?.data?.medicineRequestWithStudentInfo) {
      formatData();
    }
  }, [getMedicineRequest]);

  const handleDetail = async (id) => {
    await dispatch(fetchMedicineDetailRequest(id));
  };

  const handleReject = async () => {
    await dispatch(rejectMedicineRequest(id));
    setDetailOpen(false);
  };

  const handleAccept = async () => {
    await dispatch(acceptMedicineRequest(id));
    setDetailOpen(false);
  };

  const handleReceive = async () => {
    await dispatch(receiveMedicineRequest(id));
    setDetailOpen(false);
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "requestId",
      key: "requestId",
      align: "center",
    },
    {
      title: "Student Code",
      dataIndex: "studentCode",
      key: "studentCode",
      align: "center",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
      align: "center",
    },

    {
      title: "Parent Name",
      dataIndex: "parentName",
      key: "parentName",
      align: "center",
    },
    {
      title: "Parent Phone",
      dataIndex: "parentPhone",
      key: "parentPhone",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <>
          {record.status === "CONFIRMED_RECEIVED" && (
            <>
              <Tag color="yellow">{record.status}</Tag>
            </>
          )}
          {record.status === "REJECTED" && (
            <>
              <Tag color="red">{record.status}</Tag>
            </>
          )}
          {record.status === "PENDING" && (
            <>
              <Tag color="blue">{record.status}</Tag>
            </>
          )}
          {record.status === "CONFIRMED_NOT_RECEIVED" && (
            <>
              <Tag color="orange">{record.status}</Tag>
            </>
          )}
          {record.status === "COMPLETED" && (
            <>
              <Tag color="green">{record.status}</Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                setId(record?.requestId);
                await handleDetail(record?.requestId);
                setDetailOpen(true);
              }}
            >
              <path
                fill="currentColor"
                d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
              />
            </svg>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        className="mt-5"
        columns={columns}
        dataSource={store}
        pagination={{ pageSize: 5 }}
      />{" "}
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
              <p className="text-white text-xl font-serif p-1">Cancel</p>
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
      <Modal
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={false}
        width={800}
      >
        <h1 className="text-2xl font-serif mb-4 text-center">
          Prescription details
        </h1>

        <Table
          className="font-serif"
          dataSource={
            getMedicineDetailRequest?.data?.medicineRequestEntity?.MedicineRequestItem?.map(
              (item, index) => ({
                key: index,
                name: item.medicineName,
                quantity: item.quantitySent,
                dosage: item.dosage,
                usageTimes: item.usageTimes?.join(", "),
                startDate: new Date(item.startDate).toLocaleDateString("vi-VN"),
                endDate: new Date(item.endDate).toLocaleDateString("vi-VN"),
              })
            ) || []
          }
          columns={[
            {
              title: "Medicine Name",
              dataIndex: "name",
              key: "name",
              align: "center",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
              align: "center",
            },
            {
              title: "Dosage",
              dataIndex: "dosage",
              key: "dosage",
              align: "center",
            },
            {
              title: "Duration",
              dataIndex: "usageTimes",
              key: "usageTimes",
              align: "center",
            },
            {
              title: "From Date ",
              dataIndex: "startDate",
              key: "startDate",
              align: "center",
            },
            {
              title: "To Date",
              dataIndex: "endDate",
              key: "endDate",
              align: "center",
            },
          ]}
          pagination={false}
          bordered
        />

        {getMedicineDetailRequest?.data?.medicineRequestEntity?.MedicineRequestItem?.some(
          (item) =>
            Array.isArray(item.MedicineLog) && item.MedicineLog.length > 0
        ) && (
          <>
            <h1 className="text-xl font-serif mt-6 mb-2 flex justify-center">
              Medicine Usage History
            </h1>
            <Table
              className="font-serif"
              dataSource={
                getMedicineDetailRequest?.data?.medicineRequestEntity?.MedicineRequestItem?.flatMap(
                  (item, i) =>
                    (item.MedicineLog || []).map((log, j) => ({
                      key: `${i}-${j}`,
                      medicineName: item.medicineName,
                      takenAt: new Date(log.takenAt).toLocaleString("vi-VN"),
                      note: log.note || "-",
                      givenBy: log.givenBy || "-",
                    }))
                ) || []
              }
              columns={[
                {
                  title: "Medicine",
                  dataIndex: "medicineName",
                  key: "medicineName",
                  align: "center",
                },
                {
                  title: "Taken At",
                  dataIndex: "takenAt",
                  key: "takenAt",
                  align: "center",
                },
                {
                  title: "Note",
                  dataIndex: "note",
                  key: "note",
                  align: "center",
                },
                {
                  title: "Given By",
                  dataIndex: "givenBy",
                  key: "givenBy",
                  align: "center",
                },
              ]}
              pagination={false}
              bordered
            />
          </>
        )}

        <div className="mt-5 flex justify-end gap-1">
          {getMedicineDetailRequest?.data?.medicineRequestEntity?.status ===
            "PENDING" && (
            <>
              {" "}
              <Button
                className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px] !text-white"
                onClick={() => {
                  handleReject();
                }}
              >
                Reject
              </Button>
              <Button
                className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px] !text-white"
                onClick={() => {
                  handleAccept();
                }}
              >
                Accept
              </Button>
            </>
          )}

          {getMedicineDetailRequest?.data?.medicineRequestEntity?.status ===
            "CONFIRMED_NOT_RECEIVED" && (
            <>
              <Button
                className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px] !text-white"
                onClick={() => {
                  handleReceive();
                }}
              >
                Receive
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default MedicineForStudent;
