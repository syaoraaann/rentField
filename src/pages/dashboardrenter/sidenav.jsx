import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  CalendarOutlined,
  StarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  VideoCameraOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
              marginBottom: "-100px",
            }}
          >
            {username || "User"} {/* Nama pengguna atau default "User" */}
          </div>
        </Link>
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
        selectedKeys={[location.pathname]}
        mode="inline"
      >
        {/* General Group */}
        <Menu.ItemGroup key="general" title="General">
          <Menu.Item
            key="/dashboard-renter"
            icon={<HomeOutlined />}
            style={
              location.pathname === "/dashboard-renter"
                ? {
                    backgroundColor: "#ABFD13",
                    color: "#1A1A1A",
                    width: "220px",
                  }
                : { width: "220px" }
            }
          >
            <Link to="/dashboard-renter">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="/my-point"
            icon={<StarOutlined />}
            style={
              location.pathname === "/my-point"
                ? {
                    backgroundColor: "#ABFD13",
                    color: "#1A1A1A",
                    width: "220px",
                  }
                : { width: "220px" }
            }
          >
            <Link to="/my-point">My Point</Link>
          </Menu.Item>
          <Menu.Item
            key="/history"
            icon={<CalendarOutlined />}
            style={
              location.pathname === "/history"
                ? {
                    backgroundColor: "#ABFD13",
                    color: "#1A1A1A",
                    width: "220px",
                  }
                : { width: "220px" }
            }
          >
            <Link to="/history">History</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        {/* Field Available Group */}
        <Menu.ItemGroup key="field-available" title="Field Available">
          <Menu.Item
            key="/list-field"
            icon={<TableOutlined />}
            style={
              location.pathname === "/list-field"
                ? {
                    backgroundColor: "#ABFD13",
                    color: "#1A1A1A",
                    width: "220px",
                  }
                : { width: "220px" }
            }
          >
            <Link to="/list-field">List Field</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        {/* Management Group */}
        <Menu.ItemGroup key="management" title="Management">
          <Menu.Item
            key="/help-center"
            icon={<QuestionCircleOutlined />}
            style={
              location.pathname === "/help-center"
                ? {
                    backgroundColor: "#ABFD13",
                    color: "#1A1A1A",
                    width: "220px",
                  }
                : { width: "220px" }
            }
          >
            <Link to="/help-center">Help Center</Link>
          </Menu.Item>
          <Menu.Item
            key="/video-review"
            icon={<VideoCameraOutlined />}
            style={
              location.pathname === "/video-review"
                ? {
                    backgroundColor: "#ABFD13",
                    color: "#1A1A1A",
                    width: "220px",
                  }
                : { width: "220px" }
            }
          >
            <Link to="/video-review">Video Review</Link>
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
          marginTop: "20px",
          marginRight: "10px",
        }}
        onClick={handleLogout}
      >
        <LogoutOutlined style={{ marginRight: "10px", marginLeft: "0px" }} />
        Logout
      </div>
    </SideNavContainer>
  );
};

export default SideNav;
