import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  List,
  Carousel,
  Progress,
  Table,
} from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SideNav from "../dashboardrenter/sidenav";
import "./index.css";
import bgImage from "../../assets/images/bgnew.jpg";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const MyPoint = ({ point = 500 }) => {
  const [kategori, setKategori] = useState(tentukanKategori(point));

  function tentukanKategori(point) {
    if (point <= 1000) {
      return "Challenger";
    } else if (point <= 3000) {
      return "Athlete";
    } else {
      return "Explorer";
    }
  }

  const progressColor = {
    Challenger: "#090909",
    Athlete: "#090909",
    Explorer: "#090909",
  };

  const columns = [
    {
      title: "Challenger Benefit",
      dataIndex: "col1",
      key: "col1",
    },
    {
      title: "Athlete Benefit",
      dataIndex: "col2",
      key: "col2",
    },
    {
      title: "Explorer Benefit",
      dataIndex: "col3",
      key: "col3",
    },
  ];

  const data = [
    {
      key: "1",
      col1: "-",
      col2: "Free tax fee",
      col3: "Free tax fee",
    },
    {
      key: "2",
      col1: "-",
      col2: "-",
      col3: "Discount up to 10%",
    },
  ];

  return (
    <Layout
      className="layout-main"
    >
      <SideNav />
      {/* Main content area */}
        <Content style={{ marginLeft: 256 }} className="pageContent fadeIn">
          <h1
            style={{
              color: "#A3FF12",
              fontSize: "40px",
              marginBottom: "40px",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            My point
          </h1>
          <Col>
            <div className="box-style" style={{ paddingBottom: "40px" }}>
              <Row>
                <div
                  className={`box ${kategori === "Challenger" ? "active" : ""}`}
                >
                  <Text
                    style={{
                      color: progressColor.Challenger,
                      fontSize: "28px",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Challenger
                  </Text>
                </div>
                <div
                  className={`box ${kategori === "Athlete" ? "active" : ""}`}
                >
                  <Text
                    style={{
                      color: progressColor.Athlete,
                      fontSize: "28px",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Athlete
                  </Text>
                </div>
                <div
                  className={`box ${kategori === "Explorer" ? "active" : ""}`}
                >
                  <Text
                    style={{
                      color: progressColor.Explorer,
                      fontSize: "28px",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Explorer
                  </Text>
                </div>
              </Row>
            </div>
            <div
              style={{
                paddingBottom: "40px",
                display: "flex",
                justifyContent: "center  ",
              }}
            >
              <h2
                style={{
                  color: "#ABFD13",
                  fontFamily: "Poppins",
                  fontSize: "24px",
                  fontWeight: "bold",
                  wordSpacing: "2px",
                }}
              >
                Your Current Level: {kategori}
              </h2>
            </div>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="score-num">
                <h1>500</h1>
                <h1>1000</h1>
              </div>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "center", // Horizontal center
                alignItems: "center", // Vertical center
                height: "100%", // Sesuaikan dengan kebutuhan Anda
                paddingBottom: "60px",
              }}
            >
              <Progress
                percent={(point / 1000)* 100}
                status="active"
                strokeColor={"#ABFD13"} // Set color based on category
                trailColor="#e0e0e0"
                className="progress-bar"
                // Additional styles for customization (optional)
                style={{
                  width: "80%", // Mengurangi panjang progress bar
                  maxWidth: 800, // Membatasi panjang maksimal progress bar
                  height: 10, // Tinggi tetap
                  borderRadius: 5, // Menambahkan border radius untuk tampilan melengkung
                  margin: "0 auto", // Agar progress bar berada di tengah
                }}
              />
            </div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false} // Disable pagination for a small table
              
              className="table-style"
            />
            <div style={{ paddingTop: "40px", paddingLeft: "200px" }}>
              <h3 className="text-bottom">
                1. Points will be awarded upon completing the booking.
              </h3>
              <h3 className="text-bottom">
                2. The number of points is calculated based on the total
                payment/1000.
              </h3>
              <h3 className="text-bottom">
                3. Points cannot be redeemed for cash.
              </h3>
            </div>
          </Col>
        </Content>

        <Footer className="footer-mypoint">
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
    </Layout>
  );
};

export default MyPoint;
