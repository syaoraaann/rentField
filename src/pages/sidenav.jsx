import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  ApiFilled,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/"); // Redirect to landing page
  };

  return (
    <Menu
      style={{
        width: 256,
        height: "100vh",
        position: "fixed",
        backgroundColor: "#D8E795",
        fontWeight: 600,
      }}
      selectedKeys={[location.pathname]}
      mode="inline"
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px",
          cursor: "pointer",
          textAlign: "center",
          paddingBottom: "50px "
        }}
        onClick={() => navigate("/")}
      >
        <img
          src="../src/assets/images/logonew.png" // Adjust path as needed
          alt="Rent Field Logo"
          style={{ width: "60%", height: "auto", marginBottom: "-30px", borderRadius: "100px" }}
        />
      </div>

      {/* Dashboard Section */}
      <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>

      {/* Jenis Lapangan Section */}
      <div
        style={{
          padding: "15px 20px 5px",
          color: "#4CAF50",
          fontSize: "1em",
          fontWeight: "bold",
        }}
      >
        Field List
      </div>
      <Menu.Item key="/list-lapangan" icon={<StarOutlined />}>
        <Link to="/list-lapangan">Find and Order Fields</Link>
      </Menu.Item>

      {/* User Management Section */}
      <div
        style={{
          padding: "15px 20px 5px",
          color: "#4CAF50",
          fontSize: "1em",
          fontWeight: "bold",
        }}
      >
        User Management
      </div>
      <Menu.Item key="/profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="/mypoint" icon={<StarOutlined />}>
        <Link to="/mypoint">MyPoint</Link>
      </Menu.Item>
      <Menu.Item key="/history" icon={<CalendarOutlined />}>
        <Link to="/history">History</Link>
      </Menu.Item>

      {/* Help Center Section */}
      <div
        style={{
          padding: "15px 20px 5px",
          color: "#4CAF50",
          fontSize: "1em",
          fontWeight: "bold",
        }}
      >
        Help Center
      </div>
      <Menu.Item key="/settings" icon={<SettingOutlined />}>
        <Link to="/settings">Setting</Link>
      </Menu.Item>
      <Menu.Item key="/help-center" icon={<QuestionCircleOutlined />}>
        <Link to="/help-center">Help Center</Link>
      </Menu.Item>
      <Menu.Item key="/api-page" icon={<ApiFilled/>}>
        <Link to="/api-page">Api Page</Link>
      </Menu.Item>

      {/* Logout */}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default SideNav;
