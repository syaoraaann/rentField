import React, { useState, useEffect } from "react";
import { getDataUTS, sendDataUTS, deleteDataUTS } from "../../utils/apiuts";
import {
  Typography,
  Alert,
  Card,
  List,
  Drawer,
  Form,
  Input,
  Select,
  Button,
  notification,
  Skeleton,
  Popconfirm,
  Tooltip,
  Space,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleFilled,
  MessageOutlined,
  LikeOutlined,
  DownOutlined,
} from "@ant-design/icons";
import SideNav from "../dashboardrenter/sidenav";
import "./index.css";

const { Title, Text } = Typography;
const { Option } = Select;

const ApiPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const getDataGallery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const resp = await getDataUTS("/api/playlist/28");
      if (resp && Array.isArray(resp.datas)) {
        setDataSource(resp.datas);
      } else {
        throw new Error("No data available or incorrect data structure");
      }
    } catch (err) {
      setError(err.message || "Failed to load data");
      console.error("API error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  let dataSourceFiltered = dataSource.filter((item) => {
    const searchMatch =
      item?.play_name?.toLowerCase().includes(searchText) ||
      item?.play_genre?.toLowerCase().includes(searchText) ||
      item?.play_description?.toLowerCase().includes(searchText) ||
      item?.play_url?.toLowerCase().includes(searchText);

    if (filterType === "my") {
      return searchMatch && item.author_name === "User"; // Replace with actual user check
    }
    return searchMatch;
  });

  if (filterType === "newest") {
    dataSourceFiltered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (filterType === "oldest") {
    dataSourceFiltered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  const highlightText = (text, search) => {
    if (!search || !text) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index} className="highlight-text">
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
      style: {
        backgroundColor: "#1f1f1f",
        color: "#ffffff",
      },
    });
  };

  const confirmDelete = async (id_play) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      let url = `/api/playlist/${id_play}`;
      const resp = await deleteDataUTS(url);

      if (
        resp.status === 200 ||
        resp.status === 201 ||
        resp.status === 204 ||
        resp.message === "OK"
      ) {
        showAlert("success", "Success", "Data deleted successfully");
        await getDataGallery();
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (err) {
      showAlert("error", "Error", err.message || "An error occurred while deleting");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerVisible(true);
    setIsEdit(false);
    form.resetFields();
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    setIsEdit(false);
    form.resetFields();
  };

  const handleDrawerEdit = (record) => {
    setIsDrawerVisible(true);
    setIsEdit(true);
    setIdSelected(record?.id_play);
    form.setFieldValue("play_name", record?.play_name);
    form.setFieldValue("play_genre", record?.play_genre);
    form.setFieldValue("play_description", record?.play_description);
    form.setFieldValue("play_url", record?.play_url);
    form.setFieldValue("play_thumbnail", record?.play_thumbnail);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);

      let formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const url = !isEdit
        ? "/api/playlist/28"
        : `/api/playlist/update/${idSelected}`;

      const resp = await sendDataUTS(url, formData);

      if (resp?.message === "OK") {
        showAlert(
          "success",
          "Success",
          isEdit ? "Data updated successfully" : "Data added successfully"
        );

        setIsEdit(false);
        setIdSelected(null);
        form.resetFields();
        setIsDrawerVisible(false);

        await getDataGallery();
      } else {
        throw new Error(resp?.message || "Failed to submit data");
      }
    } catch (err) {
      showAlert("error", "Error", err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (url) => {
    setVideoUrl(url);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setVideoUrl("");
    setIsModalVisible(false);
  };

  const renderCard = (item) => (
    <Card
      className="review-card"
      cover={
        <div className="video-container" onClick={() => openModal(item.play_url)}>
          <img src={item.play_thumbnail} alt={item.play_name} />
          <PlayCircleFilled className="play-icon" />
        </div>
      }
    >
      <Card.Meta
        title={
          <Text className="card-title">
            {highlightText(item.play_name, searchText)}
          </Text>
        }
        description={
          <div className="card-content">
            <div className="category-tag">
              Category: {highlightText(item.play_genre, searchText)}
            </div>
            {item.play_description.length > 80 ? (
              <Tooltip title={item.play_description}>
                <Text className="card-description">
                  {highlightText(
                    truncateText(item.play_description, 40),
                    searchText
                  )}
                </Text>
              </Tooltip>
            ) : (
              <Text className="card-description">
                {highlightText(item.play_description, searchText)}
              </Text>
            )}
            <div className="card-footer">
              
              <Space className="card-actions">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleDrawerEdit(item)}
                />
                <Popconfirm
                  title="Are you sure you want to delete this review?"
                  onConfirm={() => confirmDelete(item.id_play)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{
                    style: { backgroundColor: "#98FB98", color: "#000000" },
                  }}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            </div>
          </div>
        }
      />
    </Card>
  );

  const drawerSection = () => (
    <Drawer
      title={isEdit ? "Edit Review" : "Add New Review"}
      width={400}
      onClose={handleDrawerClose}
      open={isDrawerVisible}
      bodyStyle={{ backgroundColor: "#1f1f1f", color: "#ffffff" }}
      headerStyle={{
        backgroundColor: "#1f1f1f",
        borderBottom: "1px solid #333333",
      }}
      footer={
        <Button
          type="primary"
          onClick={handleFormSubmit}
          loading={isLoading}
          style={{
            backgroundColor: "#98FB98",
            borderColor: "#98FB98",
            color: "#000000",
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
          rules={[{ required: true, message: "Please enter review name" }]}
        >
          <Input placeholder="Enter review name" />
        </Form.Item>
        <Form.Item
          name="play_genre"
          label="Genre"
          rules={[{ required: true, message: "Please select a genre" }]}
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
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          name="play_url"
          label="URL"
          rules={[{ required: true, message: "Please enter URL" }]}
        >
          <Input placeholder="Enter URL" />
        </Form.Item>
        <Form.Item
          name="play_thumbnail"
          label="Thumbnail"
          rules={[{ required: true, message: "Please enter thumbnail URL" }]}
        >
          <Input placeholder="Enter Thumbnail URL" />
        </Form.Item>
      </Form>
    </Drawer>
  );

  return (
    <div className="dark-mode-container">
      {contextHolder}
      <SideNav />
      <div className="main-content">
        <div className="header-section">
          <Title className="page-title">
            Field Reviews
          </Title>
          <Text className="page-description">
            Explore our service review below!
          </Text>
        </div>

        <div className="search-filter-section">
          <Input
            prefix={<SearchOutlined className="search-icon" />}
            placeholder="Input search text"
            className="search-input"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select
            defaultValue="all"
            className="filter-dropdown"
            onChange={handleFilterChange}
            suffixIcon={<DownOutlined />}
          >
            <Option value="all">All</Option>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            className="add-button"
            onClick={handleDrawerOpen}
          >
            Add New Review
          </Button>
        </div>

        {isLoading && (
          <Skeleton active paragraph={{ rows: 3 }} style={{ margin: "2rem" }} />
        )}

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ margin: "2rem" }}
          />
        )}

        {!isLoading && !error && dataSourceFiltered.length === 0 && (
          <Alert
            message="No Data"
            description="No data available."
            type="info"
            showIcon
            style={{ margin: "2rem" }}
          />
        )}

        {!isLoading && !error && dataSourceFiltered.length > 0 && (
          <List
            className="review-list"
            grid={{ gutter: 16, column: 3 }}
            dataSource={dataSourceFiltered}
            renderItem={(item) => <List.Item>{renderCard(item)}</List.Item>}
          />
        )}

        {drawerSection()}

        <Modal
          title="Play Video"
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
          width={800}
        >
          <iframe
            width="100%"
            height="450px"
            src={videoUrl.replace("watch?v=", "embed/")}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal>
        
        <div className="footer-dashboard-renter">
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </div>
      </div>
    </div>
  );
};

export default ApiPage;
