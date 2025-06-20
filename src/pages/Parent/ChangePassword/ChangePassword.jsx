import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Alert, message, Steps, Avatar } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Shield, Key, CheckCircle, AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProfile } from "../../../redux/getProflie/getProfileSlice";
import { fetchChangePassword } from "../../../redux/ChangePassword/changePasswordSlice";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import parent from "../../../img/parent.jpg";
import { AppFooter } from "../../../components/Footer/AppFooter";

const { Step } = Steps;

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.getProfile);
  const { loading, error, data } = useSelector((state) => state.changePassword);

  const userInfo = {
    fullname: profile?.data?.parentInfo?.fullname,
    phone: profile?.data?.parentInfo?.phone,
    email: profile?.data?.parentInfo?.email,
  };

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  useEffect(() => {
    if (data && !loading && !error) {
      setCurrentStep(1);
      message.success("Change password successfully");
      form.resetFields();
    }
  }, [data, loading, error, form]);

  useEffect(() => {
    if (error && !loading) {
      const errorMessage =
        typeof error === "object"
          ? error.message || "Error change password"
          : error;
      message.error(errorMessage);
    }
  }, [error, loading]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      console.log("Submitting change password", payload);
      dispatch(fetchChangePassword(payload));
    } catch (error) {
      console.error("Error submitting change password:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập mật khẩu mới!"));
    }
    if (value.length < 6) {
      return Promise.reject(new Error("Mật khẩu phải có ít nhất 6 ký tự!"));
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return Promise.reject(
        new Error("Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!")
      );
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng xác nhận mật khẩu mới!"));
    }
    if (value !== form.getFieldValue("newPassword")) {
      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
    }
    return Promise.resolve();
  };

  const resetForm = () => {
    setCurrentStep(0);
    form.resetFields();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"password"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield size={32} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-600 ml-5">
              Change Password
            </h1>
            <p className="pt-3 ml-5 text-blue-500 font-medium">
              Update your password to secure your account
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Steps current={currentStep}>
            <Step
              title="Enter information"
              description="Fill out the password change form"
              icon={<Key size={16} />}
            />
            <Step
              title="Complete"
              description="Password has been updated"
              icon={<CheckCircle size={16} />}
            />
          </Steps>
        </div>
        {currentStep === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <UserOutlined className="text-blue-500" />
                    <span>Account Information</span>
                  </div>
                }
                className="shadow-sm h-fit"
              >
                <div className="text-center">
                  <Avatar
                    size={120}
                    src={parent}
                    icon={<UserOutlined />}
                    className="border-4 border-blue-100"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {userInfo.fullname}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Phone: {userInfo.phone}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Email: {userInfo.email}
                  </p>
                </div>
              </Card>

              <Card
                title={
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-orange-500" />
                    <span>Privacy Notice</span>
                  </div>
                }
                className="shadow-sm mt-4"
              >
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Use at least 6 characters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Include uppercase and lowercase letters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>At least 1 digit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>Do not share with others</span>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <LockOutlined className="text-green-500" />
                    <span className="text-xl font-semibold">
                      Change Password
                    </span>
                  </div>
                }
                className="shadow-sm"
              >
                {/* Error Alert */}
                {error && (
                  <Alert
                    message="Error"
                    description={
                      typeof error === "object" ? error.message : error
                    }
                    type="error"
                    showIcon
                    className="mb-4"
                    closable
                  />
                )}

                <Alert
                  message="Important Information"
                  description="After successfully changing your password, you will need to use the new password to log in next time."
                  type="info"
                  showIcon
                  className="mb-6"
                />

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  size="large"
                >
                  <Form.Item
                    label={
                      <span className="font-semibold text-gray-700">
                        Current Password
                      </span>
                    }
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your current password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Enter current password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      disabled={loading}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="font-semibold text-gray-700">
                        New password
                      </span>
                    }
                    name="newPassword"
                    rules={[{ validator: validatePassword }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Enter new password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      disabled={loading}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="font-semibold text-gray-700">
                        Confirm new password
                      </span>
                    }
                    name="confirmPassword"
                    rules={[{ validator: validateConfirmPassword }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Re-enter new password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      disabled={loading}
                    />
                  </Form.Item>

                  <div className="flex gap-4 mt-8">
                    <Button
                      size="large"
                      className="flex-1"
                      onClick={() => form.resetFields()}
                      disabled={loading}
                    >
                      Refresh
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Change password"}
                    </Button>
                  </div>
                </Form>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="shadow-sm">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleOutlined className="text-green-600 text-4xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Password changed successfully!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Your password has been updated successfully. <br />
                Please use the new password to log in next time.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="large" onClick={resetForm} className="px-8">
                  Change another password
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-500 hover:bg-blue-600 px-8"
                  onClick={() => (window.location.href = "/student")}
                >
                  Back to home page
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
      <div className="h-[160px] w-full"></div>
      <AppFooter />
    </div>
  );
};
export default ChangePassword;
