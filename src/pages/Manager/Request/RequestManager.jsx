import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequest } from "../../../redux/manager/GetAllRequest/getAllRequestSlice";
import axios from "axios";
import { Modal, Popconfirm } from "antd";
import { fetchDetailRequest } from "../../../redux/manager/GetDetailRequestManager/getDetailRequestManagerSlice";
import { updateManagerSupply } from "../../../redux/manager/RejectRequestManager/rejectRequestManagerSlice";
import { rejectManagerMedicineSupply } from "../../../redux/manager/Reject/rejectMedicineSupplySlice";

function RequestManager() {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const {
    allRequest = [],
    loading,
    error,
  } = useSelector((state) => state.getAllRequest);

  const { detailRequest = [] } = useSelector((state) => state.getDetailRequest);

  const formatData = () => {
    const listData = allRequest?.data || [];
    return listData.map((item) => ({
      id: item?.id,
      note: item?.note,
      status: item?.status,
      createdAt: item?.createdAt,
      createdBy: item?.createdBy,
    }));
  };

  useEffect(() => {
    dispatch(fetchAllRequest());
  }, []);

  useEffect(() => {
    setData(formatData);
  }, [allRequest]);

  const handleViewDetail = (id) => {
    dispatch(fetchDetailRequest(id));
  };

  useEffect(() => {
    if (detailRequest?.data) {
      const detailData = {
        note: detailRequest.data.note,
        status: detailRequest.data.status,
        createdBy: detailRequest.data.createdBy,
        items: detailRequest.data.items.map((item) => ({
          quantity: item?.quantity,
          urgency: item?.urgency,
          note: item?.note,
          medicine: item?.medicine,
          medicineSupply: item?.medicineSupply,
        })),
      };
      setDetail(detailData);
      setShowModal(true);
    }
  }, [detailRequest]);

  const handleCloseModal = () => {
    setShowModal(false);
    setDetail(null);
  };
  const handleApprove = (id) => {
    dispatch(updateManagerSupply({ id }));
  };
  const handleReject = (id) => {
    dispatch(rejectManagerMedicineSupply({ id }));
  };
  return (
    <>
      <div>
        <div className="grid grid-cols-3 gap-5 mt-5 w-full pl-5 pr-5 font-kameron">
          {data.map((item) => (
            <div
              key={item.id}
              className="h-auto bg-white rounded-2xl p-5 relative"
            >
              <p className="text-lg font-semibold">Note:</p>
              <p className="mb-3">{item.note}</p>

              <p className="text-lg font-semibold">Status:</p>
              <p className="mb-3">{item.status}</p>

              <p className="text-lg font-semibold">Created At:</p>
              <p className="mb-3">{item.createdAt}</p>

              <p className="text-lg font-semibold">Created By:</p>
              <p>{item.createdBy}</p>

              <div
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => {
                  handleViewDetail(item?.id);
                  console.log(item.id);
                  setShowModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    color="currentColor"
                  >
                    <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045" />
                    <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0" />
                  </g>
                </svg>
              </div>
              <div className="mt-4 flex gap-4">
                {item.status !== "REJECTED" && (
                  <button
                    className={`flex-1 py-2 rounded-xl text-white font-semibold transition-colors ${
                      item.status === "APPROVED"
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={item.status === "APPROVED"}
                    onClick={() => {
                      if (item.status !== "APPROVED") {
                        handleApprove(item?.id);
                      }
                    }}
                  >
                    {item.status === "APPROVED" ? "APPROVED" : "Approve"}
                  </button>
                )}

                {item.status !== "APPROVED" && (
                  <Popconfirm
                    title="Bạn có chắc chắn muốn từ chối yêu cầu này không?"
                    okText="Đồng ý"
                    cancelText="Hủy"
                    onConfirm={() => handleReject(item?.id)}
                  >
                    <button
                      className={`flex-1 py-2 rounded-xl text-white font-semibold transition-colors ${
                        item.status === "REJECTED"
                          ? "bg-red-500 cursor-not-allowed"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                      disabled={item.status === "REJECTED"}
                    >
                      {item.status === "REJECTED" ? "REJECTED" : "Reject"}
                    </button>
                  </Popconfirm>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 👉 Modal hiển thị chi tiết */}
      <Modal open={showModal} onCancel={handleCloseModal} footer={null}>
        {detail ? (
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
            <p className="mb-2">
              <strong>Ghi chú:</strong> {detail?.note || "-"}
            </p>
            <p className="mb-2">
              <strong>Trạng thái:</strong>
              <span
                className={
                  detail.status === "PENDING"
                    ? "text-red-500 font-semibold"
                    : detail?.status === "APPROVED"
                    ? "text-green-500 font-semibold"
                    : "text-gray-500 font-semibold"
                }
              >
                {detail?.status || "-"}
              </span>
            </p>

            <p className="mt-4 font-semibold mb-2">Danh sách sản phẩm:</p>
            <ul className="space-y-4">
              {detail?.items?.length > 0 ? (
                detail.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="border rounded p-3 shadow-sm flex items-start gap-4"
                  >
                    <img
                      src={
                        item.medicine?.image || item.medicineSupply?.image || ""
                      }
                      alt="Product"
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <p>
                        <strong>Tên:</strong>{" "}
                        {item.medicine?.name ||
                          item.medicineSupply?.name ||
                          "-"}
                      </p>
                      <p>
                        <strong>SL:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Mức độ:</strong> {item.urgency}
                      </p>
                      <p>
                        <strong>Ghi chú:</strong> {item.note || "No Note"}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li>Không có sản phẩm</li>
              )}
            </ul>

            <button
              onClick={handleCloseModal}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Đóng
            </button>
          </div>
        ) : (
          <div className="p-6">Đang tải dữ liệu...</div>
        )}
      </Modal>
    </>
  );
}

export default RequestManager;
