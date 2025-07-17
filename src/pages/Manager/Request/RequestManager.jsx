import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequest } from "../../../redux/manager/GetAllRequest/getAllRequestSlice";
import axios from "axios";
import { Modal, Popconfirm } from "antd";
import { fetchDetailRequest } from "../../../redux/manager/GetDetailRequestManager/getDetailRequestManagerSlice";
import { updateManagerSupply } from "../../../redux/manager/RejectRequestManager/rejectRequestManagerSlice";
import { rejectManagerMedicineSupply } from "../../../redux/manager/Reject/rejectMedicineSupplySlice";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";
import img from "../../../img/12945646.png";
import { Package } from "lucide-react";
import dayjs from "dayjs";

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
      createdAt: item?.createdAt
        ? dayjs(item.createdAt, "DD-MM-YYYY").format("DD/MM/YYYY")
        : "Chưa xác định",
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
      <div className="">
        <h1 className="text-xl font-inria font-medium  p-10">
          <CommonBreadcrumb role={"Manager"} page={"request"} />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 w-full max-w-screen-xl px-5 font-kameron mx-auto">
          {data.map((item) => (
            <div
              key={item.id}
              className="h-[350px] bg-white bg-gradient-to-br from-[#e0f7fa] via-white to-[#fce4ec] rounded-2xl border border-gray-200 shadow-md hover:shadow-lg p-5 relative flex flex-col justify-between transition-all duration-300"
            >
              {/* Ảnh */}
              <div className="w-full flex justify-center items-center mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 rotate-[12deg] shadow-lg flex items-center justify-center">
                  <Package className="text-white w-8 h-8 -rotate-[12deg]" />
                </div>
              </div>

              {/* Thông tin */}
              <div className="grid grid-cols-2 gap-x-20 text-[17px] text-gray-800 leading-relaxed">
                <div>
                  <p className="font-semibold text-gray-600">Note:</p>
                  <p>{item.note}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Status:</p>
                  <p
                    className={`capitalize text-sm font-bold ${
                      item.status === "REJECTED"
                        ? "text-red-500"
                        : item.status === "APPROVED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Created At:</p>
                  <p className="text-gray-800">
                    {item?.createdAt || "don not"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Created By:</p>
                  <p>{item.createdBy}</p>
                </div>
              </div>

              {/* Icon xem chi tiết */}
              <div
                className="absolute right-3 top-3 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  handleViewDetail(item?.id);
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
                  >
                    <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045" />
                    <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0" />
                  </g>
                </svg>
              </div>

              {/* Nút action */}
              <div className="mt-5 flex gap-4">
                {item.status !== "REJECTED" && (
                  <button
                    className={`flex-1 py-2 rounded-full text-white font-semibold tracking-wide shadow-md transition-all duration-300
    ${
      item.status === "APPROVED"
        ? "bg-gradient-to-r from-green-400 to-green-600 cursor-not-allowed opacity-80"
        : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
    }`}
                    disabled={item.status === "APPROVED"}
                    onClick={() => {
                      if (item.status !== "APPROVED") {
                        handleApprove(item?.id);
                      }
                    }}
                  >
                    {item.status === "APPROVED" ? "APPROVED" : " Approve"}
                  </button>
                )}

                {item.status !== "APPROVED" && (
                  <Popconfirm
                    title="Are you sure about refusing this requirement?"
                    okText="Yes"
                    cancelText="Cancel  "
                    onConfirm={() => handleReject(item?.id)}
                  >
                    <button
                      className={`flex-1 py-2 rounded-full text-white font-semibold tracking-wide shadow-md transition-all duration-300
      ${
        item.status === "REJECTED"
          ? "bg-gradient-to-r from-red-400 to-red-600 cursor-not-allowed opacity-80"
          : "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-400 hover:to-red-900"
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
      <div className="w-full h-30 mt-13 "></div>
      <AppFooter />

      <Modal
        open={showModal}
        onCancel={handleCloseModal}
        footer={null}
        modalRender={(modal) => (
          <div className="w-full max-w-[520px] mx-auto">{modal}</div>
        )}
      >
        {detail ? (
          <div className="bg-white rounded-2xl overflow-hidden max-h-[80vh]">
            {/* Header Gradient */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-5 text-center">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <span>📦</span> Request Details
              </h2>
              <p className="text-sm mt-1 font-medium">
                Product request information
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto space-y-6 max-h-[70vh]">
              {/* General Info */}
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Note:</span>{" "}
                  {detail?.note || "-"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      detail.status === "PENDING"
                        ? "  text-gray-500"
                        : detail.status === "APPROVED"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {detail?.status || "-"}
                  </span>
                </p>
              </div>

              {/* Product List */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Product List
                </h3>
                <ul className="space-y-4">
                  {detail?.items?.length > 0 ? (
                    detail.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="bg-gradient-to-br from-cyan-100 to-pink-100  rounded-xl p-4 shadow flex gap-4 items-start"
                      >
                        <img
                          src={
                            item.medicine?.image ||
                            item.medicineSupply?.image ||
                            "/placeholder.png"
                          }
                          alt="Product"
                          className="w-16 h-16 object-cover rounded-lg border bg-white"
                          onError={(e) => (e.target.src = "/placeholder.png")}
                        />
                        <div className="flex-1 space-y-1 text-sm text-gray-800 ">
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {item.medicine?.name ||
                              item.medicineSupply?.name ||
                              "-"}
                          </p>
                          <p>
                            <span className="font-semibold">Quantity:</span>{" "}
                            {item.quantity}
                          </p>
                          <p>
                            <span className="font-semibold">Urgency:</span>{" "}
                            {item.urgency}
                          </p>
                          <p>
                            <span className="font-semibold">Note:</span>{" "}
                            {item.note || "None"}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600 italic">
                      No products available
                    </li>
                  )}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="mt-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">Loading data...</div>
        )}
      </Modal>
    </>
  );
}

export default RequestManager;
