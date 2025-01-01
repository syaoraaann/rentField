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
  FloatButton,
  Skeleton,
  Popconfirm,
  Tooltip,
  Dropdown,
  Space,
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

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  let dataSourceFiltered = dataSource.filter((item) => {
    const searchMatch = 
      item?.play_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.play_genre?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.play_description?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.play_url?.toLowerCase().includes(searchText.toLowerCase());

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
        backgroundColor: '#1f1f1f',
        color: '#ffffff'
      }
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
    form.setFieldsValue({
      play_name: record?.play_name,
      play_genre: record?.play_genre,
      play_description: record?.play_description,
      play_url: record?.play_url,
      play_thumbnail: record?.play_thumbnail,
    });
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
        showAlert("success", "Success", isEdit ? "Data updated successfully" : "Data added successfully");
        handleDrawerClose();
        getDataGallery();
      } else {
        throw new Error(resp?.message || "Failed to submit data");
      }
    } catch (err) {
      showAlert("error", "Error", err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Review' },
    { value: 'my', label: 'My Review' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const renderCard = (item) => (
    <Card
      className="review-card"
      cover={
        <div className="video-container">
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
            <Text className="card-description">
              {highlightText(truncateText(item.play_description, 100), searchText)}
            </Text>
            <div className="card-footer">
              <Space className="card-stats">
                <span><MessageOutlined /> {item.comments || 18}</span>
                <span><LikeOutlined /> {item.likes || 137}</span>
              </Space>
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
                  okButtonProps={{ style: { backgroundColor: '#98FB98', color: '#000000' } }}
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
      bodyStyle={{ backgroundColor: '#1f1f1f', color: '#ffffff' }}
      headerStyle={{ backgroundColor: '#1f1f1f', borderBottom: '1px solid #333333' }}
      footer={
        <Button
          type="primary"
          onClick={handleFormSubmit}
          loading={isLoading}
          style={{
            backgroundColor: '#98FB98',
            borderColor: '#98FB98',
            color: '#000000'
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
          rules={[{ required: true, message: 'Please enter review name' }]}
        >
          <Input placeholder="Enter review name" />
        </Form.Item>
        <Form.Item
          name="play_genre"
          label="Genre"
          rules={[{ required: true, message: 'Please select a genre' }]}
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
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          name="play_url"
          label="URL"
          rules={[{ required: true, message: 'Please enter URL' }]}
        >
          <Input placeholder="Enter URL" />
        </Form.Item>
        <Form.Item
          name="play_thumbnail"
          label="Thumbnail"
          rules={[{ required: true, message: 'Please enter thumbnail URL' }]}
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
          <Title level={1} className="page-title">
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
          <div className="filter-buttons">
            <Select
              defaultValue="all"
              className="filter-select"
              onChange={handleFilterChange}
              suffixIcon={<DownOutlined />}
            >
              {filterOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Button 
              type="primary" 
              className="add-review-button"
              onClick={handleDrawerOpen}
              icon={<PlusCircleOutlined />}
            >
              Add Review
            </Button>
          </div>
        </div>

        {isLoading && <Skeleton active className="custom-skeleton" />}
        {error && (
          <Alert 
            message="Error" 
            description={error} 
            type="error" 
            showIcon 
            className="error-alert"
          />
        )}

        {!isLoading && !error && (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={dataSourceFiltered}
            renderItem={(item) => (
              <List.Item>
                {renderCard(item)}
              </List.Item>
            )}
          />
        )}
      </div>
      {drawerSection()}
    </div>
  );
};

export default ApiPage;