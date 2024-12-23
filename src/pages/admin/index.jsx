import React from "react";
import { Typography } from "antd";
import "./index.css"; // Tambahkan CSS jika diperlukan

const { Title } = Typography;

const AdminPage = () => {
  return (
    <div className="admin-page">
      <Title level={2} style={{ textAlign: "center", marginTop: "20px" }}>
        Hello, Admin!
      </Title>
      <p style={{ textAlign: "center", fontSize: "16px", marginTop: "10px" }}>
        Welcome to the admin dashboard.
      </p>
    </div>
  );
};

export default AdminPage;
