import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Form,
  Input,
} from "antd";
import "./login.css";
import rentfieldlogo from "../../assets/images/rentfield1.png";
import Login1 from "../../assets/images/Login1.png";
import "@fontsource/poppins";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const isFormValid = username !== "" && password !== "";

  const handleLogin = () => {
    if (username && password) {

      //save username di sessionstorage setelah login
      sessionStorage.setItem('username', username);
      navigate("/dashboard");
    } else {
      alert("Please fill in both email and password.");
    }
  };

  //UPCOMING FEATURES//
  const handlePasswordReset = (values) => {
    console.log("Password reset for:", values.email);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section */}
        <div className="login-box">
          <img
            src={rentfieldlogo}
            alt="Logo"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Title level={2} style={{ color: "#000" }}>
            LOG IN
          </Title>

          {isForgotPassword ? (
            <Form onFinish={handlePasswordReset}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Username!" }]}
              >
                <Input placeholder="Enter your Username" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
              <Text type="secondary">
                Remembered your password?{" "}
                <a onClick={() => setIsForgotPassword(false)}>Log In</a>
              </Text>
            </Form>
          ) : (
            <Form onFinish={handleLogin}>
              <Form.Item>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                  style={{ borderRadius: "8px", padding: "10px" }}
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{ borderRadius: "8px", padding: "10px" }}
                />
              </Form.Item>
              <Text type="secondary">
                <a onClick={() => setIsForgotPassword(true)}>Forgot Password?</a>
              </Text>
              <Form.Item>
                <Button
                
                  type="primary"
                  htmlType="submit"
                  disabled={!isFormValid}
                  block
                  className="login-button"
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
          )}

          <Text>
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")} style={{ color: "#000" }}>
              Register here
            </a>
          </Text>
        </div>

        {/* Right Section with Nested Card Effect */}
        <div className="login-illustration">
          <div className="illustration-card">
            <img src={Login1} alt="Field illustration" className="field-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;