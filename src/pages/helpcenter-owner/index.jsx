import React from "react";
import "./index.css";
import bgImage from "../../assets/images/bgnew.jpg";
import SideNavOwner from "../dashboardowner/sidenavowner";
import {
  Input,
  Layout
} from "antd";
import {
  SearchOutlined
} from "@ant-design/icons";

const HelpCenterOwner = () => {
  const handleSearch = (value) => {
    // Add your search functionality here
    console.log(value);
  };

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
      <SideNavOwner />
      <Layout.Content style={{ marginLeft: 250, padding:'0 48px' }}>
        <div className="help-center-nab">
          <h1 className="header">How Can We Help You?</h1>
          <div className="search-bar-nab">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Input search text"
              allowClear
              size="large"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          <div className="content-grid-nab">
            <div className="card">
              <h2>Getting Started</h2>
              <p>
                Follow the initial setup guide to start add fields and book
                fields here. Get an overview of RentField platform and features, and
                learn ways that you can promote your fields here.
              </p>
            </div>
            
            <div className="card">
              <h2>FAQ (Frequently Asked Questions)</h2>
              <div className="card-content-nab">
                <div className="faq-section-nab">
                  <p><b>For Owners:</b></p>
                  <ul>
                    <li>How to register as the field owner?</li>
                    <li>How to upload the details of the fields?</li>
                    <li>How about the payment system works?</li>
                  </ul>
                </div>
                <div className="faq-section-nab">
                  <p><b>For Renters:</b></p>
                  <ul>
                    <li>How to book the field?</li>
                    <li>How to cancel my bookings?</li>
                    <li>How about the cancellation policy?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Privacy Policy</h2>
              <ul>
                <li>Cancellation and refund policy.</li>
                <li>Platform terms of use.</li>
                <li>User and data privacy.</li>
                <li>Regulatory.</li>
              </ul>
            </div>

            <div className="card">
              <h2>Still Can't Find What You Need?</h2>
              <div className="contact-info-nab">
                <p>Contact Us through:</p>
                <p>Email: <a href="mailto:rentfield@gmail.com" className="email-link-nab">rentfield@gmail.com</a></p>
                <p>Phone: (+62) 83111274549</p>
                <p>Address: Udayana St. 20, Singaraja</p>
              </div>
            </div>
          </div>

          <footer className="footer-nab">
            <p>Copyright © 2024 RentField.com - Powered by CodeBlue Universitas Pendidikan Ganesha</p>
          </footer>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default HelpCenterOwner;