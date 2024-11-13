import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../pages/landing_page/index.css";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function LandingPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    // Navigasi ke halaman yang sesuai (optional)
    navigate(menu);
  };

  const handleLoginClick = () => {
    navigate("/login"); // Change this path to your login route
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Home":
        return (
          <section
            style={{
              backgroundImage: `url('/landingbg.png')`, // Replace with your actual image path
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh", // Full viewport height
              minWidth: "100vw", // Full viewport width
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white", // Adjust text color for readability
              textAlign: "center",
              margin: "0", // Remove default margins
              padding: "0",
            }}
          >
            <h2>Home</h2>
            <p>Welcome to the Home page!</p>
          </section>
        );
      case "About Us":
        return (
          <section>
            <h2>About Us</h2>
            <p>Learn more about our company and mission.</p>
          </section>
        );
      case "Services":
        return (
          <section>
            <h2>Services</h2>
            <p>Our services include a range of solutions to meet your needs.</p>
          </section>
        );
      case "Contact":
        return (
          <section>
            <h2>Contact</h2>
            <p>Contact us through email or phone for more information.</p>
          </section>
        );
      default:
        return (
          <section>
            <h2>Welcome</h2>
            <p>Explore our site to learn more about what we offer.</p>
          </section>
        );
    }
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-brand">
          <h5>WebfmSI.com</h5>
        </div>
        <div className="header-col header-nav">
          <nav>
            <Link onClick={() => handleMenuClick("Home")}>Home</Link> |{" "}
            <Link onClick={() => handleMenuClick("About Us")}>About Us</Link> |{" "}
            <Link onClick={() => handleMenuClick("Services")}>Services</Link> |{" "}
            <Link onClick={() => handleMenuClick("Contact")}>Contact</Link>
            {/* <Link to=" ">Home</Link> |{" "}
          <Link to=" ">About Us</Link> |{" "}
          <Link to=" ">Services</Link> |{" "}
          <Link to=" ">Contact</Link> |{" "} */}
            {/* <Link to="/login">Login</Link> */}
            {/* <Link to="/dashboard">Dashboard</Link>
          <Link to="/list-lapangan">List Lapangan</Link>
          <Link to="/profile">Profile</Link> */}
          </nav>
        </div>
        <div className="header-col header-btn">
          <Button type="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
      </Header>
      <Content>
        <Row gutter={[24, 0]} justify="space-around">
          <Col>{renderContent()}</Col>
        </Row>
      </Content>
      <Footer>
        <p className="copyright">
          {" "}
          Copyright © 2024 WebfmSI.com - Powered by Universitas Pendidikan
          Ganesha
        </p>
      </Footer>
    </Layout>
  );
}

export default LandingPage;
