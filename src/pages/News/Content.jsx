import { useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Button,
  Card,
  Badge,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Drawer,
  Form,
  List,
  Tag,
  Divider,
} from "antd";
import {
  HeartOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  ArrowRightOutlined,
  MedicineBoxOutlined,
  BookOutlined,
  TeamOutlined,
  SafetyOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const { Header, Content: AntContent, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const SchoolHealthNewsAntd = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const featuredNews = [
    {
      id: 1,
      title: "Annual Health Check Program for Students 2024-2025",
      excerpt:
        "Implementing a comprehensive health check program for students with in-depth examination packages and nutritional counseling.",
      image:
        "https://i.pinimg.com/736x/84/4c/9b/844c9bcd12e68b128c4e19abaecaf18e.jpg",
      category: "Health Check",
      date: "15/12/2024",
      author: "Dr. Nguyen Thi Lan",
      featured: true,
    },
    {
      id: 2,
      title: "Guidelines for Preventing Seasonal Flu in Schools",
      excerpt:
        "Preventive measures and handling when flu cases occur in school environments.",
      image:
        "https://i.pinimg.com/736x/56/3f/f1/563ff11b32c3b797a897086d63869366.jpg",
      category: "Disease Prevention",
      date: "12/12/2024",
      author: "Dr. Tran Van Minh",
    },
    {
      id: 3,
      title: "School Nutrition: Balanced Menus for Students",
      excerpt: "Developing age-appropriate nutritional menus for students.",
      image:
        "https://i.pinimg.com/736x/3c/27/7a/3c277aa06b20e187864d39111d00a11b.jpg",
      category: "Nutrition",
      date: "10/12/2024",
      author: "Nutritionist Le Thi Hoa",
    },
    {
      id: 4,
      title: "Student Mental Health: Early Detection and Support",
      excerpt:
        "Recognizing signs of stress and anxiety in students and effective intervention strategies.",
      image:
        "https://i.pinimg.com/736x/bb/97/6f/bb976f0e31ef90f95b465b0c6a0c1491.jpg",
      category: "Mental Health",
      date: "08/12/2024",
      author: "MSc. Pham Minh Tuan",
    },
  ];

  const categories = [
    {
      name: "Health Check",
      icon: <MedicineBoxOutlined />,
      count: 24,
      color: "blue",
    },
    { name: "Nutrition", icon: <HeartOutlined />, count: 18, color: "green" },
    {
      name: "Mental Health",
      icon: <TeamOutlined />,
      count: 15,
      color: "purple",
    },
    {
      name: "Disease Prevention",
      icon: <SafetyOutlined />,
      count: 12,
      color: "red",
    },
    {
      name: "Health Education",
      icon: <BookOutlined />,
      count: 20,
      color: "orange",
    },
  ];

  const recentNews = [
    {
      title: "First Aid Training for Teachers",
      date: "05/12/2024",
      category: "Training",
    },
    {
      title: "Vision Screening Program for Students",
      date: "03/12/2024",
      category: "Health Check",
    },
    {
      title: "Seminar on School Food Safety",
      date: "01/12/2024",
      category: "Food Safety",
    },
  ];

  const handleSearch = (value) => {
    console.log("Search:", value);
    setSearchTerm(value);
  };

  const handleCategoryClick = (categoryName) => {
    console.log("Category selected:", categoryName);
  };

  const handleNewsClick = (newsId) => {
    console.log("View news:", newsId);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #e8f5e8 100%)",
      }}
    >
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
        width={280}
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={["news"]}
          items={[
            { key: "home", label: "Home" },
            { key: "news", label: "News" },
            { key: "services", label: "Services" },
            { key: "contact", label: "Contact" },
          ]}
          style={{ border: "none" }}
        />
        <Divider />
        <Input.Search
          placeholder="Search news..."
          allowClear
          onSearch={handleSearch}
          style={{ width: "100%" }}
        />
      </Drawer>

      <AntContent
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={18}>
            <div style={{ marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "24px" }}>
                Featured News
              </Title>
              <Card
                hoverable
                style={{ borderRadius: "12px", overflow: "hidden" }}
                onClick={() => handleNewsClick(featuredNews[0].id)}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <img
                      src={featuredNews[0].image || "/placeholder.svg"}
                      alt={featuredNews[0].title}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Space>
                        <Tag color="blue">{featuredNews[0].category}</Tag>
                        <Text type="secondary">
                          <CalendarOutlined /> {featuredNews[0].date}
                        </Text>
                      </Space>
                      <Title level={3} style={{ margin: 0 }}>
                        {featuredNews[0].title}
                      </Title>
                      <Paragraph ellipsis={{ rows: 3 }}>
                        {featuredNews[0].excerpt}
                      </Paragraph>
                      <Row justify="space-between" align="middle">
                        <Space>
                          <UserOutlined />
                          <Text type="secondary">{featuredNews[0].author}</Text>
                        </Space>
                        <Button type="primary" ghost>
                          <Link to="https://suckhoedoisong.vn/phat-trien-y-te-hoc-duong-uom-mam-tai-nang-tuong-lai-cho-dat-nuoc-169250226133930257.htm">
                            {" "}
                            Read More <ArrowRightOutlined />
                          </Link>
                        </Button>
                      </Row>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "24px" }}>
                Latest News
              </Title>
              <Row gutter={[16, 16]}>
                {featuredNews.slice(1).map((article) => (
                  <Col xs={24} sm={12} lg={8} key={article.id}>
                    <Card
                      hoverable
                      cover={
                        <div style={{ position: "relative" }}>
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <Tag
                            color="blue"
                            style={{
                              position: "absolute",
                              top: "12px",
                              left: "12px",
                              backgroundColor: "rgba(255,255,255,0.9)",
                              color: "#1890ff",
                            }}
                          >
                            {article.category}
                          </Tag>
                        </div>
                      }
                      style={{ borderRadius: "12px", overflow: "hidden" }}
                      onClick={() => handleNewsClick(article.id)}
                    >
                      <Meta
                        title={
                          <Title
                            level={5}
                            ellipsis={{ rows: 2 }}
                            style={{ margin: 0 }}
                          >
                            {article.title}
                          </Title>
                        }
                        description={
                          <Space
                            direction="vertical"
                            size="small"
                            style={{ width: "100%" }}
                          >
                            <Text type="secondary">
                              <CalendarOutlined /> {article.date}
                            </Text>
                            <Paragraph
                              ellipsis={{ rows: 2 }}
                              style={{ margin: 0 }}
                            >
                              {article.excerpt}
                            </Paragraph>
                            <Row justify="space-between" align="middle">
                              <Space size="small">
                                <UserOutlined style={{ fontSize: "12px" }} />
                                <Text
                                  type="secondary"
                                  style={{ fontSize: "12px" }}
                                >
                                  {article.author}
                                </Text>
                              </Space>
                              <Button type="primary" ghost>
                                <Link to="https://baothanhhoa.vn/chu-trong-hoat-dong-nbsp-y-te-hoc-duong-244736.htm">
                                  {" "}
                                  View More <ArrowRightOutlined />
                                </Link>
                              </Button>
                            </Row>
                          </Space>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          <Col xs={24} lg={6}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card title="Categories" style={{ borderRadius: "12px" }}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <Space>
                        <Avatar
                          size="small"
                          style={{
                            backgroundColor: `var(--ant-${category.color}-6)`,
                          }}
                          icon={category.icon}
                        />
                        <Text strong>{category.name}</Text>
                      </Space>
                      <Badge
                        count={category.count}
                        style={{ backgroundColor: "#f0f0f0", color: "#666" }}
                      />
                    </div>
                  ))}
                </Space>
              </Card>

              <Card title="Recent News" style={{ borderRadius: "12px" }}>
                <List
                  dataSource={recentNews}
                  renderItem={(item, index) => (
                    <List.Item
                      style={{ cursor: "pointer", padding: "12px 0" }}
                      onClick={() =>
                        console.log("View recent news:", item.title)
                      }
                    >
                      <List.Item.Meta
                        title={
                          <Text strong ellipsis style={{ color: "#1890ff" }}>
                            {item.title}
                          </Text>
                        }
                        description={
                          <Row justify="space-between">
                            <Tag size="small">{item.category}</Tag>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              {item.date}
                            </Text>
                          </Row>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Space>
          </Col>
        </Row>
      </AntContent>
    </Layout>
  );
};

export default SchoolHealthNewsAntd;
