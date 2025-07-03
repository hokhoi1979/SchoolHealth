import React from "react";
import { Modal, Table, Tag, Image } from "antd";
import { Syringe, X } from "lucide-react";

const ModalDetailVaccine = ({ open, onClose, data }) => {
  if (!data) return null;

  const {
    name,
    description,
    scheduledAt,
    status,
    createdAt,
    targetType,
    targets = [],
    vaccineEventStock = [],
  } = data;

  const renderTarget = () => {
    if (!targets.length) return "Whole School";
    return targets.map((t) => t.className || `Grade ${t.grade}`).join(", ");
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={[
        <button
          onClick={onClose}
          key="close"
          className="bg-gray-100 border px-4 py-1.5 rounded hover:bg-gray-200"
        >
          Close
        </button>,
      ]}
      width={880}
      footerStyle={{ textAlign: "right" }}
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        border: "2px solid #d9d9d9",
        boxShadow: "none",
      }}
      // 👉 THÊM maskStyle để làm trong suốt nền
      maskStyle={{ backgroundColor: "transparent" }}
      closable={false}
    >
      {/* Header gradient */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-t-md flex items-center justify-center gap-3">
        <Syringe size={28} color="white" />
        <div>
          <h2 className="text-white font-semibold text-lg">Vaccine Details</h2>
        </div>
      </div>

      {/* Overview */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <p>
            <strong>Description:</strong> {description || "N/A"}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(scheduledAt)}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Tag
              color={
                status === "CONFIRMED"
                  ? "blue"
                  : status === "DRAFT"
                  ? "orange"
                  : "green"
              }
            >
              {status}
            </Tag>
          </p>
          <p>
            <strong>Target Type:</strong> {targetType || "N/A"}
          </p>
          <p className="col-span-2">
            <strong>Applied To:</strong> {renderTarget()}
          </p>
        </div>

        {/* Supplies / Medicines */}
        <h3 className="text-base font-semibold mt-6 mb-3">
          Supplies / Medicines
        </h3>
        {vaccineEventStock.length === 0 ? (
          <p className="text-sm text-gray-500">No data.</p>
        ) : (
          <div className="space-y-4">
            {vaccineEventStock.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 via-white to-pink-50 shadow border"
              >
                <div className="w-16 h-16 border rounded overflow-hidden bg-white flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="item"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantityPlanned}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {item.type === "medicine" ? "Medicine" : "Supply"}
                  </p>
                  <p>
                    <strong>Note:</strong> {item.notes || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalDetailVaccine;
