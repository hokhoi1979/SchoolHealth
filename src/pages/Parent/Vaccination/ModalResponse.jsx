import { Modal, Radio, Input, Space, Alert, Spin } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Syringe, User } from "lucide-react";

const { TextArea } = Input;

const ModalResponse = ({
  open,
  notification,
  response,
  setResponse,
  onConfirm,
  onCancel,
  loading = false,
  error = null,
}) => {
  if (!notification) return null;
  const isDeclinedSelected = response.consent === "no";
  const isAcceptSelected = response.consent === "yes";
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Syringe style={{ fontSize: 20, color: "#d97706" }} />
          <span>Vaccination Response</span>
        </div>
      }
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={loading ? "Processing..." : "Submit Response"}
      cancelText="Cancel"
      confirmLoading={loading}
      width={600}
      okButtonProps={{
        disabled: loading || (isDeclinedSelected && !response.reason?.trim()),
      }}
    >
      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={
            typeof error === "string"
              ? error
              : error.message || "An error occurred"
          }
          type="error"
          showIcon
          className="mb-4"
        />
      )}
      {/* Vaccination Event Information */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">
          {notification.title}
        </h4>
        <p className="text-blue-700 mb-3">{notification.description}</p>

        {/* Student Info */}
        {notification.student && (
          <div className="flex items-center gap-2 mb-2">
            <User size={16} className="text-blue-600" />
            <span className="text-blue-600">
              <strong>Student:</strong> {notification.student.account?.fullname}
              <span className="text-blue-500 ml-2">
                ({notification.student.student_code})
              </span>
            </span>
          </div>
        )}

        {/* Scheduled Date */}
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-blue-600" />
          <span className="text-blue-600">
            <strong>Scheduled Date:</strong> {notification.date}
          </span>
        </div>
      </div>

      {/* Response Options */}
      <div className="mb-4">
        <h4 className="font-semibold mb-3 text-gray-800">
          Please select your response:
        </h4>
        <Radio.Group
          onChange={(e) =>
            setResponse({ ...response, consent: e.target.value, reason: "" })
          }
          value={response.consent}
          className="w-full"
        >
          <Space direction="vertical" className="w-full">
            <div
              className={`p-3 rounded-lg border-2 transition-all ${
                isAcceptSelected
                  ? "border-green-400 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <Radio value="yes" className="w-full">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined
                    style={{ color: isAcceptSelected ? "#16a34a" : "#6b7280" }}
                  />
                  <span
                    className={`font-medium ${
                      isAcceptSelected ? "text-green-700" : "text-gray-700"
                    }`}
                  >
                    Accept Vaccination
                  </span>
                </div>
                <p
                  className={`text-sm mt-1 ml-6 ${
                    isAcceptSelected ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  I consent to my child receiving this vaccination
                </p>
              </Radio>
            </div>

            <div
              className={`p-3 rounded-lg border-2 transition-all ${
                isDeclinedSelected
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-red-300"
              }`}
            >
              <Radio value="no" className="w-full">
                <div className="flex items-center gap-2">
                  <CloseCircleOutlined
                    style={{
                      color: isDeclinedSelected ? "#dc2626" : "#6b7280",
                    }}
                  />
                  <span
                    className={`font-medium ${
                      isDeclinedSelected ? "text-red-700" : "text-gray-700"
                    }`}
                  >
                    Decline Vaccination
                  </span>
                </div>
                <p
                  className={`text-sm mt-1 ml-6 ${
                    isDeclinedSelected ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  I do not consent to my child receiving this vaccination
                </p>
              </Radio>
            </div>
          </Space>
        </Radio.Group>
      </div>

      {/* Reason for Rejection */}
      {isDeclinedSelected && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-red-700">
            Reason for Declining <span className="text-red-500">*</span>
          </h4>
          <TextArea
            rows={4}
            placeholder="Please provide a detailed reason for declining this vaccination (required)"
            value={response.reason}
            onChange={(e) =>
              setResponse({ ...response, reason: e.target.value })
            }
            className={`${
              !response.reason?.trim() && isDeclinedSelected
                ? "border-red-300"
                : ""
            }`}
          />
          {!response.reason?.trim() && isDeclinedSelected && (
            <p className="text-red-500 text-sm mt-1">
              Please provide a reason for declining
            </p>
          )}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <Spin size="small" />
          <span>Submitting your response...</span>
        </div>
      )}
    </Modal>
  );
};

export default ModalResponse;
