import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Form, Input, Select, message } from "antd";
import "../../pages/login/login.css";
import rentfieldlogo from "../../assets/images/rentfield1.png";
import Login1 from "../../assets/images/Login1.png";
import "@fontsource/poppins";

const { Text } = Typography;
const { Option } = Select;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const { role } = result; // Asumsikan server mengembalikan role

        // Simpan role di session storage
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("role", role);

        message.success("Login successful!");

        // Arahkan pengguna berdasarkan role
        if (role === "Admin") {
          navigate("/admin-page");
        } else if (role === "Penyewa") {
          navigate("/dashboard");
        } else if (role === "Owner") {
          navigate("/owner-page");
        } else {
          message.error("Role not recognized. Contact support.");
        }

        setUsername("");
        setPassword("");
      } else {
        message.error(result.message || "Invalid username or password.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  // Handle Signup
  const handleSignup = async (values) => {
    const { username, password, role } = values;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        message.success("Registration successful!");
        setIsSignup(false); // Switch to login after successful registration
      } else {
        message.error(result.message || "Signup failed.");
      }
    } catch (error) {
      message.error("An error occurred during signup.");
    }
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
              className="logo-img"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <h2 className="logo-title">
              {isSignup
                ? "Sign Up"
                : isForgotPassword
                ? "Reset Password"
                : "Log In"}
            </h2>
          </div>

          {/* Forgot Password Form */}
          {isForgotPassword && (
            <Form form={forgotPasswordForm} onFinish={handlePasswordReset}>
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
                <Button
                  type="default"
                  htmlType="submit"
                  block
                  style={{ backgroundColor: "#b3cf3a" }}
                >
                  Submit
                </Button>
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
              layout="vertical"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Username is required!" }]}
                style={{ marginBottom: "4px" }}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                className="password-item"
                rules={[{ required: true, message: "Password is required!" }]}
                style={{ marginBottom: "-20px" }}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Role is required!" }]}
                style={{ marginBottom: "12px" }}
              >
                <Select placeholder="Select Role">
                  <Option value="Penyewa">Penyewa</Option>
                  <Option value="Owner">Owner</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="submit"
                  block
                  style={{ backgroundColor: "#b3cf3a" }}
                >
                  Register
                </Button>
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
                rules={[{ required: true, message: "Username is required!" }]}
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
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Item>
              <Text className="forgot-password-text">
                <a onClick={() => setIsForgotPassword(true)}>
                  Forgot Password?
                </a>
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
            <img
              src={Login1}
              alt="Field illustration"
              className="field-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
