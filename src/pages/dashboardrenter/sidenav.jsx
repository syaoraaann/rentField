import React, { useState, useEffect } from "react"; // Perbaikan: mengimpor useState dan useEffect
import { Menu, Input } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  CalendarOutlined,
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  TableOutlined,
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

  const [username, setUsername] = useState(null);

  // Mengambil nama pengguna dari sessionStorage setelah komponen dimuat
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username"); // Hapus nama pengguna dari sessionStorage
    navigate("/"); // Redirect ke halaman utama setelah logout
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
              backgroundImage: "url('path_to_profile_image.jpg')", // Ganti dengan gambar profil jika ada
              backgroundSize: "cover",
              backgroundPosition: "center",
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
            {username ? username : "User"}{" "}
            {/* Nama pengguna atau default "User" */}
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
          display: "flex", // Mengatur menu sebagai flex container
          flexDirection: "column", // Atur elemen secara vertikal
          alignItems: "center", // Memusatkan elemen secara horizontal
        }}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={[
          {
            key: "/dashboard-renter",
            icon: <HomeOutlined />,
            label: <Link to="/dashboard-renter">Dashboard</Link>,
            style:
              location.pathname === "/dashboard-renter"
                ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                : { width: "220px" },
          },
          {
            key: "/my-point",
            icon: <StarOutlined />,
            label: <Link to="/my-point">My Point</Link>,
            style:
              location.pathname === "/my-point"
                ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                : { width: "220px" },
          },
          {
            key: "/history",
            icon: <CalendarOutlined />,
            label: <Link to="/history">History</Link>,
            style:
              location.pathname === "/history"
                ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px" }
                : { width: "220px" },
          },
          {
            type: "group",
            label: "Field Available",
            children: [
              {
                key: "/list-field",
                icon: <TableOutlined />,
                label: <Link to="/list-field">List Field</Link>,
                style:
                  location.pathname === "/list-field"
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
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px"}
                    : { width: "220px" },
              },
              {
                key: "/video-review",
                icon: <VideoCameraOutlined />,
                label: <Link to="/api-page">Video Review</Link>,
                style:
                  location.pathname === "/api-page"
                    ? { backgroundColor: "#ABFD13", color: "#1A1A1A", width: "220px"}
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
          marginTop: "20px",
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

export default SideNav;
