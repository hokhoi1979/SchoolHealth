import { Modal } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const ResultModal = ({ open, onClose, resultData, loading, error }) => {
  const student = resultData?.data?.data;

  useEffect(() => {}, [resultData]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          ❌ Failed to load the health check result. Please try again later.
        </div>
      );
    }

    if (!student) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md">
          ⚠️ Student information not found.
        </div>
      );
    }

    if (student.status === "SKIPPED") {
      return (
        <div className="flex flex-col items-center text-center py-10 space-y-3">
          <CloseCircleOutlined className="text-5xl text-red-500" />
          <p className="text-red-600 text-lg font-semibold">
            Student was absent. No result available.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Student Info */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            📘 Student Information
          </h2>
          <ul className="text-blue-900 space-y-1">
            <li>
              <strong>Full Name:</strong> {student.fullname}
            </li>
            <li>
              <strong>Student Code:</strong> {student.student_code}
            </li>
            <li>
              <strong>Class:</strong> {student.className}
            </li>
            <li>
              <strong>General Note:</strong> {student.overallNotes || "None"}
            </li>
          </ul>
        </div>

        {/* Health Check Results */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            🩺 Health Check Results
          </h2>

          {student.results?.length > 0 ? (
            <ul className="space-y-2 list-disc list-inside text-green-900">
              {student.results.map((res) => (
                <li key={res.contentID}>
                  <strong>{res.contentTitle}:</strong> {res.value || "No data"}
                  {res.note && ` (${res.note})`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-700">No detailed results available.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircleOutlined className="text-2xl" />
          <span className="text-xl font-semibold">Health Check Result</span>
        </div>
      }
      width={650}
      className="custom-result-modal"
    >
      {renderContent()}
    </Modal>
  );
};

export default ResultModal;
