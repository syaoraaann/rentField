import React from "react";
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

// Styled Input for search bar
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
  background: rgba(42, 42, 42, 0.5); /* Transparansi */
  backdrop-filter: blur(10px); /* Efek blur */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Border tipis */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Sedikit shadow */
  color: #fff;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  alignItems: "center";
`;

const SideNavOwner = () => {
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
        <div style={{ marginTop: "15px", marginBottom: "-50px" }}>
          <StyledInput placeholder="Search" allowClear />
        </div>
      </div>

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
                key: "/list-fieldowner",
                icon: <TableOutlined />,
                label: <Link to="/list-fieldowner">List Field</Link>,
                style:
                  location.pathname === "/list-fieldowner"
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
          paddingLeft: "27px"
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
