import { useState } from "react";
import { Button, Card, Input, Select, Alert } from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

const Information = () => {
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
        title="General information"
        extra="Basic information about student health"
      >
        <div className="mb-5">
          <label htmlFor="student" className="block mb-1 text-base">
            Student
          </label>
          <Select
            id="student"
            placeholder="Choose your student"
            className="w-full"
          >
            <Option value="1">
              <div className="flex gap-100">
                <p>SE12</p>
                <p>Ngo Phung Gia Khanh</p>
                <p>123</p>
              </div>
            </Option>
            <Option value="2">
              <div className="flex gap-100">
                <p>SE14</p>
                <p>Vu Minh Duc</p>
                <p>123</p>
              </div>
            </Option>
            <Option value="2">
              <div className="flex gap-100">
                <p>SE15</p>
                <p>Ho Vu Khoi</p>
                <p>123</p>
              </div>
            </Option>
            <Option value="2">
              <div className="flex gap-100">
                <p>SE16</p>
                <p>Pham Nguyen Khoa</p>
                <p>123</p>
              </div>
            </Option>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <label htmlFor="height" className="block mb-1 text-base">
              Height (cm)
            </label>
            <Input id="height" type="number" placeholder="Enter your height" />
          </div>
          <div>
            <label htmlFor="weight" className="block mb-1 text-base">
              Weight (kg)
            </label>
            <Input id="weight" type="number" placeholder="Enter your weight" />
          </div>
          <div>
            <label htmlFor="blood-type" className="block mb-1 text-base">
              Blood Type
            </label>
            <Select
              id="blood-type"
              placeholder="Enter your blood type"
              className="w-full"
            >
              <Option value="a">A</Option>
              <Option value="b">B</Option>
              <Option value="ab">AB</Option>
              <Option value="o">O</Option>
              <Option value="unknow">Unknow</Option>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="medical-history" className="block mb-1 text-base">
            Treatment history
          </label>
          <TextArea
            id="medical-history"
            placeholder="Enter information about previously treated diseases"
            rows={4}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="special-notes" className="block mb-1 text-base">
            Notes
          </label>
          <TextArea
            id="special-notes"
            placeholder="Enter special notes about student health"
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
export default Information;
