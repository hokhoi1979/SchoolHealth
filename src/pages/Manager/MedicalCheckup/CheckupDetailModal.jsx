import { Modal } from "antd";
import dayjs from "dayjs";
import { CalendarIcon, HeartPulseIcon, InfoIcon } from "lucide-react";

const statusColorMap = {
  DRAFT: "text-gray-600",
  CONFIRMED: "text-blue-600",
  SUCCESSED: "text-green-600",
  FAILED: "text-red-600",
};

const CheckupDetailModal = ({ visible, onClose, event, onUseAsTemplate }) => {
  if (!event) return null;

  const {
    title,
    description,
    scheduledAt,
    status,
    targetType,
    targets = [],
    content = [],
    vaccineEventStock = [],
  } = event;

  const formattedDate = scheduledAt
    ? dayjs(scheduledAt).format("DD/MM/YYYY")
    : "Not specified";

  const appliedTo =
    targetType === "SCHOOL"
      ? "Whole School"
      : targets.map((t) => t.className || `Grade ${t.grade}`).join(", ") ||
        "Not available";

  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered width={850}>
      {/* Header Gradient */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5  rounded-t-md">
        <div className="flex items-center justify-center     gap-2">
          <HeartPulseIcon size={28} />
          <div>
            <h2 className="text-xl font-bold">Checkup Details</h2>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 bg-white rounded-b-md space-y-6">
        {/* Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
          <div>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {description || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {formattedDate}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  statusColorMap[status] || "text-gray-600"
                } font-medium`}
              >
                {status}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Target Type:</span>{" "}
              {targetType || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Applied To:</span> {appliedTo}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Checkup Content */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Checkup Contents
          </h3>
          {content.length === 0 ? (
            <p className="italic text-gray-500">
              No checkup contents available.
            </p>
          ) : (
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {content.map((item) => (
                <li key={item.id}>
                  <span className="font-semibold">{item.name}</span>:{" "}
                  {item.description} ({item.inputType})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Supplies / Medicines */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">
            Supplies / Medicines
          </h3>
          {vaccineEventStock.length === 0 ? (
            <p className="italic text-gray-500">
              No medicines or supplies listed.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vaccineEventStock.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-start p-3 rounded-xl bg-gradient-to-br from-blue-50 to-pink-50 border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <div className="text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Name:</span> {item.name}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {item.quantityPlanned}
                    </p>
                    <p>
                      <span className="font-semibold">Type:</span> {item.type}
                    </p>
                    <p>
                      <span className="font-semibold">Note:</span>{" "}
                      {item.notes || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
          >
            Close
          </button>
          {/* <button
            onClick={() => onUseAsTemplate(event)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Ok
          </button> */}
        </div>
      </div>
    </Modal>
  );
};

export default CheckupDetailModal;
