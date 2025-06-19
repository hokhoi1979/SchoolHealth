import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Spin } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { fetchGetProfile } from "../../../redux/getProflie/getProfileSlice";
import manager from "../../../img/manager.jpg";

const ManagerInformation = () => {
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
          <CommonBreadcrumb role={"Manager"} page={"information"} />
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
          <CommonBreadcrumb role={"Manager"} page={"information"} />
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
        <CommonBreadcrumb role={"Manager"} page={"information"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="felx items-center gap-6">
            <Avatar
              size={120}
              src={manager}
              icon={<UserOutlined />}
              className="border-4 border-blue-100"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 font-inria">
                {profile?.fullname || "N/A"}
              </h1>
              <div className="flex items-center gap-2">
                <MailOutlined className="text-blue-500" />
                <span>
                  Email: <strong>{profile?.email}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[160px] w-full"></div>
      <AppFooter />
    </div>
  );
};
export default ManagerInformation;
