import React from "react";
import { Layout, Card, Row, Col, Typography, Calendar } from "antd";
import SideNav from "../sidenav";
import "./index.css"; // Import CSS file for animations

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const cardStyle = {
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "450px", // Set a fixed height for all cards to match the calendar
  };

  const titleStyle = {
    color: "#4CAF50",
    fontSize: "2.5em", // Increase font size for card titles
    fontWeight: "bold", // Make the text bold
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      {/* Sidebar */}
      <SideNav />

      {/* Main content area */}
      <Layout style={{ marginLeft: 256, background: "#FFFFFF" }}>
        <Content
          style={{
            margin: "24px 16px 0",
            padding: 24,
            background: "#FFFFFF", // Set content area to white
          }}
        >
          {/* Dashboard Header */}
          <Title
            level={1}
            className="fadeInSlideDown"
            style={{ ...titleStyle, fontSize: "3em", marginBottom: "8px" }}
          >
            Ready to make the most of today, Kevin?
          </Title>
          <Text
            className="fadeInSlideDown"
            style={{ fontSize: "1.5em", marginTop: "0" }}
          >
            Here's an overview of your recent activities!
          </Text>

          {/* Cards Layout */}
          <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
            <Col span={8}>
              <Card bordered={false} style={cardStyle} className="fadeInCard">
                <Title style={titleStyle}>MyPoint</Title>
                <Title
                  level={1}
                  style={{
                    fontSize: "5em",
                    margin: 120,
                    lineHeight: "1",
                    fontWeight: "bold",
                  }}
                >
                  12
                </Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={cardStyle} className="fadeInCard">
                <Title style={titleStyle}>History</Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={cardStyle} className="fadeInCard">
                <Title style={titleStyle}>Calendar</Title>
                <Calendar fullscreen={false} style={{ marginTop: 0 }} />{" "}
                {/* Ant Design Calendar */}
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col span={12}>
              <Card bordered={false} style={cardStyle} className="fadeInCard">
                <Title style={titleStyle}>Top Booked</Title>
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} style={cardStyle} className="fadeInCard">
                <Title style={titleStyle}>Event</Title>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
