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
import {
  getDataPrivate,
  deleteDataPrivateJSON,
  sendDataPrivate,
  editDataPrivatePut,
} from "../../utils/api";

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
    getFieldsOwner();
  }, []);

  const getFieldsOwner = () => {
    setLoading(true);
    getDataPrivate("/api/v1/list_field/read")
      .then((resp) => {
        setLoading(false);
        if (resp?.data) {
          setFields(resp?.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleCreateField = () => {
    const formData = new FormData();
    const formValues = form.getFieldsValue();

    // Tambahkan semua field dari form ke formData
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setLoading(true);

    sendDataPrivate("/api/v1/list_field/create", formData)
      .then((resp) => {
        const isSuccess =
          resp?.message === "OK" || // Pesan "OK"
          (resp?.status >= 200 && resp?.status < 300) || // Status HTTP sukses
          resp?.message?.toLowerCase().includes("success") || // Variasi pesan sukses
          resp?.data || // Jika ada data
          (typeof resp === "object" && Object.keys(resp).length > 0); // Respon valid

        if (isSuccess) {
          // Jika berhasil
          setIsEdit(false);
          setSelectedField(null);
          notification.success({
            message: "Success",
            description: "Field created successfully.",
          });
          form.resetFields();
          setDrawerVisible(false);
          getFieldsOwner(); // Memperbarui daftar field
        } else {
          // Jika gagal
          notification.error({
            message: "Failed to create field",
            description: "Tidak dapat membuat field baru.",
          });
        }
      })
      .catch((err) => {
        // Tangani kesalahan
        notification.error({
          message: "Failed to create field",
          description: err?.message || "An unexpected error occurred.",
        });
      })
      .finally(() => {
        // Selesai, hapus status loading
        setLoading(false);
      });
  };

  const handleUpdateField = () => {
    setLoading(true);

    // Mengambil nilai dari form
    const formData = form.getFieldsValue();

    // Menangani update data menggunakan API
    editDataPrivatePut(
      `/api/v1/list_field/update/${selectedField.id_field}`,
      formData
    )
      .then((resp) => {
        // Validasi respon sukses
        const isSuccess =
          resp?.message === "OK" || // Pesan "OK"
          (resp?.status >= 200 && resp?.status < 300) || // Status HTTP sukses
          resp?.message?.toLowerCase().includes("success") || // Variasi pesan sukses
          resp?.data || // Jika ada data
          (typeof resp === "object" && Object.keys(resp).length > 0); // Respon valid

        if (isSuccess) {
          notification.success({
            message: "Success",
            description: "Field updated successfully.",
          });

          // Reset form dan tutup drawer
          form.resetFields();
          handleDrawerClose();

          // Memperbarui daftar field
          getFieldsOwner();
        } else {
          notification.error({
            message: "Failed to update field",
            description: resp?.message || "Unable to update field.",
          });
        }
      })
      .catch((err) => {
        // Menangani error
        console.error("Error updating field:", err);
        notification.error({
          message: "Failed to update field",
          description: err?.message || "An unexpected error occurred.",
        });
      })
      .finally(() => {
        // Hapus status loading
        setLoading(false);
      });
  };

  const handleDelete = (id_field) => {
    setLoading(true);
    deleteDataPrivateJSON(`/api/v1/list_field/delete/${id_field}`)
      .then((resp) => {
        api.success({ message: "Field deleted successfully" });
        // Refresh or update the fields list
        setFields((prevFields) =>
          prevFields.filter((field) => field.id_field !== id_field)
        );
      })
      .catch((err) => {
        console.error("Error during delete operation:", err);
        api.error({
          message: "Failed to delete field",
          description: err.message || "An unexpected error occurred",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
    setIsEdit(false);
  };

  const handleDrawerClose = () => {
    if (isEdit) {
      form.resetFields();
    }
    setDrawerVisible(false);
    setSelectedField(null);
  };

  const handleFormSubmit = () => {
    if (isEdit) {
      handleUpdateField();
    } else {
      handleCreateField();
    }
  };
  
  const handleDrawerEdit = (field) => {
    setSelectedField(field);
    setIsEdit(true);
    form.setFieldsValue({
      field_name: field.field_name,
      description: field.description,
      field_type: field.field_type,
      address: field.address,
      price: field.price,
      image_url: field.image_url,
    });
    setDrawerVisible(true);
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
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined style={{ color: "#d9d9d9", paddingLeft: "10px", paddingRight: "10px" }} />}
              />
            </Col>
            <Col>
              <Select
                className="category-select"
                placeholder="Select Category"
                onChange={setSelectedCategory}
                value={selectedCategory}
                dropdownStyle={{ background: "#2A2A2A" }}
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
                      onClick={() => handleDrawerEdit(field)}
                      style={{color: "#d9d9d9"}}
                    />,
                    <Popconfirm
                      key="delete"
                      title="Are you sure you want to delete this field?"
                      onConfirm={() => handleDelete(field.id_field)}
                      okText="Yes"
                      cancelText="No"
                
                    >
                      <DeleteOutlined style={{color: "red"}}/>
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
            icon={<PlusCircleOutlined style={{color: "#090909"}}/>}
            type=""
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
                <Button style={{backgroundColor: "#abfd13", color: "#090909"}} type="primary" onClick={handleFormSubmit}>
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
                label={<span style={{ color: "#d9d9d9" }}>Field Name</span>}
                rules={[{ required: true, message: "Field Name is required" }]}
              >
                <Input placeholder="Enter the field name" />
              </Form.Item>

              <Form.Item
                name="description"
                label={<span style={{ color: "#d9d9d9" }}>Description</span>}
                rules={[{ required: true, message: "Description is required" }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter a brief description of the field"
                />
              </Form.Item>

              <Form.Item
                name="field_type"
                label={<span style={{ color: "#d9d9d9" }}>Field Type</span>}
                rules={[{ required: true, message: "Field Type is required" }]}
              >
                <Select placeholder="Select the field type" dropdownStyle={{ background: "#2A2A2A" }}>
                  <Option value="Soccer Field">Soccer Field</Option>
                  <Option value="Badminton Field">Badminton Field</Option>
                  <Option value="Basketball Field">Basketball Field</Option>
                  <Option value="Tennis Court">Tennis Court</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="address"
                label={<span style={{ color: "#d9d9d9" }}>Address</span>}
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input placeholder="Enter the field's address" />
              </Form.Item>

              <Form.Item
                name="price"
                label={<span style={{ color: "#d9d9d9" }}>Price in Rupiah </span>}
                rules={[{ required: true, message: "Price is required" }]}
              >
                <Input placeholder="Enter the price" type="number" min={0} />
              </Form.Item>

              <Form.Item
                name="image_url"
                label={<span style={{ color: "#d9d9d9" }}>Image URL</span>}
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input placeholder="Enter a valid image URL" />
              </Form.Item>
            </Form>
          </Drawer>
        </Content>

        <Footer className="footer-field-owner">
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ListFieldOwner;
