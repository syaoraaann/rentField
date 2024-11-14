import { Layout, Button, Row, Col, Typography, Form, Input, Avatar, Card, Flex } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { useState, useEffect } from "react";
import { Settings, Edit, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import "../../pages/landing_page/index.css";

//Images
import rentfield1 from "../../assets/images/rentfield1.png";
import rentfieldlogo from "../../assets/images/rentfieldlogo.png";
import basket from "../../assets/images/basket.jpg";
import bultang from "../../assets/images/bultang.jpg";
import futsal from "../../assets/images/futsal.jpg";
import voli from "../../assets/images/voli.jpg";
import biliard from "../../assets/images/biliard.jpg";
import ourteam from "../../assets/images/ourteam.png";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

function LandingPage() {
  const navigate = useNavigate();
  // const [activeMenu, setActiveMenu] = useState("Home");
  const [activeSection, setActiveSection] = useState("Home");
  

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // const handleMenuClick = (menu) => {
  //   setActiveMenu(menu);
  //   navigate(menu);
  // };

  const handleLoginClick = () => {
    navigate("/login"); // Change this path to your login route
  };

  const galleryData = [
    {
      id: 1,
      image: basket,
      title: "Lapangan Bola Basket Kampus Tengah Undiksha",
      description: "Professional photographer with 10 years of experience in portrait and landscape photography."
    },
    {
      id: 2,
      image: bultang,
      title: "Lapangan Bola Tangkis Gor Undiksha",
      description: "We use Boards to share initial goals and ideas, show the user flow, and capture inspiration."
    },
    {
      id: 3,
      image: futsal,
      title: "Lapangan Futsal Banyuasri",
      description: "Specializing in urban photography and street culture documentation."
    },
    {
      id: 4,
      image: voli,
      title: "Lapangan Voli Gor Undiksha Jineng Dalem",
      description: "Expert in minimal and contemporary photography styles."
    },
    {
      id: 5,
      image: biliard,
      title: "Billiard Singaraja",
      description: "Fashion photographer with a unique perspective on modern trends."
    }
  ];

  const [activePhoto, setActivePhoto] = useState(galleryData[0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["Home", "About Us", "Services", "Contact"];
      const scrollPosition = window.scrollY;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - 100 && 
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout className="layout-signin layout-default">
      <Header className="content-animation">
        <div className="header-col header-brand" style={{paddingLeft: "20px"}}>
          <img
            src={rentfieldlogo}
            alt="Rent Field Logo"
            style={{ maxWidth: "55px", width: "100%", borderRadius: "60px"}}
          />
          <span style={{paddingLeft: "10px", fontFamily: "Poppins", fontWeight: "bold"}}>RentField</span>
        </div>
        <div className="header-col header-nav">
          <nav>
            <Link 
              onClick={() => scrollToSection("Home")}
              className={`px-4 py-2 ${activeSection === "Home" ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>Home</Link>
            <Link 
              onClick={() => scrollToSection("About Us")}
              className={`px-4 py-2 ${activeSection === "Home" ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>About Us</Link>
            <Link 
              onClick={() => scrollToSection("Services")}
              className={`px-4 py-2 ${activeSection === "Home" ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>Services</Link>
            <Link 
              onClick={() => scrollToSection("Contact")}
              className={`px-4 py-2 ${activeSection === "Home" ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>Contact</Link>
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
      {/* <Content className="content-animation">
        <Row gutter={[24, 0]} justify="space-around">
          <Col>{renderContent()}</Col>
        </Row>
      </Content> */}

<main>
        {/* Home Section */}
        <section id="Home" 
          style={{
              backgroundImage: `url('/src/assets/images/landingbg7.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              maxWidth: "100%", 
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              minHeight: "100vh",
          }}
        >
          <div
              style={{
                padding: "30px",
                maxWidth: "700px",
                color: "white",
                textAlign: "center",
                
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                // border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div >
              <h2 style={{ fontFamily: "Poppins", fontSize: "3.5rem", fontWeight: "bold" }}>Sewa Lapangan Jadi Lebih Mudah</h2>
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

        {/* About Section */}
        <section id="About Us" 
          style={{
            minHeight: "100vh",
            maxWidth: "100%", 
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <Row style={{color: "white", height: "100vh"}}>
              <Col style={{height: "100%", padding: 0}}>
                <div
                  style={{ 
                    height: "100%", 
                    textAlign: "center",
                    fontFamily: "Poppins",
                    maxWidth: "600px",
                    backgroundColor: "white",
                    maxHeight: "100vh",
                    padding: "60px",
                    paddingTop: "160px",
                    
                  }}>
                  <h1 style={{ color: "#A6CE39", fontWeight: "bold", fontSize: "64px", paddingRight: "18px"}}> 
                    About <b style={{ color: "black"}}>Us</b>
                  </h1>   
                  
                  <p style={{ fontSize: "16px", lineHeight: "1.8", color: "black"}}>
                    RentField dikembangkan oleh tim yang terdiri dari lima mahasiswa dan mahasiswi Program Studi Sistem Informasi Universitas Pendidikan Ganesha. Kami memiliki tim yang berkompeten dalam bidang teknologi informasi dan berkomitmen untuk memberikan pengalaman terbaik bagi pengguna. Dengan pendekatan yang user-friendly dan fitur-fitur canggih, RentField siap melayani setiap kebutuhan penyewaan olahraga dengan layanan yang responsif dan efisien.
                  </p >
                </div> 
              </Col>
      
              <Col>    
                <img
                  src={ourteam} // Ganti dengan path logo Anda
                  alt="CodeBlue Team"
                  style={{ 
                    maxWidth: "912px",
                    maxHeight: "1000px",
                    width: "100%",           // Membuat gambar menyesuaikan lebar kolom
                    height: "100%",          // Mengisi tinggi kolom
                    objectFit: "cover",      // Memastikan gambar memenuhi ruang tanpa terdistorsi
                    
                    }}
                />
              </Col>
            </Row>
        </section>

        {/* Services Section */}
        <section id="Services" 
          style={{
            minHeight: "100vh",
            maxWidth: "100%", 
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

          }}
        >
          <Col>
          <div
              style={{
                
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "50px",
                paddingTop: "90px"
                // border: "1px solid rgba(255, 255, 255, 0.3)",
              }} 
            >
              <h2 style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "bold", paddingBottom: "10px" }}>Our Services</h2>
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

            <div style={{paddingTop:"80px", backgroundColor: "pink", maxWidth: "100%", width: "250vh"}}>
              <h2 style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "bold", paddingBottom: "10px", paddingLeft: "10px" }}>Available For Rent</h2>
                <Row style={{paddingBottom: "30px", paddingLeft: "10px"}}>
                  <div style={{maxWidth: "400px", backgroundColor: "pink"}}>
                      <img
                        src={activePhoto.image}
                        alt={activePhoto.title}
                      />
                  </div>
                  <div style={{paddingLeft: "20px", backgroundColor: "pink"}}>
                    <h4 style={{fontFamily: "Poppins", fontSize: "70", fontWeight: "bold"}}>{activePhoto.title}</h4>
                    <p style={{fontFamily: "Poppins", fontWeight: "bold"}}>{activePhoto.description}</p>
                  </div>
                </Row>

                <Row> 
                  {/* Bagian bawah - Preview foto kecil */}
                    {galleryData.map((photo) => (
                          <div
                            style={{maxWidth: "200px", paddingLeft: "10px"}}
                            key={photo.id}
                            className={`flex-none snap-start cursor-pointer transition-all duration-300 w-48 h-48 ${
                              activePhoto.id === photo.id
                                ? 'ring-4 ring-blue-500 scale-105'
                                : 'opacity-60 hover:opacity-100'
                            }`}
                            onClick={() => setActivePhoto(photo)}
                          >
                            <div className="w-full h-full relative">
                              <img
                                src={photo.image}
                                alt={photo.title}
                                className="w-full h-full object-cover absolute inset-0"
                              />
                            </div>           
                          </div>
                        ))}
                </Row> 
            </div>
          </Col>      
        </section>

        {/* Contact Section */}
        <section id="Contact"
          style={{
            minHeight: "100vh",
            maxWidth: "100%", 
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
            <p className="text-xl mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100">
                Send Message
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-blue-700">
                Call Now
              </button>
            </div>
          </div>
        </section>
      </main>

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


