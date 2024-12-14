import React from "react";
import { Typography } from "antd";
import "./index.css"; // Tambahkan CSS jika diperlukan

const { Title } = Typography;

const OwnerPage = () => {
  return (
    <div className="admin-page">
      <Title level={2} style={{ textAlign: "center", marginTop: "20px" }}>
        Hello, Owner!
      </Title>
      <p style={{ textAlign: "center", fontSize: "16px", marginTop: "10px" }}>
        Welcome to the Owner dashboard.
      </p>
    </div>
  );
};

export default OwnerPage;
