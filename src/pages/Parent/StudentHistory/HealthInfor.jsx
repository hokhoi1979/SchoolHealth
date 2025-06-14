import { useState } from "react";
import { Button, Card, Table, Tag, Modal, Descriptions } from "antd";
import { FileText } from "lucide-react";
import { EyeOutlined } from "@ant-design/icons";

const HealthInfo = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const typeConfig = {
    health: {
      icon: <FileText className="h-3 w-3" />,
      text: "Health Record",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    },
  };

  const statusConfig = {
    completed: { text: "Completed", color: "green" },
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (type) => (
        <Tag className={`${typeConfig[type].color}`}>
          <span className="flex items-center gap-1">
            {typeConfig[type].icon}
            {typeConfig[type].text}
          </span>
        </Tag>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "Update Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={statusConfig[status].color}>
          {statusConfig[status].text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        />
      ),
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      type: "health",
      title: "Health Information Update",
      date: "20/05/2025",
      content: "General health information update",
      status: "completed",
      details: {
        general: {
          id: "SE12",
          student: "Nguyen Van A",
          class: "10C5",
          height: "160 cm",
          weight: "50 kg",
          bloodType: "O+",
          treatmentHistory: "Treated for asthma in 2023",
          notes: "No other health issues",
        },
        allergies: {
          hasAllergies: "Yes",
          allergyTypes: ["Food Allergy", "Dust Allergy"],
          allergyDetails:
            "Allergic to seafood and peanuts; symptoms include hives and swelling.",
          allergyTreatment:
            "Antihistamines for mild reactions; epinephrine for severe reactions.",
        },
        chronic: {
          hasChronic: "Yes",
          chronicTypes: ["Asthma"],
          chronicDetails: "Diagnosed with asthma at age 10; mild condition.",
          treatment: "Inhaler as needed.",
          currentMedications: "Salbutamol inhaler, 2 puffs as needed.",
        },
        visionHearing: {
          leftEye: "8/10",
          rightEye: "9/10",
          wearsGlasses: "No",
          visionNotes: "Slight nearsightedness in left eye.",
          leftEar: "Normal",
          rightEar: "Normal",
          usesHearing: "No",
          hearingNotes: "No hearing issues detected.",
        },
        vaccination: {
          vaccinesGiven: ["BCG", "Hepatitis B", "DPT", "MMR"],
          vaccinationHistory:
            "Received MMR vaccine on 15/03/2018; no reactions.",
          hasSideEffects: "No",
          adverseDetails: "No adverse reactions reported.",
        },
      },
    },
    {
      key: "2",
      type: "health",
      title: "Health Information Update",
      date: "20/05/2025",
      content: "General health information update",
      status: "completed",
      details: {
        general: {
          id: "SE12",
          student: "Nguyen Van A",
          class: "10C5",
          height: "160 cm",
          weight: "50 kg",
          bloodType: "O+",
          treatmentHistory: "Treated for asthma in 2023",
          notes: "No other health issues",
        },
        allergies: {
          hasAllergies: "Yes",
          allergyTypes: ["Food Allergy", "Dust Allergy"],
          allergyDetails:
            "Allergic to seafood and peanuts; symptoms include hives and swelling.",
          allergyTreatment:
            "Antihistamines for mild reactions; epinephrine for severe reactions.",
        },
        chronic: {
          hasChronic: "Yes",
          chronicTypes: ["Asthma"],
          chronicDetails: "Diagnosed with asthma at age 10; mild condition.",
          treatment: "Inhaler as needed.",
          currentMedications: "Salbutamol inhaler, 2 puffs as needed.",
        },
        visionHearing: {
          leftEye: "8/10",
          rightEye: "9/10",
          wearsGlasses: "No",
          visionNotes: "Slight nearsightedness in left eye.",
          leftEar: "Normal",
          rightEar: "Normal",
          usesHearingAids: "No",
          hearingNotes: "No hearing issues detected.",
        },
        vaccination: {
          vaccinesGiven: ["BCG", "Hepatitis B", "DPT", "MMR"],
          vaccinationHistory:
            "Received MMR vaccine on 15/03/2018; no reactions.",
          hasSideEffects: "No",
          adverseDetails: "No adverse reactions reported.",
        },
      },
    },
    {
      key: "3",
      type: "health",
      title: "Health Information Update",
      date: "20/05/2025",
      content: "General health information update",
      status: "completed",
      details: {
        general: {
          id: "SE12",
          student: "Nguyen Van A",
          class: "10C5",
          height: "160 cm",
          weight: "50 kg",
          bloodType: "O+",
          treatmentHistory: "Treated for asthma in 2023",
          notes: "No other health issues",
        },
        allergies: {
          hasAllergies: "Yes",
          allergyTypes: ["Food Allergy", "Dust Allergy"],
          allergyDetails:
            "Allergic to seafood and peanuts; symptoms include hives and swelling.",
          allergyTreatment:
            "Antihistamines for mild reactions; epinephrine for severe reactions.",
        },
        chronic: {
          hasChronic: "Yes",
          chronicTypes: ["Asthma"],
          chronicDetails: "Diagnosed with asthma at age 10; mild condition.",
          treatment: "Inhaler as needed.",
          currentMedications: "Salbutamol inhaler, 2 puffs as needed.",
        },
        visionHearing: {
          leftEye: "8/10",
          rightEye: "9/10",
          wearsGlasses: "No",
          visionNotes: "Slight nearsightedness in left eye.",
          leftEar: "Normal",
          rightEar: "Normal",
          usesHearingAids: "No",
          hearingNotes: "No hearing issues detected.",
        },
        vaccination: {
          vaccinesGiven: ["BCG", "Hepatitis B", "DPT", "MMR"],
          vaccinationHistory:
            "Received MMR vaccine on 15/03/2018; no reactions.",
          hasSideEffects: "No",
          adverseDetails: "No adverse reactions reported.",
        },
      },
    },
  ];

  const renderGeneralInfo = (general) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">General Information</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{general.id}</Descriptions.Item>
        <Descriptions.Item label="Student">{general.student}</Descriptions.Item>
        <Descriptions.Item label="Class">{general.class}</Descriptions.Item>
        <Descriptions.Item label="Height">{general.height}</Descriptions.Item>
        <Descriptions.Item label="Weight">{general.weight}</Descriptions.Item>
        <Descriptions.Item label="Blood Type">
          {general.bloodType}
        </Descriptions.Item>
        <Descriptions.Item label="Treatment History">
          {general.treatmentHistory}
        </Descriptions.Item>
        <Descriptions.Item label="Notes">{general.notes}</Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderAllergiesInfo = (allergies) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Allergies Information</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Has Allergies">
          {allergies.hasAllergies}
        </Descriptions.Item>
        <Descriptions.Item label="Allergy Types">
          {allergies.allergyTypes.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Allergy Details">
          {allergies.allergyDetails}
        </Descriptions.Item>
        <Descriptions.Item label="Allergy Treatment">
          {allergies.allergyTreatment}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderChronicInfo = (chronic) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Chronic Conditions</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Has Chronic Condition">
          {chronic.hasChronic}
        </Descriptions.Item>
        <Descriptions.Item label="Chronic Types">
          {chronic.chronicTypes.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Chronic Details">
          {chronic.chronicDetails}
        </Descriptions.Item>
        <Descriptions.Item label="Treatment">
          {chronic.treatment}
        </Descriptions.Item>
        <Descriptions.Item label="Current Medications">
          {chronic.currentMedications}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderVisionHearingInfo = (visionHearing) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Vision and Hearing</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Left Eye">
          {visionHearing.leftEye}
        </Descriptions.Item>
        <Descriptions.Item label="Right Eye">
          {visionHearing.rightEye}
        </Descriptions.Item>
        <Descriptions.Item label="Wears Glasses">
          {visionHearing.wearsGlasses}
        </Descriptions.Item>
        <Descriptions.Item label="Vision Notes">
          {visionHearing.visionNotes}
        </Descriptions.Item>
        <Descriptions.Item label="Left Ear">
          {visionHearing.leftEar}
        </Descriptions.Item>
        <Descriptions.Item label="Right Ear">
          {visionHearing.rightEar}
        </Descriptions.Item>
        <Descriptions.Item label="Uses Hearing Aids">
          {visionHearing.usesHearingAids}
        </Descriptions.Item>
        <Descriptions.Item label="Hearing Notes">
          {visionHearing.hearingNotes}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderVaccinationInfo = (vaccination) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Vaccination Information</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Vaccines Given">
          {vaccination.vaccinesGiven.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Vaccination History">
          {vaccination.vaccinationHistory}
        </Descriptions.Item>
        <Descriptions.Item label="Has Side Effects">
          {vaccination.hasSideEffects}
        </Descriptions.Item>
        <Descriptions.Item label="Adverse Details">
          {vaccination.adverseDetails}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderDetailsContent = (record) => {
    const details = record.details;
    return (
      <>
        {renderGeneralInfo(details.general)}
        {renderAllergiesInfo(details.allergies)}
        {renderChronicInfo(details.chronic)}
        {renderVisionHearingInfo(details.visionHearing)}
        {renderVaccinationInfo(details.vaccination)}
      </>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card
        title="Health Record History"
        description="History of student health record updates"
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      </Card>

      <Modal
        title={selectedRecord?.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedRecord && (
          <>
            <p className="text-gray-500 mb-4">Date: {selectedRecord.date}</p>
            <div className="flex items-center gap-2 mb-4">
              <Tag
                className={`flex items-center gap-1 ${
                  typeConfig[selectedRecord.type]?.color
                }`}
              >
                {typeConfig[selectedRecord.type]?.icon}
                {typeConfig[selectedRecord.type]?.text}
              </Tag>
              <Tag color={statusConfig[selectedRecord.status]?.color}>
                {statusConfig[selectedRecord.status]?.text}
              </Tag>
            </div>
            <div className="border rounded-md p-4 bg-gray-50">
              {renderDetailsContent(selectedRecord)}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default HealthInfo;
