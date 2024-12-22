import React from "react";
import { Menu, Input } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  VideoCameraOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledInput = styled(Input)`
  background-color: #2a2a2a;
  color: #fff; /* Text color remains white */
  border: 2px solid #abfd13; /* Outline color */
  border-radius: 20px;
  padding: 5px 15px;

  ::placeholder {
    color: #d9d9d9; /* Placeholder color */
  }

  /* Focus and hover should not change the background */
  &:focus,
  &:hover {
    background-color: #2a2a2a !important; /* Keep the same background */
    border-color: #abfd13 !important; /* Keep the same border color */
    box-shadow: none !important; /* Remove any default focus ring */
  }

  /* Prevent the background from changing even when not focused or hovered */
  &:not(:focus):not(:hover) {
    background-color: #2a2a2a;
    border-color: #abfd13;
  }
`;

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/"); // Redirect to landing page
  };

  return (
    <div
      style={{
        width: "256px",
        height: "100vh",
        position: "fixed",
        backgroundColor: "#1A1A1A",
        color: "#fff",
        fontWeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* User Info */}
      <div
        style={{
          padding: "15px 20px",
          textAlign: "center",
        }}
      >
        {/* Profile photo and name as clickable */}
        <Link to="/profile">
          <div
            style={{
              backgroundColor: "#2A2A2A",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              margin: "0 auto",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "16px",
              cursor: "pointer",
              color: "#d9d9d9",
            }}
          >
            Kevin Pratama
          </div>
        </Link>

        {/* Search Bar */}
        <div style={{ marginTop: "15px", marginBottom: "-60px" }}>
          <StyledInput
            placeholder="Search"
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        style={{
          backgroundColor: "transparent",
          border: "none",
          marginTop: "10px", // Reduced margin for tighter spacing
        }}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={[
          {
            key: "/dashboard",
            icon: <HomeOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
            style:
              location.pathname === "/dashboard"
                ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
                : {},
          },
          {
            key: "/mypoint",
            icon: <StarOutlined />,
            label: <Link to="/mypoint">My Point</Link>,
            style:
              location.pathname === "/mypoint"
                ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
                : {},
          },
          {
            key: "/history",
            icon: <CalendarOutlined />,
            label: <Link to="/history">History</Link>,
            style:
              location.pathname === "/history"
                ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
                : {},
          },
          {
            type: "group",
            label: "Field Available",
            children: [
              {
                key: "/list-field",
                icon: <StarOutlined />,
                label: <Link to="/list-lapangan">List Field</Link>,
                style:
                  location.pathname === "/list-lapangan"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
                    : {},
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
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
                    : {},
              },
              {
                key: "/help-center",
                icon: <QuestionCircleOutlined />,
                label: <Link to="/help-center">Help Center</Link>,
                style:
                  location.pathname === "/help-center"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
                    : {},
              },
              {
                key: "/video-review",
                icon: <VideoCameraOutlined />,
                label: <Link to="/video-review">Video Review</Link>,
                style:
                  location.pathname === "/video-review"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A" }
                    : {},
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
          marginTop: "20px", // Reduced spacing
        }}
        onClick={handleLogout}
      >
        <LogoutOutlined style={{ marginRight: "10px" }} />
        Logout
      </div>
    </div>
  );
};

export default SideNav;
