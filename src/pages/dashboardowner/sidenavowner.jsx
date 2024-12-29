import React, { useState, useEffect } from "react";
import { Menu, Input } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  CalendarOutlined,
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  VideoCameraOutlined,
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
  align-items: center;
  color: #fff;
  &:hover {
    background-color: #333;
  }
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
      <UserInfoContainer>
        <Link to="/profile">
          <ProfileImage />
          <Username>{username || "User"}</Username>
        </Link>

        <div style={{ marginTop: "15px", marginBottom: "-50px" }}>
          <StyledInput placeholder="Search" allowClear />
        </div>
      </UserInfoContainer>

      {/* Menu */}
      <Menu
        theme="dark"
        style={{ backgroundColor: "transparent", border: "none" }}
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
            key="/list-field"
            icon={<StarOutlined />}
            style={getMenuItemStyle("/list-field")}
          >
            <Link to="/list-field">List Field</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        {/* Management Group */}
        <Menu.ItemGroup key="management" title="Management">
          <Menu.Item
            key="/settings"
            icon={<SettingOutlined />}
            style={getMenuItemStyle("/settings")}
          >
            <Link to="/settings">Setting</Link>
          </Menu.Item>
          <Menu.Item
            key="/help-center"
            icon={<QuestionCircleOutlined />}
            style={getMenuItemStyle("/help-center")}
          >
            <Link to="/help-center">Help Center</Link>
          </Menu.Item>
          <Menu.Item
            key="/video-review"
            icon={<VideoCameraOutlined />}
            style={getMenuItemStyle("/video-review")}
          >
            <Link to="/video-review">Video Review</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>

      {/* Logout */}
      <LogoutContainer onClick={handleLogout}>
        <LogoutOutlined style={{ marginRight: "10px" }} />
        Logout
      </LogoutContainer>
    </SideNavContainer>
  );
};

export default SideNavOwner;
