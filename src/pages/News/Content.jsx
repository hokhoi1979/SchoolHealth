import { useState } from "react";
import {
  Layout,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Space,
  Drawer,
  Tag,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Content: AntContent } = Layout;
const { Title, Paragraph, Text } = Typography;

const SchoolHealthNewsAntd = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const featuredNews = [
    {
      id: 1,
      title: "Implementation of Vietnam School Health Program 2021–2025",
      excerpt:
        "A national program providing primary health care for over 22 million students, promoting health education, protection, and school-based health services.",
      image:
        "https://i.pinimg.com/736x/84/4c/9b/844c9bcd12e68b128c4e19abaecaf18e.jpg",
      category: "Policy",
      date: "06/10/2021",
      author: "Ministry of Health & Ministry of Education",
      url: "https://vietnamnews.vn/society/1053385/new-school-programme-focuses-on-students-health.html",
    },
    {
      id: 2,
      title: "Hanoi Expands Young Health Program Phase II",
      excerpt:
        "A joint initiative by MOET, AstraZeneca, and Plan International to improve health awareness and student well-being across Hanoi schools.",
      image:
        "https://i.pinimg.com/736x/56/3f/f1/563ff11b32c3b797a897086d63869366.jpg",
      category: "Local Program",
      date: "29/09/2023",
      author: "Hanoi Department of Education",
      url: "https://hanoitimes.vn/hanoi-schools-join-young-health-program-vietnam-324917.html",
    },
    {
      id: 3,
      title: "WHO Releases Vietnam Student Health Survey 2019",
      excerpt:
        "A national report on the health status of students aged 13–17, highlighting key risk behaviors for noncommunicable diseases and areas for health improvement.",
      image:
        "https://i.pinimg.com/736x/3c/27/7a/3c277aa06b20e187864d39111d00a11b.jpg",
      category: "Research",
      date: "24/05/2022",
      author: "WHO & Ministry of Health",
      url: "https://www.who.int/vietnam/vi/news/detail/24-05-2022-who--ministry-of-health-and-ministry-of-education-and-training--launch-report-on-vietnamese-students--health",
    },
    {
      id: 4,
      title: "Vietnam Approves School Health Plan Through 2026",
      excerpt:
        "Decision No. 2616/QD-BYT (2024) provides guidelines for school health programs in preschools and general education, linked to local health stations.",
      image:
        "https://i.pinimg.com/736x/bb/97/6f/bb976f0e31ef90f95b465b0c6a0c1491.jpg",
      category: "Policy",
      date: "04/09/2024",
      author: "Ministry of Health",
      url: "https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/ke-hoach-thuc-hien-chuong-trinh-suc-khoe-hoc-duong-y-te-truong-hoc-nam-hoc-2024-2025-nhu-the-nao-58146-174623.html",
    },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
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
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            {/* FEATURED */}
            <div style={{ marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "24px" }}>
                Featured News
              </Title>
              <Card hoverable style={{ borderRadius: "12px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <img
                      src={featuredNews[0].image}
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
                    <Space direction="vertical" size="middle">
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
                          <a
                            href={featuredNews[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read More <ArrowRightOutlined />
                          </a>
                        </Button>
                      </Row>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </div>

            {/* LATEST */}
            <div>
              <Title level={2} style={{ marginBottom: "24px" }}>
                Latest News
              </Title>
              <Row gutter={[16, 16]}>
                {featuredNews.slice(1).map((article) => (
                  <Col xs={24} sm={12} lg={8} key={article.id}>
                    <Card
                      hoverable
                      className="h-full flex flex-col justify-between"
                      style={{ borderRadius: "12px", height: "100%" }}
                      cover={
                        <div style={{ position: "relative" }}>
                          <img
                            src={article.image}
                            alt={article.title}
                            style={{
                              height: "200px",
                              objectFit: "cover",
                              width: "100%",
                            }}
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
                    >
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <Title
                            level={5}
                            style={{ marginBottom: 8 }}
                            ellipsis={{ rows: 2 }}
                          >
                            {article.title}
                          </Title>
                          <Text type="secondary">
                            <CalendarOutlined /> {article.date}
                          </Text>
                          <Paragraph
                            style={{ minHeight: "60px", margin: "8px 0" }}
                            ellipsis={{ rows: 3 }}
                          >
                            {article.excerpt}
                          </Paragraph>
                        </div>
                        <Row justify="space-between" align="middle">
                          <Space size="small">
                            <UserOutlined style={{ fontSize: "12px" }} />
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              {article.author}
                            </Text>
                          </Space>
                          <Button type="primary" ghost size="small">
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View More <ArrowRightOutlined />
                            </a>
                          </Button>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </AntContent>
    </Layout>
  );
};

export default SchoolHealthNewsAntd;
