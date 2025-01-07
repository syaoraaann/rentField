import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Drawer,
  Card,
  Select,
  DatePicker,
  TimePicker,
  notification,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import dayjs from "dayjs";
import "./index.css";
import SideNav from "../dashboardrenter/sidenav";
import bgImage from "../../assets/images/bgnew.jpg";
import { getDataPrivate } from "../../utils/api";

// Konfigurasi Leaflet Icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const { Title, Text } = Typography;
const { Meta } = Card;
const { Option } = Select;

const ListField = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    setLoading(true);
    try {
      const response = await getDataPrivate("/api/v1/list_field/read");
      if (response?.data) {
        const transformedFields = response.data.map((field) => ({
          id: field.id_field,
          name: field.field_name,
          category: field.field_type,
          address: field.address,
          coordinates: [-8.115001271274899, 115.09062769800654],
          imageUrl:
            field.image_url ||
            "https://fastly.4sqi.net/img/general/600x600/58082938_ZBAJ3Wcn-B_m8pP16l42N0uVIgxWSdnNIQG36_ff0Nk.jpg",
          basePrice: parseFloat(field.price),
          operatingHours: {
            start: 0,
            end: 24,
          },
        }));
        setFields(transformedFields);
      }
    } catch (err) {
      setError(err.message);
      notification.error({
        message: "Error",
        description: "Failed to fetch fields data",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateHours = (start, end) => {
    if (!start || !end) return 0;
    const startHour = start.hour();
    const endHour = end.hour();
    const startMinute = start.minute();
    const endMinute = end.minute();

    let hours = endHour - startHour;

    // Adjust for minutes - round up to the next hour
    if (endMinute > startMinute) {
      hours += 1;
    }

    return hours > 0 ? hours : 0;
  };

  const handleTimeChange = (times, timeString) => {
    const [start, end] = times;
    setStartTime(start);
    setEndTime(end);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledHours = () => {
    const hours = [];
    if (selectedField) {
      // Disable hours outside operating hours
      for (let i = 0; i < selectedField.operatingHours.start; i++) {
        hours.push(i);
      }
      for (let i = selectedField.operatingHours.end; i < 24; i++) {
        hours.push(i);
      }
    }
    return hours;
  };

  const showDrawer = (field) => {
    setSelectedField(field);
    setDrawerVisible(true);
    setStartTime(null);
    setEndTime(null);
    setSelectedDate(null);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedField(null);
    setSelectedDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setStartTime(null);
    setEndTime(null);
  };

  const handleBooking = () => {
    if (!selectedDate || !startTime || !endTime) {
      notification.error({
        message: "Incomplete Information",
        description: "Please select date and time range before proceeding.",
      });
      return;
    }
    notification.success({
      message: "Booking Successful",
      description: "Your booking has been confirmed.",
    });
    closeDrawer();
  };

  const MapComponent = ({ coordinates, zoom = 13 }) => (
    <MapContainer
      zoom={zoom}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
      center={coordinates}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>Field Location</Popup>
      </Marker>
    </MapContainer>
  );

  const filteredFields = fields.filter((field) => {
    const matchesSearch = field.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? field.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const formatOperatingHours = (hours) => {
    const formatHour = (hour) => {
      if (hour === 24) return "00:00";
      return `${String(hour).padStart(2, "0")}:00`;
    };

    if (hours.start === 0 && hours.end === 24) {
      return "24 Hours";
    }

    return `${formatHour(hours.start)} - ${formatHour(hours.end)}`;
  };

  return (
    <Layout
      className="layout-main"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <SideNav />
      <Title level={3} className="page-title">
        {selectedField
          ? `Order Field ${selectedField.name}`
          : "Available Fields at Singaraja"}
      </Title>

      <Layout.Content className="content-wrapper-renter">
        {loading && <div>Loading fields...</div>}
        {error && <div>Error: {error}</div>}

        <Row className="search-section">
          <Col>
            <Input
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              prefix={
                <SearchOutlined
                  style={{ color: "#d9d9d9", paddingRight: "10px" }}
                />
              }
            />
          </Col>

          <Col>
            <Select
              placeholder="Select Category"
              onChange={setSelectedCategory}
              className="category-select"
              value={selectedCategory}
            >
              <Option value="">All Categories</Option>
              <Option value="Soccer Field">Soccer Field</Option>
              <Option value="Badminton Field">Badminton Field</Option>
              <Option value="Basketball Field">Basketball Field</Option>
            </Select>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {filteredFields.map((field) => (
            <Col span={8} key={field.id}>
              <Card
                hoverable
                className="field-card"
                cover={
                  <img
                    alt={field.name}
                    src={field.imageUrl}
                    className="field-image"
                  />
                }
              >
                <Meta
                  title={
                    <Text strong className="field-title">
                      {field.name}
                    </Text>
                  }
                  description={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        height: "250px",
                      }}
                    >
                      <Text className="field-category">{field.category}</Text>
                      <Text className="field-price">
                        Price /Hr: Rp {field.basePrice.toLocaleString()}
                      </Text>
                      <Text className="field-hours">
                        Operating Hours:{" "}
                        {formatOperatingHours(field.operatingHours)}
                      </Text>
                      <Text className="field-address">{field.address}</Text>

                      <div className="rent-button-wrapper">
                        <Button
                          type="primary"
                          onClick={() => showDrawer(field)}
                          className="rent-button"
                        >
                          RENT
                        </Button>
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Drawer
          className="drawer-content"
          title={`Order Field ${selectedField?.name || ""}`}
          placement="right"
          width={320}
          onClose={closeDrawer}
          open={drawerVisible}
        >
          {selectedField && (
            <div className="map-container">
              <MapComponent coordinates={selectedField.coordinates} zoom={15} />
            </div>
          )}

          <Text strong className="drawer-title">
            {`Rent ${selectedField?.name}`}
          </Text>

          <div className="required-label">
            Choose Date<span className="required-mark">*</span>
          </div>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            disabledDate={disabledDate}
            className="drawer-select"
          />

          <div className="required-label">
            Choose Time Range<span className="required-mark">*</span>
          </div>
          <TimePicker.RangePicker
            value={[startTime, endTime]}
            onChange={handleTimeChange}
            format="HH:mm"
            minuteStep={30}
            className="drawer-select"
            disabledHours={disabledHours}
            disabled={!selectedDate}
          />

          <Button
            type="primary"
            onClick={handleBooking}
            disabled={!selectedDate || !startTime || !endTime}
            className="drawer-button"
          >
            BOOK
          </Button>
        </Drawer>
      </Layout.Content>

      <div className="footer">
        Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
        Pendidikan Ganesha
      </div>
    </Layout>
  );
};

export default ListField;
