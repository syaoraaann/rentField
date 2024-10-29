import React from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    // Add any necessary cleanup logic here, if needed
    navigate("/"); // Redirect to landing page
  };

  return (
    <Menu
      style={{
        width: 256,
        height: "100vh",
        position: "fixed",
        backgroundColor: "#D8E795",
      }}
      selectedKeys={[location.pathname]} // Highlight the current page
      mode="inline"
    >
      <Menu.Item
        key="/dashboard"
        icon={<HomeOutlined />}
        style={{ fontWeight: 600 }}
      >
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        key="/list-lapangan"
        icon={<UserOutlined />}
        style={{ fontWeight: 600 }}
      >
        <Link to="/list-lapangan">List Lapangan</Link>
      </Menu.Item>
      <Menu.Item
        key="/profile"
        icon={<UserOutlined />}
        style={{ fontWeight: 600 }}
      >
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        style={{ fontWeight: 600 }}
        onClick={handleLogout}
      >
        Logout
      </Menu.Item>
      {/* Add other menu items here as needed */}
    </Menu>
  );
};

export default SideNav;
