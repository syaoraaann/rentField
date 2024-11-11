import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Form,
  Input,
  Divider
} from "antd";
import "./login.css";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const isFormValid = username !== "" && password !== "";

  const handleLogin = () => {
    if (username && password) {
      navigate("/dashboard");
    } else {
      alert("Please fill in both email and password.");
    }
  };

  const handlePasswordReset = (values) => {
    console.log("Password reset for:", values.email);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Title level={2}>{isForgotPassword ? "Forgot Password" : "Log In"}</Title>

        {isForgotPassword ? (
          <Form onFinish={handlePasswordReset}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Enter your Username" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
            <Text type="secondary">
              Remembered your password?{' '}
              <a onClick={() => setIsForgotPassword(false)}>Log In</a>
            </Text>
          </Form>
        ) : (
          <Form onFinish={handleLogin}>
            <Form.Item>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" 
                htmlType="submit"
                disabled={!isFormValid}
                block>
                Log In
              </Button>
            </Form.Item>

            <Text type="secondary">
              <a onClick={() => setIsForgotPassword(true)}>Forgot your password?</a>
            </Text>

            <Divider />

            <Text className="text-black">
                Don't have an account?
                </Text>
                <br />
                <Text type="secondary">
                <a onClick={() => navigate("/signup")}>Sign Up</a>
            </Text>
          </Form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
