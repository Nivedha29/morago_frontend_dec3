import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "./../assets/home.svg"
import phoneIcon from "./../assets/phone.svg";
import messageIcon from "./../assets/message.svg";
import profileIcon from "./../assets/profile.svg";

import "./../styles/MobileBottomNav.css";

const MobileBottomNav = ({ activeTab = "home" }) => {
  const navigate = useNavigate();

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: homeIcon,
      path: "/translator/home",
    },
    {
      key: "calls",
      label: "My calls",
      icon: phoneIcon,
      path: "/translator/my-calls",
    },
    {
      key: "messages",
      label: "Messages",
      icon: messageIcon,
      path: "/translator/messages",
    },
    {
      key: "profile",
      label: "Profile",
      icon: profileIcon,
      path: "/translator/profile",
    },
  ];

  return (
    <div className="mobile-bottom-nav">
      {navItems.map((item) => {
        const isActive = activeTab === item.key;

        return (
          <button
            key={item.key}
            type="button"
            className={`mobile-bottom-nav__item ${
              isActive ? "mobile-bottom-nav__item--active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`mobile-bottom-nav__icon ${
                isActive ? "mobile-bottom-nav__icon--active" : ""
              }`}
            />
            <span className="mobile-bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
