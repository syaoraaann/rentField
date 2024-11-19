import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  List,
  Carousel,
  Progress,
} from "antd";
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
  minHeight: "360px", // Adjust this value to make the cards longer vertically
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

// Dummy data for top booked fields
const topBookedFields = [
  { id: 1, fieldName: "Main Stadium", bookings: 120 },
  { id: 2, fieldName: "City Arena", bookings: 95 },
  { id: 3, fieldName: "Park Field", bookings: 80 },
  { id: 4, fieldName: "Sports Complex", bookings: 75 },
  { id: 5, fieldName: "River Stadium", bookings: 70 },
];

// Dummy data for history of booked fields
const historyBookedFields = [
  { id: 1, fieldName: "Main Stadium", date: "2024-11-18", bookings: 5 },
  { id: 2, fieldName: "City Arena", date: "2024-11-17", bookings: 3 },
  { id: 3, fieldName: "Park Field", date: "2024-11-16", bookings: 7 },
  { id: 4, fieldName: "Sports Complex", date: "2024-11-15", bookings: 2 },
  { id: 5, fieldName: "River Stadium", date: "2024-11-14", bookings: 6 },
];

// List of images for the carousel (place images in the public/assets/images folder)
const imageList = [
  "/assets/images/cmgsoon.png",
  "/assets/images/cmgsoon.png",
  "/assets/images/cmgsoon.png",
  "/assets/images/cmgsoon.png",
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
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "8px",
                  }}
                />
              </div>
            ))}
          </Carousel>

          {/* Cards Layout */}
          <Row gutter={[16, 16]}>
            {/* First row: 2 cards */}
            <Col xs={24} sm={12} md={8} lg={8} xl={12}>
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
                  <Progress percent={50} status="active" />
                </Card>
              </Link>
            </Col>
            <Col span={12}>
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
                      dataSource={historyBookedFields}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px",
                            background: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            marginBottom: "10px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "1.2em",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {item.fieldName}
                          </Text>
                          <Text style={{ fontSize: "1em", color: "#666" }}>
                            {item.date}
                          </Text>
                          <Text style={{ fontSize: "1em", color: "#999" }}>
                            {item.bookings} bookings
                          </Text>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Link>
            </Col>

            {/* Baris kedua: Top Booked Fields */}
            <Col span={12}>
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
                    Upcoming Schedule
                  </Title>
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
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            padding: "10px",
                            background: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            marginBottom: "10px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "1.2em",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text style={{ fontSize: "1em", color: "#666" }}>
                            {item.date}
                          </Text>
                          <Text style={{ fontSize: "1em", color: "#999" }}>
                            {item.location}
                          </Text>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Link>
            </Col>
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
                      dataSource={topBookedFields}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px",
                            background: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            marginBottom: "10px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "1.2em",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {item.fieldName}
                          </Text>
                          <Text style={{ fontSize: "1em", color: "#666" }}>
                            {item.bookings} bookings
                          </Text>
                        </List.Item>
                      )}
                    />
                  </div>
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
