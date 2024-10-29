// src/pages/Dashboard.jsx
import React from "react";
import { Layout, Typography } from "antd";
import SideNav from "../sidenav";

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />
      <Layout style={{ marginLeft: 256 }}>
        {" "}
        {/* Tambahkan margin untuk konten utama */}
        <Header style={{ backgroundColor: "#fff", padding: 0 }}>
          <Title style={{ margin: "20px", color: "#375D22" }} level={2}>
            Dashboard
          </Title>
        </Header>
        <Content
          style={{ margin: "20px", padding: "20px", backgroundColor: "#fff" }}
        >
          <div>
            <Title level={4}>Welcome to the Dashboard</Title>
            <p>This is your dashboard where you can manage your activities.</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
