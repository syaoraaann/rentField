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
  CreditCardOutlined
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
  alignItems: "center";
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
        style={{
          backgroundColor: "transparent",
          border: "none",
          display: "flex", // Mengatur menu sebagai flex container
          flexDirection: "column", // Atur elemen secara vertikal
          alignItems: "center", // Memusatkan elemen secara horizontal
        }}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={[
          {
            type: "group",
            label: "General",
            children: [
              {
                key: "/dashboard-owner",
                icon: <HomeOutlined />,
                label: <Link to="/dashboard-owner">Dashboard</Link>,
                style:
                  location.pathname === "/dashboard-owner"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                    : { width: "220px"},
              },
              {
                key: "/reservation-list",
                icon: <CalendarOutlined />,
                label: <Link to="/reservation-list">Reservation List</Link>,
                style:
                  location.pathname === "/reservation-list"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                    : { width: "220px"},
              },
              {
                key: "/payment",
                icon: <CreditCardOutlined />,
                label: <Link to="/payment">Payment</Link>,
                style:
                  location.pathname === "/payment"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                    : { width: "220px"},
              },
            ],
          },
          {
            type: "group",
            label: "Field Management",
            children: [
              {
                key: "/list-field-owner",
                icon: <TableOutlined />,
                label: <Link to="/list-field-owner">List Field</Link>,
                style:
                  location.pathname === "/list-field-owner"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                    : { width: "220px" },
              },
            ],
          },
          {
            type: "group",
            label: "Management",
            children: [
              {
                key: "/settings",
                icon: <SettingOutlined />,
                label: <Link to="/settings">Setting</Link>,
                style:
                  location.pathname === "/settings"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                    : { width: "220px" },
              },
              {
                key: "/help-center",
                icon: <QuestionCircleOutlined />,
                label: <Link to="/help-center">Help Center</Link>,
                style:
                  location.pathname === "/help-center"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                    : { width: "220px" },
              },
              {
                key: "/video-review",
                icon: <VideoCameraOutlined />,
                label: <Link to="/video-review">Video Review</Link>,
                style:
                  location.pathname === "/video-review"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                    : { width: "220px" },
              },
            ],
          },
        ]}
      />

      {/* Logout */}
      <div
        style={{
          padding: "15px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          paddingLeft: "33px"  
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
