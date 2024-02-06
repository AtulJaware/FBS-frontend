import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

const sidebarStyles = {
  position: "fixed",
  top: "0",
  left: "-250px",
  height: "100%",
  width: "250px",
  backgroundColor: "#111",
  // overflowX: "hidden",
  transition: "0.5s",
  padding: "10px 20px",
  color: "white",
  display: "flex",
  flexDirection: "column", // added for flexbox layout
  justifyContent: "space-between", // distribute space between items
  textAlign: "left",
  zIndex: "1",
};

const openStyles = {
  left: "0",
};

function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const appliedStyles = isOpen ? { ...sidebarStyles, ...openStyles } : sidebarStyles;

  const userDetails = JSON.parse(localStorage.getItem("AdminData"));

  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: "home icon", navigateTo: "/adminpage" },
    { name: "About", icon: "world icon", navigateTo: "/aboutUs" },
    { name: "Users", icon: "users icon", navigateTo: "/users" },
    { name: "Flights", icon: "plane icon", navigateTo: "/flights" },
  ];

  const logout = () => {
    if (userDetails !== null) {
      localStorage.clear();
      navigate("/home");
    }
  };

  return (
    <div style={appliedStyles}>
      <div>
        <div>
          <button onClick={() => setIsOpen(!isOpen)} style={{ marginLeft: "240px" }}>
            {isOpen ? <i class="close icon black"></i> : <i class="list icon black"></i>}
          </button>
        </div>
        <div style={{ marginTop: "-20px" }}>
          <h2 className="heading">Admin Menu</h2>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} onClick={() => setSelectedIndex(index)} style={window.location.pathname === item.navigateTo ? { boxShadow: "0px 0px 10px #eee" } : {}}>
                <Link to={item.navigateTo}>
                  <i className={item.icon}></i>
                  <span style={{ marginLeft: "10px" }}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <i className="signout sign-out icon"></i>
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
}

export default Sidebar;
