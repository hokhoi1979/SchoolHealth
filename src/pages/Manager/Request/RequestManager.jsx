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
        <h1 className="text-xl font-inria font-medium  p-10">
          <CommonBreadcrumb role={"Manager"} page={"request"} />
        </h1>
        <div className="grid grid-cols-3 gap-5 mt-5 w-full pl-5 pr-5 font-kameron ">
          {data.map((item) => (
            <div
              key={item.id}
              className="h-auto bg-white rounded-2xl p-5 relative flex flex-col justify-between"
            >
              <div className="w-full flex justify-center items-center mb-4">
                <div>
                  <img
                    src={img}
                    alt="supply"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-30 text-[18px] text-gray-700 mt-4">
                <div>
                  <p className="font-semibold">Note:</p>
                  <p>{item.note}</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <p className="capitalize">{item.status}</p>
                </div>

                <div>
                  <p className="font-semibold">Created At:</p>
                  <p>{new Date(item.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
                <div>
                  <p className="font-semibold">Created By:</p>
                  <p>{item.createdBy}</p>
                </div>
              </div>

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

              <div className="mt-5 flex gap-4">
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
          <div className="bg-white rounded-2xl px-6 py-5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Request Details
            </h2>

            <div className="space-y-3 mb-5">
              <p className="text-gray-700">
                <span className="font-semibold">Note:</span>{" "}
                {detail?.note || "-"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    detail.status === "PENDING"
                      ? "text-red-500"
                      : detail.status === "APPROVED"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {detail?.status || "-"}
                </span>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Product List
              </h3>
              <ul className="space-y-4">
                {detail?.items?.length > 0 ? (
                  detail.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="border rounded-md p-3 shadow-sm flex items-start gap-4"
                    >
                      <img
                        src={
                          item.medicine?.image ||
                          item.medicineSupply?.image ||
                          ""
                        }
                        alt="Product"
                        className="w-20 h-20 object-cover rounded border bg-gray-100"
                      />
                      <div className="flex-1 space-y-1 text-sm text-gray-800">
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

            <button
              onClick={handleCloseModal}
              className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">Loading data...</div>
        )}
      </Modal>
    </>
  );
}

export default RequestManager;
