import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Spin } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { medicalEventDashboard } from "../../../redux/admin/getMedicalEventDashboardSlice";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA6CFF",
  "#00B9F1",
];

const MedicalEventDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.getMedicalEventDashboard
  );

  useEffect(() => {
    dispatch(
      medicalEventDashboard({
        filter: "all",
      })
    );
  }, [dispatch]);

  const eventByType = data?.eventByType || [];
  const eventBySeverity = data?.eventBySeverity || [];
  const eventTimeline = data?.eventTimeline || [];

  const summaryData = [
    {
      name: "Hôm nay",
      value: data?.summary?.eventsToday || 0,
    },
    {
      name: "Tháng này",
      value: data?.summary?.eventsThisMonth || 0,
    },
    {
      name: "Tổng cộng",
      value: data?.summary?.eventsTotal || 0,
    },
  ];

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]} className="p-4">
        {/* Tổng quan */}
        <Col xs={24} md={12}>
          <div className="bg-white rounded-2xl shadow p-4 h-full">
            <Card title="Tổng quan sự kiện y tế" bordered={false}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={summaryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {summaryData.map((entry, index) => (
                      <Cell
                        key={`summary-cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Col>

        {/* Phân loại sự kiện */}
        <Col xs={24} md={12}>
          <div className="bg-white rounded-2xl shadow p-4 h-full">
            <Card title="Phân loại sự kiện y tế" bordered={false}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={eventByType}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {eventByType.map((entry, index) => (
                      <Cell
                        key={`type-cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Col>

        {/* Mức độ nghiêm trọng */}
        <Col xs={24} md={12}>
          <div className="bg-white rounded-2xl shadow p-4 h-full">
            <Card title="Mức độ nghiêm trọng" bordered={false}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={eventBySeverity}
                    dataKey="count"
                    nameKey="severiry"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {eventBySeverity.map((entry, index) => (
                      <Cell
                        key={`severity-cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Col>

        {/* Biểu đồ cột theo thời gian */}
        <Col xs={24} md={12}>
          <div className="bg-white rounded-2xl shadow p-4 h-full">
            <Card title="Sự kiện theo thời gian" bordered={false}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Số sự kiện" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Col>
      </Row>
    </Spin>
  );
};

export default MedicalEventDashboard;
