import { Modal } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const ResultModal = ({ open, onClose, resultData, loading, error }) => {
  const student = resultData?.data?.data;

  useEffect(() => {
    console.log("🧪 resultData:", resultData);
    console.log("🎓 student:", student);
  }, [resultData]);

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
          ❌ Không thể tải kết quả khám sức khỏe. Vui lòng thử lại sau.
        </div>
      );
    }

    if (!student) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md">
          ⚠️ Không tìm thấy thông tin học sinh.
        </div>
      );
    }

    if (student.status === "SKIPPED") {
      return (
        <div className="flex flex-col items-center text-center py-10 space-y-3">
          <CloseCircleOutlined className="text-5xl text-red-500" />
          <p className="text-red-600 text-lg font-semibold">
            Học sinh vắng mặt, không có thông tin kết quả.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Học sinh */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            📘 Thông tin học sinh
          </h2>
          <ul className="text-blue-900 space-y-1">
            <li>
              <strong>Họ tên:</strong> {student.fullname}
            </li>
            <li>
              <strong>Mã học sinh:</strong> {student.student_code}
            </li>
            <li>
              <strong>Lớp:</strong> {student.className}
            </li>
            <li>
              <strong>Ghi chú chung:</strong>{" "}
              {student.overallNotes || "Không có"}
            </li>
          </ul>
        </div>

        {/* Kết quả khám */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            🩺 Kết quả kiểm tra sức khỏe
          </h2>

          {student.results?.length > 0 ? (
            <ul className="space-y-2 list-disc list-inside text-green-900">
              {student.results.map((res) => (
                <li key={res.contentID}>
                  <strong>{res.contentTitle}:</strong>{" "}
                  {res.value || "Không có dữ liệu"}
                  {res.note && ` (${res.note})`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-700">Không có kết quả chi tiết.</p>
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
          <span className="text-xl font-semibold">Kết quả khám sức khỏe</span>
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
