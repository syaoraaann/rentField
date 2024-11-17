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
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import SideNav from "../sidenav";
import "@fontsource/poppins";

const { Title, Text } = Typography;
const { Meta } = Card;
const { Header, Content } = Layout;
const { Option } = Select;

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
      name: "Singaraja Futsal",
      category: "Soccer Field",
      address: "Jl. Udayana, Banjar Jawa, Kec. Buleleng, Kabupaten Buleleng, Bali 81113",
      imageUrl: "https://fastly.4sqi.net/img/general/600x600/58082938_ZBAJ3Wcn-B_m8pP16l42N0uVIgxWSdnNIQG36_ff0Nk.jpg",
      basePrice: 50000,
      operatingHours: {
        start: 0, // 24 hours
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
      name: "GOR Bulutangkis UNDIKSHA",
      category: "Badminton Field",
      address: "GOR BULUTANGKIS UNDIKSHA, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81116",
      imageUrl: "https://cdn.undiksha.ac.id/wp-content/uploads/2022/09/01123108/GOR-Bulutangkis-Undiksha.jpg",
      basePrice: 70000,
      operatingHours: {
        start: 7, // 07:00
        end: 23, // 23:00
      },
      fieldOptions: [
        { name: "Standard", additionalCharge: 0 },
        { name: "Tournament", additionalCharge: 30000 }
      ]
    },
    {
      id: 3,
      name: "Lapangan Basket GOR Bhuana Patra",
      category: "Basketball Field",
      address: "Jl. Udayana No.6, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81114",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlo9Y32JrsrMnXiPbH9Xzfbf8126C2Q1Kpkg&s",
      basePrice: 80000,
      operatingHours: {
        start: 7, // 07:00
        end: 23, // 23:00
      },
      fieldOptions: [
        { name: "Basic", additionalCharge: 0 },
        { name: "Pro", additionalCharge: 20000 },
        { name: "Elite", additionalCharge: 40000 }
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
        <Text strong style={{ fontSize: "18px" }}>
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
          <Text strong style={{ color: "#000000", fontStyle: "italic" }}>
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
            }}
          >
            {field.address}
          </Text>
        </div>
      }
    />
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

        <Content style={{ margin: "10px", padding: "20px", backgroundColor: "#fff" }}>
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
                style={{ width: 200 }}
                value={selectedCategory}
              >
                <Option value="">All Categories</Option>
                <Option value="Soccer Field">Soccer Field</Option>
                <Option value="Badminton Field">Badminton Field</Option>
                <Option value="Basketball Field">Basketball Field</Option>
              </Select>
            </Col>
          </Row>

          <Row gutter={16}>
        {filteredFields.map((field) => (
          <Col span={8} key={field.id} style={{ marginBottom: "16px" }}>
            <Card
              hoverable
              style={{
                height: "450px",
                display: "flex",
                flexDirection: "column",
              }}
              cover={
                <img
                  alt={field.name}
                  src={field.imageUrl}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
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
            <img
              src={selectedField?.imageUrl}
              alt={selectedField?.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <Text strong style={{ fontSize: "18px" }}>
              {`Rent ${selectedField?.name}`}
            </Text>
            <Text type="secondary" style={{ display: "block", marginBottom: "16px" }}>
              {selectedField?.address}
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