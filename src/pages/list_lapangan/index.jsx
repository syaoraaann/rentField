import React, { useState } from "react";
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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import SideNav from "../sidenav";
import "@fontsource/poppins";
import { useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, CloudDrizzle } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const { Title, Text } = Typography;
const { Meta } = Card;
const { Header, Content } = Layout;
const { Option } = Select;
const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Reset states at the start of fetch
        setLoading(true);
        setError(null);
        
        // Singaraja coordinates
        const lat = -8.112;
        const lon = 115.0892;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f2b0f2287357aef64f177803eccea2db&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Weather data received:', data); // Debug log
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherCode) => {
    // Add color styles to icons
    const iconProps = { size: 24, strokeWidth: 2 };
    
    if (!weatherCode) return <Cloud {...iconProps} className="text-gray-400" />;
    
    if (weatherCode >= 200 && weatherCode < 300) 
      return <CloudLightning {...iconProps} className="text-yellow-500" />;
    if (weatherCode >= 300 && weatherCode < 400) 
      return <CloudDrizzle {...iconProps} className="text-blue-300" />;
    if (weatherCode >= 500 && weatherCode < 600) 
      return <CloudRain {...iconProps} className="text-blue-500" />;
    if (weatherCode >= 600 && weatherCode < 700) 
      return <CloudSnow {...iconProps} className="text-gray-300" />;
    if (weatherCode === 800) 
      return <Sun {...iconProps} className="text-yellow-400" />;
    
    return <Cloud {...iconProps} className="text-gray-400" />;
  };

  if (loading) {
    return (
      <Card style={{ width: '100%', marginBottom: 20, backgroundColor: '#f8f9fa' }}>
        <Row>
          <Col>
            <Text>Loading weather information...</Text>
          </Col>
        </Row>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ width: '100%', marginBottom: 20, backgroundColor: '#fff0f0' }}>
        <Row>
          <Col>
            <Text type="danger">Error loading weather: {error}</Text>
          </Col>
        </Row>
      </Card>
    );
  }

  if (!weather || !weather.weather) {
    return null;
  }

  return (
    <Card 
      style={{ 
        width: '100%', 
        marginBottom: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 8
      }}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Text strong style={{ fontSize: 18, marginRight: 16 }}>
            Current Weather in Singaraja
          </Text>
        </Col>
        <Col>
          <Row align="middle" gutter={16}>
            <Col>
              {getWeatherIcon(weather.weather[0]?.id)}
            </Col>
            <Col>
              <Text strong style={{ fontSize: 16 }}>
                {Math.round(weather.main?.temp)}°C
              </Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 14 }}>
                {weather.weather[0]?.description}
              </Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 14 }}>
                Humidity: {weather.main?.humidity}%
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

const ListLapangan = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedFieldOption, setSelectedFieldOption] = useState(null);
  const [totalHarga, setTotalHarga] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [additionalCharge, setAdditionalCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isRentButtonVisible, setIsRentButtonVisible] = useState(false);

  // Updated fields data structure with fieldOptions
  const fields = [
    {
      id: 1,
      name: "Singaraja Soccer",
      category: "Soccer Field",
      address: "Jl. Udayana, Banjar Jawa, Kec. Buleleng, Kabupaten Buleleng, Bali 81113",
      coordinates: [-8.115001271274899, 115.09062769800654], // Singaraja coordinates
      imageUrl: "https://fastly.4sqi.net/img/general/600x600/58082938_ZBAJ3Wcn-B_m8pP16l42N0uVIgxWSdnNIQG36_ff0Nk.jpg",
      basePrice: 50000,
      operatingHours: {
        start: 0,
        end: 24,
      },
      fieldOptions: [
        { name: "Regular", additionalCharge: 0 },
        { name: "Premium", additionalCharge: 15000 },
        { name: "VIP", additionalCharge: 25000 }
      ]
    },
    {
      id: 2,
      name: "Badminton Hall UNDIKSHA",
      category: "Badminton Field",
      address: "GOR BULUTANGKIS UNDIKSHA, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81116",
      coordinates: [-8.11820868948884, 115.08833486487808], // Jakarta coordinates
      imageUrl: "https://cdn.undiksha.ac.id/wp-content/uploads/2022/09/01123108/GOR-Bulutangkis-Undiksha.jpg",
      basePrice: 70000,
      operatingHours: {
        start: 7,
        end: 23,
      },
      fieldOptions: [
        { name: "Standard", additionalCharge: 0 },
        { name: "Tournament", additionalCharge: 30000 }
      ]
    },
    {
      id: 3,
      name: "Basketball Field GOR Bhuana Patra",
      category: "Basketball Field",
      address: "Jl. Udayana No.6, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81114",
      coordinates: [-8.114191831843618, 115.08984725935848], // Surabaya coordinates
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlo9Y32JrsrMnXiPbH9Xzfbf8126C2Q1Kpkg&s",
      basePrice: 80000,
      operatingHours: {
        start: 7,
        end: 23,
      },
      fieldOptions: [
        { name: "Basic", additionalCharge: 0 },
        { name: "Pro", additionalCharge: 20000 },
        { name: "Elite", additionalCharge: 40000 }
      ]
    },
    {
      id: 4,
      name: "Basketball Field FOK UNDIKSHA",
      category: "Basketball Field",
      address: "FOK Undiksha, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81116",
      coordinates: [-8.117842604017683, 115.08771641608371], // Bandung coordinates
      imageUrl: "https://fastly.4sqi.net/img/general/600x600/56404427_8Xi_V2yELZ4rs_plRH2Ra4IsX3wyZyDSJozKF9VUNbs.jpg",
      basePrice: 15000,
      operatingHours: {
        start: 8,
        end: 16,
      },
      fieldOptions: [
        {name: "Standard", additionalCharge: 0},
        {name: "Premium", additionalCharge: 20000}
      ]
    },
    {
      id: 5,
      name: "Soccer Field GOR Bhuana Patra",
      category: "Soccer Field",
      address: "Jl. Udayana No.6, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81114",
      coordinates: [-8.114986566938121, 115.08926312164766], // Yogyakarta coordinates
      imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgV4j7qgXFdhThFDZgpAokU0lMu-Sfv858H_N_nCu80zSuZOwsJq5Z0nvMzgVQbLYBWIXAqwjm7ZYVM4QLvAD-RbJ3jVqUOD7fzupql5hJVQqVGrElb_g1TZfoFWU6sEZ57Cw-Gb0oLhuV_/s1600/GOR+Bhuana+Patra.JPG",
      basePrice: 80000,
      operatingHours: {
        start: 7,
        end: 23,
      },
      fieldOptions: [
        { name: "Regular", additionalCharge: 0 },
        { name: "Premium", additionalCharge: 15000 }
      ]
    },
    {
      id: 6,
      name: "Metro Sport Singaraja Soccer",
      category: "Soccer Field",
      address: "Baktiseraga, Kec. Buleleng, Kabupaten Buleleng, Bali 81119",
      coordinates: [-8.122833347105876, 115.07260318559653], // Semarang coordinates
      imageUrl: "https://www.pdiperjuanganbali.id/uploads/berita/berita_220608090831_TutupKMSFutsalCupI,Kariyasa:TahunDepanKitaakanPerbesardanPerluas.JPG",
      basePrice: 100000,
      operatingHours: {
        start: 7,
        end: 23,
      },
      fieldOptions: [
        { name: "Standard", additionalCharge: 0 },
        { name: "Tournament", additionalCharge: 30000 }
      ]
    }
  ];

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const getAvailableHours = () => {
    if (!selectedDate || !selectedField) return [];
    
    const now = dayjs();
    const selectedDay = dayjs(selectedDate);
    const isToday = selectedDay.isSame(now, 'day');
    const currentHour = now.hour();
    
    const { start, end } = selectedField.operatingHours;
    
    return Array.from({ length: 24 }, (_, i) => {
      // Skip hours outside operating hours
      if (i < start || i >= end) {
        return null;
      }
      
      // Skip past hours if it's today
      if (isToday && i <= currentHour) {
        return null;
      }
      
      return {
        label: `${String(i).padStart(2, '0')}:00 - ${String(i + 1).padStart(2, '0')}:00`,
        value: `${i}:00 - ${i + 1}:00`,
      };
    }).filter(Boolean);
  };

  const formatOperatingHours = (hours) => {
    const formatHour = (hour) => {
      if (hour === 24) return '00:00';
      return `${String(hour).padStart(2, '0')}:00`;
    };
    
    if (hours.start === 0 && hours.end === 24) {
      return '24 Hours';
    }
    
    return `${formatHour(hours.start)} - ${formatHour(hours.end)}`;
  };

 const renderCardMeta = (field) => (
    <Meta
      title={
        <Text 
          strong 
          style={{ 
            fontSize: "18px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            width: "100%"
          }}
        >
          {field.name}
        </Text>
      }
      description={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            height: "120px",
          }}
        >
          <Text 
            strong 
            style={{ 
              color: "#000000", 
              fontStyle: "italic",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {field.category}
          </Text>
          <Text strong style={{ color: "#375D22", fontStyle: "bold" }}>
            Base Price /Hr: Rp {field.basePrice.toLocaleString()}
          </Text>
          <Text strong style={{ color: "#1890ff" }}>
            Operating Hours: {formatOperatingHours(field.operatingHours)}
          </Text>
          <Text
            type="secondary"
            style={{
              fontSize: "12px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
              wordBreak: "break-word"
            }}
          >
            {field.address}
          </Text>
        </div>
      }
    />
  );

  const RecenterMap = ({ coordinates }) => {
    const map = useMap();
  
    useEffect(() => {
      map.setView(coordinates); // Set ulang view ke coordinates
      map.invalidateSize(); // Pastikan ukuran map valid
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
        <Popup>
          Field Location
        </Popup>
      </Marker>
      <RecenterMap coordinates={coordinates} />
    </MapContainer>
  );
  

  
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
      const option = selectedField.fieldOptions.find(opt => opt.name === selectedFieldOption);
      calculateTotal(0, selectedField.basePrice, option?.additionalCharge || 0);
    }
  };

  const handleHoursChange = (value) => {
    setSelectedHours(value);
    if (selectedField && selectedFieldOption) {
      const option = selectedField.fieldOptions.find(opt => opt.name === selectedFieldOption);
      calculateTotal(value.length, selectedField.basePrice, option?.additionalCharge || 0);
    }
  };

  const handleFieldOptionChange = (value) => {
    setSelectedFieldOption(value);
    setIsRentButtonVisible(true);
    if (selectedField) {
      const option = selectedField.fieldOptions.find(opt => opt.name === value);
      calculateTotal(selectedHours.length, selectedField.basePrice, option?.additionalCharge || 0);
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
        description: "Please select date, hours, and field option before proceeding.",
      });
      return;
    }

    notification.success({
      message: "Field Order Success",
      description: "Payment Page will be updated soon",
    });
    closeDrawer();
  };

  const filteredFields = fields.filter((field) => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? field.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />
      <Layout style={{ marginLeft: 256 }}>
        <Title
          level={3}
          style={{
            paddingLeft: "20px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            marginTop: "30px",
            color: "#375D22",
            fontSize: "60px",
          }}
        >
          {selectedField
            ? `Order Field ${selectedField.name}`
            : "Available Fields at Singaraja"}
        </Title>

        <Content style={{ 
          margin: "10px",
           padding: "20px", 
           backgroundColor: "#fff",
           paddingBottom: "40px" // Added padding at bottom
            }}>
              {/* 1. Komponen Cuaca */}
        <WeatherDisplay />
            
          <Row gutter={16} align="middle" style={{ marginBottom: "20px" }}>
            <Col>
              <Input
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col>
              <Select
                placeholder="Select Category"
                onChange={setSelectedCategory}
                style={{ height: 71, width: 200, paddingBottom: 22 }}
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
          <Col span={8} key={field.id} style={{ marginBottom: "16px" }}>
            <Card
              hoverable
              style={{
                minHeight: "450px", // Changed from fixed height to minHeight
                height: "100%", // Added to ensure full height
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Slightly enhanced shadow
                transition: "box-shadow 0.3s ease",
                borderRadius: "8px",
              }}
              cover={
                <img
                  alt={field.name}
                  src={field.imageUrl}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px", // Optional: matching border radius
                    borderTopRightRadius: "8px", // Optional: matching border radius
                  }}
                />
              }
              actions={[
                <Button
                  type="primary"
                  onClick={() => showDrawer(field)}
                  style={{ backgroundColor: "#D8E795", color: "#000000" }}
                >
                  Rent
                </Button>,
              ]}
            >
              {renderCardMeta(field)}
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
            title={`Order Field ${selectedField?.name || ""}`}
            placement="right"
            width={320}
            onClose={closeDrawer}
            open={drawerVisible}
          >
            {selectedField && (
              <MapComponent coordinates={selectedField.coordinates} zoom={15} />
            )}
            <Text strong style={{ fontSize: "18px", display: "block", marginTop: "16px" }}>
              {`Rent ${selectedField?.name}`}
            </Text>

            <Text strong>Choose Date:</Text>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              disabledDate={disabledDate}
              style={{ width: "100%", marginBottom: "16px" }}
            />

            <Text strong>Choose Hours:</Text>
            <Select
              mode="multiple"
              placeholder="Select Hours"
              value={selectedHours}
              onChange={handleHoursChange}
              style={{ width: "100%", marginBottom: "16px" }}
              disabled={!selectedDate}
              options={getAvailableHours()}
            />

            <Text strong>Select Field Option:</Text>
            <Select
              placeholder="Select Field Option"
              value={selectedFieldOption}
              onChange={handleFieldOptionChange}
              style={{ width: "100%", marginBottom: "16px" }}
            >
              {selectedField?.fieldOptions.map((option) => (
                <Option key={option.name} value={option.name}>
                  {option.name} {option.additionalCharge > 0 ? `(+Rp ${option.additionalCharge.toLocaleString()}/hr)` : ''}
                </Option>
              ))}
            </Select>

            <Button
              type="primary"
              onClick={handleRent}
              disabled={!isRentButtonVisible || !selectedDate || selectedHours.length === 0}
              style={{ marginTop: "20px" }}
            >
              Rent Now
            </Button>

            {selectedFieldOption && (
              <div style={{ marginTop: "20px" }}>
                <Text strong>{`Subtotal: Rp ${subtotal.toLocaleString()}`}</Text>
                <br />
                <Text strong>{`Additional Charge: Rp ${additionalCharge.toLocaleString()}`}</Text>
                <br />
                <Text strong>{`Tax (10%): Rp ${tax.toLocaleString()}`}</Text>
                <br />
                <Text strong>{`Total: Rp ${total.toLocaleString()}`}</Text>
              </div>
            )}
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListLapangan;