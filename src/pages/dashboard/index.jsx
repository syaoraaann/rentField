import React from "react";
import { Layout, Card, Row, Col } from "antd";
import SideNav from "../sidenav"; // Assuming SideNav is in the same directory

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#F6F9EB" }}>
      {" "}
      <SideNav />
      <Layout style={{ marginLeft: 256, backgroundColor: "#F6F9EB" }}>
        {" "}
        {/* Set background color here as well */}
        <Content style={{ margin: "24px 16px 0", padding: 24 }}>
          {/* Statistics and Widgets */}
          <Row gutter={16}>
            <Col span={8}>
              <Card
                title="Total Users"
                bordered={false}
                style={{ background: "#D8E795" }}
              >
                <p>100</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Active Bookings"
                bordered={false}
                style={{ background: "#D8E795" }}
              >
                <p>25</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Total Fields"
                bordered={false}
                style={{ background: "#D8E795" }}
              >
                <p>10</p>
              </Card>
            </Col>
          </Row>

          {/* Recent Activity or Other Sections */}
          <Row gutter={16} style={{ marginTop: "16px" }}>
            <Col span={12}>
              <Card
                title="Recent Bookings"
                bordered={false}
                style={{ background: "#D8E795" }}
              >
                <p>Booking list goes here</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Support Tickets"
                bordered={false}
                style={{ background: "#D8E795" }}
              >
                <p>Support list goes here</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
