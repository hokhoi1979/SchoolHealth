import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Tabs,
  Radio,
  Checkbox,
  Select,
  Alert,
} from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const Vaccination = () => {
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
        title="Vaccination"
        extra="Declare information about student's vaccination history"
        className="mt-4"
      >
        <div>
          <label className="block text-base">Vaccines given</label>
          <div className="grid grid-cols-6 md:grid-cols-2 mt-2">
            <Checkbox id="bcg">BCG (Tuberculosis)</Checkbox>
            <Checkbox id="hepatitis-b">Hepatitis B</Checkbox>
            <Checkbox id="dpt">
              DPT (Diphtheria, Whooping Cough, Tetanus)
            </Checkbox>
            <Checkbox id="polio">Polio</Checkbox>
            <Checkbox id="mmr">MMR (Measles, Mumps, Rubella)</Checkbox>
            <Checkbox id="hib">Hib (Meningitis, Pneumonia)</Checkbox>
            <Checkbox id="chickenpox">Chickenpox</Checkbox>
            <Checkbox id="japanese-encephalitis">
              Japanese encephalitis
            </Checkbox>
            <Checkbox id="rotavirus">Rotavirus</Checkbox>
            <Checkbox id="hpv">HPV</Checkbox>
            <Checkbox id="flu">Influenza</Checkbox>
            <Checkbox id="other-vaccine">Other</Checkbox>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="vaccination-history" className="block mb-1 text-base">
            Vaccination History
          </label>
          <TextArea
            id="vaccination-history"
            placeholder="Enter details about your vaccination history, including vaccination date and post-vaccination reaction (if any)"
            rows={4}
          />
        </div>
        <div className="mt-4">
          <label className="block text-base">
            Has the student ever had side effects after vaccination?
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
          <label
            htmlFor="vaccine-reaction-details"
            className="block mb-1 text-base"
          >
            Adverse reaction details
          </label>
          <TextArea
            id="vaccine-reaction-details"
            placeholder="Detailed description of adverse reactions after vaccination (if any)"
            rows={4}
          />
        </div>

        <div className="text-right mt-6">
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save information
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Vaccination;
