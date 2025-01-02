import React, { useState, useEffect, useContext } from "react";
import {
  Layout,
  Input,
  Drawer,
  Card,
  Select,
  Row,
  Col,
  Typography,
  Button,
  Form,
  Popconfirm,
  notification,
  FloatButton,
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../providers/AuthProvider"; // Ensure correct context import
import bgImage from "../../assets/images/bgnew.jpg";
import SideNavOwner from "../dashboardowner/sidenavowner";
import "./index.css";

const { Title } = Typography;
const { Meta } = Card;
const { Content, Footer } = Layout;
const { Option } = Select;

const ListFieldOwnerTest = () => {
  // Destructure AuthContext
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // If AuthContext is not provided
    notification.error({
      message: "Authentication Error",
      description: "AuthContext is not available. Please check your setup.",
    });
    return <p>Error: Authentication context is missing!</p>;
  }

  const { userProfile, isLoggedIn } = authContext; // Use AuthContext safely
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  // Fetch fields from API
  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/v1/list_field/read"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch fields: ${response.statusText}`);
        }
        const data = await response.json();
        setFields(data.data || []); // Ensure fallback if no data
      } catch (err) {
        console.error("Error fetching fields:", err);
        setError("Failed to load fields. Please try again later.");
        api.error({
          message: "Failed to Load Fields",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, [api]);

  // Filter fields based on search term and category
  const filteredFields = fields.filter((field) => {
    const matchesSearch = field.field_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? field.field_type === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleDrawerOpen = (field) => {
    if (field) {
      setSelectedField(field);
      setIsEdit(true);
      form.setFieldsValue(field);
    } else {
      setSelectedField(null);
      setIsEdit(false);
      form.resetFields();
    }
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedField(null);
  };

  const handleDelete = async (fieldId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/list_field/delete/${fieldId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete field");
      }
      setFields(fields.filter((field) => field.id_field !== fieldId));
      api.success({ message: "Field deleted successfully" });
    } catch (err) {
      api.error({
        message: "Failed to delete field",
        description: err.message,
      });
    }
  };

  const handleFormSubmit = () => {
    if (!isLoggedIn) {
      api.error({
        message: "User not logged in",
        description: "You need to log in before submitting the field data.",
      });
      return;
    }

    const userId = userProfile?.id || userProfile?.user_id; // Ensure user ID is available
    if (!userId) {
      api.error({
        message: "User ID Missing",
        description: "Unable to submit data without a valid user ID.",
      });
      return;
    }

    const formData = new FormData();
    Object.keys(form.getFieldsValue()).forEach((key) => {
      formData.append(key, form.getFieldValue(key));
    });

    formData.append("id_users", userId);

    const url = isEdit
      ? `http://127.0.0.1:5000/api/v1/list_field/update/${selectedField.id_field}`
      : "http://127.0.0.1:5000/api/v1/list_field/create";
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      body: formData,
    })
      .then((response) => response.json())
      .then((resp) => {
        if (resp?.message === "OK") {
          setFields(resp.data || fields);
          api.success({
            message: isEdit
              ? "Field updated successfully"
              : "Field created successfully",
          });
          handleDrawerClose();
          form.resetFields();
        } else {
          api.error({
            message: "Submission Failed",
            description: resp.message || "Unable to submit field data.",
          });
        }
      })
      .catch((err) => {
        api.error({
          message: "Submission Error",
          description: err.toString(),
        });
      });
  };

  return (
    <Layout
      className="layout-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {contextHolder}
      <SideNavOwner />
      <Layout className="layout-content">
        <Title className="page-title">Available Fields at Singaraja</Title>

        <Content className="content-wrapper">
          {loading && <p>Loading fields...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && fields.length === 0 && (
            <p>No fields available.</p>
          )}

          {/* Search and Filter */}
          <Row gutter={16} align="middle" style={{ marginBottom: "20px" }}>
            <Col>
              <Input
                className="search-input"
                placeholder="Search fields by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined style={{ color: "#090909" }} />}
              />
            </Col>
            <Col>
              <Select
                className="category-select"
                placeholder="Select Category"
                onChange={setSelectedCategory}
                value={selectedCategory}
              >
                <Option value="">All Categories</Option>
                <Option value="Soccer Field">Soccer Field</Option>
                <Option value="Badminton Field">Badminton Field</Option>
                <Option value="Basketball Field">Basketball Field</Option>
              </Select>
            </Col>
          </Row>

          {/* Field Cards */}
          <Row gutter={[24, 24]}>
            {filteredFields.map((field) => (
              <Col span={8} key={field.id_field}>
                <Card
                  hoverable
                  className="field-card"
                  cover={
                    <img
                      alt={field.field_name}
                      src={field.image_url || bgImage}
                    />
                  }
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => handleDrawerOpen(field)}
                    />,
                    <Popconfirm
                      key="delete"
                      title="Are you sure you want to delete this field?"
                      onConfirm={() => handleDelete(field.id_field)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined />
                    </Popconfirm>,
                  ]}
                >
                  <Meta
                    title={field.field_name}
                    description={
                      <div>
                        <p>Type: {field.field_type}</p>
                        <p>Address: {field.address}</p>
                        <p>Price: Rp {field.price?.toLocaleString()}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <FloatButton
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => handleDrawerOpen(null)}
            className="floating-button"
          />

          {/* Drawer */}
          <Drawer
            title={isEdit ? "Edit Field" : "Add New Field"}
            width={400}
            onClose={handleDrawerClose}
            open={drawerVisible}
            footer={
              <div style={{ textAlign: "right" }}>
                <Button onClick={handleDrawerClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" onClick={handleFormSubmit}>
                  {isEdit ? "Update Field" : "Create Field"}
                </Button>
              </div>
            }
            className="form-drawer"
          >
            <Form layout="vertical" form={form} initialValues={{ price: 0 }}>
              <Form.Item
                name="field_name"
                label="Field Name"
                rules={[{ required: true, message: "Field Name is required" }]}
              >
                <Input placeholder="Enter the field name" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Description is required" }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter a brief description of the field"
                />
              </Form.Item>

              <Form.Item
                name="field_type"
                label="Field Type"
                rules={[{ required: true, message: "Field Type is required" }]}
              >
                <Select placeholder="Select the field type">
                  <Option value="Soccer Field">Soccer Field</Option>
                  <Option value="Badminton Field">Badminton Field</Option>
                  <Option value="Basketball Field">Basketball Field</Option>
                  <Option value="Tennis Court">Tennis Court</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input placeholder="Enter the field's address" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price (in Rupiah)"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <Input placeholder="Enter the price" type="number" min={0} />
              </Form.Item>

              <Form.Item
                name="image_url"
                label="Image URL"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input placeholder="Enter a valid image URL" />
              </Form.Item>
            </Form>
          </Drawer>
        </Content>

        <Footer className="footer">
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ListFieldOwnerTest;
