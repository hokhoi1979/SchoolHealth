// pages/Admin/StudentAdmin/StudentAdmin.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Tag,
  Descriptions,
  Card,
  Input,
  Row,
  Col,
  Select,
  Button,
  Space,
  message,
} from "antd";
import { fetchAllStudent } from "../../../redux/admin/getAllStudentSlice";
import { createStudentAdmin } from "../../../redux/admin/createStudentAdminSlice";
import { fetchClassManager } from "../../../redux/manager/getClassManagerSlice";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { useNavigate } from "react-router-dom";
import CreateStudentModal from "./CreateStudentModal";
const { Option } = Select;

function StudentAdmin() {
  const dispatch = useDispatch();
  const { students, pagination, loading } = useSelector(
    (state) => state.getAllStudent
  );

  const { classManager } = useSelector((state) => state.getManagerClass);
  const classList = classManager?.data || [];

  const handleCreateStudent = (studentData) => {
    dispatch(createStudentAdmin(studentData));

    message.success("Student created successfully!");
    setModalVisible(false);

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000); // chờ 1 giây cho toast hiển thị
  };

  useEffect(() => {}, [classList]);

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    dispatch(fetchClassManager());
  }, []);

  const navigate = useNavigate();

  const handleViewDetail = (id) => {
    navigate(`/admin/studentAdmin/studentDetail/${id}`);
  };

  const [filters, setFilters] = useState({
    search: "",
    className: "",
    grade: "",
    academicYearName: "",
    graduated: "",
    sortBy: "createdAt",
    order: "asc",
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchAllStudent(filters));
  }, [dispatch, filters.page, filters.limit]);

  useEffect(() => {
    dispatch(fetchClassManager());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchAllStudent({ ...filters, page: 1 }));
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      className: "",
      grade: "",
      academicYearName: "",
      graduated: "",
      page: 1,
      limit: 10,
    });
  };

  const handleTableChange = (pagination) => {
    setFilters((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    { title: "Student Code", dataIndex: "student_code", key: "student_code" },
    {
      title: "Full Name",
      dataIndex: ["account", "fullname"],
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: ["account", "email"],
      key: "studentEmail",
    },
    { title: "Sex", dataIndex: "gender", key: "gender" },
    {
      title: "Class-Grade",
      key: "classGrade",
      render: (_, record) => {
        const cls = record.lastAcamedicYear?.class?.name || "N/A";
        const grade = record.lastAcamedicYear?.class?.grade || "N/A";
        return `${cls} - Khối ${grade}`;
      },
    },
    {
      title: "Year",
      dataIndex: ["lastAcamedicYear", "academicYear", "name"],
      key: "academicYear",
    },
    {
      title: "Parent",
      key: "parent",
      render: (_, record) => (
        <Descriptions column={1} size="small" bordered>
          <Descriptions.Item label="Tên">
            {record.ParentInfo?.fullname}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {record.ParentInfo?.email}
          </Descriptions.Item>
          <Descriptions.Item label="SĐT">
            {record.ParentInfo?.phone}
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      title: "Status",
      dataIndex: "graduated",
      key: "graduated",
      render: (value) =>
        value ? (
          <Tag color="green">Đã tốt nghiệp</Tag>
        ) : (
          <Tag color="blue">Đang học</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetail(record.id)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <CommonBreadcrumb role={"Admin"} page={"student"} />
      <Card
        className="mb-4"
        title="Student Filter"
        bordered
        style={{ background: "#f9f9f9" }}
      >
        <Button type="primary" onClick={handleOpenModal} className="mb-4">
          + Add New Student
        </Button>
        <CreateStudentModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onCreate={handleCreateStudent}
          classList={classList}
        />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>
              <b>Search by name or email:</b>
            </label>
            <Input
              placeholder="e.g. Nguyen Van A"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </Col>

          <Col span={6}>
            {" "}
            {/* tăng span từ 4 lên 8 hoặc nhiều hơn */}
            <label>
              <b>Class name:</b>
            </label>
            <Select
              placeholder="Select class"
              style={{ width: "100%" }}
              value={filters.className}
              onChange={(value) => setFilters({ ...filters, className: value })}
              allowClear
            >
              {Array.isArray(classList) &&
                classList.map((cls) => (
                  <Select.Option key={cls.id} value={cls.name}>
                    {cls.name}
                  </Select.Option>
                ))}
            </Select>
          </Col>

          <Col span={4}>
            <label>
              <b>Grade:</b>
            </label>
            <Input
              placeholder="e.g. 12"
              value={filters.grade}
              onChange={(e) =>
                setFilters({ ...filters, grade: e.target.value })
              }
            />
          </Col>

          <Col span={8} className="d-flex align-items-end">
            <Space style={{ marginTop: 23 }}>
              <Button type="primary" onClick={handleSearch}>
                Search
              </Button>
              <Button onClick={handleReset}>Reset</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title="Student List" bordered loading={loading}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={students}
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
}

export default StudentAdmin;
