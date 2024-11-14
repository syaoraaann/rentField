import React, { useState, useEffect } from "react";
import { getDataUTS, sendDataUTS } from "../../utils/apiuts";
import {
  Typography,
  Spin,
  Alert,
  Card,
  List,
  Drawer,
  Form,
  Input,
  Button,
  notification,
  FloatButton,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import SideNav from "../sidenav";
import "./index.css"; // Import the external CSS

const { Title, Text } = Typography;

const ApiPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  // Fetch the gallery data
  const getDataGallery = () => {
    setIsLoading(true);
    setError(null);

    getDataUTS("/api/playlist/28")
      .then((resp) => {
        setIsLoading(false);
        if (resp && Array.isArray(resp.datas)) {
          setDataSource(resp.datas);
        } else {
          setError("No data available or incorrect data structure");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Failed to load data");
        console.error("API error:", err);
      });
  };

  // Call getDataGallery on component mount
  useEffect(() => {
    getDataGallery();
  }, []);

  const handleDrawerOpen = () => setIsDrawerVisible(true);
  const handleDrawerClose = () => {
    form.resetFields();
    setIsDrawerVisible(false);
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
          api.success({
            message: "Success",
            description: "Data successfully added!",
          });
          form.resetFields();
          setIsDrawerVisible(false);
          getDataGallery(); // Fetch updated data
        } else {
          api.error({
            message: "Failed to send data",
            description: "Cannot send data",
          });
        }
      })
      .catch((err) => {
        setIsEdit(false);
        setIdSelected(null);
        api.error({
          message: "Failed to send data",
          description: err.toString(),
        });
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

        {isLoading && <Spin className="api-page-spinner" />}
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
              gutter: 8,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
            }}
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.play_name}
                  bordered={true}
                  cover={<img src={item.play_thumbnail} alt={item.play_name} />}
                  className="api-page-card wider-card"
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
              rules={[{ required: true, message: "Please enter the genre" }]}
            >
              <Input placeholder="Enter genre" />
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
              label="Thumbnail URL"
              rules={[
                { required: true, message: "Please enter the thumbnail URL" },
              ]}
            >
              <Input placeholder="Enter URL Thumbnail" />
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default ApiPage;
