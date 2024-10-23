import React, { useState } from "react";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "antd/dist/reset.css";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(username, password);
    // Here you can add your login logic
    navigate("/"); // Navigate to the home page after login
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-brand">
          <h5>WebfmSI.com</h5>
        </div>
      </Header>
      <Content className="login-container">
        <Row justify="center">
          <Col span={8}>
            <Title level={2}>Sign In</Title>
            <Form onFinish={handleLogin} layout="vertical">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        LapanganBooking ©2024 Created by Coolyeah
      </Footer>
    </Layout>
  );
};

export default LoginPage;
