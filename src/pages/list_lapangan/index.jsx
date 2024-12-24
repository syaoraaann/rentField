
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
  Modal
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
const { Content, Footer } = Layout;
const { Option } = Select;
const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


//  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

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
    if (weatherCode === 800) 
      return <Sun {...iconProps} />;
    
    return <Cloud {...iconProps} />;
  };

  if (loading) {
    return (
      <Card style={{ width: '100%', marginBottom: 20, backgroundColor: '#090909' }}>
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
      <Card style={{ width: '100%', marginBottom: 20, backgroundColor: '#090909' }}>
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
        backgroundColor: '#090909',
        borderRadius: 8,
        border: '1px solid #fff'
      }}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Text strong style={{ fontSize: 18, marginRight: 16, color: '#fff' }}>
            Current Weather in Singaraja
          </Text>
        </Col>
        <Col>
          <Row align="middle" gutter={16}>
            <Col>
              {getWeatherIcon(weather?.weather[0]?.id)}
            </Col>
            <Col>
              <Text strong style={{ fontSize: 16, color: '#fff' }}>
                {Math.round(weather?.main?.temp)}°C
              </Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 14, color: '#fff' }}>
                {weather?.weather[0]?.description}
              </Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 14, color: '#fff' }}>
                Humidity: {weather?.main?.humidity}%
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

// Payment Modal Component
const PaymentModal = ({ visible, onCancel, total, onConfirm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("BRI");

  const bankAccounts = {
    BRI: {
      number: "0952010040655088",
      name: "GALIH YUNIAR PRAKOSO"
    },
    Gopay: {
      number: "085694309831",
      name: "GALIH YUNIAR PRAKOSO"
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
      footer={null}
      title="Pay to Book"
      style={{ 
        top: 30,
        fontFamily: 'Poppins',
      }}
      bodyStyle={{
        backgroundColor: '#090909',
        padding: '30px'
      }}
      width={500}
    >
      <div style={{ color: '#abfd13', marginBottom: '24px' }}>
        <Text style={{ fontSize: '16px', color: '#fff' }}>Fill Your Name and Whatsapp Number:</Text>
        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginTop: 8,
            backgroundColor: '#fff',
            borderColor: '#fff',
            color: '#090909'
          }}
        />
        <Input
          placeholder="Whatsapp Number"
          value={phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            setPhone(onlyNums);
          }}
          style={{
            marginTop: 8,
            backgroundColor: '#fff',
            borderColor: '#fff',
            color: '#090909'
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <Text style={{ color: '#fff' }}>Choose Your Preferred Payment Destination:</Text>
        <Select
          value={bank}
          onChange={setBank}
          style={{
            width: '100%',
            marginTop: 8
          }}
          dropdownStyle={{
            backgroundColor: '#fff'
          }}
        >
          {Object.keys(bankAccounts).map(bankName => (
            <Option key={bankName} value={bankName}>{bankName}</Option>
          ))}
        </Select>

        <Card
          style={{
            marginTop: 8,
            backgroundColor: '#090909',
            borderColor: '#abfd13'
          }}
        >
          <Text style={{ color: '#fff', display: 'block', textAlign: 'center' }}>{bank}</Text>
          <Text style={{ color: '#fff', display: 'block', textAlign: 'center' }}>{bankAccounts[bank].number}</Text>
          <Text style={{ color: '#fff', display: 'block', textAlign: 'center' }}>{bankAccounts[bank].name}</Text>
        </Card>
      </div>

      <Text style={{ color: '#fff', fontSize: '20px', display: 'block', marginBottom: '16px' }}>
        Total: Rp. {total.toLocaleString()}
      </Text>

      <div style={{ color: '#fff', marginBottom: '24px' }}>
        <p>1. Transfer to the listed account with the appropriate amount and click confirm.</p>
        <p>2. You will receive a confirmation WhatsApp Message containing your booking information.</p>
        <p>3. If the field booking fails, please fill out the refund form in the SMS or contact the help center at 08123456789.</p>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Button
            type="primary"
            onClick={onConfirm}
            style={{
              width: '100%',
              backgroundColor: '#abfd13',
              borderColor: '#abfd13',
              color: '#000'
            }}
          >
            Confirm
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={onCancel}
            style={{
              width: '100%',
              backgroundColor: '#ff4d4f',
              borderColor: '#ff4d4f',
              color: '#fff'
            }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

// Updated styles for dark theme
const darkThemeStyles = {
  layout: {
    backgroundColor: '#090909',
    minHeight: '100vh'
  },
  title: {
    color: '#abfd13',
    fontFamily: 'Poppins, sans-serif',
  },
  searchInput: {
    backgroundColor: '#090909',
    borderColor: '#fff',
    color: '#fff'
  },
  input: {
    backgroundColor: "#090909",
    borderColor: "#abfd13",
    color: "#fff",
  },
  categorySelect: {
    backgroundColor: '#090909',
    borderColor: '#abfd13'
  },
  card: {
    backgroundColor: '#222222',
    borderColor: '#222222'
  },
  drawer: {
    backgroundColor: '#090909',
    color: '#fff'
  },
  text:{
    color: "#fff"
  }
};

const RequiredLabel = ({ children }) => (
  <div style={{ marginBottom: '8px' }}>
    <Text strong>
      {children}
      <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>
    </Text>
  </div>
);

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
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  
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

  const handlePaymentConfirm = () => {
    setPaymentModalVisible(false);
    notification.success({
      message: "Payment Successful",
      description: "Your booking has been confirmed. Check your WhatsApp/SMS for details.",
    });
    closeDrawer();
  };
  
  const renderCardMeta = (field) => (
    <Meta
      title={
        <Text 
          strong 
          style={{ 
            fontSize: "25px",
            fontWeight: 'bold',
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            width: "100%",
            color:"#fff",
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
            height: "250px",
          }}
        >
          <Text 
            strong 
            style={{ 
              color: "#f7f7af", 
              fontStyle: "italic",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "15px"
            }}
          >
            {field.category}
          </Text>
  
          <Text strong style={{ color: "#97f4a2", fontStyle: "bold", fontSize: "20px", }}>
            Base Price /Hr: Rp {field.basePrice.toLocaleString()}
          </Text>
          <Text strong style={{ color: "#97f4a2", fontStyle: "bold", fontSize: "20px" }}>
            Operating Hours: {formatOperatingHours(field.operatingHours)}
          </Text>
          <Text
            type="secondary"
            style={{
              fontSize: "15px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
              wordBreak: "break-word",
              color: "#d9d9d9",
              marginBottom: "10px"
            }}
          >
            {field.address}
          </Text>
          
          {/* Button ditambahkan di sini */}
          <div style={{ 
            backgroundColor: '#222222', 
            width: '100%',
            padding: '8px 0',
            marginTop: 'auto' // Mendorong button ke bawah
          }}>
            <Button
              type="primary"
              onClick={() => showDrawer(field)}
              style={{
                backgroundColor: "#abfd13", 
                color: "#090909",
                fontSize: "25px",
                fontWeight: "bold",
                width: "100%"
              }}
            >
              RENT
            </Button>
          </div>
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
    setPaymentModalVisible(true);
  };

  const filteredFields = fields.filter((field) => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? field.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  }
);
  

  return (
    <Layout>
      <SideNav />
       <Layout style={{ 
    marginLeft: 256, 
    backgroundColor: '#090909',
    minHeight: '100vh'
  }}>
        <Title
          level={3}
          style={{
            paddingLeft: "28px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            marginTop: "60px",
            marginBottom: "20px",
            color: "#fff",
            fontSize: "70px",
          }}
        >
          {selectedField
            ? `Order Field ${selectedField.name}`
            : "Available Fields at Singaraja"}
        </Title>

        <Content style={{ 
          margin: "10px",
           padding: "20px", 
           backgroundColor: "#090909",
           paddingBottom: "40px", // Added padding at bottom
            }}>
              {/* 1. Komponen Cuaca */}
        <WeatherDisplay />
            
          <Row gutter={16} align="middle" style={{ marginBottom: "20px" }}>
            <Col>
              <Input
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 200,
                  backgroundColor: '#fff',
                  borderColor: '#090909', }}
                  prefix={<SearchOutlined style={{ color: '#090909' }} />}
              />
            </Col>
            
            <Col>
            <Select
              placeholder="Select Category"
              onChange={setSelectedCategory}
              style={{ 
                width: 200,
                height: 71,
                color: '#090909',
                paddingBottom: 22
              }}
              dropdownStyle={{ 
                backgroundColor: '#090909'
              }}
              value={selectedCategory}
            >
              <Option value="" style={{ backgroundColor: '#090909', color: '#fff' }}>All Categories</Option>
              <Option value="Soccer Field" style={{ backgroundColor: '#090909', color: '#fff' }}>Soccer Field</Option>
              <Option value="Badminton Field" style={{ backgroundColor: '#090909', color: '#fff' }}>Badminton Field</Option>
              <Option value="Basketball Field" style={{ backgroundColor: '#090909', color: '#fff' }}>Basketball Field</Option>
            </Select>
          </Col>
          </Row>

          <Row gutter={[24, 24]}>
        {filteredFields.map((field) => (
          <Col span={8} key={field.id} style={{ marginBottom: "16px",}}>
            <Card
              hoverable
              style={{
                ...darkThemeStyles.card,
                minHeight: "550px", // Changed from fixed height to minHeight
                height: "100%", // Added to ensure full height
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Slightly enhanced shadow
                transition: "box-shadow 0.3s ease",
                borderRadius: "8px",
              }}
              bodyStyle={{
                flex: 1,
                backgroundColor: '#222222'
              }}
              
              cover={
                <img
                  alt={field.name}
                  src={field.imageUrl}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px", // Optional: matching border radius
                    borderTopRightRadius: "8px", // Optional: matching border radius
                    color: "#090909"
                  }}
                />
              }
            >
              {renderCardMeta(field)}
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
            style={{
              background: "#a6a6a6",
            }}
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

            <RequiredLabel>Choose Date</RequiredLabel>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              disabledDate={disabledDate}
              style={{ width: "100%", marginBottom: "16px" }}
            />

            <RequiredLabel>Choose Hours</RequiredLabel>
            <Select
              mode="multiple"
              placeholder="Select Hours"
              value={selectedHours}
              onChange={handleHoursChange}
              style={{ width: "100%", marginBottom: "16px"}}
              disabled={!selectedDate}
              options={getAvailableHours()}
            />

            <RequiredLabel>Select Field Option</RequiredLabel> 
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
              style={{ marginTop: "20px", backgroundColor:'#abfd13', color:'#090909', width:'100px', fontWeight: 'bold', fontSize: '18px' }}
            >
              RENT
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
        <Footer
          style={{
            textAlign: "center",
            background: "#090909",
            borderTop: "1px solid #ddd",
            padding: "12px 24px",
            fontSize: "14px",
            color: "#abfd13",
            position: "relative", // Gunakan relative untuk posisi footer
          }}
        >
          Copyright © 2024 RentField.com - Powered by CodeBlue Universitas
          Pendidikan Ganesha
        </Footer>
    </Layout>
  </Layout>
);
};

export default ListLapangan;