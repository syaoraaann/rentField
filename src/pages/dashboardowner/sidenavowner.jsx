import React, { useState, useEffect } from "react";
import { Menu, Input } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  CalendarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  VideoCameraOutlined,
  TableOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components for better structure and readability
const SideNavContainer = styled.div`
  width: 256px;
  height: 100vh;
  position: fixed;
  background: rgba(42, 42, 42, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const StyledInput = styled(Input)`
  background-color: #2a2a2a;
  color: #fff;
  border: 2px solid #abfd13;
  border-radius: 20px;
  padding: 5px 15px;
  ::placeholder {
    color: #d9d9d9;
  }
  &:focus,
  &:hover {
    background-color: #2a2a2a !important;
    border-color: #abfd13 !important;
    box-shadow: none !important;
  }
`;

const UserInfoContainer = styled.div`
  padding: 15px 20px;
  text-align: center;
`;

const ProfileImage = styled.div`
  background-color: #2a2a2a;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  cursor: pointer;
`;

const Username = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #d9d9d9;
  cursor: pointer;
`;

const LogoutContainer = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  alignitems: "center";
`;

const SideNavOwner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };

  const getMenuItemStyle = (path) =>
    location.pathname === path
      ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
      : {};

  return (
    <SideNavContainer>
      {/* User Info Section */}
      <UserInfoContainer style={{ marginTop: "15px", marginBottom: "-150px" }}>
        <Link to="/profile">
          <ProfileImage />
          <Username>{username || "User"}</Username>
        </Link>
      </UserInfoContainer>

      {/* Menu */}
      <Menu
        theme="dark"
        style={{
          backgroundColor: "transparent",
          border: "none",
          display: "flex", // Mengatur menu sebagai flex container
          flexDirection: "column", // Atur elemen secara vertikal
          alignItems: "center", // Memusatkan elemen secara horizontal
        }}
        selectedKeys={[location.pathname]}
        mode="inline"
      >
        {/* General Group */}
        <Menu.ItemGroup key="general" title="General">
          <Menu.Item
            key="/dashboard-owner"
            icon={<HomeOutlined />}
            style={getMenuItemStyle("/dashboard-owner")}
          >
            <Link to="/dashboard-owner">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="/reservation-list"
            icon={<CalendarOutlined />}
            style={getMenuItemStyle("/reservation-list")}
          >
            <Link to="/reservation-list">Reservation List</Link>
          </Menu.Item>
          <Menu.Item
            key="/payment"
            icon={<StarOutlined />}
            style={getMenuItemStyle("/payment")}
          >
            <Link to="/payment">Payment</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        {/* Field Management Group */}
        <Menu.ItemGroup key="field-management" title="Field Management">
          <Menu.Item
            key="/list-field-owner"
            icon={<StarOutlined />}
            style={getMenuItemStyle("/list-field-owner")}
          >
            <Link to="/list-field-owner">List Field</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        {/* Management Group */}
        <Menu.ItemGroup key="management" title="Management">
          <Menu.Item
            key="/help-center"
            icon={<QuestionCircleOutlined />}
            style={getMenuItemStyle("/help-center")}
          >
            <Link to="/help-center">Help Center</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>

      {/* Logout */}
      <div
        style={{
          padding: "15px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          paddingLeft: "33px",
        }}
        onClick={handleLogout}
      >
        <LogoutOutlined style={{ marginRight: "10px" }} />
        Logout
      </div>
    </SideNavContainer>
  );
};

export default SideNavOwner;
