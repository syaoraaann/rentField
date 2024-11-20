import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Form, Input, Popconfirm } from "antd";
import "./login.css";
import rentfieldlogo from "../../assets/images/rentfield1.png";
import Login1 from "../../assets/images/Login1.png";
import "@fontsource/poppins";

const { Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();

  const handleLogin = () => {
    if (username && password) {
      sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert("Please fill in both username and password.");
    }
  };

  const handlePasswordReset = (values) => {
    console.log("Password reset for:", values.email);
  };

  const handleSignup = (values) => {
    console.log("Sign Up Details:", values);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section */}
        <div className="login-box">
          <div className="logo-container">
            <img
              src={rentfieldlogo}
              alt="Logo"
              className="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <h2 className="logo-title">
              {isSignup ? "Sign Up" : isForgotPassword ? "Reset Password" : "Log In"}
            </h2>
          </div>

          {/* Forgot Password Form */}
          {isForgotPassword && (
            <Form
              form={forgotPasswordForm}
              onFinish={handlePasswordReset}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Please enter a valid Email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => {
                  const isFormValid =
                    forgotPasswordForm.isFieldsTouched(true) &&
                    !forgotPasswordForm
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length;

                  return (
                    <Popconfirm
                      title="Upcoming Features"
                      description="Sorry, this is an upcoming feature."
                      okText="OK"
                      placement="top"
                      cancelButtonProps={{ style: { display: "none" } }}
                      okButtonProps={{
                        style: {
                          backgroundColor: "#b3cf3a",
                          borderColor: "#b3cf3a",
                        },
                      }}
                    >
                      <Button
                        type="default"
                        htmlType="submit"
                        block
                        style={{
                          backgroundColor: "#b3cf3a",
                          color: isFormValid ? "#000000" : "#808080",
                        }}
                        disabled={!isFormValid}
                      >
                        Submit
                      </Button>
                    </Popconfirm>
                  );
                }}
              </Form.Item>
              <Text>
                Remembered your password?{" "}
                <a onClick={() => setIsForgotPassword(false)}>Log In</a>
              </Text>
            </Form>
          )}

          {/* Signup Form */}
          {isSignup && (
            <Form
              form={signupForm}
              onFinish={handleSignup}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "The Username cannot be empty!" }]}
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
                className="password-item"
                rules={[{ required: true, message: "Please input your Password!" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => {
                  const isFormValid =
                    signupForm.isFieldsTouched(true) &&
                    !signupForm
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length;

                  return (
                    <Button
                      type="default"
                      htmlType="submit"
                      block
                      style={{
                        backgroundColor: "#b3cf3a",
                        color: isFormValid ? "#000000" : "#808080",
                      }}
                      disabled={!isFormValid}
                    >
                      Register
                    </Button>
                  );
                }}
              </Form.Item>
              <Text>
                Already have an account?{" "}
                <a onClick={() => setIsSignup(false)}>Log In</a>
              </Text>
            </Form>
          )}

          {/* Login Form */}
          {!isForgotPassword && !isSignup && (
            <Form form={loginForm} onFinish={handleLogin}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Username!" }]}
              >
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                className="password-item"
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
              <Text>
                <a onClick={() => setIsForgotPassword(true)}>Forgot Password?</a>
              </Text>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: "#b3cf3a",
                    color: username && password ? "#000000" : "#808080",
                  }}
                  className="login-button"
                  disabled={!username || !password}
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

        {/* Right Section */}
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