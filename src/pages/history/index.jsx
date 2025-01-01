import React, { useState } from "react";
import { Layout, Input, Select, Table, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SideNavRenter from "../dashboardrenter/sidenav";
import bgImage from "../../assets/images/bgnew.jpg";
import "./index.css";

const { Content, Footer } = Layout;
const { Option } = Select;

const History = () => {
  // Sample history data
  const [histories, setHistories] = useState([
    {
      key: "1",
      fieldName: "Field A",
      date: "2024-01-01",
      status: "UPCOMING",
    },
    {
      key: "2",
      fieldName: "Field B",
      date: "2023-12-31",
      status: "ONGOING",
    },
    {
      key: "3",
      fieldName: "Field C",
      date: "2024-01-02",
      status: "WAITING_CONFIRMATION",
    },
    {
      key: "4",
      fieldName: "Field D",
      date: "2023-12-30",
      status: "FINISHED",
    },
    {
      key: "5",
      fieldName: "Field E",
      date: "2023-12-29",
      status: "CANCELED",
    },
  ]);

  // State for search query and selected status
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle status change in dropdown
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  // Filter histories based on search query and selected status
  const filteredHistories = histories.filter((history) => {
    const matchesSearchQuery = history.fieldName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (selectedStatus === "all") {
      return matchesSearchQuery;
    }

    return matchesSearchQuery && history.status === selectedStatus;
  });

  // Table columns configuration
  const columns = [
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar style={{ backgroundColor: "#2A2A2A" }} />
          <span style={{ color: "#fff" }}>{text}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span style={{ color: "#fff" }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let text = status.replace(/_/g, " ").toLowerCase();
        text = text.charAt(0).toUpperCase() + text.slice(1);

        switch (status) {
          case "UPCOMING":
            color = "#87CEEB"; // Light Blue
            break;
          case "ONGOING":
            color = "#32CD32"; // Lime Green
            break;
          case "FINISHED":
            color = "#1890ff"; // Blue
            break;
          case "WAITING_CONFIRMATION":
            color = "#FFD700"; // Yellow
            break;
          case "CANCELED":
            color = "#ff4d4f"; // Red
            break;
          default:
            color = "#fff";
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`, // Set background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SideNavRenter />

      <Layout style={{ marginLeft: 256, background: "transparent" }}>
        <Content style={{ padding: "24px", background: "transparent" }}>
          <h1
            style={{
              color: "#A3FF12",
              fontSize: "40px",
              marginBottom: "24px",
              fontWeight: "bold",
            }}
          >
            My History
          </h1>

          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <Input
              placeholder="Search history..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                height: "55px",
                borderRadius: "8px",
                background: "#2A2A2A",
                color: "#fff",
                fontSize: "14px",
              }}
            />

            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              style={{
                width: 120,
                height: "55px",
                borderRadius: "8px",
                background: "#2A2A2A",
                color: "#A3FF12",
                fontSize: "14px",
              }}
              dropdownStyle={{ background: "#2A2A2A" }}
            >
              <Option value="all">All Status</Option>
              <Option value="UPCOMING">Upcoming</Option>
              <Option value="ONGOING">Ongoing</Option>
              <Option value="FINISHED">Finished</Option>
              <Option value="WAITING_CONFIRMATION">Waiting Confirmation</Option>
              <Option value="CANCELED">Canceled</Option>
            </Select>
          </div>

          <Table
            columns={columns}
            dataSource={filteredHistories}
            pagination={false}
            style={{ background: "transparent" }}
          />
        </Content>

        <Footer className="footer">
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default History;
