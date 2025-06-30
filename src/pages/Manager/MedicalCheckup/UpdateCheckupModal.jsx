import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Radio, Space, Checkbox } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { putManagerMedicalCheckup } from "../../../redux/MedicalCheckUpManager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSlice";
import { useDispatch } from "react-redux";

const UpdateCheckupModal = ({
  visible,
  onCancel,
  onOk,
  initialData = {},
  classList,
  targetType,
  id,
}) => {
  const dispatch = useDispatch();

  const [checkupTitle, setCheckupTitle] = useState("");
  const [checkupDescription, setCheckupDescription] = useState("");
  const [checkupDate, setCheckupDate] = useState("");
  const [targetTypeState, setTargetTypeState] = useState("school");
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedClassIds, setSelectedClassIds] = useState([]);

  useEffect(() => {
    if (initialData) {
      setCheckupTitle(initialData?.title || "");
      setCheckupDescription(initialData?.description || "");
      setCheckupDate(
        initialData?.scheduledAt
          ? dayjs(initialData.scheduledAt).format("YYYY-MM-DD")
          : ""
      );
      setTargetTypeState(initialData?.targetType || "school");

      // Đảm bảo ép kiểu đúng
      setSelectedClassIds(
        Array.isArray(initialData?.selectedClasses)
          ? initialData.selectedClasses.map((id) => Number(id))
          : []
      );

      setSelectedGrades(
        Array.isArray(initialData?.selectedGrades)
          ? initialData.selectedGrades.map((g) => String(g))
          : []
      );
    }
  }, [initialData]);

  const handleClassSelection = (classID, checked) => {
    const id = Number(classID);
    if (checked) {
      setSelectedClassIds((prev) => [...new Set([...prev, id])]);
    } else {
      setSelectedClassIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleGradeSelection = (grade, checked) => {
    const gradeStr = String(grade);
    if (checked) {
      setSelectedGrades((prevGrades) => [
        ...new Set([...prevGrades, gradeStr]),
      ]);
    } else {
      setSelectedGrades((prevGrades) =>
        prevGrades.filter((g) => g !== gradeStr)
      );
    }
  };

  const handleUpdate = async () => {
    if (!id) {
      toast.error("ID is missing!");
      return;
    }

    const formattedDate = dayjs(checkupDate).isValid()
      ? dayjs(checkupDate).format("YYYY-MM-DD")
      : null;

    if (!formattedDate) {
      toast.error("Invalid date value");
      return;
    }

    const targetIds =
      targetTypeState === "class"
        ? selectedClassIds
        : selectedGrades.map((grade) => parseInt(grade, 10));

    const payload = {
      id,
      scheduledAt: formattedDate,
      targetType: targetTypeState.toUpperCase(),
      targetIds: targetIds,
      title: checkupTitle,
      description: checkupDescription,
    };

    console.log("Payload being sent:", payload);

    try {
      dispatch(
        putManagerMedicalCheckup({
          ...payload,
        })
      );
      onCancel();
    } catch (error) {
      toast.error("Update Failed");
      console.error("API ERROR:", error);
      if (error.response) {
        console.error("API Response Error:", error.response.data);
      }
    }
  };

  const renderTargetSelection = () => {
    switch (targetTypeState) {
      case "school":
        return (
          <div className="text-gray-600 italic">Áp dụng cho toàn trường</div>
        );

      case "class":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border p-3 rounded">
              {classList.map((cls) => (
                <Checkbox
                  key={cls.id}
                  checked={selectedClassIds.includes(cls.id)}
                  onChange={(e) =>
                    handleClassSelection(cls.id, e.target.checked)
                  }
                >
                  Class {cls.name}
                </Checkbox>
              ))}
            </div>
            {selectedClassIds.length > 0 && (
              <div className="text-sm text-blue-600">
                Đã chọn:{" "}
                {selectedClassIds
                  .map((id) => {
                    const cls = classList.find((c) => c.id === id);
                    return cls ? cls.name : `ID ${id}`;
                  })
                  .join(", ")}
              </div>
            )}
          </div>
        );

      case "grade":
        return (
          <div className="space-y-3">
            <div className="font-medium mb-2">Chọn khối:</div>
            <div className="flex gap-4">
              {["10", "11", "12"].map((grade) => (
                <Checkbox
                  key={grade}
                  checked={selectedGrades.includes(grade)}
                  onChange={(e) =>
                    handleGradeSelection(grade, e.target.checked)
                  }
                >
                  Grade {grade}
                </Checkbox>
              ))}
            </div>
            {selectedGrades.length > 0 && (
              <div className="text-sm text-blue-600">
                Grade {selectedGrades.join(", ")}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title={
        <div className="text-center text-xl font-semibold text-gray-800">
          Update Checkup
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          Submit
        </Button>,
      ]}
      centered
      width={600}
      className="custom-checkup-modal"
    >
      <div className="space-y-4">
        {/* Checkup Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Checkup Title
          </label>
          <Input
            placeholder="Enter checkup title..."
            value={checkupTitle}
            onChange={(e) => setCheckupTitle(e.target.value)}
            className="rounded"
          />
        </div>

        {/* Checkup Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Input
            placeholder="Enter checkup description..."
            value={checkupDescription}
            onChange={(e) => setCheckupDescription(e.target.value)}
            className="rounded"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            type="date"
            value={checkupDate}
            onChange={(e) => setCheckupDate(e.target.value)}
            className="rounded"
          />
        </div>

        {/* Target Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Type
          </label>
          <Radio.Group
            value={targetTypeState}
            onChange={(e) => setTargetTypeState(e.target.value)}
          >
            <Space direction="vertical">
              <Radio value="school">Whole School</Radio>
              <Radio value="class">Specific Classes</Radio>
              <Radio value="grade">By Grade</Radio>
            </Space>
          </Radio.Group>
        </div>

        {/* Target Selection (classes or grades) */}
        {renderTargetSelection()}
      </div>
    </Modal>
  );
};

export default UpdateCheckupModal;
