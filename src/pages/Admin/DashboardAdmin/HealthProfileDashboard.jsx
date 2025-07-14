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
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Tổng học sinh">
            <p>{totalStudents}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Đã có hồ sơ sức khỏe">
            <p>{totalHealthProfile}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Chưa có hồ sơ">
            <p>{studentNotHealthProfile}</p>
          </Card>
        </Col>
      </Row>

      <Card title="Tỷ lệ hoàn thành hồ sơ" className="mt-6">
        <Progress percent={percentProfileCompleted} status="active" />
      </Card>

      <Row gutter={16} className="mt-6">
        <Col span={8}>
          <Card title="Dị ứng phổ biến">
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

        <Col span={8}>
          <Card title="Bệnh mãn tính phổ biến">
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

        <Col span={8}>
          <Card title="Vaccine phổ biến">
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

      <Card title="Học sinh chưa có hồ sơ" className="mt-6">
        <Table
          columns={columns}
          dataSource={studentsWithoutProfile}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </Spin>
  );
};

export default HealthProfileDashboard;
