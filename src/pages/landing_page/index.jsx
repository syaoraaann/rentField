import { Layout, Button, Row, Col, Typography, Form, Input, Avatar, Card, Flex } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

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
import status from "../../assets/images/status.png";
import forrent from "../../assets/images/forrent.jpg";
import efficient from "../../assets/images/efficient.jpg";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

function LandingPage() {
  const navigate = useNavigate();
  // const [activeMenu, setActiveMenu] = useState("Home");
  const [activeSection, setActiveSection] = useState("Home");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === galleryData.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1
    );
  };

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
      description: "Lapangan bola basket Kampus Tengah Undiksha berada di jln. Udayana, Singaraja. Buka 24 jam untuk umum."
    },
    {
      id: 2,
      image: bultang,
      title: "Lapangan Bola Tangkis Gor Undiksha",
      description: "Lapangan bola tangkis Kampus Tengah Undiksha berada di jln. Udayana, Singaraja. Buka 24 jam untuk umum."
    },
    {
      id: 3,
      image: futsal,
      title: "Lapangan Futsal Banyuasri",
      description: "Lapangan futsal Banyuasri berada di jln. Udayana, Singaraja. Buka 24 jam untuk umum."
    },
    {
      id: 4,
      image: voli,
      title: "Lapangan Voli Gor Undiksha Jineng Dalem",
      description: "Lapangan bola voli Gor Undiksha Jineng Dalem berada di Desa Jineng Dalem. Buka 24 jam untuk mahasiswa Undiksha"
    },
    {
      id: 5,
      image: biliard,
      title: "Billiard Singaraja",
      description: "Biliard Singaraja berada di jln. A. Yani, Singaraja. Buka dari pukul 08.00 WITA-23.00 WITA"
    },
    {
      id: 6,
      image: voli,
      title: "Lapangan Voli Gor Undiksha Jineng Dalem",
      description: "Lapangan bola voli Gor Undiksha Jineng Dalem berada di Desa Jineng Dalem. Buka 24 jam untuk mahasiswa Undiksha"
    },
    {
      id: 7,
      image: biliard,
      title: "Billiard Singaraja",
      description: "Biliard Singaraja berada di jln. A. Yani, Singaraja. Buka dari pukul 08.00 WITA-23.00 WITA"
    },
    {
      id: 8,
      image: voli,
      title: "Lapangan Voli Gor Undiksha Jineng Dalem",
      description: "Lapangan bola voli Gor Undiksha Jineng Dalem berada di Desa Jineng Dalem. Buka 24 jam untuk mahasiswa Undiksha"
    },
    {
      id: 9,
      image: biliard,
      title: "Billiard Singaraja",
      description: "Biliard Singaraja berada di jln. A. Yani, Singaraja. Buka dari pukul 08.00 WITA-23.00 WITA"
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
        <Row gutter={[0, 48]} justify="center" style={{color: "white", height: "100vh"}}>
              <Col xs={8} lg={32} style={{height: "100%", padding: 0}}>
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
      
              <Col xs={16} lg={32}>
                <div style={{ backgroundColor: "#A6CE39", height: "100vh"}}>
                  <img
                    src={ourteam} // Ganti dengan path logo Anda
                    alt="CodeBlue Team"
                    style={{ 
                     
                     
                      width: "100%",           // Membuat gambar menyesuaikan lebar kolom
                      height: "100%", 
                      objectFit: "cover",      // Memastikan gambar memenuhi ruang tanpa terdistorsi   
                      }}
                  />
                </div>
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
          <Col style={{ width: "100%" }}>
            <div
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                paddingTop: "90px",
                display: "flex",           // Tambahkan
                flexDirection: "column",   // Tambahkan
                alignItems: "center",
                paddingBottom: "70px" 
                // border: "1px solid rgba(255, 255, 255, 0.3)",
              }} 
            >
              <h2 style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "bold", paddingBottom: "10px" }}>Our Services</h2>
              <Row gutter={[24,24]} xs={24} md={12}>
              <Card
                className="card"
                style={{ 
                    width: 400, 
                    marginRight: "20px",  // Tambahkan margin kanan
                    height: 450,       // Pastikan tinggi penuh
                    padding: "60px"       // Tambahkan padding dalam
                }}
                cover={
                  <img
                    className="card-img"
                    alt="For Rent"
                    src={forrent}
                  />
                }
              >
                <Meta
                  title="Rent Field Services"
                  description="Provide several rental field or place."
                />
              </Card>
              <Card
                className="card"
                style={{ 
                  width: 400, 
                  marginRight: "20px",  // Tambahkan margin kanan
                  height: 450,       // Pastikan tinggi penuh
                  padding: "60px"       // Tambahkan padding dalam
                }}
                cover={
                  <img
                    className="card-img"
                    alt="Efficient"
                    src={efficient}
                  />
                }
              >
                <Meta
                  title="Effectiveness & Efficientcy"
                  description="Provide effectiveness and efficientcy for user who want to rent field or place."
                />
              </Card>
              <Card
                className="card"
                style={{ 
                  width: 400, 
                  marginRight: "20px",  // Tambahkan margin kanan
                  height: 450,       // Pastikan tinggi penuh
                  padding: "60px"       // Tambahkan padding dalam
               }}
                cover={
                  <img
                    className="card-img"
                    alt="Status"
                    src={status}
                  />
                }
              >
                <Meta
                  title="Provide Status Field"
                  description="We provide information about status field or place, so user can check easyly the field or place already booked or not."
                />
              </Card>
              </Row>    
            </div>

            <div style={{
                  paddingTop:"80px",  
                  maxWidth: "100%", 
                  width: "100%",           // Ubah dari 250vh ke 100%
                  display: "flex",         // Tambahkan
                  flexDirection: "column", // Tambahkan
                  alignItems: "center",
                  animation: "fadeIn 1s ease-in",
                  backgroundColor: "white",
                  paddingBottom: "90px"
            }}>
              <h2 style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "bold", paddingBottom: "10px", color: "#A6CE39"}}>Available For Rent</h2>
                  <Row style={{paddingBottom: "30px", animation: "slideIn 0.8s ease-out",}}>
                    <div className="image-hover-container" style={{maxWidth: "400px", flexShrink: 0, }}>
                        <img
                          
                          src={activePhoto.image}
                          alt={activePhoto.title}
                        />
                    </div>
                    <div style={{paddingLeft: "20px", width: "400px", flexShrink: 0, overflow: "hidden"}}>
                      <h4 style={{
                            fontFamily: "Poppins", 
                            fontSize: "24px", 
                            fontWeight: "bold", 
                            wordWrap: "break-word",    // Memungkinkan text untuk wrap
                            overflowWrap: "break-word" // Memastikan text panjang bisa wrap
                          }}>{activePhoto.title}</h4>
                      <p  style={{
                            fontFamily: "Poppins", 
                            fontWeight: "bold",
                            wordWrap: "break-word",    // Memungkinkan text untuk wrap
                            overflowWrap: "break-word" // Memastikan text panjang bisa wrap
                          }}>{activePhoto.description}</p>
                    </div>
                  </Row>
                  <Row className="relative overflow-hidden flex items-center" style={{ display: 'flex', flexWrap: 'nowrap', gap: '10px', paddingLeft: "110px", paddingRight: "110px", paddingBottom: "20px"}}
                  > 
                      {activeIndex > 0 && (
                        <Button icon={<LeftOutlined />} onClick={handlePrev} />
                      )}
                      {/* Bagian bawah - Preview foto kecil */}
                      <div className="flex flex-row" style={{display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
                        {galleryData.map((photo) => (
                                <div
                                  style={{maxWidth: "200px", transform: `translateX(-${activeIndex * 200}px)`,  flexShrink: 0, padding: "5px", border: activePhoto.id === photo.id ? "4px solid #3B82F6" : "none", overflowX: 'auto', transform: `translateX(-${activeIndex * 200}px)`}}
                                  key={photo.id}
                                  className={`transition-transform duration-300 flex-none snap-start cursor-pointer w-48 h-48 ${
                                    activePhoto.id === photo.id
                                      ? 'scale-105'
                                      : 'opacity-60 hover:opacity-100'
                                  }`}
                                  onClick={() => setActivePhoto(photo)}
                                >
                                  <div className="w-full h-full relative img">
                                    <img
                                      src={photo.image}
                                      alt={photo.title}
                                      className="w-full h-full object-cover absolute inset-0"
                                    />
                                  </div>           
                                </div>
                              ))}
                      </div>
                      {activeIndex < galleryData.length - 6 && (
                        <Button icon={<RightOutlined />} onClick={handleNext} />
                      )}      
                  </Row>              
                    <p>Want to see more? <Link to="/login"> Sign In</Link></p>                   
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


