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
  Modal,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./index.css";
import SideNav from "../dashboardrenter/sidenav";
import "@fontsource/poppins";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudDrizzle,
} from "lucide-react";
import bgImage from "../../assets/images/bgnew.jpg";
import { getDataPrivate } from "../../utils/api";

// Leaflet icon configuration
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

const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const lat = -8.112;
        const lon = 115.0892;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f2b0f2287357aef64f177803eccea2db&units=metric`
        );

        if (!response.ok) {
          throw new Error(
            `Weather API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherCode) => {
    const iconProps = { size: 24, strokeWidth: 2, color: "#fff" };

    if (!weatherCode) return <Cloud {...iconProps} />;

    if (weatherCode >= 200 && weatherCode < 300)
      return <CloudLightning {...iconProps} />;
    if (weatherCode >= 300 && weatherCode < 400)
      return <CloudDrizzle {...iconProps} />;
    if (weatherCode >= 500 && weatherCode < 600)
      return <CloudRain {...iconProps} />;
    if (weatherCode >= 600 && weatherCode < 700)
      return <CloudSnow {...iconProps} />;
    if (weatherCode === 800) return <Sun {...iconProps} />;

    return <Cloud {...iconProps} />;
  };

  if (loading) {
    return <div className="weather-card">Loading weather information...</div>;
  }

  if (error) {
    return (
      <div className="weather-card">
        <Text type="danger">Error loading weather: {error}</Text>
      </div>
    );
  }

  if (!weather || !weather.weather) {
    return null;
  }

  return (
    <Card className="weather-card">
      <Row className="weather-content">
        <Col>
          <Text strong className="weather-title">
            Current Weather in Singaraja
          </Text>
        </Col>
        <Col>
          <Row className="weather-info">
            <Col>{getWeatherIcon(weather?.weather[0]?.id)}</Col>
            <Col>
              <Text strong className="weather-temp">
                {Math.round(weather?.main?.temp)}°C
              </Text>
            </Col>
            <Col>
              <Text className="weather-desc">
                {weather?.weather[0]?.description}
              </Text>
            </Col>
            <Col>
              <Text className="weather-desc">
                Humidity: {weather?.main?.humidity}%
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

const PaymentModal = ({ visible: open, onCancel, total, onConfirm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("BRI");

  const bankAccounts = {
    BRI: {
      number: "0952010040655088",
      name: "PT. Rentfield Indonesia",
    },
    Gopay: {
      number: "085694309831",
      name: "PT. Rentfield Indonesia",
    },
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onConfirm={onConfirm}
      footer={null}
      title="Pay to Book"
      className="payment-modal"
      styles={{ className: "payment-modal-body" }}
      width={700}
    >
      <div className="payment-input-section">
        <Text>Fill Your Name and Whatsapp Number:</Text>
        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="payment-input"
        />
        <Input
          placeholder="Whatsapp Number"
          value={phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, "");
            setPhone(onlyNums);
          }}
          className="payment-input"
        />
      </div>

      <div className="payment-input-section">
        <Text>Choose Your Preferred Payment Destination:</Text>
        <Select value={bank} onChange={setBank} className="payment-select">
          {Object.keys(bankAccounts).map((bankName) => (
            <Option key={bankName} value={bankName}>
              {bankName}
            </Option>
          ))}
        </Select>

        <Card className="payment-card">
          <Text className="payment-text">{bank}</Text>
          <Text className="payment-text">{bankAccounts[bank].number}</Text>
          <Text className="payment-text">{bankAccounts[bank].name}</Text>
        </Card>
      </div>

      <Text className="payment-total">Total: Rp. {total.toLocaleString()}</Text>

      <div className="payment-instructions">
        <p>
          1. Transfer to the listed account with the appropriate amount and
          click confirm.
        </p>
        <p>
          2. You will receive a confirmation WhatsApp Message containing your
          booking information.
        </p>
        <p>
          3. If the field booking fails, please fill out the refund form in the
          SMS or contact the help center at 08123456789.
        </p>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Button
            type="primary"
            onClick={onConfirm}
            style={{
              width: "100%",
              backgroundColor: "#abfd13",
              borderColor: "#abfd13",
              color: "#000",
            }}
          >
            Confirm
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={onCancel}
            style={{
              width: "100%",
              backgroundColor: "#ff4d4f",
              borderColor: "#ff4d4f",
              color: "#fff",
            }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

const ListField = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
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

  // Function to calculate total price
  const calculateTotal = (start, end, basePrice) => {
    const hours = calculateHours(start, end);
    const subtotalValue = hours * basePrice;
    const taxValue = subtotalValue * 0.1; // 10% tax
    const totalValue = subtotalValue + taxValue;

    setSubtotal(subtotalValue);
    setTax(taxValue);
    setTotal(totalValue);
  };

  const handleTimeChange = (times, timeString) => {
    const [start, end] = times;
    setStartTime(start);
    setEndTime(end);

    if (start && end && selectedField) {
      calculateTotal(start, end, selectedField.basePrice);
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  // Time picker disabled hours
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

  const handlePaymentConfirm = () => {
    setPaymentModalVisible(false);
    notification.success({
      message: "Payment Successful",
      description:
        "Your booking has been confirmed. Check your WhatsApp/SMS for details.",
    });
    closeDrawer();
  };

  const showDrawer = (field) => {
    setSelectedField(field);
    setDrawerVisible(true);
    setSubtotal(0);
    setTax(0);
    setTotal(0);
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
    setTotal(0);
  };

  const handleRent = () => {
    if (!selectedDate || !startTime || !endTime) {
      notification.error({
        message: "Incomplete Information",
        description: "Please select date and time range before proceeding.",
      });
      return;
    }
    setPaymentModalVisible(true);
  };

  const RecenterMap = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(coordinates);
      map.invalidateSize();
    }, [map, coordinates]);

    return null;
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
      <RecenterMap coordinates={coordinates} />
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
        <WeatherDisplay />

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

        <PaymentModal
          visible={paymentModalVisible}
          onConfirm={handlePaymentConfirm}
          onCancel={() => setPaymentModalVisible(false)}
          total={total}
        />

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
            onClick={handleRent}
            disabled={!selectedDate || !startTime || !endTime}
            className="drawer-button"
          >
            RENT
          </Button>

          {startTime && endTime && (
            <div className="payment-totals">
              <Text
                strong
              >{`Base Price/Hour: Rp ${selectedField?.basePrice.toLocaleString()}`}</Text>
              <br />
              <Text strong>{`Duration: ${calculateHours(
                startTime,
                endTime
              )} hour(s)`}</Text>
              <br />
              <Text strong>{`Subtotal: Rp ${subtotal.toLocaleString()}`}</Text>
              <br />
              <Text strong>{`Tax (10%): Rp ${tax.toLocaleString()}`}</Text>
              <br />
              <Text strong>{`Total: Rp ${total.toLocaleString()}`}</Text>
            </div>
          )}
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
