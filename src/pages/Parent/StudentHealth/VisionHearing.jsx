import React from "react";
import { useState } from "react";
import { Button, Card, Input, Radio, Select, Alert } from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const VisionHear = () => {
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
        title="Vision & Hearing"
        extra="Declare information about students' vision and hearing"
        className="mt-4"
      >
        <div>
          <label className="block text-lg">Vision</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
            <div>
              <label htmlFor="left-eye" className="block mb-1 text-base">
                Left Eye
              </label>
              <Input
                id="left-eye"
                placeholder="Enter left eye vision (eg 10/10)"
              />
            </div>
            <div>
              <label htmlFor="right-eye" className="block mb-1 text-base">
                Right Eye
              </label>
              <Input
                id="right-eye"
                placeholder="Enter right eye vision (eg 10/10)"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-base">Do students wear glasses?</label>
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
          <label htmlFor="vision-notes" className="block mb-1 text-base">
            Vision Notes
          </label>
          <TextArea
            id="vision-notes"
            placeholder="Enter student vision notes"
            rows={4}
          />
        </div>
        <div className="mt-6">
          <label className="block text-lg">Hearing</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
            <div>
              <label htmlFor="left-ear" className="block mb-1 text-base">
                Left Ear
              </label>
              <Select
                id="left-ear"
                placeholder="Select hearing level"
                className="w-full"
              >
                <Option value="normal">Normal</Option>
                <Option value="mild">Mild</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="severe">Severe</Option>
              </Select>
            </div>
            <div>
              <label htmlFor="right-ear" className="block mb-1 text-base">
                Right Ear
              </label>
              <Select
                id="right-ear"
                placeholder="Select hearing level"
                className="w-full"
              >
                <Option value="normal">Normal</Option>
                <Option value="mild">Mild</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="severe">Severe</Option>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-base">
              Do students use hearing aids?
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
            <label htmlFor="hearing-notes" className="block mb-1 text-base">
              Hearing Notes
            </label>
            <TextArea
              id="hearing-notes"
              placeholder="Enter student hearing notes"
              rows={4}
            />
          </div>

          <div className="text-right mt-6">
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save information
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default VisionHear;
