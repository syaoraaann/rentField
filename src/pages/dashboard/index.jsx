import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, List, Carousel } from "antd";
import { Link } from "react-router-dom";
import SideNav from "../sidenav";
import "./index.css";

const { Content } = Layout;
const { Title, Text } = Typography;

// Style constants for reuse
const cardStyle = {
  textAlign: "center",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Softer shadow
  height: "auto",
  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transition effect
};

const titleStyle = {
  color: "#4CAF50",
  fontSize: "1.8em",
  fontWeight: "bold",
};

const cardContentTitleStyle = {
  fontSize: "4em",
  margin: 100,
  lineHeight: "1",
  fontWeight: "bold",
  color: "#333",
};

const dashboardHeaderStyle = {
  ...titleStyle,
  fontSize: "2.5em",
  marginBottom: "8px",
};

const mainContentStyle = {
  margin: "24px 16px 0",
  padding: 24,
  background: "#FFFFFF",
};

// Dummy data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Friendly Match",
    date: "Sunday, Nov 19, 2024",
    location: "Main Stadium",
  },
  {
    id: 2,
    title: "Tournament Final",
    date: "Saturday, Nov 25, 2024",
    location: "City Arena",
  },
  {
    id: 3,
    title: "Charity Event",
    date: "Friday, Dec 1, 2024",
    location: "Park Field",
  },
  {
    id: 4,
    title: "Exhibition Match",
    date: "Tuesday, Dec 5, 2024",
    location: "Sports Complex",
  },
  {
    id: 5,
    title: "Weekend Football",
    date: "Saturday, Dec 9, 2024",
    location: "River Stadium",
  },
];

// List of images for the carousel (place images in the public/assets/images folder)
const imageList = [
  "/assets/images/BG.png",
  "/assets/images/BG.png",
  "/assets/images/BG.png",
  "/assets/images/BG.png",
];

const Dashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleMouseEnter = (card) => setHoveredCard(card);
  const handleMouseLeave = () => setHoveredCard(null);

  return (
    <Layout style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      {/* Sidebar */}
      <SideNav />

      {/* Main content area */}
      <Layout style={{ marginLeft: 256, background: "#FFFFFF" }}>
        <Content className="pageContent fadeIn" style={mainContentStyle}>
          {/* Dashboard Header */}
          <Title level={1} style={dashboardHeaderStyle}>
            Ready to make the most of today, {username}?
          </Title>
          <Text style={{ fontSize: "1.5em", color: "#666" }}>
            Here's an overview of your recent activities!
          </Text>

          {/* Carousel Component */}
          <Carousel
            autoplay
            style={{ marginTop: "24px", marginBottom: "24px" }}
          >
            {imageList.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`carousel-${index}`}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              </div>
            ))}
          </Carousel>

          {/* Cards Layout */}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Link to="/mypoint" style={{ color: "inherit" }}>
                <Card
                  bordered={false}
                  style={{
                    ...cardStyle,
                    transform:
                      hoveredCard === "mypoint"
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === "mypoint"
                        ? "0 6px 12px rgba(0, 0, 0, 0.15)"
                        : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  hoverable
                  onMouseEnter={() => handleMouseEnter("mypoint")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Title className="card-title" style={titleStyle}>
                    MyPoint
                  </Title>
                  <Title level={1} style={cardContentTitleStyle}>
                    12
                  </Title>
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/history" style={{ color: "inherit" }}>
                <Card
                  bordered={false}
                  style={{
                    ...cardStyle,
                    transform:
                      hoveredCard === "history"
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === "history"
                        ? "0 6px 12px rgba(0, 0, 0, 0.15)"
                        : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  hoverable
                  onMouseEnter={() => handleMouseEnter("history")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Title className="card-title" style={titleStyle}>
                    History
                  </Title>
                  <Title level={1} style={cardContentTitleStyle}>
                    25
                  </Title>
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/upcoming-event" style={{ color: "inherit" }}>
                <Card
                  bordered={false}
                  style={{
                    ...cardStyle,
                    transform:
                      hoveredCard === "upcoming"
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === "upcoming"
                        ? "0 6px 12px rgba(0, 0, 0, 0.15)"
                        : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  hoverable
                  onMouseEnter={() => handleMouseEnter("upcoming")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Title className="card-title" style={titleStyle}>
                    Upcoming Events
                  </Title>

                  {/* Scrollable list for upcoming events */}
                  <div
                    style={{
                      maxHeight: "250px",
                      overflowY: "auto",
                      padding: "10px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    <List
                      bordered={false}
                      dataSource={upcomingEvents}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            padding: "8px 0",
                            borderBottom: "1px solid #f0f0f0",
                          }}
                        >
                          <Text style={{ fontSize: "1.1em", color: "#666" }}>
                            <strong>{item.title}</strong> - {item.date} (
                            {item.location})
                          </Text>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Link>
            </Col>
          </Row>

          {/* More Cards (Top Booked, Events) */}
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col span={12}>
              <Link to="/topbooked" style={{ color: "inherit" }}>
                <Card
                  bordered={false}
                  style={{
                    ...cardStyle,
                    transform:
                      hoveredCard === "topbooked"
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === "topbooked"
                        ? "0 6px 12px rgba(0, 0, 0, 0.15)"
                        : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  hoverable
                  onMouseEnter={() => handleMouseEnter("topbooked")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Title className="card-title" style={titleStyle}>
                    Top Booked
                  </Title>
                  <Title level={1} style={cardContentTitleStyle}>
                    10
                  </Title>
                </Card>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="/events" style={{ color: "inherit" }}>
                <Card
                  bordered={false}
                  style={{
                    ...cardStyle,
                    transform:
                      hoveredCard === "events"
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === "events"
                        ? "0 6px 12px rgba(0, 0, 0, 0.15)"
                        : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  hoverable
                  onMouseEnter={() => handleMouseEnter("events")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Title className="card-title" style={titleStyle}>
                    Events
                  </Title>
                  <Title level={1} style={cardContentTitleStyle}>
                    20
                  </Title>
                </Card>
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
