"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Descriptions,
  Avatar,
  Tag,
  Spin,
  Alert,
  Modal,
  Button,
  Form,
  Input,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { fetchGetProfile } from "../../../redux/getProflie/getProfileSlice";
import { fetchUpdateParent } from "../../../redux/profileParent/updateParentProfile/updateParentProfileSlice";
import { toast } from "react-toastify";
import parent from "../../../img/parent.jpg";
import { __values } from "tslib";

const ParentInformation = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.getProfile);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleUpdate = (values) => {
    // Dispatch update
    dispatch(fetchUpdateParent(values));
    setIsModalVisible(false);

    // Delay reload
    setTimeout(() => {
      dispatch(fetchGetProfile());
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
          <CommonBreadcrumb role={"Parent"} page={"information"} />
        </h1>
        <div className="flex-1 flex items-center justify-center">
          <Spin size="large" />
        </div>
        <AppFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
          <CommonBreadcrumb role={"Parent"} page={"information"} />
        </h1>
        <div className="p-6 flex-1">
          <Alert
            message="Lỗi tải thông tin"
            description={`Không thể tải thông tin phụ huynh: ${error}`}
            type="error"
            showIcon
          />
        </div>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"information"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          PARENT INFORMATION
        </h1>
        <p className="pt-5 ml-5 text-blue-400 font-medium">
          Parent profile information
        </p>

        {/* Header card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6">
            <Avatar
              size={120}
              src={parent}
              icon={<UserOutlined />}
              className="border-4 border-blue-100"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 font-inria">
                {profile?.data?.parentInfo?.fullname || "N/A"}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-blue-500" />
                  <span>
                    Phone:{" "}
                    <strong>{profile?.data?.parentInfo?.phone || "N/A"}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-blue-500" />
                  <span>
                    Email:{" "}
                    <strong>{profile?.data?.parentInfo?.email || "N/A"}</strong>
                  </span>
                </div>
              </div>
            </div>
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => {
                form.setFieldsValue({
                  email: profile?.data?.parentInfo?.email,
                  phone: profile?.data?.parentInfo?.phone,
                });
                setIsModalVisible(true);
              }}
            >
              Update Info
            </Button>
          </div>
        </div>

        {/* Parent info card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-blue-500" />
                <span className="text-xl font-semibold font-inria">
                  Parent Information
                </span>
              </div>
            }
            className="shadow-sm"
          >
            <Descriptions column={1} size="middle" className="font-inria">
              <Descriptions.Item label="Full Name">
                {profile?.data?.parentInfo?.fullname || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-blue-500" />
                  {profile?.data?.parentInfo?.email || "N/A"}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-blue-500" />
                  {profile?.data?.parentInfo?.phone || "N/A"}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Created Date">
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-blue-500" />
                  {formatDate(profile?.data?.parentInfo?.createdAt)}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Student info card */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <TeamOutlined className="text-blue-500" />
                <span className="text-xl font-semibold font-inria">
                  Student Of Parent Information
                </span>
              </div>
            }
            className="shadow-sm"
          >
            {profile?.data?.studentOfParent?.length > 0 ? (
              <div className="space-y-4">
                {profile.data.studentOfParent.map((student, index) => (
                  <div
                    key={index}
                    className={index > 0 ? "border-t border-gray-100 pt-4" : ""}
                  >
                    <Descriptions
                      column={1}
                      size="middle"
                      className="font-inria"
                    >
                      <Descriptions.Item label="Student Name">
                        {student?.account?.fullname || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        <div className="flex items-center gap-2">
                          <MailOutlined className="text-blue-500" />
                          {student?.account?.email || "N/A"}
                        </div>
                      </Descriptions.Item>
                      <Descriptions.Item label="Class">
                        {student?.classAssignments?.length > 0 ? (
                          student.classAssignments.map((assignment, idx) => (
                            <Tag key={idx} color="green">
                              {assignment?.class?.name || "N/A"}
                            </Tag>
                          ))
                        ) : (
                          <span className="text-gray-500">
                            No class assigned
                          </span>
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TeamOutlined className="text-4xl text-gray-300 mb-2" />
                <p className="text-gray-500">
                  No children information available
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <AppFooter />

      {/* Modal update */}
      <Modal
        title="Update Parent Info"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => handleUpdate(values))
            .catch(() => {});
        }}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParentInformation;
