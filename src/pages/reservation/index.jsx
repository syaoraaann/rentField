import React, { useState, useEffect } from "react";
import { Layout, Table, Card } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import SideNavOwner from "../dashboardowner/sidenavowner";
import bgImage from "../../assets/images/bgnew.jpg";
import { getDataPrivate } from "../../utils/api";
import "./index.css";

const { Content, Footer } = Layout;

const ReservationList = () => {
  const [dataSources, setDataSources] = useState([]); // Untuk data tabel
  const [loading, setLoading] = useState(false); // Untuk indikator loading

  // Hitung total saldo berdasarkan total_price
  const calculateTotalSaldo = () => {
    return dataSources.reduce((total, item) => {
      const price = parseFloat(
        item.total_price.replace(/\./g, "").replace(",", ".")
      ); // Konversi format angka
      return total + (isNaN(price) ? 0 : price); // Tambahkan jika valid
    }, 0);
  };

  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = async () => {
    setLoading(true);
    try {
      const resp = await getDataPrivate("/api/v1/booking/read_by_owner");
      setLoading(false);

      console.log("Data API diterima:", resp); // Debug respons API

      if (Array.isArray(resp)) {
        setDataSources(resp); // Langsung set data jika berbentuk array
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    console.log("Data Source untuk Tabel:", dataSources); // Debug data source
  }, [dataSources]);

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
      <Layout
        className="reslis-inner-layout"
        style={{ marginLeft: 256, background: "transparent" }}
      >
        <Content
          className="reslis-content"
          style={{ padding: "24px", background: "transparent" }}
        >
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

          {/* Bagian Total Reservations dan Total Saldo */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <Card
              className="reslis-total-reservations"
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
                    {dataSources.length}
                  </span>
                </div>
              </div>
            </Card>

            <Card
              className="reslis-total-saldo"
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
                    Total Saldo
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
                    Rp {calculateTotalSaldo().toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabel Reservasi */}
          <Table
            columns={columns}
            dataSource={dataSources}
            rowKey="id_booking" // Gunakan id_booking sebagai key unik
            loading={loading}
            pagination={false} // Nonaktifkan pagination
          />
        </Content>

        <Footer
          className="reslis-footer"
          
        >
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ReservationList;
