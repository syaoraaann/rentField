import { Layout, Button, Row, Col, Typography, Form, Input, Avatar, Card } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../pages/landing_page/index.css";
import rentfield1 from "../../assets/images/rentfield1.png";
import rentfieldlogo from "../../assets/images/rentfieldlogo.png";
import ourteam from "../../assets/images/ourteam.png";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

function LandingPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
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
              // color: "white",
              textAlign: "center",
              padding: "10px",
              marginTop: "20px",

            }}
          >
            <div
              style={{
                padding: "30px",
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
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
          <section>
            <Row gutter={[24, 24]} style={{color: "white"}}>
              <Col xs={24} md={12}>
                <div className="container"
                  style={{
                    marginRight: "10px",  // Tambahkan margin kanan
                    height: "100%",       // Pastikan tinggi penuh
                    padding: "60px"       // Tambahkan padding dalam
                  }}>
                  <Title level={1} style={{ color: "#A6CE39", fontWeight: "bold", fontFamily: "Poppins" }}>
                    About Us
                  </Title>
                  <p style={{ fontSize: "16px", lineHeight: "1.8", color: "white", fontFamily: "Poppins" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p >
                </div> 
              </Col>
      
              <Col xs={24} md={12}>    
                <img
                  src={ourteam} // Ganti dengan path logo Anda
                  alt="CodeBlue Team"
                  style={{ 
                    maxWidth: "1000px",
                    maxHeight: "1000px",
                    width: "100%",           // Membuat gambar menyesuaikan lebar kolom
                    height: "100%",          // Mengisi tinggi kolom
                    objectFit: "cover",      // Memastikan gambar memenuhi ruang tanpa terdistorsi
                    borderRadius: "10px"     // Opsional: Menambahkan sedikit border-radius jika ingin 
                    }}
                />
              </Col>
            </Row>
          </section>
        );
      case "Services":
        return (
          <section
            style={{
              margin: "0 auto", // Membuat konten berada di tengah halaman
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // color: "white",
              textAlign: "center",
              padding: "10px",
            
            }}
          >
            <div
              style={{
                
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                // border: "1px solid rgba(255, 255, 255, 0.3)",
              }} 
            >
              <h2 style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "bold" }}>Our Services</h2>
              <Row gutter={[24,24]} xs={24} md={12}>
              <Card
                style={{ 
                    width: 300, 
                    marginRight: "20px",  // Tambahkan margin kanan
                    height: "100%",       // Pastikan tinggi penuh
                    padding: "60px"       // Tambahkan padding dalam
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ 
                  width: 300, 
                  marginRight: "20px",  // Tambahkan margin kanan
                  height: "100%",       // Pastikan tinggi penuh
                  padding: "60px"       // Tambahkan padding dalam
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ 
                  width: 300, 
                  marginRight: "20px",  // Tambahkan margin kanan
                  height: "100%",       // Pastikan tinggi penuh
                  padding: "60px"       // Tambahkan padding dalam
               }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              </Row>
              
            </div>
          </section>
        );
      case "Contact":
        return (
          <section
            style={{
              maxWidth: "700px", 
              margin: "0 auto", // Membuat konten berada di tengah halaman
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // color: "white",
              textAlign: "center",
              padding: "10px",
            
            }}
          >
            <div
              style={{
                padding: "30px",
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                // border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
            >
              <div >
                <h2 style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "bold" }}>Contact Us</h2>
              </div>
              <div>
                <p style={{ fontFamily: "Poppins", fontSize: "16px"}}>testestestestest</p>
              </div>
            </div>
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
            style={{ maxWidth: "55px", width: "100%", borderRadius: "60px"}}
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
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas Pendidikan
          Ganesha
        </p>
      </Footer>
    </Layout>
  );
}

export default LandingPage;
