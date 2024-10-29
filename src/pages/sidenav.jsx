import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  HistoryOutlined,
  FieldTimeOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  TrophyOutlined,
  ScheduleOutlined
} from "@ant-design/icons";

function Sidenav({ color = "#1890ff" }) {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const menuItems = [
    {
      key: "/dashboard",
      label: (
        <NavLink to="/dashboard">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "dashboard" ? "#f0f2f5" : "",
            }}
          >
            <DashboardOutlined />
          </span>
          <span className="label">Dashboard</span>
        </NavLink>
      ),
    },
    {
      key: "/list",
      label: (
        <NavLink to="/list">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "list" ? "#f0f2f5" : "",
            }}
          >
            <FieldTimeOutlined />
          </span>
          <span className="label">Rent a Field!</span>
        </NavLink>
      ),
    },
    {
      key: "1",
      label: "User Management",
      className: "menu-item-header",
    },
    {
      key: "/profile",
      label: (
        <NavLink to="/profile">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "profile" ? "#f0f2f5" : "",
            }}
          >
            <UserOutlined />
          </span>
          <span className="label">Profile</span>
        </NavLink>
      ),
    },
    {
      key: "/mypoint",
      label: (
        <NavLink to="/mypoint">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "mypoint" ? "#f0f2f5" : "",
            }}
          >
            <TrophyOutlined />
          </span>
          <span className="label">My Point</span>
        </NavLink>
      ),
    },
    {
      key: "/history",
      label: (
        <NavLink to="/history">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "history" ? "#f0f2f5" : "",
            }}
          >
            <HistoryOutlined />
          </span>
          <span className="label">History</span>
        </NavLink>
      ),
    },
    {
      key: "/calendar",
      label: (
        <NavLink to="/calendar">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "calendar" ? "#f0f2f5" : "",
            }}
          >
            <CalendarOutlined />
          </span>
          <span className="label">Calendar</span>
        </NavLink>
      ),
    },
    {
      key: "/event",
      label: (
        <NavLink to="/event">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "event" ? "#f0f2f5" : "",
            }}
          >
            <ScheduleOutlined />
          </span>
          <span className="label">Event</span>
        </NavLink>
      ),
    },
    {
      key: "2",
      label: "Help Center",
      className: "menu-item-header",
    },
    {
      key: "/settings",
      label: (
        <NavLink to="/settings">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "settings" ? "#f0f2f5" : "",
            }}
          >
            <SettingOutlined />
          </span>
          <span className="label">Settings</span>
        </NavLink>
      ),
    },
    {
      key: "/help",
      label: (
        <NavLink to="/help">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "help" ? "#f0f2f5" : "",
            }}
          >
            <QuestionCircleOutlined />
          </span>
          <span className="label">Help Center</span>
        </NavLink>
      ),
    },
    {
      key: "/logout",
      label: (
        <NavLink to="/logout">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "logout" ? "#f0f2f5" : "",
            }}
          >
            <LogoutOutlined />
          </span>
          <span className="label">Logout</span>
        </NavLink>
      ),
    },
  ];

  const handleMenuKey = ({ key }) => {
    setSelectedKey(key.replace('/', ''));
  };

  return (
    <>
      <div className="brand">
        <span>RentField</span>
      </div>
      <hr />
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        defaultSelectedKeys={[selectedKey]}
        onSelect={handleMenuKey}
      />
      <style jsx="true">{`
        .brand {
          padding: 20px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: ${color};
        }
        hr {
          margin: 0;
          border: 0;
          border-top: 1px solid #f0f2f5;
        }
        .menu-item-header {
          padding: 12px 24px;
          color: #8c8c8c;
          font-size: 12px;
          cursor: default;
          pointer-events: none;
        }
        .icon {
          min-width: 36px;
          padding: 8px;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          margin-right: 8px;
        }
        .label {
          font-size: 14px;
        }
        :global(.ant-menu-item-selected .icon) {
          background-color: #f0f2f5;
        }
        :global(.ant-menu-item:hover .icon) {
          background-color: #f0f2f5;
        }
        :global(.ant-menu-item) {
          display: flex;
          align-items: center;
          padding: 12px 24px !important;
          margin: 4px 0;
        }
        :global(.ant-menu-item a) {
          display: flex;
          align-items: center;
          color: inherit;
        }
      `}</style>
    </>
  );
}

export default Sidenav;