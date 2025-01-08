import React, { useState, useEffect } from "react";
import { Layout, Table, Card, Input, Select } from "antd";
import { SearchOutlined, WalletOutlined } from "@ant-design/icons";
import SideNav from "../dashboardrenter/sidenav";
import bgImage from "../../assets/images/bgnew.jpg";
import { getDataPrivate } from "../../utils/api";
import "./index.css";

const { Content, Footer } = Layout;
const { Option } = Select;

const History = () => {
  const [dataSources, setDataSources] = useState([]); // Data untuk tabel
  const [loading, setLoading] = useState(false); // Indikator loading
  const [searchQuery, setSearchQuery] = useState(""); // Pencarian
  const [selectedStatus, setSelectedStatus] = useState("all"); // Filter status

  // Mengambil data booking
  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = async () => {
    setLoading(true);
    try {
      const resp = await getDataPrivate("/api/v1/booking/read");
      setLoading(false);

      if (Array.isArray(resp)) {
        setDataSources(resp); // Set data jika respons berbentuk array
      } else {
        console.error("Unexpected API response format:", resp);
        setDataSources([]);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  // Filter data berdasarkan pencarian dan status
  const filteredHistories = dataSources.filter((history) => {
    const fieldName = history.field_name?.toLowerCase() || ""; // Avoid crash if field_name is undefined
    const matchesSearchQuery = fieldName.includes(searchQuery.toLowerCase());

    if (selectedStatus === "all") {
      return matchesSearchQuery;
    }

    return matchesSearchQuery && history.status === selectedStatus;
  });

  // Konfigurasi kolom tabel
  const columns = [
    {
      title: "Booking Date",
      dataIndex: "booking_date",
      key: "booking_date",
    },
    {
      title: "Field Name",
      dataIndex: "field_name",
      key: "field_name",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
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
      <SideNav />
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

          {/* Bagian Filter dan Pencarian */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <Input
              placeholder="Search history..."
              prefix={
                <SearchOutlined
                  style={{ color: "#d9d9d9", paddingRight: "10px" }}
                />
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="custom-input-history"
            />

            <Select
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
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

          {/* Bagian Total Reservations */}
          <div style={{ display: "flex", marginBottom: "24px" }}>
            <Card
              style={{
                background: "#161616",
                border: "1px solid #ABFD13",
                borderRadius: "8px",
                flex: 1,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <WalletOutlined
                  style={{ fontSize: "24px", color: "#ABFD13" }}
                />
                <div>
                  <h3 style={{ color: "#fff", margin: 0, fontSize: "16px" }}>
                    Total Reservations
                  </h3>
                  <span
                    style={{
                      color: "#ABFD13",
                      fontSize: "24px",
                      fontWeight: "bold",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    {filteredHistories.length}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabel Histories */}
          <Table
            columns={columns}
            dataSource={filteredHistories}
            rowKey="id_booking"
            loading={loading}
            pagination={false}
            style={{ background: "transparent" }}
          />
        </Content>
        <Footer
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

export default History;
