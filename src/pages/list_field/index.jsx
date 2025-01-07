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

const PaymentModal = ({ visible, onCancel, total, onConfirm }) => {
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
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
      footer={null}
      title="Pay to Book"
      className="payment-modal"
      bodyStyle={{ className: "payment-modal-body" }}
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
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedFieldOption, setSelectedFieldOption] = useState(null);
  const [isRentButtonVisible, setIsRentButtonVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [additionalCharge, setAdditionalCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const fields = [
    {
      id: 1,
      name: "Singaraja Soccer",
      category: "Soccer Field",
      address:
        "Jl. Udayana, Banjar Jawa, Kec. Buleleng, Kabupaten Buleleng, Bali 81113",
      coordinates: [-8.115001271274899, 115.09062769800654],
      imageUrl:
        "https://fastly.4sqi.net/img/general/600x600/58082938_ZBAJ3Wcn-B_m8pP16l42N0uVIgxWSdnNIQG36_ff0Nk.jpg",
      basePrice: 50000,
      operatingHours: {
        start: 0,
        end: 24,
      },
      fieldOptions: [
        { name: "Regular", additionalCharge: 0 },
        { name: "Premium", additionalCharge: 15000 },
        { name: "VIP", additionalCharge: 25000 },
      ],
    },
    // Add more fields here as needed
  ];

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const getAvailableHours = () => {
    if (!selectedDate || !selectedField) return [];

    const now = dayjs();
    const selectedDay = dayjs(selectedDate);
    const isToday = selectedDay.isSame(now, "day");
    const currentHour = now.hour();

    const { start, end } = selectedField.operatingHours;

    return Array.from({ length: 24 }, (_, i) => {
      if (i < start || i >= end) {
        return null;
      }

      if (isToday && i <= currentHour) {
        return null;
      }

      return {
        label: `${String(i).padStart(2, "0")}:00 - ${String(i + 1).padStart(
          2,
          "0"
        )}:00`,
        value: `${i}:00 - ${i + 1}:00`,
      };
    }).filter(Boolean);
  };

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
    setTotalHarga(0);
    setSubtotal(0);
    setAdditionalCharge(0);
    setTax(0);
    setTotal(0);
    setIsRentButtonVisible(false);
    setSelectedFieldOption(null);
    setSelectedHours([]);
    setSelectedDate(null);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedField(null);
    setSelectedDate(null);
    setSelectedHours([]);
    setSelectedFieldOption(null);
    setIsRentButtonVisible(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedHours([]);
    if (selectedField && selectedFieldOption) {
      const option = selectedField.fieldOptions.find(
        (opt) => opt.name === selectedFieldOption
      );
      calculateTotal(0, selectedField.basePrice, option?.additionalCharge || 0);
    }
  };

  const handleHoursChange = (value) => {
    setSelectedHours(value);
    if (selectedField && selectedFieldOption) {
      const option = selectedField.fieldOptions.find(
        (opt) => opt.name === selectedFieldOption
      );
      calculateTotal(
        value.length,
        selectedField.basePrice,
        option?.additionalCharge || 0
      );
    }
  };

  const handleFieldOptionChange = (value) => {
    setSelectedFieldOption(value);
    setIsRentButtonVisible(true);
    if (selectedField) {
      const option = selectedField.fieldOptions.find(
        (opt) => opt.name === value
      );
      calculateTotal(
        selectedHours.length,
        selectedField.basePrice,
        option?.additionalCharge || 0
      );
    }
  };

  const calculateTotal = (hours, basePrice, additionalChargePerHour) => {
    const subtotalValue = hours * basePrice;
    const additionalChargeValue = hours * additionalChargePerHour;
    const taxValue = (subtotalValue + additionalChargeValue) * 0.1;
    const totalValue = subtotalValue + additionalChargeValue + taxValue;

    setSubtotal(subtotalValue);
    setAdditionalCharge(additionalChargeValue);
    setTax(taxValue);
    setTotal(totalValue);
    setTotalHarga(totalValue);
  };

  const handleRent = () => {
    if (!selectedDate || selectedHours.length === 0 || !selectedFieldOption) {
      notification.error({
        message: "Incomplete Information",
        description:
          "Please select date, hours, and field option before proceeding.",
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
                        Base Price /Hr: Rp {field.basePrice.toLocaleString()}
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
            Choose Hours<span className="required-mark">*</span>
          </div>
          <Select
            mode="multiple"
            placeholder="Select Hours"
            value={selectedHours}
            onChange={handleHoursChange}
            className="drawer-select"
            disabled={!selectedDate}
            options={getAvailableHours()}
          />

          <div className="required-label">
            Select Field Option<span className="required-mark">*</span>
          </div>
          <Select
            placeholder="Select Field Option"
            value={selectedFieldOption}
            onChange={handleFieldOptionChange}
            className="drawer-select"
          >
            {selectedField?.fieldOptions.map((option) => (
              <Option key={option.name} value={option.name}>
                {option.name}
                {option.additionalCharge > 0
                  ? ` (+Rp ${option.additionalCharge.toLocaleString()}/hr)`
                  : ""}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            onClick={handleRent}
            disabled={
              !isRentButtonVisible ||
              !selectedDate ||
              selectedHours.length === 0
            }
            className="drawer-button"
          >
            RENT
          </Button>

          {selectedFieldOption && (
            <div className="payment-totals">
              <Text strong>{`Subtotal: Rp ${subtotal.toLocaleString()}`}</Text>
              <br />
              <Text
                strong
              >{`Additional Charge: Rp ${additionalCharge.toLocaleString()}`}</Text>
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
