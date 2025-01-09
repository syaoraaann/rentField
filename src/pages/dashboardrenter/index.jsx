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
  Modal,
  Badge,
} from "antd";
import {
  BellOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SideNav from "./sidenav";
import "./index.css";

import basketImage from "../../assets/images/basket_persegipanjang.jpg";
import voliImage from "../../assets/images/voli_persegipanjang.jpg";
import soccer1Image from "../../assets/images/soccer1_persegipanjang.jpg";
import soccer2Image from "../../assets/images/soccer2_persegipanjang.jpg";
import bgImage from "../../assets/images/bgnew.jpg";

const imageList = [basketImage, voliImage, soccer1Image, soccer2Image];

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

// Style constants for reuse
const cardStyle = {
  textAlign: "center",
  borderRadius: "8px",
  border: "0.2px solid #ABFD13",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Softer shadow
  minHeight: "400px", // Adjust this value to make the cards longer vertically
  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transition effect
  background: "linear-gradient(180deg, #313131, #090909)",
  color: "#D9D9D9",
};

const titleStyle = {
  color: "#ABFD13",
  fontSize: "1.8em",
  fontWeight: "bold",
  fonFamily: "Poppins",
  paddingBottom: "20px",
};

const cardContentTitleStyle = {
  fontSize: "4em",
  margin: 100,
  lineHeight: "1",
  fontWeight: "bold",
  color: "#d9d9d9",
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

const DashboardRenter = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [username, setUsername] = useState(null);
  const [notifications, setNotifications] = useState([]); // State untuk daftar notifikasi
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    useState(false); // State untuk modal notifikasi

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    console.log("Stored Username: ", storedUsername);
    if (storedUsername) setUsername(storedUsername);


    // Dummy notifikasi
    setNotifications([
      {
        id: 1,
        message: "Top bookings this month are waiting for you!",
        time: "10m ago",
        type: "info",
        isNew: true,
      },
      {
        id: 2,
        message:
          "Thank you for renting Lapangan Tenis Singaraja. Check your points now!",
        time: "2 hours ago",
        type: "success",
        isNew: false,
      },
      {
        id: 3,
        message:
          "Don't miss Futsal Faculty Event at Gor Undiksha this weekend!",
        time: "5 days ago",
        type: "warning",
        isNew: false,
      },
    ]);
  }, []);

  const handleMouseEnter = (card) => setHoveredCard(card);
  const handleMouseLeave = () => setHoveredCard(null);

  const showNotificationModal = () => {
    setIsNotificationModalVisible(true);
  };

  const hideNotificationModal = () => {
    setIsNotificationModalVisible(false);
  };

  const getIconByType = (type) => {
    switch (type) {
      case "success":
        return (
          <CheckCircleOutlined style={{ color: "#4caf50", fontSize: 20 }} />
        );
      case "warning":
        return (
          <ExclamationCircleOutlined
            style={{ color: "#ff9800", fontSize: 20 }}
          />
        );
      default:
        return <BellOutlined style={{ color: "#ABFD13", fontSize: 20 }} />;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`, // Set background image
        backgroundSize: "cover", // Ensure the image covers the entire screen
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent repeating the image
      }}
      className="layout-main-renter"
    >
      {/* Sidebar */}
      <SideNav />
      <Content style={{ marginLeft: "256px" }} className="pageContent fadeIn">
        <Row>
          <div>
            {/* Dashboard Header */}
            <Title level={1} className="dashboard-header">
              Ready to make the most of today?
            </Title>
            <Text className="desc-header">
              Here's an overview of your recent activities!
            </Text>
          </div>
          <div>
            {/* Notification Button */}
            <Badge
              count={notifications.length}
              size="small"
              className="notification-badge"
            >
              <BellOutlined
                className="bell-icon"
                onClick={showNotificationModal}
              />
            </Badge>
          </div>
        </Row>

        {/* Carousel Component */}
        <Carousel autoplay style={{ marginTop: "50px", marginBottom: "60px" }}>
          {imageList.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`carousel-${index}`}
                className="img-carousel"
              />
            </div>
          ))}
        </Carousel>

        <Modal
          title={<span className="custom-title">Notifications</span>}
          visible={isNotificationModalVisible} // Terhubung dengan state modal
          onCancel={hideNotificationModal}
          footer={null}
          centered
          width={500}
          className="custom-modal-renter"
          bodyStyle={{
            background: "transparent",
            color: "#d9d9d9",
            padding: "20px",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  marginBottom: "10px",
                  background: "rgba(50, 50, 50, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                }}
              >
                {getIconByType(item.type)}
                <div style={{ marginLeft: "15px", flex: 1 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: "#d9d9d9",
                      fontSize: "12px",
                      marginTop: "5px",
                      display: "block",
                    }}
                  >
                    {item.time}
                  </Text>
                </div>
              </List.Item>
            )}
          />
        </Modal>

        {/* Cards Layout */}
        <Row gutter={[16, 16]}>
          {/* First row: 2 cards */}
          <Col xs={24} sm={12} md={8} lg={8} xl={12}>
            <Link to="/my-point" style={{ color: "inherit" }}>
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
                <Progress
                  percent={50}
                  status="active"
                  strokeColor="#ABFD13"
                  trailColor="#8c8c8c"
                  className="progress-bar"
                />
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
                    backgroundColor: "transparent",
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
                          background: "rgba(55, 55, 55, 1)",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          marginBottom: "10px",
                          fontFamily: "Poppins",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#ABFD13",
                            fontFamily: "Poppins",
                            letterSpacing: "1.0px",
                            paddingLeft: "10px",
                          }}
                        >
                          {item.fieldName}
                        </Text>
                        <Text style={{ fontSize: "1em", color: "#d9d9d9" }}>
                          {item.date}
                        </Text>
                        <Text
                          style={{
                            fontSize: "1em",
                            color: "#d9d9d9",
                            paddingRight: "10px",
                          }}
                        >
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
            <Link to="#" 
            style={{ color: "inherit" }}
            onClick={(e) => e.preventDefault()}
            >
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
                    backgroundColor: "transparent",
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
                          background: "rgba(55, 55, 55, 1)",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          marginBottom: "10px",
                          paddingLeft: "20px",
                          paddingRight: "10px",
                          fontFamily: "Poppins",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            color: "#ABFD13",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text style={{ fontSize: "1em", color: "#d9d9d9" }}>
                          {item.date}
                        </Text>
                        <Text style={{ fontSize: "1em", color: "#d9d9d9" }}>
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
            <Link 
            style={{ color: "inherit" }}
            onClick={(e) => e.preventDefault()}>
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
                    backgroundColor: "transparent",
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
                          background: "rgba(55, 55, 55, 1)",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          marginBottom: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          fontFamily: "Poppins",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            color: "#ABFD13",
                          }}
                        >
                          {item.fieldName}
                        </Text>
                        <Text style={{ fontSize: "1em", color: "#d9d9d9" }}>
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
      {/* Footer */}
      <Footer className="footer-dashboard-renter">
        Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
        Pendidikan Ganesha
      </Footer>
    </Layout>
  );
};

export default DashboardRenter;
