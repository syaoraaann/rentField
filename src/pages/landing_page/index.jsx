import {
    Layout,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
  } from "antd";
// import SignBG from "../../assets/images/curve-1.svg";
// import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  
// const { Header: AntHeader, Content, Sider } = Layout;
const { Title } = Typography;
const { Header, Footer, Content } = Layout;
  
function  LandingPage () {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // const handleLogin = async () => {
  //   console.log(username, password)
  //   navigate("/dashboard", { replace: true });
  // }; 
  
  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-brand">
          <h5>WebfmSI.com</h5>
        </div>
        <div className="header-col header-nav">
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <Link to="/list-lapangan">List Lapangan</Link> |{" "}
          <Link to="/profile">Profile</Link>
        </nav>
        </div>
        <div className="header-col header-btn">
          <Button type="primary">Login</Button>
        </div>
      </Header>
      <Content className="signin login-container">
        <Row gutter={[24, 0]} justify="space-around">
          <Col>
            Hello123
          </Col>
        </Row>
      </Content>
      <Footer>
        <p className="copyright">
          {" "}
          Copyright © 2024 WebfmSI.com - Powered by Universitas Pendidikan Ganesha
        </p>
      </Footer>
    </Layout>
  );
};
  
export default LandingPage;
  