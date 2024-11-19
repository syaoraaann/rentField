import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Form, Input } from "antd";
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
  const [isSignup, setIsSignup] = useState(false);

  const isFormValid = username !== "" && password !== "";

  const handleLogin = () => {
    if (username && password) {
      // Save username in session storage after login
      sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert("Please fill in both email and password.");
    }
  };

  const handlePasswordReset = (values) => {
    console.log("Password reset for:", values.email);
  };

  const handleSignup = (values) => {
    console.log("Sign Up Details:", values);
    // UPCOMING FEATURES//
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
            {isSignup ? "Sign Up" : isForgotPassword ? "RESET PASSWORD" : "LOG IN"}
          </Title>

          {/* Forgot Password Form */}
          {isForgotPassword && (
            <Form onFinish={handlePasswordReset}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Please enter a valid Email!" },
                ]}
              >
                <Input placeholder="Email" />
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
          )}

          {/* Signup Form */}
          {isSignup && (
            <Form onFinish={handleSignup}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Username!" }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Please enter a valid Email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your Password!" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>
              </Form.Item>
              <Text type="secondary">
                Already have an account?{" "}
                <a onClick={() => setIsSignup(false)}>Log In</a>
              </Text>
            </Form>
          )}

          {/* Login Form */}
            {!isForgotPassword && !isSignup && (
              <Form onFinish={handleLogin}>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Item>
                <Text type="primary">
                  <a onClick={() => setIsForgotPassword(true)}>Forgot Password?</a>
                </Text>
                <Form.Item>
                  <Button
                    
                    htmlType="submit"
                    block
                    className="login-button login-btn"
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            )}

          <Text>
            {!isForgotPassword && !isSignup && (
              <>
                Don't have an account?{" "}
                <a onClick={() => setIsSignup(true)}>Register here</a>
              </>
            )}
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
