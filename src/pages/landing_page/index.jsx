import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../pages/landing_page/index.css";
import rentfield1 from "../../assets/images/rentfield1.png";
import rentfieldlogo from "../../assets/images/rentfieldlogo.png";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function LandingPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    navigate(menu);
  };

  const handleLoginClick = () => {
    navigate("/dashboard"); // Change this path to your login route
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Home":
        return (
          <section
            style={{
              // backgroundImage: `url('/landingbg.png')`, // Replace with your actual image path
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              maxWidth: "700px", // Menetapkan lebar maksimum konten
              margin: "0 auto", // Membuat konten berada di tengah halaman
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white", // Adjust text color for readability
              textAlign: "center",
              padding: "20px",
              marginTop: "30px",

            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)", // Warna putih semi-transparan
                backdropFilter: "blur(7px)", // Efek blur
                borderRadius: "20px", // Membuat sudut kontainer membulat
                padding: "20px",
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                // border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
            >
              <div >
                <h2 style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "bold" }}>Sewa Lapangan Jadi Lebih Mudah</h2>
              </div>
              <div>
                <p style={{ fontFamily: "Poppins", fontSize: "16px"}}>Selamat datang di platform sewa lapangan terlengkap! Nikmati kemudahan dalam mencari dan memesan lapangan favorit untuk berbagai jenis olahraga seperti futsal, basket, tenis, dan lainnya. Ciptakan pengalaman olahraga yang tak terlupakan dengan fasilitas terbaik yang tersedia kapan saja sesuai kebutuhan Anda. Yuk, mulai sekarang temukan lapangan ideal untuk pertandingan berikutnya!</p>
              </div>
            </div>
            
            <div className="header-col header-btn" style={{paddingTop: "15px"}}>
              <Button type="primary" onClick={handleLoginClick}>
                Get Started
              </Button>
            </div>
            
          </section>
        );
      case "About Us":
        return (
          <section style={{ padding: "50px", maxWidth: "1000px", margin: "0 auto" }}>
            <Row gutter={[24, 24]} align="middle" justify="center">
              <Col xs={24} md={12}>
                <Title level={2} style={{ color: "#A6CE39", fontWeight: "bold" }}>
                  About Us
                </Title>
                <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "#333" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p >
              </Col>
      
              <Col xs={24} md={12} style={{ textAlign: "center" }}>
                <img
                  src={rentfield1} // Ganti dengan path logo Anda
                  alt="Rent Field Logo"
                  style={{ maxWidth: "200px", width: "100%" }}
                />
              </Col>
            </Row>
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
    <Layout className="layout-signin layout-default"
    // {`layout-signin layout-default ${activeMenu === "Home" ? "home-menu" : "other-menus"}`}  
      // style={{
      //   backgroundImage: activeMenu === "About Us" ? "none" : "url('../../assets/images/landingbg.png')",
      //   backgroundColor: activeMenu === "About Us" ? "white" : "transparent",
      // }}
      >
      <Header className="content-animation">
        <div className="header-col header-brand">
          <img
            src={rentfieldlogo}
            alt="Rent Field Logo"
            style={{ maxWidth: "60px", width: "100%", borderRadius: "60px"}}
          />
        </div>
        <div className="header-col header-nav">
          <nav>
            <Link 
              onClick={() => handleMenuClick("Home")}
              className={activeMenu === "Home" ? "active-link" : ""}>Home</Link>
            <Link 
              onClick={() => handleMenuClick("About Us")}
              className={activeMenu === "About Us" ? "active-link" : ""}>About Us</Link>
            <Link 
              onClick={() => handleMenuClick("Services")}
              className={activeMenu === "Services" ? "active-link" : ""}>Services</Link>
            <Link 
              onClick={() => handleMenuClick("Contact")}
              className={activeMenu === "Contact" ? "active-link" : ""}>Contact</Link>
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
      <Content className="content-animation">
        <Row gutter={[24, 0]} justify="space-around">
          <Col>{renderContent()}</Col>
        </Row>
      </Content>
      <Footer className="footer content-animation">
        <p className="copyright font-color">
          {" "}
          Copyright © 2024 RentField.com - Powered by Information System Study Program Universitas Pendidikan
          Ganesha
        </p>
      </Footer>
    </Layout>
  );
}

export default LandingPage;
