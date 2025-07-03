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
    roleID: "",
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
    dispatch(fetchAllAccount(filters));
  }, [dispatch, filters.page, filters.limit]);

  const handleSearch = () => {
    dispatch(fetchAllAccount({ ...filters, page: 1 }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      roleID: "",
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

  const handleChangeStatus = (record) => {
    const newStatus = record.status === "ACTIVE" ? "BLOCK" : "ACTIVE";
    dispatch(fetchChangeStatusUser({ id: record.id, status: newStatus }));
    setTimeout(() => {
      dispatch(fetchAllAccount(filters));
    }, 500); // delay nhỏ để đảm bảo backend đã xử lý xong
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
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => onViewDetail(record.id)}>Xem chi tiết</Button>
          <Popconfirm
            title={`Bạn có chắc muốn đổi trạng thái sang ${
              record.status === "ACTIVE" ? "BLOCK" : "ACTIVE"
            }?`}
            onConfirm={() => handleChangeStatus(record)}
            okText="Đồng ý"
            cancelText="Huỷ"
          >
            <Button danger type="dashed">
              Đổi trạng thái
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <CommonBreadcrumb role={"Admin"} page={"account"} />
      <Card className="mb-4" title="Bộ lọc dữ liệu tài khoản">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>
              <b>Tìm kiếm theo tên hoặc email</b>
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
              <b>Tìm kiếm theo vai trò</b>
            </label>
            <Select
              value={filters.roleID}
              onChange={(value) => setFilters({ ...filters, roleID: value })}
              allowClear
              placeholder="Chọn mã vai trò"
              style={{ width: "100%" }}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
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

      <Card title="Danh sách tài khoản">
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
          title="Chi tiết tài khoản"
          onCancel={() => setOpenDetailModal(false)}
          footer={null}
        >
          {detail?.data ? (
            <Descriptions column={1} bordered>
              <Descriptions.Item label="ID">{detail.data.id}</Descriptions.Item>
              <Descriptions.Item label="Họ tên">
                {detail.data.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {detail.data.email}
              </Descriptions.Item>
              <Descriptions.Item label="Vai trò">
                {detail.data.roleID}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {detail.data.status === "ACTIVE" ? (
                  <Tag color="green">ACTIVE</Tag>
                ) : (
                  <Tag color="red">BLOCK</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {new Date(detail.data.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Cập nhật gần nhất">
                {new Date(detail.data.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <p>Đang tải...</p>
          )}
        </Modal>
      </Card>
    </div>
  );
}

export default AccountAdmin;
