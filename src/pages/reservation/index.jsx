import React, { useState, useMemo } from "react";
import {
  Layout,
  Input,
  Select,
  Table,
  Avatar,
  Modal,
  Button,
  Space,
  Form,
  Card,
} from "antd";
import { SearchOutlined, WalletOutlined } from "@ant-design/icons";
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
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawForm] = Form.useForm();

  // Sample reservation data with income
  const [reservations, setReservations] = useState([
    {
      key: "1",
      name: "John Doe",
      time: "2 hours ago",
      status: "WAITING_CONFIRMATION",
      income: "Rp. 100,000",
      incomeValue: 100000, // Added numeric value for calculations
    },
    {
      key: "2",
      name: "Jane Smith",
      time: "1 day ago",
      status: "CONFIRMED",
      income: "Rp. 100,000",
      incomeValue: 100000,
    },
    {
      key: "3",
      name: "Mike Johnson",
      time: "30 minutes ago",
      status: "WAITING_CONFIRMATION",
      income: "Rp. 100,000",
      incomeValue: 100000,
    },
    {
      key: "4",
      name: "Sarah Wilson",
      time: "5 days ago",
      status: "COMPLETED",
      income: "Rp. 100,000",
      incomeValue: 100000,
      isWithdrawn: false,
    },
  ]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Calculate total income using useMemo for better performance
  const totalIncome = useMemo(() => {
    return reservations.reduce((sum, reservation) => sum + reservation.incomeValue, 0);
  }, [reservations]);

  // Format number to currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  // Handle withdrawal button click
  const handleWithdrawClick = (record) => {
    setSelectedRecord(record);
    setWithdrawModalVisible(true);
    withdrawForm.resetFields();
  };

  // Handle confirmation in action modal
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

  // Handle withdrawal form submission
  const handleWithdrawSubmit = (values) => {
    setReservations((prevReservations) =>
      prevReservations.map((item) => {
        if (item.key === selectedRecord.key) {
          return {
            ...item,
            isWithdrawn: true,
            withdrawalDetails: values,
          };
        }
        return item;
      })
    );
    setWithdrawModalVisible(false);
    withdrawForm.resetFields();
  };

  // Handle modal cancels
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleWithdrawCancel = () => {
    setWithdrawModalVisible(false);
    withdrawForm.resetFields();
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
      title: "Income",
      dataIndex: "income",
      key: "income",
      render: (text) => <span style={{ color: "#A3FF12" }}>{text}</span>,
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
            color = "#FFD700";
            break;
          case "CONFIRMED":
            color = "#A3FF12";
            break;
          case "COMPLETED":
            color = "#1890ff";
            break;
          case "CANCELLED":
            color = "#ff4d4f";
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
        } else if (record.status === "COMPLETED" && !record.isWithdrawn) {
          return (
            <Button
              type="primary"
              onClick={() => handleWithdrawClick(record)}
              style={{
                backgroundColor: "#A3FF12",
                borderColor: "#A3FF12",
                color: "black",
                fontWeight: "medium",
              }}
            >
              Withdraw
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <Layout
      className="reslis-layout"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SideNavOwner />

      <Layout className="reslis-inner-layout" style={{ marginLeft: 256, background: "transparent" }}>
        <Content className="reslis-content" style={{ padding: "24px", background: "transparent" }}>
          <h1
            className="reslis-title"
            style={{
              color: "#A3FF12",
              fontSize: "40px",
              marginBottom: "24px",
              fontWeight: "bold",
            }}
          >
            Reservation List
          </h1>

          <div className="reslis-search-container" style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <Input
              className="reslis-search-input"
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
              className="reslis-status-select"
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

          {/* Total Income Card */}
          <Card
            className="reslis-total-income"
            style={{
              background: "#161616",
              border: "1px solid #ABFD13",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <WalletOutlined style={{ fontSize: "24px", color: "#ABFD13" }} />
              <div>
                <h3 style={{ color: "#fff", margin: 0, fontSize: "16px" }}>Total Income</h3>
                <span style={{ 
                  color: "#ABFD13", 
                  fontSize: "24px", 
                  fontWeight: "bold",
                  display: "block",
                  marginTop: "4px"
                }}>
                  {formatCurrency(totalIncome)}
                </span>
              </div>
            </div>
          </Card>

          <Table
            className="reslis-table"
            columns={columns}
            dataSource={filteredReservations}
            pagination={false}
            style={{ background: "transparent" }}
          />

          {/* Action Confirmation Modal */}
          <Modal
            className="reslis-modal"
            title={`Confirm Action - ${selectedRecord?.name}`}
            open={modalVisible}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                className="reslis-modal-button"
                onClick={handleCancel}
                style={{ borderRadius: "4px" }}
              >
                Back
              </Button>,
              <Button
                key="submit"
                className="reslis-modal-button-primary"
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

          {/* Withdrawal Form Modal */}
          <Modal
            className="reslis-withdraw-modal"
            title="Withdrawal Form"
            open={withdrawModalVisible}
            onCancel={handleWithdrawCancel}
            footer={null}
          >
            <Form
              className="reslis-withdraw-form"
              form={withdrawForm}
              layout="vertical"
              onFinish={handleWithdrawSubmit}
            >
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input className="reslis-form-input" placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                name="whatsappNumber"
                label="WhatsApp Number (Ex: 08123456789)"
                rules={[
                  { required: true, message: "Please enter your WhatsApp number" },
                  {
                    pattern: /^\d+$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input className="reslis-form-input" placeholder="Enter your WhatsApp number" />
              </Form.Item>

              <Form.Item
                name="bankName"
                label="Bank Name (Ex: Bank Rakyat Indonesia/Bank Central Asia/Bank Mandiri)"
                rules={[{ required: true, message: "Please enter your bank name" }]}
              >
                <Input className="reslis-form-input" placeholder="Enter your bank name" />
              </Form.Item>

              <Form.Item
                name="bankAccountNumber"
                label="Bank Account Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your bank account number",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Please enter a valid bank account number",
                  },
                ]}
              >
                <Input className="reslis-form-input" placeholder="Enter your bank account number" />
              </Form.Item>

              <Form.Item className="reslis-form-buttons">
                <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                  <Button className="reslis-cancel-button" onClick={handleWithdrawCancel}>
                    Cancel
                  </Button>
                  <Button
                    className="reslis-submit-button"
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#A3FF12",
                      borderColor: "#A3FF12",
                      color: "black",
                    }}
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </Content>

        <Footer
          className="reslis-footer"
          style={{
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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