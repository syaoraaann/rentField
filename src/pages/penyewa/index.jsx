import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import SideNavPenyewa from "./sidenavpenyewa";
import bgImage from "../../assets/images/bgnew.jpg"; // Import background image

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

const OwnerDashboard = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

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
      <SideNavPenyewa />

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
                Welcome {username || "User"}!
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
            <Badge count={3} offset={[10, 0]} style={{ marginRight: "50px" }}>
              <BellOutlined
                style={{
                  fontSize: "24px",
                  color: "#A3FF12",
                  cursor: "pointer",
                  marginRight: "50px",
                }}
              />
            </Badge>
          </div>

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
            background: "#161616",
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

export default OwnerDashboard;
