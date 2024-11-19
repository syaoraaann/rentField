import { Routes, Route } from "react-router-dom";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./assets/styles/adaptive.css";
import "antd/dist/reset.css";
import 'leaflet/dist/leaflet.css';

import LandingPage from "./pages/landing_page";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ListLapangan from "./pages/list_lapangan";
import Profile from "./pages/profile/index";
import ApiPage from "./pages/api_page/index";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-lapangan" element={<ListLapangan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/api-page" element={<ApiPage />} />
      </Routes>
    </div>
  );
}

export default App;

// import React from "react";
// import { Layout, Menu, Button, Typography, Space, Card } from "antd";
// import {
//   BookOutlined,
//   HomeOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";
// import "antd/dist/reset.css";

// const { Header, Content, Footer } = Layout;
// const { Title, Text } = Typography;

// function App() {
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Header
//         style={{
//           backgroundColor: "#001529",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <div
//           className="logo"
//           style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
//         >
//           RentField
//         </div>
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={["1"]}
//           style={{ lineHeight: "64px" }}
//         >
//           <Menu.Item key="1" icon={<HomeOutlined />}>
//             Home
//           </Menu.Item>
//           <Menu.Item key="2" icon={<InfoCircleOutlined />}>
//             About
//           </Menu.Item>
//         </Menu>
//       </Header>

//       <Content
//         style={{
//           padding: "50px",
//           textAlign: "center",
//           backgroundColor: "#f0f2f5",
//         }}
//       >
//         <Title level={1}>Welcome to RentField</Title>
//         <Text
//           type="secondary"
//           style={{ display: "block", marginBottom: "20px", fontSize: "18px" }}
//         >
//           Easily book your sports field with just a few clicks!
//         </Text>

//         <Space size="large" direction="vertical" style={{ marginTop: "30px" }}>
//           <Card
//             title="Special Offers"
//             bordered={false}
//             style={{ width: 300, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
//           >
//             <p>Get discounts when you book for the weekend!</p>
//             <Button
//               type="primary"
//               icon={<BookOutlined />}
//               style={{ marginTop: "10px" }}
//             >
//               Book Now
//             </Button>
//           </Card>

//           <Card
//             title="How It Works"
//             bordered={false}
//             style={{ width: 300, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
//           >
//             <p>
//               Choose your location, select a date, and confirm your booking
//               instantly.
//             </p>
//             <Button
//               type="default"
//               icon={<InfoCircleOutlined />}
//               style={{ marginTop: "10px" }}
//             >
//               Learn More
//             </Button>
//           </Card>
//         </Space>
//       </Content>

//       <Footer
//         style={{
//           textAlign: "center",
//           backgroundColor: "#001529",
//           color: "#fff",
//           padding: "20px 0",
//         }}
//       >
//         LapanganBooking ©2024 Created by Coolyeah
//       </Footer>
//     </Layout>
//   );
// }

// export default App;
