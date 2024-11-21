import { Layout, Button, Row, Col, Typography, Form, Input, Avatar, Card, Flex } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import { useState, useEffect } from "react";
import { Settings, Edit, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import "../../pages/landing_page/index.css";

//Images
import rentfieldlogo from "../../assets/images/rentfieldlogo.png";
import soccer2 from "../../assets/images/soccer2.jpg";
import bultang from "../../assets/images/bultang.jpg";
import futsal from "../../assets/images/futsal.jpg";
import voli from "../../assets/images/voli.jpg";
import biliard from "../../assets/images/biliard.jpg";
import ourteam from "../../assets/images/ourteam.png";
import basket from "../../assets/images/basket.jpg";
import basket3 from "../../assets/images/basket3.jpg";

const { Title } = Typography;
const { Header, Footer } = Layout;

function LandingPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Home");
  const [activeIndex, setActiveIndex] = useState(0);

  //Handle preview field 
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

  //Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  //Handle login button
  const handleLoginClick = () => {
    navigate("/login");
  };

  //Gallery data for preview image field
  const galleryData = [
    {
      id: 1,
      image: soccer2,
      title: "Singaraja Soccer",
      description:
        "Singaraja Soccer located at Jl. Udayana, Banjar Jawa, Kec. Buleleng, Kabupaten Buleleng, Bali 81113",
    },
    {
      id: 2,
      image: bultang,
      title: "Badminton Hall UNDIKSHA",
      description:
        "Badminton Hall UNDIKSHA located at GOR BULUTANGKIS UNDIKSHA, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81116",
    },
    {
      id: 3,
      image: futsal,
      title: "Lapangan Futsal Banyuasri",
      description:
        "Lapangan futsal Banyuasri located at jln. Udayana, Singaraja. Open 24 hours for the public.",
    },
    {
      id: 4,
      image: voli,
      title: "Lapangan Voli Gor Undiksha Jineng Dalem",
      description:
        "Lapangan bola voli Gor Undiksha Jineng Dalem is in Jineng Dalem Village. Open 24 hours for Undiksha students",
    },
    {
      id: 5,
      image: biliard,
      title: "Billiard Singaraja",
      description:
        "Biliard Singaraja located on jln. A. Yani, Singaraja. Open from 08.00 WITA-23.00 WITA",
    },
    {
      id: 6,
      image: soccer2,
      title: "Soccer Field GOR Bhuana Patra",
      description:
        "Soccer Field GOR Bhuana Patra located at Jl. Udayana No.6, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81114",
    },
    {
      id: 7,
      image: voli,
      title: "Basketball Field GOR Bhuana Patra",
      description:
        "Basketball Field GOR Bhuana Patra located at Jl. Udayana No.6, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81114. Open from 08.00 WITA-23.00 WITA",
    },
    {
      id: 8,
      image: basket3,
      title: "Basketball Field FOK UNDIKSHA",
      description:
        "Basketball Field FOK UNDIKSHA is in FOK Undiksha, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81116. Open 24 hours for Undiksha students",
    },
    {
      id: 9,
      image: basket,
      title: "Basketball Field Teleng",
      description:
        "Basketball Field Teleng located at Kec. Buleleng, Kabupaten Buleleng, Bali 81116. Open 24 hours",
    },
  ];

  //state for handling active photo
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              className={`px-4 py-2 ${
                activeSection === "Home" ? "active-link" : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              onClick={() => scrollToSection("About Us")}
              className={`px-4 py-2 ${
                activeSection === "About Us" ? "active-link" : "text-gray-600"
              }`}
            >
              About Us
            </Link>
            <Link
              onClick={() => scrollToSection("Services")}
              className={`px-4 py-2 ${
                activeSection === "Services" ? "active-link" : "text-gray-600"
              }`}
            >
              Services
            </Link>
            <Link
              onClick={() => scrollToSection("Contact")}
              className={`px-4 py-2 ${
                activeSection === "Contact" ? "active-link" : "text-gray-600"
              }`}
            >
              Contact
            </Link>
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
        <section
          id="Home"
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

              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              // border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Poppins",
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                }}
              >
                Field Rental Made Easier For You
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "Poppins", fontSize: "16px" }}>
                Welcome to the most comprehensive field rental platform! Enjoy
                the convenience of finding and booking your favorite field for
                various sports such as futsal, basketball, tennis, and more.
                Create an unforgettable sports experience with the best
                facilities available anytime according to your needs. Let's
                start now to find the ideal field for your next match!
              </p>
            </div>
          </div>

          <div className="header-col header-btn" style={{ paddingTop: "15px" }}>
            <Button type="primary" onClick={handleLoginClick}>
              Get Started
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section
          id="About Us"
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
          <Row
            gutter={[0, 48]}
            justify="center"
            style={{ color: "white", height: "100vh" }}
          >
            <Col xs={8} lg={32} style={{ height: "100%", padding: 0 }}>
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
                }}
              >
                <h1
                  style={{
                    color: "#A6CE39",
                    fontWeight: "bold",
                    fontSize: "64px",
                    paddingRight: "18px",
                  }}
                >
                  About <b style={{ color: "black" }}>Us</b>
                </h1>

                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                    color: "black",
                  }}
                >
                  RentField was developed by a team of five students from
                  Ganesha University of Education's Information Systems Study
                  Program. We have a team that is competent in the field of
                  information technology and committed to providing the best
                  experience for users. With a user-friendly approach and
                  advanced features, RentField is ready to serve every sports
                  rental need with responsive and efficient services.
                </p>
              </div>
            </Col>

            <Col xs={16} lg={32}>
              <div style={{ backgroundColor: "#A6CE39", height: "100vh" }}>
                <img
                  src={ourteam} // Ganti dengan path logo Anda
                  alt="CodeBlue Team"
                  style={{
                    width: "100%", // Membuat gambar menyesuaikan lebar kolom
                    height: "100%",
                    objectFit: "cover", // Memastikan gambar memenuhi ruang tanpa terdistorsi
                  }}
                />
              </div>
            </Col>
          </Row>
        </section>

        {/* Services Section */}
        <section
          id="Services"
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
                display: "flex", // Tambahkan
                flexDirection: "column", // Tambahkan
                alignItems: "center",
                paddingBottom: "90px",
                // border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <h2
                style={{
                  fontFamily: "Poppins",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  paddingBottom: "10px",
                }}
              >
                Our Services
              </h2>
              <Row gutter={[24, 24]} xs={24} md={12}>
                <Card className="cards">
                  <p className="cards-title">Rent Field Services</p>
                  <p className="small-desc">
                    Provide several rental field or place for rent.
                  </p>
                  <div className="go-corner">
                    <div className="go-arrow">→</div>
                  </div>
                </Card>
                <Card className="cards">
                  <p className="cards-title">Effectiveness & Efficientcy</p>
                  <p className="small-desc">
                    Provide effectiveness and efficientcy for user who want to
                    rent field or place.
                  </p>
                  <div className="go-corner">
                    <div className="go-arrow">→</div>
                  </div>
                </Card>
                <Card className="cards">
                  <p className="cards-title">Provide Status Field</p>
                  <p className="small-desc">
                    We provide information about status field or place, so user
                    can check easyly the field or place already booked or not.
                  </p>
                  <div className="go-corner">
                    <div className="go-arrow">→</div>
                  </div>
                </Card>
              </Row>
            </div>

            <div
              style={{
                paddingTop: "80px",
                maxWidth: "100%",
                width: "100%", // Ubah dari 250vh ke 100%
                display: "flex", // Tambahkan
                flexDirection: "column", // Tambahkan
                alignItems: "center",
                animation: "fadeIn 1s ease-in",
                backgroundColor: "white",
                paddingBottom: "90px",
              }}
            >
              <h2
                style={{
                  fontFamily: "Poppins",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  paddingBottom: "10px",
                  color: "#A6CE39",
                }}
              >
                Available For Rent
              </h2>
              <Row
                style={{
                  paddingBottom: "30px",
                  animation: "slideIn 0.8s ease-out",
                }}
              >
                <div
                  className="image-hover-container"
                  style={{ maxWidth: "400px", flexShrink: 0 }}
                >
                  <img src={activePhoto.image} alt={activePhoto.title} />
                </div>
                <div
                  style={{
                    paddingLeft: "20px",
                    width: "400px",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "24px",
                      fontWeight: "bold",
                      wordWrap: "break-word", // Memungkinkan text untuk wrap
                      overflowWrap: "break-word", // Memastikan text panjang bisa wrap
                    }}
                  >
                    {activePhoto.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      wordWrap: "break-word", // Memungkinkan text untuk wrap
                      overflowWrap: "break-word", // Memastikan text panjang bisa wrap
                    }}
                  >
                    {activePhoto.description}
                  </p>
                </div>
              </Row>
              <Row
                className="relative overflow-hidden flex items-center"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "10px",
                  paddingLeft: "110px",
                  paddingRight: "110px",
                  paddingBottom: "20px",
                }}
              >
                {activeIndex > 0 && (
                  <Button icon={<LeftOutlined />} onClick={handlePrev} />
                )}
                {/* Bagian bawah - Preview foto kecil */}
                <div
                  className="flex flex-row"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden",
                  }}
                >
                  {galleryData.map((photo) => (
                    <div
                      style={{
                        maxWidth: "200px",
                        transform: `translateX(-${activeIndex * 200}px)`,
                        flexShrink: 0,
                        padding: "5px",
                        border:
                          activePhoto.id === photo.id
                            ? "4px solid #3B82F6"
                            : "none",
                        overflowX: "auto",
                        transform: `translateX(-${activeIndex * 200}px)`,
                      }}
                      key={photo.id}
                      className={`transition-transform duration-300 flex-none snap-start cursor-pointer w-48 h-48 ${
                        activePhoto.id === photo.id
                          ? "scale-105"
                          : "opacity-60 hover:opacity-100"
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
              <p>
                Want to see more? <Link to="/login"> Sign In</Link>
              </p>
            </div>
          </Col>
        </section>

        {/* Contact Section */}
        <section
          id="Contact"
          style={{
            minHeight: "60vh",
            maxWidth: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            paddingTop: "90px",
          }}
        >
          <div
            style={{
              display: "flex", // Tambahkan
              flexDirection: "column", // Tambahkan
              alignItems: "center",
              animation: "fadeIn 1s ease-in",
              fontFamily: "Poppins",
            }}
          >
            <h2
              style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}
            >
              Contact <b style={{ color: "black" }}>Us</b>
            </h2>
            <p style={{ paddingBottom: "50px" }}>
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
            <ul className="example-2" style={{ paddingRight: "40px" }}>
              <li className="icon-content">
                <a
                  href="https://linkedin.com/"
                  aria-label="LinkedIn"
                  data-social="linkedin"
                >
                  <div className="filled" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <div className="tooltip">LinkedIn</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://www.github.com/"
                  aria-label="GitHub"
                  data-social="github"
                >
                  <div className="filled" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <div className="tooltip">GitHub</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://www.instagram.com/"
                  aria-label="Instagram"
                  data-social="instagram"
                >
                  <div className="filled" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <div className="tooltip">Instagram</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://youtube.com/"
                  aria-label="Youtube"
                  data-social="youtube"
                >
                  <div className="filled" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-youtube"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <div className="tooltip">Youtube</div>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer className="footer-landing content-animation">
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
