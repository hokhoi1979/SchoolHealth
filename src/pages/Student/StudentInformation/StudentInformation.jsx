import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Descriptions, Avatar, Tag, Spin } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { fetchGetProfile } from "../../../redux/getProflie/getProfileSlice";
import hs from "../../../img/hs.jpg";

const StudentInformation = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.getProfile);

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  const formDate = (dataString) => {
    if (!dataString) return "N/A";
    const date = new Date(dataString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
          <CommonBreadcrumb role={"Student"} page={"information"} />
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
          <CommonBreadcrumb role={"Student"} page={"information"} />
        </h1>
        <div className="p-6 flex-1">
          <Alert
            message="Lỗi tải thông tin"
            description={`Không thể tải thông tin học sinh: ${error}`}
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
        <CommonBreadcrumb role={"Student"} page={"information"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          STUDENT INFORMATION
        </h1>
        <p className="pt-5 ml-5 text-blue-400 font-medium">
          Student profile information
        </p>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6">
            <Avatar
              size={120}
              src={hs}
              icon={<UserOutlined />}
              className="border-4 border-blue-100"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 font-inria">
                {profile?.data?.fullname || "N/A"}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-blue-500" />
                  <span>
                    Student code:{" "}
                    <strong>{profile?.data?.student_code || "N/A"}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-blue-500" />
                  <span>
                    Classroom:{" "}
                    <strong>{profile?.data?.className || "N/A"}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag color={profile?.graduated ? "green" : "orange"}>
                    {profile?.data?.graduated ? "Graduated" : "Studying"}
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-blue-500" />
                <span className="text-xl font-semibold font-inria">
                  Student Information
                </span>
              </div>
            }
            className="shadow-sm"
          >
            <Descriptions column={1} size="middle" className="font-inria">
              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">Full Name</span>
                }
              >
                {profile?.data?.fullname || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Student Code
                  </span>
                }
              >
                {profile?.data?.student_code || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Date of Birth
                  </span>
                }
              >
                {profile?.data?.dateOfBirth || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">Gender</span>
                }
              >
                {profile?.data?.gender || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">Graduated</span>
                }
              >
                <Tag color={profile?.data?.graduated ? "green" : "orange"}>
                  {profile?.graduated ? "Graduated" : "Studying"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card
            title={
              <div className="flex items-center gap-2">
                <PhoneOutlined className="text-green-500" />
                <span className="text-xl font-semibold font-inria">
                  Contact information
                </span>
              </div>
            }
            className="shadow-sm"
          >
            <Descriptions column={1} size="middle" className="font-inria">
              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">Email</span>
                }
              >
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-blue-500" />
                  {profile?.data?.email || "N/A"}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-purple-500" />
                <span className="text-xl font-semibold font-inria">
                  Parent Information
                </span>
              </div>
            }
            className="shadow-sm"
          >
            <Descriptions column={1} size="middle" className="font-inria">
              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Parent Full Name
                  </span>
                }
              >
                {profile?.data?.parentFullname}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Parent Email
                  </span>
                }
              >
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-blue-500" />
                  {profile?.data?.parentEmail || "N/A"}
                </div>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Parent Phone
                  </span>
                }
              >
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-blue-500" />
                  {profile?.data?.parentPhone || "N/A"}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
      <div className="h-[160px] w-full"></div>
      <AppFooter />
    </div>
  );
};
export default StudentInformation;
