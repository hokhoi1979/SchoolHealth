import { useState } from "react";
import {
  Button,
  Card,
  Table,
  Tag,
  Modal,
  Descriptions,
  Checkbox,
  Radio,
  Input,
} from "antd";
import {
  FileTextOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const AllRecord = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const typeConfig = {
    health: {
      icon: <FileTextOutlined />,
      text: "Health Information",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    medication: {
      icon: <MedicineBoxOutlined />,
      text: "Send Result",
      color: "bg-green-100 text-green-700 border-green-300",
    },
    vaccination: {
      icon: <MedicineBoxOutlined />,
      text: "Vaccination",
      color: "bg-amber-100 text-amber-700 border-amber-300",
    },
    checkup: {
      icon: <HeartOutlined />,
      text: "Check Up",
      color: "bg-purple-100 text-purple-700 border-purple-300",
    },
  };

  const statusConfig = {
    completed: { text: "Completed", color: "green" },
    processing: { text: "Pending", color: "yellow" },
    confirmed: { text: "Confirmed", color: "green" },
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (type) => (
        <Tag className={`flex items-center gap-1 ${typeConfig[type].color}`}>
          {typeConfig[type].icon}
          {typeConfig[type].text}
        </Tag>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
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
        <Button type="link" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      type: "health",
      title: "Update health information",
      date: "20/05/2025",
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
      key: "2",
      type: "medication",
      title: "Send Paracetamol",
      date: "18/05/2025",
      status: "processing",
      details: {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6 hours",
        startDate: "20/05/2025",
        endDate: "25/05/2025",
        instructions: "Take with water after meals.",
        status: "Pending",
      },
    },
    {
      key: "3",
      type: "vaccination",
      title: "Confirm flu vaccination",
      date: "15/05/2025",
      status: "confirmed",
      details:
        "Consent has been given for students to participate in flu vaccination on June 15, 2025",
    },
    {
      key: "4",
      type: "checkup",
      title: "Confirmation of periodic health check-up",
      date: "May 10, 2025",
      status: "confirmed",
      details:
        "Agreed for students to participate in periodic health check-up on June 20, 2025",
    },
  ];

  const renderGeneralInfo = (general) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">General Information</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{general.id}</Descriptions.Item>
        <Descriptions.Item label="Student">{general.student}</Descriptions.Item>
        <Descriptions.Item label="Classroom">{general.class}</Descriptions.Item>
        <Descriptions.Item label="Height (cm)">
          {general.height}
        </Descriptions.Item>
        <Descriptions.Item label="Weight (kg)">
          {general.weight}
        </Descriptions.Item>
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

  const renderAllergyDetails = (allergies) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Allergies</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Does the student have allergies?">
          <Radio.Group value={allergies.hasAllergies} disabled>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="Type of allergies">
          <Checkbox.Group
            options={[
              "Food Allergy",
              "Drug Allergy",
              "Insect Allergy",
              "Pollen Allergy",
              "Dust Allergy",
              "Others",
            ]}
            value={allergies.allergyTypes}
            disabled
          />
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

  const renderChronicDetails = (chronic) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Chronic Diseases</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Does the student have chronic diseases?">
          <Radio.Group value={chronic.hasChronic} disabled>
            <Radio value="Yes">Diseases</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="Type of chronic diseases">
          <Checkbox.Group
            options={[
              "Asthma",
              "Diabetes",
              "Epilepsy",
              "Heart Disease",
              "Others",
            ]}
            value={chronic.chronicTypes}
            disabled
          />
        </Descriptions.Item>
        <Descriptions.Item label="Chronic Disease Details">
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

  const renderVisionHearingDetails = (visionHearing) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Vision & Hearing</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Left Eye">
          {visionHearing.leftEye}
        </Descriptions.Item>
        <Descriptions.Item label="Right Eye">
          {visionHearing.rightEye}
        </Descriptions.Item>
        <Descriptions.Item label="Does the student wear glasses?">
          <Radio.Group value={visionHearing.wearsGlasses} disabled>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
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
        <Descriptions.Item label="Does the student use hearing aids?">
          <Radio.Group value={visionHearing.usesHearingAids} disabled>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="Hearing Notes">
          {visionHearing.hearingNotes}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderVaccinationDetails = (vaccination) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Vaccination</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Vaccines Given">
          <Checkbox.Group
            options={[
              "BCG (Tuberculosis)",
              "Hepatitis B",
              "DPT (Diphtheria, Whooping Cough, Tetanus)",
              "MMR (Measles, Mumps, Rubella)",
              "Chickenpox",
              "Polio",
              "Hib (Meningitis, Pneumonia)",
              "Japanese encephalitis",
              "Rotavirus",
              "HPV",
              "Influenza",
              "Other",
            ]}
            value={vaccination.vaccinesGiven}
            disabled
          />
        </Descriptions.Item>
        <Descriptions.Item label="Vaccination History">
          {vaccination.vaccinationHistory}
        </Descriptions.Item>
        <Descriptions.Item label="Has the student ever had side effects after vaccination?">
          <Radio.Group value={vaccination.hasSideEffects} disabled>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="Adverse Details">
          {vaccination.adverseDetails}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderMedicationDetails = (medication) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Medication Details</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name of Medicine">
          {medication.name}
        </Descriptions.Item>
        <Descriptions.Item label="Dosage">
          {medication.dosage}
        </Descriptions.Item>
        <Descriptions.Item label="Frequency">
          {medication.frequency}
        </Descriptions.Item>
        <Descriptions.Item label="Start Date">
          {medication.startDate}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {medication.endDate}
        </Descriptions.Item>
        <Descriptions.Item label="Instructions">
          {medication.instructions}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {medication.status}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderDetailsContent = (record) => {
    if (record.type === "health") {
      const { general, allergies, chronic, visionHearing, vaccination } =
        record.details;
      return (
        <>
          {general && renderGeneralInfo(general)}
          {allergies && renderAllergyDetails(allergies)}
          {chronic && renderChronicDetails(chronic)}
          {visionHearing && renderVisionHearingDetails(visionHearing)}
          {vaccination && renderVaccinationDetails(vaccination)}
        </>
      );
    } else if (record.type === "medication") {
      return renderMedicationDetails(record.details);
    }
    return <p>{record.details}</p>;
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card title="All history">
        <p className="mb-4 text-gray-600">
          History of all student health related activities
        </p>
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
                  typeConfig[selectedRecord.type]?.color || "bg-gray-200"
                }`}
              >
                {typeConfig[selectedRecord.type]?.text || "Không xác định"}
              </Tag>
              <Tag
                color={
                  selectedRecord.status === "completed" ||
                  selectedRecord.status === "confirmed"
                    ? "green"
                    : "yellow"
                }
              >
                {statusConfig[selectedRecord.status]?.text || "Không xác định"}
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

export default AllRecord;
