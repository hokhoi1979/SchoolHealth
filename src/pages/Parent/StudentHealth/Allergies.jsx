import React, { useState } from "react";
import { Button, Card, Input, Radio, Checkbox, Alert } from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Allergies = () => {
  const [saved, setSaved] = useState(false);
  const [hasAllergy, setHasAllergy] = useState("no");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const onAllergyChange = (e) => {
    setHasAllergy(e.target.value);
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
        title="Allergies Information"
        extra="Declare information about student allergies"
      >
        <div>
          <label className="block text-base">
            Does the student have allergies?
          </label>
          <Radio.Group
            onChange={onAllergyChange}
            value={hasAllergy}
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

        {hasAllergy === "yes" && (
          <>
            <div className="mt-4">
              <label className="block text-base">Type of allergies</label>
              <div className="grid grid-cols-3 md:grid-cols-2 mt-2">
                <Checkbox id="food-allergy" className="mb-2">
                  Food Allergy
                </Checkbox>
                <Checkbox id="drug-allergy" className="mb-2">
                  Drug Allergy
                </Checkbox>
                <Checkbox id="insect-allergy" className="mb-2">
                  Insect Allergy
                </Checkbox>
                <Checkbox id="pollen-allergy" className="mb-2">
                  Pollen Allergy
                </Checkbox>
                <Checkbox id="dust-allergy" className="mb-2">
                  Dust Allergy
                </Checkbox>
                <Checkbox id="other-allergy" className="mb-2">
                  Others
                </Checkbox>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="allergy-details" className="block mb-1 text-base">
                Allergy Detail
              </label>
              <TextArea
                id="allergy-details"
                placeholder="Detailed description of allergies, including symptoms and severity"
                rows={4}
              />
            </div>
            <div className="mt-4 text-base">
              <label htmlFor="allergy-treatment" className="block mb-1">
                Allergy Treatment
              </label>
              <TextArea
                id="allergy-treatment"
                placeholder="Describe treatments for allergic reactions"
                rows={4}
              />
            </div>
          </>
        )}

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
