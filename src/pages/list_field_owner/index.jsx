import React, { useState, useEffect } from "react";
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
import bgImage from "../../assets/images/bgnew.jpg";
import SideNavOwner from "../dashboardowner/sidenavowner";
import "./index.css";

const { Title } = Typography;
const { Meta } = Card;
const { Content, Footer } = Layout;
const { Option } = Select;

const ListFieldOwner = () => {
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

  // Fetch data from API
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
        setFields(data.data || []);
      } catch (err) {
        console.error("Error fetching fields:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  // Filter fields based on search and category
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

  const handleDelete = async (id_field) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/list_field/delete/${id_field}`,
        { method: "DELETE" }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData?.message ||
            `Failed to delete field: ${response.statusText}`
        );
      }

      setFields((prevFields) =>
        prevFields.filter((field) => field.id_field !== id_field)
      );
      api.success({ message: "Field deleted successfully" });
    } catch (err) {
      console.error("Error during delete operation:", err);
      api.error({
        message: "Failed to delete field",
        description: err.message || "An unexpected error occurred",
      });
    }
  };

  const handleCreateField = async () => {
    const formData = new FormData();
    Object.keys(form.getFieldsValue()).forEach((key) => {
      formData.append(key, form.getFieldValue(key));
    });

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/list_field/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const resp = await response.json();

      if (resp?.message === "OK") {
        // Notifikasi berhasil
        api.success({ message: "Field created successfully" });

        // Tutup Drawer dan reset form
        handleDrawerClose();

        // Fetch ulang data fields
        const newResponse = await fetch(
          "http://127.0.0.1:5000/api/v1/list_field/read"
        );
        const newData = await newResponse.json();
        setFields(newData.data || []);
      } else {
        // Notifikasi gagal
        api.error({
          message: "Failed to create field",
          description: resp?.message || "Unable to create field",
        });
      }
    } catch (err) {
      console.error("Error creating field:", err);
      api.error({
        message: "Failed to create field",
        description: err.message || "An unexpected error occurred",
      });
    }
  };

  const handleUpdateField = () => {
    const formData = new FormData();
    Object.keys(form.getFieldsValue()).forEach((key) => {
      formData.append(key, form.getFieldValue(key));
    });

    fetch(
      `http://127.0.0.1:5000/api/v1/list_field/update/${selectedField.id_field}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((resp) => {
        console.log("Update Field Response:", resp);
        if (resp?.message === "OK") {
          setFields((prevFields) =>
            prevFields.map((field) =>
              field.id_field === selectedField.id_field ? resp.data : field
            )
          );
          api.success({ message: "Field updated successfully" });
          handleDrawerClose();
          form.resetFields();
        } else {
          api.error({
            message: "Failed to update field",
            description: resp?.message || "Unable to update field",
          });
        }
      })
      .catch((err) => {
        console.error("Error updating field:", err);
        api.error({
          message: "Failed to update field",
          description: err.message || "An unexpected error occurred",
        });
      });
  };

  const handleFormSubmit = () => {
    if (isEdit) {
      handleUpdateField();
    } else {
      handleCreateField();
    }
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
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

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

          <Drawer
            title={isEdit ? "Edit Field" : "Add New Field"}
            width={400}
            onClose={handleDrawerClose}
            open={drawerVisible}
            footer={
              <div
                style={{
                  textAlign: "right",
                }}
              >
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
            <Form
              layout="vertical"
              form={form}
              initialValues={{
                price: 0,
              }}
            >
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

export default ListFieldOwner;