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
import moment from "moment";
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
    console.log("Created student data:", studentData);

    dispatch(createStudentAdmin(studentData));

    message.success("Student created successfully!");
    setModalVisible(false);

    setTimeout(() => {
      window.location.reload();
    }, 1000); // chờ 1 giây cho toast hiển thị
  };

  useEffect(() => {
    console.log("Class list:", classList);
  }, [classList]);

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
    { title: "Mã học sinh", dataIndex: "student_code", key: "student_code" },
    {
      title: "Tên học sinh",
      dataIndex: ["account", "fullname"],
      key: "fullname",
    },
    {
      title: "Email học sinh",
      dataIndex: ["account", "email"],
      key: "studentEmail",
    },
    { title: "Giới tính", dataIndex: "gender", key: "gender" },
    {
      title: "Lớp - Khối",
      key: "classGrade",
      render: (_, record) => {
        const cls = record.lastAcamedicYear?.class?.name || "N/A";
        const grade = record.lastAcamedicYear?.class?.grade || "N/A";
        return `${cls} - Khối ${grade}`;
      },
    },
    {
      title: "Năm học",
      dataIndex: ["lastAcamedicYear", "academicYear", "name"],
      key: "academicYear",
    },
    {
      title: "Phụ huynh",
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
      title: "Trạng thái",
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
      title: "Thao tác",
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
        title="Bộ lọc dữ liệu học sinh"
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
              <b>Tìm kiếm theo tên hoặc email:</b>
            </label>
            <Input
              placeholder="VD: Nguyễn Văn A"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </Col>
          <Col span={4}>
            <label>
              <b>Tên lớp:</b>
            </label>
            <Input
              placeholder="VD: 12A1"
              value={filters.className}
              onChange={(e) =>
                setFilters({ ...filters, className: e.target.value })
              }
            />
          </Col>
          <Col span={4}>
            <label>
              <b>Khối:</b>
            </label>
            <Input
              placeholder="VD: 12"
              value={filters.grade}
              onChange={(e) =>
                setFilters({ ...filters, grade: e.target.value })
              }
            />
          </Col>
          <Col span={4}>
            <label>
              <b>Năm học:</b>
            </label>
            <Input
              placeholder="VD: 2025-2026"
              value={filters.academicYearName}
              onChange={(e) =>
                setFilters({ ...filters, academicYearName: e.target.value })
              }
            />
          </Col>
          <Col span={4}>
            <label>
              <b>Trạng thái tốt nghiệp:</b>
            </label>
            <Select
              value={filters.graduated}
              onChange={(value) => setFilters({ ...filters, graduated: value })}
              allowClear
              placeholder="Chọn trạng thái"
              style={{ width: "100%" }}
            >
              <Option value={true}>Đã tốt nghiệp</Option>
              <Option value={false}>Chưa tốt nghiệp</Option>
            </Select>
          </Col>
          <Col span={4}>
            <label>
              <b>Sắp xếp theo trường:</b>
            </label>
            <Input
              placeholder="VD: createdAt, fullname"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
            />
          </Col>
          <Col span={4}>
            <label>
              <b>Thứ tự sắp xếp:</b>
            </label>
            <Select
              value={filters.order}
              onChange={(value) => setFilters({ ...filters, order: value })}
              placeholder="asc / desc"
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="asc">Tăng dần (asc)</Option>
              <Option value="desc">Giảm dần (desc)</Option>
            </Select>
          </Col>
          <Col span={4}>
            <label>
              <b>Số dòng mỗi trang:</b>
            </label>
            <Select
              value={filters.limit}
              onChange={(value) => setFilters({ ...filters, limit: value })}
              style={{ width: "100%" }}
            >
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={50}>50</Option>
            </Select>
          </Col>
          <Col span={8} className="d-flex align-items-end">
            <Space style={{ marginTop: 23 }}>
              <Button type="primary" onClick={handleSearch}>
                Tìm kiếm
              </Button>
              <Button onClick={handleReset}>Đặt lại</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title="Danh sách học sinh" bordered loading={loading}>
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
