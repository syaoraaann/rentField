import React, { useState, useEffect } from "react";
import { getDataUTS, loadImage } from "../../utils/apiuts";
import { Typography, Spin, Alert, Card, List } from "antd";
import SideNav from "../sidenav";
import "./index.css"; // Import the external CSS

const { Title, Text } = Typography;

const ApiPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDataGallery = () => {
    setIsLoading(true);
    setError(null);

    getDataUTS("/api/playlist/28")
      .then((resp) => {
        console.log("Response data:", resp);
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

  useEffect(() => {
    getDataGallery();
  }, []);

  return (
    <div className="api-page-container">
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
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
            }}
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.play_name}
                  bordered={true}
                  cover={
                    <img
                      alt={item.play_name}
                      src={
                        item.play_thumbnail
                          ? loadImage(item.play_thumbnail)
                          : "https://via.placeholder.com/150"
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  }
                  className="api-page-card"
                >
                  <Text strong>Genre:</Text> {item.play_genre} <br />
                  <Text strong>Description:</Text> {item.play_description}{" "}
                  <br />
                  <Text strong>URL:</Text>{" "}
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
      </div>
    </div>
  );
};

export default ApiPage;
