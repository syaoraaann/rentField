import React from "react";
import "../../pages/helpcenter/index.css";
import {
    Input,
  } from "antd";
  import {
    SearchOutlined
  } from "@ant-design/icons";

const HelpCenter = () => {
  return (
    <div className="help-center">
      <h1 className="header">How Can We Help You?</h1>
      <div className="search-bar">
      <Input
          prefix={<SearchOutlined />}
          placeholder="Input search text"
          allowClear
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
        />

      </div>
      <div className="content-grid">
        <div className="card">
          <h2>Getting Started</h2>
          <p>
            Follow the initial setup guide to start renting fields and book
            fields here. Get an overview of RentField platform and features, and
            learn ways that you can promote your fields here.
          </p>
        </div>
        <div className="card">
          <h2>FAQ (Frequently Asked Questions)</h2>
          <p><b>For Owners:</b></p>
          <ul>
            <li>How to register as the field owner?</li>
            <li>How to upload the details of the fields?</li>
            <li>How about the payment system works?</li>
          </ul>
          <p><b>For Renters:</b></p>
          <ul>
            <li>How to book the field?</li>
            <li>How to cancel my bookings?</li>
            <li>How about the cancellation policy?</li>
          </ul>
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
          <p>Contact Us:</p>
          <p>Email: <a href="mailto:rentfield@gmail.com">rentfield@gmail.com</a></p>
          <p>Phone: (+62) 83111274549</p>
          <p>Address: Udayana St. 20, Singaraja</p>
        </div>
      </div>
      <footer className="footer">
        <p>Copyright © 2024 RentField.com - Powered by CodeBlue Universitas Pendidikan Ganesha</p>
        {/* <div className="social-links">
          <a href="#">LinkedIn</a> | <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">YouTube</a>
        </div> */}
      </footer>
    </div>
  );
};

export default HelpCenter;
