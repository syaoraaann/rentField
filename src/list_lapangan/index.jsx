import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Drawer,
  Card,
  Menu,
  Select,
  DatePicker,
  notification,
} from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";

const { Title, Text } = Typography;
const { Meta } = Card;
const { Header, Content, Sider } = Layout;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isRentButtonVisible, setIsRentButtonVisible] = useState(false);

  const fields = [
    {
      id: 1,
      name: "Singaraja Futsal",
      category: "Soccer Field",
      address: "Jl. Udayana, Banjar Jawa, Kec. Buleleng, Kabupaten Buleleng, Bali 81113",
      imageUrl: "https://fastly.4sqi.net/img/general/600x600/58082938_ZBAJ3Wcn-B_m8pP16l42N0uVIgxWSdnNIQG36_ff0Nk.jpg",
      price: 50000,
    },
    {
      id: 2,
      name: "GOR Bulutangkis UNDIKSHA",
      category: "Badminton Field",
      address: "GOR BULUTANGKIS UNDIKSHA, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81116",
      imageUrl: "https://cdn.undiksha.ac.id/wp-content/uploads/2022/09/01123108/GOR-Bulutangkis-Undiksha.jpg",
      price: 70000,
    },
    {
      id: 3,
      name: "Lapangan Basket GOR Bhuana Patra",
      category: "Basketball Field",
      address: "Jl. Udayana No.6, Banjar Tegal, Kec. Buleleng, Kabupaten Buleleng, Bali 81114",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlo9Y32JrsrMnXiPbH9Xzfbf8126C2Q1Kpkg&s",
      price: 80000,
    },
  ];

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

  const handleMenuClick = (key) => {
    if (key === "dashboard") {
      navigate("/dashboard");
    }
  };

  const handleHoursChange = (value) => {
    setSelectedHours(value);
    calculateTotal(value.length, selectedField.price, selectedFieldOption);
  };

  const handleFieldOptionChange = (value) => {
    setSelectedFieldOption(value);
    setIsRentButtonVisible(true);
    calculateTotal(selectedHours.length, selectedField.price, value);
  };

  const calculateTotal = (hours, pricePerHour, fieldOption) => {
    let subtotalValue = hours * pricePerHour;
    let additionalChargeValue = 0;

    // Only apply additional charge for Field 2 VIP
    if (fieldOption === "Field 2 VIP") {
      additionalChargeValue = 20000 * hours;
    }
    // No additional charge for Field 1 and Field 3 (they are standard)

    let taxValue = (subtotalValue + additionalChargeValue) * 0.1; // 10% Tax
    let totalValue = subtotalValue + additionalChargeValue + taxValue;

    setSubtotal(subtotalValue);
    setAdditionalCharge(additionalChargeValue);
    setTax(taxValue);
    setTotal(totalValue);
    setTotalHarga(totalValue);
  };

  const handleRent = () => {
    notification.success({
      message: "Field Order Success",
      description: "Payment Page will be updated soon",
    });
    closeDrawer();
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => (
    <Option key={i} value={`${i}:00 - ${i + 1}:00`}>
      {`${i}:00 - ${i + 1}:00`}
    </Option>
  ));

  const filteredFields = fields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? field.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ backgroundColor: "#f0f2f5" }}>
        <div className="logo" style={{ padding: "20px", textAlign: "center" }}>
          <Title level={3} style={{ color: "#52c41a" }}>Rent Field</Title>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["list"]}
          style={{ height: "100%" }}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            { key: "dashboard", label: "Dashboard" },
            { key: "list", label: "Field List" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ backgroundColor: "#fff", padding: 0, height: "120px" }}>
          <Title
            level={1}
            style={{
              paddingLeft: "20px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              marginTop: "20px",
              color: "#375D22",
              fontSize: "60px"
            }}
          >
            {selectedField ? `Order Field ${selectedField.name}` : "Available Fields at Singaraja"}
          </Title>
        </Header>

        <Content style={{ margin: "20px", padding: "20px", backgroundColor: "#fff" }}>
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
                style={{ height: '450px', display: 'flex', flexDirection: 'column' }} // Add fixed height to card
                cover={
                  <img
                    alt={field.name}
                    src={field.imageUrl}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    onClick={() => showDrawer(field)}
                    style={{ backgroundColor: "#D8E795", color: "#000000"}}
                  >
                    Rent
                  </Button>
                ]}
              >
                <Meta 
                  title={<Text strong style={{ fontSize: '18px' }}>{field.name}</Text>}
                  description={
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px',
                      height: '120px', // Fixed height for description area
                    }}>
                      <Text strong style={{ color: '#000000', fontStyle: "italic" }}>{field.category}</Text>
                      <Text strong style={{ color: '#375D22', fontStyle: "bold" }}>
                        Price /Hr: Rp {field.price.toLocaleString()}
                      </Text>
                      <Text 
                        type="secondary" 
                        style={{ 
                          fontSize: '12px',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2, // Limits text to 2 lines
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {field.address}
                      </Text>
                    </div>
                  } 
                />
              </Card>
              </Col>
            ))}
          </Row>

          <Drawer
            title={`Order Field ${selectedField?.name || ''}`}
            placement="right"
            width={320}
            onClose={closeDrawer}
            open={drawerVisible}
          >
            <img
              src={selectedField?.imageUrl}
              alt={selectedField?.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "16px" }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <Text strong>Name: {selectedField?.name}</Text>
              <Text strong>Price /Hr: Rp {selectedField?.price.toLocaleString()}</Text>
              <Text strong style={{ wordBreak: 'break-word' }}>Address: {selectedField?.address}</Text>
            </div>

            <Text strong style={{ display: "block", marginBottom: "8px" }}>
              Select Date:
            </Text>
            <DatePicker onChange={(date) => setSelectedDate(date)} style={{ marginBottom: "16px", width: "100%" }} />

            <Text strong style={{ display: "block", marginBottom: "8px" }}>
              Select Hours:
            </Text>
            <Select
              mode="multiple"
              onChange={handleHoursChange}
              style={{ width: "100%", marginBottom: "16px" }}
            >
              {hourOptions}
            </Select>

            <Text strong style={{ display: "block", marginBottom: "8px" }}>
              Select Field Option:
            </Text>
            <Select
              onChange={handleFieldOptionChange}
              style={{ width: "100%", marginBottom: "16px" }}
              placeholder="Select an option"
              value={selectedFieldOption}
            >
              <Option value="Field 1">Field 1 (Standard)</Option>
              <Option value="Field 2 VIP">Field 2 VIP (+ Rp 20,000/hour)</Option>
              <Option value="Field 3">Field 3 (Standard)</Option>
            </Select>

            <Button
              type="primary"
              onClick={handleRent}
              disabled={!selectedHours.length || !selectedFieldOption}
              style={{ backgroundColor: "#D8E795", color: "#000000"}}
            >
              Rent Now
            </Button>

            {isRentButtonVisible && (
              <div style={{ marginTop: "16px" }}>
                <Text strong style={{ display: "block" }}>
                  Subtotal: Rp {subtotal.toLocaleString()}
                </Text>
                <Text strong style={{ display: "block" }}>
                  Additional Charge: Rp {additionalCharge.toLocaleString()}
                </Text>
                <Text strong style={{ display: "block" }}>
                  Tax (10%): Rp {tax.toLocaleString()}
                </Text>
                <Text strong style={{ display: "block", fontSize: "16px", color: "#52c41a" }}>
                  Total: Rp {total.toLocaleString()}
                </Text>
              </div>
            )}
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListLapangan;