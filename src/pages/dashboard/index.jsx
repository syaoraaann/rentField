import React, { useState } from "react";
import { Layout, Card, Row, Col, Typography, List } from "antd";
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

const Dashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null); // State for hovered card

  const handleMouseEnter = (card) => {
    setHoveredCard(card); // Set hovered card
  };

  const handleMouseLeave = () => {
    setHoveredCard(null); // Reset hovered card
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      {/* Sidebar */}
      <SideNav />

      {/* Main content area */}
      <Layout style={{ marginLeft: 256, background: "#FFFFFF" }}>
        <Content className="pageContent fadeIn" style={mainContentStyle}>
          {/* Dashboard Header */}
          <Title level={1} style={dashboardHeaderStyle}>
            Ready to make the most of today, Kevin?
          </Title>
          <Text style={{ fontSize: "1.5em", color: "#666" }}>
            Here's an overview of your recent activities!
          </Text>

          {/* Cards Layout */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
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
                  className="fadeIn card"
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
                  className="fadeIn card"
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
            {/* Upcoming Event Card with scrollable list */}
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
                  className="fadeIn card"
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
                      backgroundColor: "#f9f9f9", // Soft light gray background for list
                      borderRadius: "8px", // Match the card border radius
                    }}
                  >
                    <List
                      bordered={false}
                      dataSource={upcomingEvents}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            padding: "8px 0",
                            borderBottom: "1px solid #f0f0f0", // Soft border for items
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
                  className="fadeIn card"
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
              <Link to="/event" style={{ color: "inherit" }}>
                <Card
                  bordered={false}
                  style={{
                    ...cardStyle,
                    transform:
                      hoveredCard === "event"
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === "event"
                        ? "0 6px 12px rgba(0, 0, 0, 0.15)"
                        : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  className="fadeIn card"
                  hoverable
                  onMouseEnter={() => handleMouseEnter("event")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Title className="card-title" style={titleStyle}>
                    Event
                  </Title>
                  <Title level={1} style={cardContentTitleStyle}>
                    50
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
