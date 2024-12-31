import React, { useState, useEffect } from "react";
import { getDataUTS, sendDataUTS, deleteDataUTS } from "../../utils/apiuts";
import {
  Typography,
  Alert,
  Layout,
  Card,
  List,
  Drawer,
  Form,
  Input,
  Select,
  Button,
  notification,
  FloatButton,
  Skeleton,
  Popconfirm,
  Tooltip,
  Row, Col
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import SideNavOwner from "../dashboardowner/sidenavowner";
import "./index.css"; // Import the external CSS

const { Title, Text } = Typography;
const { Option } = Select;

const ListFieldowner = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const getDataGallery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const resp = await getDataUTS("/api/playlist/28");
      setIsLoading(false);
      if (resp && Array.isArray(resp.datas)) {
        setDataSource(resp.datas);
      } else {
        setError("No data available or incorrect data structure");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Failed to load data");
      console.error("API error:", err);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  let dataSourceFiltered = dataSource.filter((item) => {
    return (
      item?.play_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.play_genre?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.play_description
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item?.play_url?.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const highlightText = (text, search) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    getDataGallery();
  }, []);

  const showAlert = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const confirmDelete = async (id_play) => {
    try {
      let url = `/api/playlist/${id_play}`;
      const resp = await deleteDataUTS(url);

      if (
        resp.status === 200 ||
        resp.status === 201 ||
        resp.status === 204 ||
        resp.message === "OK"
      ) {
        showAlert("success", "Data deleted", "Data berhasil terhapus");
        setTimeout(() => {
          getDataGallery();
        }, 500);
      } else {
        showAlert("error", "Failed to delete", "Data gagal terhapus");
      }
    } catch (err) {
      showAlert("error", "Error", "An error occurred while deleting the data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerVisible(true);
    setIsEdit(false);
  };

  const handleDrawerClose = () => {
    if (isEdit) {
      form.resetFields();
    }
    setIsDrawerVisible(false);
  };

  //Handle drawer when we edit data
  const handleDrawerEdit = (record) => {
    setIsDrawerVisible(true);
    setIsEdit(true);
    setIdSelected(record?.id_play);
    form.setFieldsValue({
      play_name: record?.play_name,
      play_genre: record?.play_genre,
      play_description: record?.play_description,
      play_url: record?.play_url,
      play_thumbnail: record?.play_thumbnail,
    });
  };

  //Handle form submit
  const handleFormSubmit = () => {
    let formData = new FormData();
    Object.keys(form.getFieldsValue()).forEach((key) => {
      formData.append(key, form.getFieldValue(key));
    });

    let request = !isEdit
      ? sendDataUTS("/api/playlist/28", formData)
      : sendDataUTS(`/api/playlist/update/${idSelected}`, formData);

    request
      .then((resp) => {
        if (resp?.message === "OK") {
          setIsEdit(false);
          setIdSelected(null);
          showAlert("success", "Data submitted", "Data berhasil disubmit");
          form.resetFields();
          setIsDrawerVisible(false);
          getDataGallery();
        } else {
          showAlert(
            "error",
            "Failed to send data",
            "Tidak dapat mengirim data"
          );
        }
      })
      .catch((err) => {
        showAlert("error", "Failed to send data", err.toString());
      });
  };

  const drawerSection = () => {
    return (
      <Drawer
        title={isEdit ? "Edit Review" : "Add New Review"}
        width={400}
        onClose={handleDrawerClose}
        open={isDrawerVisible}
        footer={
          <Button
            type="primary"
            onClick={handleFormSubmit}
            style={{
              backgroundColor: isEdit ? "green" : "blue",
              borderColor: isEdit ? "green" : "blue",
            }}
          >
            {isEdit ? "Update" : "Submit"}
          </Button>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="play_name"
            label="Review Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter review name" />
          </Form.Item>
          <Form.Item
            name="play_genre"
            label="Genre"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a genre">
              <Option value="education">Education</Option>
              <Option value="movie">Movie</Option>
              <Option value="music">Music</Option>
              <Option value="song">Song</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="play_description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item name="play_url" label="URL" rules={[{ required: true }]}>
            <Input placeholder="Enter URL" />
          </Form.Item>
          <Form.Item
            name="play_thumbnail"
            label="Thumbnail"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Thumbnail URL" />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  return (
    <Layout className="api-page-container">
      {contextHolder}
      <SideNavOwner />
      <div className="api-page-sidenav">
        <Title level={1} className="api-page-title">
          My Field
        </Title>
        <Row>
            <Input
                prefix={<SearchOutlined />}
                placeholder="Input search text"
                allowClear
                // size="large"
                className="search-feature"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Col style={{paddingLeft: "20px"}}>
                <Select
                    placeholder="Select Category"
                    // onChange={setSelectedCategory}
                    style={{
                    width: 200,
                    height: 71,
                    color: "#090909",
                    paddingBottom: 22,
                    }}
                    dropdownStyle={{
                    backgroundColor: "#090909",
                    }}
                    // value={selectedCategory}
                >
                    <Option
                    value=""
                    style={{ backgroundColor: "#090909", color: "#fff" }}
                    >
                    All Categories
                    </Option>
                    <Option
                    value="Soccer Field"
                    style={{ backgroundColor: "#090909", color: "#fff" }}
                    >
                    Soccer Field
                    </Option>
                    <Option
                    value="Badminton Field"
                    style={{ backgroundColor: "#090909", color: "#fff" }}
                    >
                    Badminton Field
                    </Option>
                    <Option
                    value="Basketball Field"
                    style={{ backgroundColor: "#090909", color: "#fff" }}
                    >
                    Basketball Field
                    </Option>
                </Select>
            </Col>
        </Row>
        
        {isLoading && <Skeleton active />}
        {error && (
          <Alert message="Error" description={error} type="error" showIcon />
        )}

        {!isLoading && !error && dataSource.length > 0 ? (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 3,
            }}
            dataSource={dataSourceFiltered}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={
                    <span className="card-title">
                      {highlightText(
                        truncateText(item.play_name, 30),
                        searchText
                      )}
                    </span>
                  }
                  bordered={true}
                  cover={<img src={item.play_thumbnail} alt={item.play_name} />}
                  className="api-page-card wider-card"
                  actions={[
                    <Button
                      icon={<EditOutlined />}
                      type="link"
                      onClick={() => handleDrawerEdit(item)}
                    >
                      Edit
                    </Button>,
                    <Popconfirm
                      title="Are you sure you want to delete this playlist?"
                      onConfirm={() => confirmDelete(item.id_play)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon={<DeleteOutlined />} type="link" danger>
                        Delete
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <Text strong>Genre:</Text>{" "}
                  {highlightText(item.play_genre, searchText)} <br />
                  <Text strong>Description:</Text>{" "}
                  {item.play_description.length > 40 ? (
                    <Tooltip title={item.play_description}>
                      <span className="card-description">
                        {highlightText(
                          truncateText(item.play_description, 40),
                          searchText
                        )}
                      </span>
                    </Tooltip>
                  ) : (
                    <span className="card-description">
                      {highlightText(item.play_description, searchText)}
                    </span>
                  )}
                  <br />
                  <Text strong>URL:</Text>{" "}
                  <a
                    href={item.play_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-url"
                  >
                    {highlightText(truncateText(item.play_url, 50), searchText)}
                  </a>
                  <DeleteOutlined
                    style={{ color: "red", marginTop: 10, cursor: "pointer" }}
                    onClick={() => deleteDataUTS(item.id)}
                  />
                </Card>
              </List.Item>
            )}
          />
        ) : null}
      </div>
      <FloatButton
        icon={<PlusCircleOutlined />}
        type="primary"
        onClick={handleDrawerOpen}
        className="floating-button"
      />
      {drawerSection()}
    </Layout>
  );
};

export default ListFieldowner;
