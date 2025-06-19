import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Descriptions, Avatar, Tag, Spin } from "antd";
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
import parent from "../../../img/parent.jpg";

const ParentInformation = () => {
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
                {profile?.parentInfo?.fullname || "N/A"}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-blue-500" />
                  <span>
                    Phone: <strong>{profile?.parentInfo?.phone}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined classID="text-blue-500" />
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
                  <span className="font-semibold text-gray-700">Full Name</span>
                }
              >
                {profile?.parentInfo?.fullname || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">Email</span>
                }
              >
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-blue-500" />
                  {profile?.parentInfo?.email || "N/A"}
                </div>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">Phone</span>
                }
              >
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-blue-500" />
                  {profile?.parentInfo?.phone || "N/A"}
                </div>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Created Date
                  </span>
                }
              >
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-blue-500" />
                  {profile?.parentInfo?.createdAt || "N/A"}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2">
                <TeamOutlined classID="text-blue-500" />
                <span className="text-xl font-semibold font-inria">
                  Student Of Parent Information
                </span>
              </div>
            }
            className="shadow-sm "
          >
            {profile?.studentOfParent && profile?.studentOfParent.length > 0 ? (
              <div className="space-y-4">
                {profile.studentOfParent.map((student, index) => (
                  <div key={index}>
                    <Descriptions
                      column={1}
                      size="middle"
                      className="font-inria"
                    >
                      <Descriptions.Item
                        label={
                          <span className="font-semibold text-gray-700">
                            Student Name
                          </span>
                        }
                      >
                        {student?.account?.fullname || "N/A"}
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={
                          <span className="font-semibold text-gray-700">
                            Email
                          </span>
                        }
                      >
                        <div className="flex items-center gap-2">
                          <MailOutlined className="text-blue-500" />
                          {student?.account?.email || "N/A"}
                        </div>
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={
                          <span className="font-semibold text-gray-700">
                            Class
                          </span>
                        }
                      >
                        {student?.classAssignments &&
                        student.classAssignments.length > 0
                          ? student.classAssignments.map((assignment, idx) => (
                              <Tag key={idx} color="green">
                                {assignment?.class?.name || "N/A"}
                              </Tag>
                            ))
                          : "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No children information available
              </p>
            )}
          </Card>
        </div>
      </div>
      <div className="h-[160px] w-full"></div>
      <AppFooter />
    </div>
  );
};
export default ParentInformation;
