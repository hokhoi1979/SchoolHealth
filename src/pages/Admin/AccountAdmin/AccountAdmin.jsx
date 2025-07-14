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
  Modal,
  Popconfirm,
} from "antd";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { fetchAllAccount } from "../../../redux/admin/getAllAccountSlice";
import { fetchDetailAccount } from "../../../redux/admin/getDetailAccountSlice.js";
import { fetchChangeStatusUser } from "../../../redux/admin/changeStatusUserSlice";

const { Option } = Select;

function AccountAdmin() {
  const dispatch = useDispatch();
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { accounts, pagination, loading } = useSelector(
    (state) => state.getAllAccount
  );
  const { detail } = useSelector((state) => state.getDetailAccount);

  const [filters, setFilters] = useState({
    search: "",
    roleID: "all",
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    order: "asc",
  });

  const onViewDetail = (id) => {
    setSelectedId(id);
    setOpenDetailModal(true);
    dispatch(fetchDetailAccount(id));
  };

  useEffect(() => {
    const newFilters = { ...filters, page: 1 };
    setFilters(newFilters);
    dispatch(fetchAllAccount(newFilters));
  }, []);

  // Only fetch when search is triggered
  const handleSearch = () => {
    const newFilters = { ...filters, page: 1 };
    setFilters(newFilters);
    dispatch(fetchAllAccount(newFilters));
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      roleID: "",
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      order: "asc",
    };
    setFilters(resetFilters);
    dispatch(fetchAllAccount(resetFilters));
  };

  const handleTableChange = (pagination) => {
    setFilters((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const handleChangeStatus = (record) => {
    const newStatus = record.status === "ACTIVE" ? "BLOCK" : "ACTIVE";
    dispatch(fetchChangeStatusUser({ id: record.id, status: newStatus }));
    setTimeout(() => {
      dispatch(fetchAllAccount(filters));
    }, 500); // slight delay to allow backend to process
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullname", key: "fullname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role ID", dataIndex: "roleID", key: "roleID" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) =>
        value === "ACTIVE" ? (
          <Tag color="green">ACTIVE</Tag>
        ) : (
          <Tag color="red">BLOCK</Tag>
        ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => onViewDetail(record.id)}>View Details</Button>
          <Popconfirm
            title={`Are you sure you want to change status to ${
              record.status === "ACTIVE" ? "BLOCK" : "ACTIVE"
            }?`}
            onConfirm={() => handleChangeStatus(record)}
            okText="Yes"
            cancelText="Cancel"
          >
            <Button danger type="dashed">
              Change Status
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <CommonBreadcrumb role={"Admin"} page={"account"} />
      <Card className="mb-4" title="Account Filter">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>
              <b>Search by name or email</b>
            </label>
            <Input
              placeholder="e.g. John Doe"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </Col>
          <Col span={4}>
            <label>
              <b>Filter by role</b>
            </label>
            <Select
              value={filters.roleID}
              onChange={(value) => setFilters({ ...filters, roleID: value })}
              placeholder="Select role ID"
              style={{ width: "100%" }}
            >
              <Option value="all">All</Option>
              <Option value="1">Admin</Option>
              <Option value="2">Manager</Option>
              <Option value="3">Nurse</Option>
              <Option value="4">Parent</Option>
              <Option value="5">Student</Option>
            </Select>
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

      <Card title="Account List">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={accounts}
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
          }}
          onChange={handleTableChange}
        />
        <Modal
          open={openDetailModal}
          title="Account Details"
          onCancel={() => setOpenDetailModal(false)}
          footer={null}
        >
          {detail?.data ? (
            <Descriptions column={1} bordered>
              <Descriptions.Item label="ID">{detail.data.id}</Descriptions.Item>
              <Descriptions.Item label="Full Name">
                {detail.data.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {detail.data.email}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {detail.data.roleID}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {detail.data.status === "ACTIVE" ? (
                  <Tag color="green">ACTIVE</Tag>
                ) : (
                  <Tag color="red">BLOCK</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(detail.data.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {new Date(detail.data.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <p>Loading...</p>
          )}
        </Modal>
      </Card>
    </div>
  );
}

export default AccountAdmin;
