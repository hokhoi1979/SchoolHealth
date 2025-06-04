import React, { useState } from "react";
import { Button, Card, Input, Radio, Checkbox, Alert } from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Chronic = () => {
  const [saved, setSaved] = useState(false);
  const [hasChronic, setHasChronic] = useState("no");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const onChronicChange = (e) => {
    setHasChronic(e.target.value);
  };

  return (
    <div>
      {saved && (
        <Alert
          message="Successfully"
          description="Health record information has been saved successfully"
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
        />
      )}
      <Card
        title="Chronic"
        extra="Declaration of information about students' chronic diseases"
      >
        <div>
          <label className="block text-base">
            Does the student have chronic?
          </label>
          <Radio.Group
            onChange={onChronicChange}
            value={hasChronic}
            className="mt-2"
          >
            <Radio value="yes" className="mb-3" style={{ display: "block" }}>
              Yes
            </Radio>
            <Radio value="no" style={{ display: "block" }}>
              No
            </Radio>
          </Radio.Group>
        </div>

        {hasChronic === "yes" && (
          <>
            <div className="mt-4">
              <label className="block text-base">Type of chronic</label>
              <div className="grid grid-cols-3 md:grid-cols-2 mt-2">
                <Checkbox id="asthma">Asthma</Checkbox>
                <Checkbox id="diabetes">Diabetes</Checkbox>
                <Checkbox id="epilepsy">Epilepsy</Checkbox>
                <Checkbox id="heart-disease">Heart Disease</Checkbox>
                <Checkbox id="other-chronic">Others</Checkbox>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="chronic-details" className="block mb-1 text-base">
                Chronic disease details
              </label>
              <TextArea
                id="chronic-details"
                placeholder="Detailed description of chronic diseases, including duration and severity"
                rows={4}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="chronic-treatment"
                className="block mb-1 text-base"
              >
                Treatment
              </label>
              <TextArea
                id="chronic-treatment"
                placeholder="Describe current treatments for chronic conditions"
                rows={4}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="medication" className="block mb-1 text-base">
                Current medications
              </label>
              <TextArea
                id="medication"
                placeholder="List current medications, dosages, and frequency"
                rows={4}
              />
            </div>
          </>
        )}

        <div className="text-right mt-6">
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save information
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Chronic;
