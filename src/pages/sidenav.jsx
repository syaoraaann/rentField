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

  &:not(:focus):not(:hover) {
    background-color: #2a2a2a;
    border-color: #abfd13;
  }
`;

const SideNavContainer = styled.div`
  width: 256px;
  height: 100vh;
  position: fixed;
  background: rgba(42, 42, 42, 0.7); /* Transparan */
  backdrop-filter: blur(10px); /* Efek blur */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Garis tipis */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Sedikit bayangan */
  color: #fff;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  padding: 10px 0;
`;

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/"); // Redirect to landing page
  };

  return (
    <SideNavContainer>
      {/* User Info */}
      <div
        style={{
          padding: "15px 20px",
          textAlign: "center",
        }}
      >
        {/* Profile photo and name */}
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
          marginTop: "10px",
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
            key: "/my-point",
            icon: <StarOutlined />,
            label: <Link to="/my-point">My Point</Link>,
            style:
              location.pathname === "/my-point"
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
          marginTop: "20px",
        }}
        onClick={handleLogout}
      >
        <LogoutOutlined style={{ marginRight: "10px" }} />
        Logout
      </div>
    </SideNavContainer>
  );
};

export default SideNav;
