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
  Layout,
  Row,
  Modal,
  Dropdown,
  Space,
  Menu
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  PlayCircleFilled,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import SideNav from "../dashboardrenter/sidenav";
import "./index.css"; // Import the external CSS
import bgImage from "../../assets/images/bgnew.jpg";

const { Title, Text } = Typography;
const { Option } = Select;
const { Content, Footer } = Layout;

const handleFilterChange = (key) => {
  setFilterType(key);
  console.log("Selected filter:", key);
};

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

  const menuProps = {
    items: [
      {
        label: 'All',
        key: 'all',
        onClick: () => handleFilterChange('all'),
      },
      {
        label: 'Newest',
        key: 'newest',
        onClick: () => handleFilterChange('newest'),
      },
      {
        label: 'Oldest',
        key: 'oldest',
        onClick: () => handleFilterChange('oldest'),
      },
    ],
  };

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

  const handleFilterChange = (value) => {
    setFilterType(value);
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
      className="api-page-card wider-card"
      cover={
        <div className="video-container" onClick={() => openModal(item.play_url)}>
          <img src={item.play_thumbnail} alt={item.play_name} />
          <PlayCircleFilled className="play-icon" />
        </div>
      }
    >
      <Card.Meta
        title={
          <Text className="card-title-vid-rev">
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
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`, // Set background image
        backgroundSize: "cover", // Ensure the image covers the entire screen
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent repeating the image
      }}
    >
      <div className="api-page-container">
        {contextHolder}
        <SideNav />
        <div className="api-page-sidenav">
          <Title level={1} className="api-page-title">
            Review Field
          </Title>
          <Text className="api-page-description">
            Explore our service reviews below!
          </Text>
          <Input
            prefix={<SearchOutlined style={{paddingRight: "10px", paddingLeft: "10px"}}/>}
            placeholder="Input search text"
            allowClear
            size="large"
            onChange={(e) => handleSearch(e.target.value)}
            className="search-vid-rev"
          />
          <Row style={{display: "flex", flexDirection: "row", justifyContent: "end"}}>
            <div style={{paddingRight: "15px"}}>
              <Dropdown menu={menuProps} trigger={['click']} className="dropdown-vid-rev">
                <Button>
                  <Space>
                    {filterType === "all" ? "All" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    <DownOutlined style={{paddingLeft: "10px"}}/>
                  </Space>
                </Button>
              </Dropdown>
              {/* <Select
                defaultValue="all"
                className="filter-dropdown"
                onChange={handleFilterChange}
                suffixIcon={<DownOutlined />}
              >
                <Option value="all">All</Option>
                <Option value="newest">Newest</Option>
                <Option value="oldest">Oldest</Option>
              </Select>   */}
            </div>
            <Button
            type="primary"
            className="add-button"
            onClick={handleDrawerOpen}
            >
              Add Review
            </Button>
          </Row>

          {isLoading && <Skeleton active />}
          {error && (
            <Alert message="Error" description={error} type="error" showIcon />
          )}

          {/* {!isLoading && !error && dataSource.length > 0 ? (
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
                      <span className="card-title-vid-rev">
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
                    <Text strong className="card-dsc-vid-rev">Genre:</Text>{" "}
                    {highlightText(item.play_genre, searchText)} <br />
                    <Text strong className="card-dsc-vid-rev">Description:</Text>{" "}
                    {item.play_description.length > 40 ? (
                      <Tooltip title={item.play_description}>
                        <span className="card-description-vid-rev">
                          {highlightText(
                            truncateText(item.play_description, 40),
                            searchText
                          )}
                        </span>
                      </Tooltip>
                    ) : (
                      <span className="card-description-vid-rev">
                        {highlightText(item.play_description, searchText)}
                      </span>
                    )}
                    <br />
                    <Text strong className="card-dsc-vid-rev">URL:</Text>{" "}
                    <a
                      href={item.play_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-url"
                    >
                      {highlightText(truncateText(item.play_url, 50), searchText)}
                    </a>
                    <DeleteOutlined
                      style={{ color: "red", marginTop: 10, cursor: "pointer"}}
                      onClick={() => deleteDataUTS(item.id)}
                    />
                  </Card>
                </List.Item>
              )}
            />
          ) : null} */}
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
        </div>
        <FloatButton
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={handleDrawerOpen}
          className="floating-button"
        />
        {drawerSection()}
      </div>

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

      <Footer className="footer-vid-rev">
        Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
        Pendidikan Ganesha
      </Footer>
    </Layout>
  );
};

export default ApiPage;
