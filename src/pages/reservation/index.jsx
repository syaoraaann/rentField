import React, { useState } from "react";
import {
  Layout,
  Input,
  Select,
  Table,
  Avatar,
  Modal,
  Button,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SideNavOwner from "../dashboardowner/sidenavowner";
import bgImage from "../../assets/images/bgnew.jpg";
import "./index.css";

const { Content, Footer } = Layout;
const { Option } = Select;

const ReservationList = () => {
  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  // Sample reservation data
  const [reservations, setReservations] = useState([
    {
      key: "1",
      name: "John Doe",
      time: "2 hours ago",
      status: "WAITING_CONFIRMATION",
    },
    {
      key: "2",
      name: "Jane Smith",
      time: "1 day ago",
      status: "CONFIRMED",
    },
    {
      key: "3",
      name: "Mike Johnson",
      time: "30 minutes ago",
      status: "WAITING_CONFIRMATION",
    },
    {
      key: "4",
      name: "Sarah Wilson",
      time: "5 days ago",
      status: "COMPLETED",
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

  // Filter reservations based on search query and selected status
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearchQuery = reservation.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (selectedStatus === "all") {
      return matchesSearchQuery;
    }

    return matchesSearchQuery && reservation.status === selectedStatus;
  });

  // Handle button click in the table
  const handleActionClick = (record, action) => {
    setSelectedRecord(record);
    setModalAction(action);
    setModalVisible(true);
  };

  // Handle confirmation in modal
  const handleConfirmAction = () => {
    setReservations((prevReservations) =>
      prevReservations.map((item) => {
        if (item.key === selectedRecord.key) {
          return {
            ...item,
            status: modalAction,
          };
        }
        return item;
      })
    );
    setModalVisible(false);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setModalVisible(false);
  };

  // Get modal content based on action
  const getModalContent = () => {
    switch (modalAction) {
      case "CONFIRMED":
        return "Are you sure you want to confirm this reservation?";
      case "CANCELLED":
        return "Are you sure you want to cancel this reservation?";
      case "COMPLETED":
        return "Are you sure you want to mark this reservation as completed?";
      default:
        return "Are you sure you want to proceed with this action?";
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar style={{ backgroundColor: "#2A2A2A" }} />
          <span style={{ color: "#fff" }}>{text}</span>
        </div>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
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
          case "WAITING_CONFIRMATION":
            color = "#FFD700"; // Yellow
            break;
          case "CONFIRMED":
            color = "#A3FF12"; // Green
            break;
          case "COMPLETED":
            color = "#1890ff"; // Blue
            break;
          case "CANCELLED":
            color = "#ff4d4f"; // Red
            break;
          default:
            color = "#fff";
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        // Different action buttons based on status
        if (record.status === "WAITING_CONFIRMATION") {
          return (
            <Space>
              <Button
                onClick={() => handleActionClick(record, "CONFIRMED")}
                style={{
                  backgroundColor: "#A3FF12",
                  borderColor: "#A3FF12",
                  color: "black",
                  fontWeight: "medium",
                }}
              >
                Confirm
              </Button>
              <Button
                danger
                onClick={() => handleActionClick(record, "CANCELLED")}
              >
                Cancel
              </Button>
            </Space>
          );
        } else if (record.status === "CONFIRMED") {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => handleActionClick(record, "COMPLETED")}
                style={{ fontWeight: "medium" }}
              >
                Complete
              </Button>
              <Button
                danger
                onClick={() => handleActionClick(record, "CANCELLED")}
              >
                Cancel
              </Button>
            </Space>
          );
        }
        return null; // No actions for COMPLETED or CANCELLED status
      },
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SideNavOwner />

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
            Reservation List
          </h1>

          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <Input
              placeholder="Search reservations..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                borderRadius: "8px",
                background: "#2A2A2A",
                color: "#fff",
              }}
            />

            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              style={{
                width: 120,
                borderRadius: "8px",
              }}
              dropdownStyle={{ background: "#2A2A2A" }}
            >
              <Option value="all">All Status</Option>
              <Option value="WAITING_CONFIRMATION">Waiting</Option>
              <Option value="CONFIRMED">Confirmed</Option>
              <Option value="COMPLETED">Completed</Option>
              <Option value="CANCELLED">Cancelled</Option>
            </Select>
          </div>

          <Table
            columns={columns}
            dataSource={filteredReservations}
            pagination={false}
            style={{ background: "transparent" }}
          />

          <Modal
            title={`Confirm Action - ${selectedRecord?.name}`}
            open={modalVisible}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                onClick={handleCancel}
                style={{ borderRadius: "4px" }}
              >
                Back
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleConfirmAction}
                style={{
                  backgroundColor:
                    modalAction === "CANCELLED"
                      ? "#ff4d4f"
                      : modalAction === "COMPLETED"
                      ? "#1890ff"
                      : "#A3FF12",
                  borderColor:
                    modalAction === "CANCELLED"
                      ? "#ff4d4f"
                      : modalAction === "COMPLETED"
                      ? "#1890ff"
                      : "#A3FF12",
                  borderRadius: "4px",
                  color: modalAction === "CONFIRMED" ? "#090909" : "#fff",
                }}
              >
                Confirm
              </Button>,
            ]}
          >
            {getModalContent()}
          </Modal>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "#161616",
            color: "#A3FF12",
            padding: "12px 24px",
            fontWeight: "bold",
          }}
        >
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ReservationList;
