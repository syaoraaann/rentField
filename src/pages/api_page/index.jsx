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
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import SideNav from "../sidenav";
import "./index.css"; // Import the external CSS

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

  // Fetch the gallery data
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

  // Call getDataGallery on component mount
  useEffect(() => {
    getDataGallery();
  }, []);

  // Show alert notification
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

      console.log("Delete response:", resp);

      if (resp.status === 200 || resp.status === 201 || resp.status === 204 || resp.message === "OK") {
        // First, show success alert
        showAlert("success", "Data deleted", "Data berhasil terhapus");

        // Then, refresh the gallery
        setTimeout(() => {
          getDataGallery();
        }, 500);
      } else {
        showAlert("error", "Failed to delete", "Data gagal terhapus");
      }
    }  catch (err) {
      console.error("Error during delete:", err);
      showAlert("error", "Error", "An error occurred while deleting the data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerOpen = () => setIsDrawerVisible(true);
  const handleDrawerClose = () => {
    form.resetFields();
    setIsDrawerVisible(false);
  };

  const handleEdit = (record) => {
    
  };

  const handleFormSubmit = () => {
    // Get values from the form
    let playName = form.getFieldValue("play_name");
    let playGenre = form.getFieldValue("play_genre");
    let playDescription = form.getFieldValue("play_description");
    let playUrl = form.getFieldValue("play_url");
    let playThumbnail = form.getFieldValue("play_thumbnail");

    // Prepare FormData to send
    let formData = new FormData();
    formData.append("play_name", playName);
    formData.append("play_genre", playGenre);
    formData.append("play_description", playDescription);
    formData.append("play_url", playUrl);
    formData.append("play_thumbnail", playThumbnail);

    // Use appropriate API endpoint based on whether it's an edit or new data
    let request = !isEdit
      ? sendDataUTS("/api/playlist/28", formData)
      : sendDataUTS(`/api/playlist/28/${idSelected}`, formData);

    request
      .then((resp) => {
        if (resp?.message === "OK") {
          setIsEdit(false);
          setIdSelected(null);
          showAlert("success", "Data submitted", "Data berhasil disubmit");
          form.resetFields();
          setIsDrawerVisible(false);
          getDataGallery(); // Fetch updated data
        } else {
          showAlert(
            "error",
            "Failed to send data",
            "Tidak dapat mengirim data"
          );
        }
      })
      .catch((err) => {
        setIsEdit(false);
        setIdSelected(null);
        showAlert("error", "Failed to send data", err.toString());
      });
  };

  return (
    <div className="api-page-container">
      {contextHolder}
      <SideNav />
      <div className="api-page-sidenav">
        <Title level={1} className="api-page-title">
          Playlist Gallery
        </Title>
        <Text className="api-page-description">
          Explore your playlists below!
        </Text>

        {/*Search bar*/}
        <Input
          prefix={<SearchOutlined />}
          placeholder="Input search text"
          className="header-search"
          allowClear
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
        />

        {isLoading && <Skeleton active />}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            className="api-page-alert"
          />
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
                  title={item.play_name}
                  bordered={true}
                  cover={<img src={item.play_thumbnail} alt={item.play_name} />}
                  className="api-page-card wider-card"
                  actions={[
                    <Button
                      icon={<EditOutlined />}
                      type="link"
                      onClick={() => handleDrawerOpen()}
                      tooltip="Edit"
                    >
                      Edit
                    </Button>,
                    <Popconfirm
                      title="Are you sure you want to delete this playlist?"
                      onConfirm={() => confirmDelete(item.id_play)} // Use the confirmDelete function
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        type="link"
                        danger
                        tooltip="Delete"
                      >
                        Delete
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <Text strong>Genre:</Text> {item.play_genre} <br />
                  <Text strong>Description:</Text> {item.play_description}{" "}
                  <br />
                  <Text strong>URL:</Text>
                  <a
                    href={item.play_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="api-page-url"
                  >
                    {item.play_url}
                  </a>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          !isLoading && !error && <Text>No data available</Text>
        )}

        {/* Floating Button to Open Drawer */}
        <FloatButton
          type="primary"
          tooltip={<div>Add New Playlist</div>}
          icon={<PlusCircleOutlined />}
          onClick={handleDrawerOpen}
        />

        {/* Drawer with Form */}
        <Drawer
          title="Add New Playlist"
          width={400}
          onClose={handleDrawerClose}
          open={isDrawerVisible}
          footer={
            <Button type="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          }
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              name="play_name"
              label="Play Name"
              rules={[
                { required: true, message: "Please enter the play name" },
              ]}
            >
              <Input placeholder="Enter play name" />
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
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>

            <Form.Item
              name="play_url"
              label="URL"
              rules={[{ required: true, message: "Please enter the URL" }]}
            >
              <Input placeholder="Enter URL" />
            </Form.Item>

            <Form.Item
              name="play_thumbnail"
              label="Thumbnail"
              rules={[
                { required: true, message: "Please provide a thumbnail file" },
              ]}
            >
              <Input placeholder="Enter URL" />
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default ApiPage;
