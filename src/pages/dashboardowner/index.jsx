import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, Badge, Modal, List } from "antd";
import {
  BellOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import SideNavOwner from "./sidenavowner";
import bgImage from "../../assets/images/bgnew.jpg"; // Import background image
import "./index.css";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

// Dummy data for statistics
const stats = {
  orders: 10,
  processed: 27,
  completed: 36,
  canceled: 8,
};

// Dummy data for detailed stats
const detailedStats = {
  totalRented: "120 Fields",
  mostRented: "Main Stadium",
  favoriteTime: "6 PM - 8 PM",
};

const DashboardOwner = () => {
  const [username, setUsername] = useState(null);
  const [notifications, setNotifications] = useState([]); // State untuk daftar notifikasi
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    useState(false); // State untuk modal notifikasi

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
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
    >
      {/* Sidebar */}
      <SideNavOwner />

      {/* Main content area */}
      <Layout style={{ marginLeft: 256, background: "transparent" }}>
        <Content style={{ padding: "24px", background: "transparent" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Title
                level={1}
                style={{
                  color: "#A3FF12",
                  marginBottom: "12px",
                  fontWeight: "bold",
                }}
              >
                Ready to make the most of today, {username || "user"}?
              </Title>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Here’s an overview for reservation activity!
              </Text>
            </div>
            {/* Notification Button */}
            <Badge
              count={notifications.length}
              size="small"
              className="notification-badge-owner"
            >
              <BellOutlined
                className="bell-icon-owner"
                onClick={showNotificationModal}
              />
            </Badge>
          </div>
          <Modal
            title={<span className="custom-title">Notifications</span>}
            visible={isNotificationModalVisible} // Terhubung dengan state modal
            onCancel={hideNotificationModal}
            footer={null}
            centered
            width={500}
            className="custom-modal-owner"
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

          {/* Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            {Object.entries(stats).map(([key, value]) => (
              <Col xs={24} sm={12} md={6} key={key}>
                <Card
                  style={{
                    textAlign: "center",
                    background: "#161616",
                    color: "#A3FF12",
                    borderRadius: "8px",
                    border: "2px solid #A3FF12",
                  }}
                >
                  <Title
                    level={3}
                    style={{
                      color: "#A3FF12",
                      fontWeight: "bold",
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Title>
                  <Text
                    style={{
                      fontSize: "60px",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {value}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Detailed Stats */}
          <Title
            level={1}
            style={{
              color: "#A3FF12",
              marginBottom: "24px",
              marginTop: "24px",
              fontWeight: "bold",
            }}
          >
            Statistics
          </Title>

          {/* Total Rented card on top */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            <Col xs={24}>
              <Card
                style={{
                  textAlign: "center",
                  background: "#161616",
                  color: "#A3FF12",
                  borderRadius: "8px",
                  border: "2px solid #A3FF12",
                  height: "500px",
                }}
              >
                <Title
                  level={3}
                  style={{
                    color: "#A3FF12",
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  Total Rented
                </Title>
                <Text
                  style={{
                    fontSize: "28px",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                >
                  {detailedStats.totalRented}
                </Text>
              </Card>
            </Col>
          </Row>

          {/* Most Rented and Favorite Time to Rent cards below */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            <Col xs={24} sm={12}>
              <Card
                style={{
                  textAlign: "center",
                  background: "#161616",
                  color: "#A3FF12",
                  borderRadius: "8px",
                  border: "2px solid #A3FF12",
                  height: "500px",
                }}
              >
                <Title
                  level={3}
                  style={{
                    color: "#A3FF12",
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  Most Rented
                </Title>
                <Text
                  style={{
                    fontSize: "28px",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                >
                  {detailedStats.mostRented}
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                style={{
                  textAlign: "center",
                  background: "#161616",
                  color: "#A3FF12",
                  borderRadius: "8px",
                  border: "2px solid #A3FF12",
                  height: "500px",
                }}
              >
                <Title
                  level={3}
                  style={{
                    color: "#A3FF12",
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  Favorite Time to Rent
                </Title>
                <Text
                  style={{
                    fontSize: "28px",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                >
                  {detailedStats.favoriteTime}
                </Text>
              </Card>
            </Col>
          </Row>
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.03)", // Translucent white background
            backdropFilter: "blur(10px)", // Apply blur effect
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#A3FF12",
            padding: "12px 24px",
            fontWeight: "bold",
          }}
        >
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardOwner;
