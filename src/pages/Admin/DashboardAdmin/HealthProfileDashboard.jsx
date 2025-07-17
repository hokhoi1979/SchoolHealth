import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Progress, Table, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { healthProfileDashboard } from "../../../redux/admin/getHealthProfileDashboardSlice";

// Hàm lọc an toàn: bỏ những dòng thiếu key hoặc không hợp lệ
const filterValidData = (arr, key) => (arr || []).filter((item) => item[key]);

const HealthProfileDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.getHealthProfileDashboard
  );

  useEffect(() => {
    dispatch(healthProfileDashboard({}));
  }, [dispatch]);

  const {
    percentProfileCompleted = 0,
    totalStudents = 0,
    totalHealthProfile = 0,
    studentNotHealthProfile = 0,
    studentsWithoutProfile = [],
    topCommonAllergies = [],
    topCommonChronic = [],
    topCommonVaccine = [],
  } = data || {};

  const allergyData = filterValidData(topCommonAllergies, "allergy");
  const chronicData = filterValidData(topCommonChronic, "disease");
  const vaccineData = filterValidData(topCommonVaccine, "vaccine");

  const columns = [
    { title: "Mã học sinh", dataIndex: "student_code", key: "student_code" },
    { title: "Họ tên", dataIndex: ["account", "fullname"], key: "fullname" },
    { title: "Giới tính", dataIndex: "gender", key: "gender" },
    {
      title: "Lớp",
      dataIndex: "classAssignments",
      key: "class",
      render: (classes) => classes?.[0]?.class?.name || "N/A",
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="p-4">
        {/* Thống kê tổng quan */}
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={8}>
            <Card
              className="rounded-2xl shadow h-full"
              title="Tổng học sinh"
              bordered={false}
            >
              <div className="text-2xl font-semibold text-blue-600">
                {totalStudents}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              className="rounded-2xl shadow h-full"
              title="Đã có hồ sơ sức khỏe"
              bordered={false}
            >
              <div className="text-2xl font-semibold text-green-600">
                {totalHealthProfile}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              className="rounded-2xl shadow h-full"
              title="Chưa có hồ sơ"
              bordered={false}
            >
              <div className="text-2xl font-semibold text-red-500">
                {studentNotHealthProfile}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Tỷ lệ hoàn thành */}
        <Card
          title="Tỷ lệ hoàn thành hồ sơ"
          className="rounded-2xl shadow mb-6"
          bordered={false}
        >
          <Progress percent={percentProfileCompleted} status="active" />
        </Card>

        {/* 3 biểu đồ thống kê */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} md={8}>
            <Card
              title="Dị ứng phổ biến"
              className="rounded-2xl shadow h-full"
              bordered={false}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={allergyData}>
                  <XAxis dataKey="allergy" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              title="Bệnh mãn tính phổ biến"
              className="rounded-2xl shadow h-full"
              bordered={false}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chronicData}>
                  <XAxis dataKey="disease" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              title="Vaccine phổ biến"
              className="rounded-2xl shadow h-full"
              bordered={false}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={vaccineData}>
                  <XAxis dataKey="vaccine" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Danh sách học sinh chưa có hồ sơ */}
        <Card
          title="Học sinh chưa có hồ sơ"
          className="rounded-2xl shadow"
          bordered={false}
        >
          <Table
            columns={columns}
            dataSource={studentsWithoutProfile}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </Spin>
  );
};

export default HealthProfileDashboard;
