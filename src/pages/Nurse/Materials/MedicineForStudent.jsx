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
import { stopProvideMedicince } from "../../../redux/medicineRequestNurse/stopProvideMedicine/stopProvideMedicineSlice";
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

  const handleStopProvide = async () => {
    await dispatch(stopProvideMedicince(id));
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
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-md px-6 py-4 text-white text-center mb-4">
          <img
            src="https://img.icons8.com/emoji/48/pill-emoji.png"
            alt="pill-icon"
            className="mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold">Medicine Administration</h1>
          <p className="text-sm">Confirm medicine delivery to student</p>
        </div>

        {(() => {
          const request = getMedicineDetailRequest?.data?.medicineRequestEntity;
          const student = getMedicineDetailRequest?.data?.student || {};
          const medicineItem = request?.MedicineRequestItem?.[0];
          const status = request?.status;

          if (!request || !medicineItem) return <p>No data found</p>;

          return (
            <>
              <div className="border-l-4 border-[#1bd0d8]  rounded-xl p-5 shadow flex justify-between">
                <div>
                  <p className="font-semibold text-lg">
                    Học sinh {student?.name || "6"}
                  </p>
                  <p>
                    Code: <strong>{student?.studentCode || "ST0004"}</strong>{" "}
                    Class: <strong>{student?.class || "12C11"}</strong> Gender:{" "}
                    <strong>{student?.gender || "Nam"}</strong>
                  </p>
                </div>

                <div>
                  <Tag
                    color={
                      status === "PENDING"
                        ? "blue"
                        : status === "CONFIRMED_NOT_RECEIVED"
                        ? "orange"
                        : status === "CONFIRMED_RECEIVED"
                        ? "yellow"
                        : status === "REJECTED"
                        ? "red"
                        : "green"
                    }
                    className="text-base"
                  >
                    {status === "PENDING"
                      ? "Pending Approval"
                      : status === "CONFIRMED_NOT_RECEIVED"
                      ? "Confirmed - Not Received"
                      : status === "CONFIRMED_RECEIVED"
                      ? "Confirmed - Received"
                      : status === "REJECTED"
                      ? "Rejected"
                      : "Completed"}
                  </Tag>
                </div>
              </div>

              <div className=" grid grid-cols-2 gap-2">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                  <p className="text-lg font-semibold text-blue-800">
                    {medicineItem?.medicineName || "Medicine Name"}
                  </p>
                  <p>Dosage: {medicineItem?.dosage || "-"}</p>
                  <p>Quantity: {medicineItem?.quantitySent || "-"}</p>
                  <p>
                    Usage:{" "}
                    {Array.isArray(medicineItem?.usageTimes)
                      ? medicineItem?.usageTimes?.join(", ")
                      : "-"}
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mt-4">
                  <p className="text-lg font-semibold text-orange-800">
                    Schedule
                  </p>
                  <p>
                    ⏰{" "}
                    {medicineItem?.startDate
                      ? new Date(medicineItem?.startDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : "-"}
                  </p>
                  <p>
                    Until:{" "}
                    {medicineItem?.endDate
                      ? new Date(medicineItem?.endDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : "-"}
                  </p>
                </div>
              </div>

              {status === "PENDING" && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md mt-6">
                  <p className="font-medium">⚠️ Confirmation Required:</p>
                  <p>
                    Please confirm that the medicine has been administered to
                    the student.
                  </p>
                </div>
              )}

              {(status === "CONFIRMED_RECEIVED" || status === "COMPLETED") && (
                <>
                  {medicineItem?.MedicineLog.length > 0 && (
                    <h1 className="text-xl font-serif mt-6 mb-2 font-semibold">
                      Medicine Usage History
                    </h1>
                  )}

                  <div className="space-y-3">
                    {medicineItem?.MedicineLog?.map((log, index) => (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                        <p>
                          <strong>Medicine:</strong>{" "}
                          {medicineItem?.medicineName}
                        </p>
                        <p>
                          <strong>Taken At:</strong>{" "}
                          {log?.takenAt
                            ? new Date(log.takenAt).toLocaleString("vi-VN")
                            : "-"}
                        </p>
                        <p>
                          <strong>Note:</strong> {log?.note || "-"}
                        </p>
                        <p>
                          <strong>Given By:</strong> {log?.givenBy || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-6 flex justify-end gap-2">
                {status === "PENDING" && (
                  <>
                    <Button
                      className="!bg-gradient-to-r !from-red-500 !to-pink-500 !rounded-t-md !text-white"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                    <Button
                      className="!bg-gradient-to-r !from-indigo-500 !to-purple-500 !rounded-t-md !text-white"
                      onClick={handleAccept}
                    >
                      Accept
                    </Button>
                  </>
                )}

                {status === "CONFIRMED_NOT_RECEIVED" && (
                  <Button
                    className="!bg-gradient-to-r !from-indigo-500 !to-purple-500 !rounded-t-md !text-white"
                    onClick={handleReceive}
                  >
                    Receive
                  </Button>
                )}

                {status === "CONFIRMED_RECEIVED" && (
                  <Button
                    className="!bg-gradient-to-r !from-indigo-500 !to-purple-500 !rounded-t-md !text-white"
                    onClick={handleStopProvide}
                  >
                    Stop provide medicine
                  </Button>
                )}
              </div>
            </>
          );
        })()}
      </Modal>
    </div>
  );
}

export default MedicineForStudent;
