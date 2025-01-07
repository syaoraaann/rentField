import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Radio,
  Button,
  Upload,
  message,
  Form,
  DatePicker,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import SideNav from "../dashboardrenter/sidenav";
import moment from "moment";

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const Profile = () => {
  const [form] = Form.useForm();
  const [gender, setGender] = useState("Male");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Style constants
  const LIME_GREEN = "#ABFD13";
  const DARK_BG = "#121212";
  const DARKER_BG = "#0A0A0A";
  const INPUT_BG = "#1F1F1F";

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Images must be smaller than 1MB!");
      return false;
    }
    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        message.success("Profile photo updated successfully!");
      });
    }
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    const fullPhoneNumber = values.phone ? `+62${values.phone}` : "";
    const formattedDate = values.birthDate
      ? values.birthDate.format("DD/MM/YYYY")
      : "";

    const processedValues = {
      ...values,
      phone: fullPhoneNumber,
      birthDate: formattedDate,
    };

    Object.keys(processedValues).forEach((key) => {
      if (processedValues[key]) {
        formData.append(key, processedValues[key]);
      }
    });
    if (imageUrl) {
      formData.append("profilePicture", imageUrl);
    }

    console.log("Form values:", Object.fromEntries(formData));
    message.success("Profile updated successfully!");
  };

  const validatePhoneNumber = (_, value) => {
    if (!value) {
      return Promise.reject("Please enter your phone number!");
    }
    const cleanNumber = value.replace(/\D/g, "");
    if (cleanNumber.length < 9 || cleanNumber.length > 12) {
      return Promise.reject("Phone numbers must be between 9-12 digits!");
    }
    return Promise.resolve();
  };

  // Custom styles
  const styles = {
    layout: {
      minHeight: "100vh",
      background: DARKER_BG,
    },
    mainLayout: {
      marginLeft: 256,
      background: DARK_BG,
      minHeight: "100vh",
    },
    content: {
      padding: "24px",
      background: DARK_BG,
      minHeight: "calc(100vh - 64px)",
    },
    formContainer: {
      maxWidth: "600px",
      margin: "0 auto",
      background: DARK_BG,
      padding: "32px",
      borderRadius: "12px",
    },
    title: {
      color: LIME_GREEN,
      margin: "0 0 40px 0",
      fontWeight: "bold",
      fontSize: "32px",
      textAlign: "center",
    },
    uploadSection: {
      textAlign: "center",
      marginBottom: "32px",
      marginTop: "20px",
    },
    uploadContainer: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      margin: "0 auto 24px",
      background: INPUT_BG,
      border: `2px solid ${LIME_GREEN}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden",
      position: "relative",
    },
    uploadIcon: {
      fontSize: "32px",
      color: LIME_GREEN,
    },
    uploadText: {
      color: LIME_GREEN,
      fontSize: "14px",
      marginTop: "24px",
      display: "block",
    },
    label: {
      color: LIME_GREEN,
      fontWeight: 600,
      marginBottom: "8px",
    },
    input: {
      background: INPUT_BG,
      borderColor: LIME_GREEN,
      color: "#fff",
      height: "40px",
    },
    radioGroup: {
      color: "#fff",
    },
    radio: {
      color: "#fff",
      marginRight: "24px",
    },
    datePicker: {
      width: "100%",
      height: "40px",
      background: INPUT_BG,
      borderColor: LIME_GREEN,
    },
    button: {
      width: "100%",
      height: "40px",
      background: LIME_GREEN,
      borderRadius: "8px",
      border: "none",
      color: DARK_BG,
      fontWeight: "bold",
      fontSize: "16px",
      marginTop: "24px",
    },
    phoneAddon: {
      background: INPUT_BG,
      color: "#fff",
      borderColor: LIME_GREEN,
    },
  };

  return (
    <Layout style={styles.layout}>
      <SideNav />
      <Layout style={styles.mainLayout}>
        <Content style={styles.content}>
          <div style={styles.formContainer}>
            <Title style={styles.title}>My Profile</Title>

            <div style={styles.uploadSection}>
              <Upload
                name="avatar"
                listType="picture-circle"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <div style={styles.uploadContainer}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <CameraOutlined style={styles.uploadIcon} />
                  )}
                </div>
              </Upload>
              <Text style={styles.uploadText}>
                Click to {imageUrl ? "change" : "upload"} profile picture
              </Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                username: "syarifabdllh",
                email: "",
                phone: "",
                gender: "Male",
              }}
            >
              <Form.Item
                label={<span style={styles.label}>Username</span>}
                name="username"
              >
                <Input style={styles.input} disabled />
              </Form.Item>

              <Form.Item
                label={<span style={styles.label}>Full Name*</span>}
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input style={styles.input} placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label={<span style={styles.label}>Email*</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                    type: "email",
                  },
                ]}
              >
                <Input style={styles.input} placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label={<span style={styles.label}>Telephone Number</span>}
                name="phone"
                rules={[{ validator: validatePhoneNumber }]}
              >
                <Input
                  style={styles.input}
                  placeholder="08xxxxxxxxxx"
                />
              </Form.Item>

              <Form.Item
                label={<span style={styles.label}>Gender</span>}
                name="gender"
              >
                <Radio.Group
                  onChange={handleGenderChange}
                  value={gender}
                  style={styles.radioGroup}
                >
                  <Radio value="Male" style={styles.radio}>
                    Male
                  </Radio>
                  <Radio value="Female" style={styles.radio}>
                    Female
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label={<span style={styles.label}>Date of Birth</span>}
                name="birthDate"
                rules={[
                  {
                    required: true,
                    message: "Please select your date of birth!",
                  },
                ]}
              >
                <DatePicker
                  style={styles.datePicker}
                  format="DD/MM/YYYY"
                  placeholder="Choose birth date"
                  disabledDate={(current) => {
                    return (
                      current &&
                      (current > moment().endOf("day") ||
                        current < moment().subtract(100, "years"))
                    );
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={styles.button}
                >
                  SAVE
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer className="footer-dashboard-renter">
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Profile;