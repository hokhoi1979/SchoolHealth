import React from "react";
import { useState } from "react";
import { Button, Card, Input, Radio, Checkbox, Alert } from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Allergies = () => {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
        ></Alert>
      )}
      <Card
        title="Allergies Information"
        extra="Declare information about student allergies"
      >
        <div>
          <label className="block text-base">
            Does the student have allergies?
          </label>
          <Radio.Group defaultValue="no" className="mt-2">
            <Radio value="yes" className="mb-3" style={{ display: "block" }}>
              Yes
            </Radio>
            <Radio value="no" style={{ display: "block" }}>
              No
            </Radio>
          </Radio.Group>
        </div>
        <div className="mt-4">
          <label className="block text-base">Type of allergies</label>
          <div className="grid grid-cols-3 md:grid-cols-2 mt-2">
            <Checkbox id="food-allery" className="mb-2">
              Food Allery
            </Checkbox>
            <Checkbox id="drug-allery" className="mb-2">
              Drug Allery
            </Checkbox>
            <Checkbox id="insect-allery" className="mb-2">
              Insect Allery
            </Checkbox>
            <Checkbox id="pollen-allery" className="mb-2">
              Pollen Allery
            </Checkbox>
            <Checkbox id="dust-allery" className="mb-2">
              Dust Allery
            </Checkbox>
            <Checkbox id="other-allery" className="mb-2">
              Others
            </Checkbox>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="allery-details" className="block mb-1 text-base">
            Allery Detail
          </label>
          <TextArea
            id="allery-details"
            placeholder="Detailed description of allergies, including symptoms and severity"
            rows={4}
          />
        </div>
        <div className="mt-4 text-base">
          <label htmlFor="allergy-treatment" className="block mb-1">
            Allery Treatment
          </label>
          <TextArea
            id="allergy-treatment"
            placeholder="Describe treatments for allergic reactions"
            rows={4}
          />
        </div>
        <div className="text-right mt-6">
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Lưu thông tin
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Allergies;
