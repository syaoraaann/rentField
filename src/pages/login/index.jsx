import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Divider,
} from "antd";

import { useState } from "react";  
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const isFormValid = username !== "" && password !== "" ;

  const handleLogin = () => {
    if (username && password) {
        navigate("/dashboard");
    } else {
        alert("Please fill in both email and password.");
    }


  // const handleLogin = () => {
  //     // Check if both fields are filled
  //     if (email && password) {
  //         // Login successful, navigate to the desired page
  //         navigate("/dashboard"); // Change to your desired route
  //     } else {
  //         // Handle empty fields (e.g., show an error message)
  //         alert("Please fill in both email and password.");
  //     }
  };

  const handlePasswordReset = (values) => {
      // Handle password reset logic
      console.log("Password reset for:", values.email);
  };

  return (
      <div className="login-container">
          <div className="login-box">
              <Title level={2}>{isForgotPassword ? "Forgot Password" : "Log In"}</Title>

              {/* Show login form or password reset form based on state */}
              {isForgotPassword ? (
                  // Form for Forgot Password
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
                  // Form for Log In
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

                      {/* Link for Forgot Password */}
                      <Text type="secondary">
                          <a onClick={() => setIsForgotPassword(true)}>Forgot your password?</a>
                      </Text>

                      {/* Divider for separation */}
                      <Divider />

                      {/* Link for Sign Up */}
                      <Text type="secondary">
                          Don't have an account? <a onClick={() => navigate("/signup")}>Sign Up</a>
                      </Text>

                  </Form>
              )}
          </div>
      </div>
  );
};

export default LoginPage;
