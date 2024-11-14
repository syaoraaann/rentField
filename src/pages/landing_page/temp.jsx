import React from 'react';
import { useState, useEffect } from "react";
import { Settings, Edit, MoreHorizontal } from 'lucide-react';
import { Layout, Button, Row, Col, Typography, Form, Input, Avatar, Card } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import "../../pages/landing_page/index.css";
import rentfield1 from "../../assets/images/rentfield1.png";
import rentfieldlogo from "../../assets/images/rentfieldlogo.png";
import ourteam from "../../assets/images/ourteam.png";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - 100 && 
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Header>
        <div>
          <img
            src={rentfieldlogo}
            alt="RentField Logo"
            style={{ maxWidth: "55px", width: "100%", borderRadius: "60px"}}
          />
          <span className="text-xl font-bold">RentField</span>
        </div>

        <div>
          <nav className="header-col header-nav">
            <button
              onClick={() => scrollToSection('home')}
              className={`px-4 py-2 ${activeSection === 'home' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`px-4 py-2 ${activeSection === 'about' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={`px-4 py-2 ${activeSection === 'services' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-4 py-2 ${activeSection === 'contact' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Contact
            </button>
          </nav>
        </div>
        
        

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Login
        </button>
      </Header>

      <main className="pt-16">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
          <div className="text-center max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Sewa Lapangan Jadi Lebih Mudah</h1>
            <p className="text-xl mb-8">
              Selamat datang di platform sewa lapangan terlengkap! Nikmati kemudahan dalam mencari 
              dan memesan lapangan favorit untuk berbagai jenis olahraga.
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-md text-lg font-semibold hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center p-8 bg-white">
          <div className="max-w-6xl w-full grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-4xl font-bold mb-8">About Us</h2>
              <p className="text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris.
              </p>
            </div>
            <div>
              <img
                src="/api/placeholder/600/400"
                alt="About Us"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="min-h-screen p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="/api/placeholder/400/250" 
                    alt={`Service ${item}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <img
                        src="/api/placeholder/40/40"
                        alt="avatar"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-semibold">Service {item}</h3>
                        <p className="text-gray-600">This is the description of the service</p>
                      </div>
                    </div>
                    <div className="flex justify-around pt-4 border-t">
                      <button className="p-2 hover:text-blue-600">
                        <Settings size={20} />
                      </button>
                      <button className="p-2 hover:text-blue-600">
                        <Edit size={20} />
                      </button>
                      <button className="p-2 hover:text-blue-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center p-8 bg-blue-600 text-white">
          <div className="text-center max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
            <p className="text-xl mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100">
                Send Message
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-blue-700">
                Call Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center bg-gray-800 text-white p-6">
        <p>Copyright © 2024 RentField.com - All rights reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;

