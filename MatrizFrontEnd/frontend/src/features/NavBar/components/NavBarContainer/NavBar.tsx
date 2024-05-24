import React from "react";
import HasuLogo from "../../../../assets/hasuLogo.png";
import "./NavBar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export const NavBar: React.FC = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <h1 className="navbar-logo-title">Matriz Legal</h1>
      </div>
      <div className="navbar-items-list">
        <div className="navbar-item"></div>
        <div className="navbar-item"></div>
        <div className="navbar-item">
          <AccountCircleIcon sx={{ color: "white", fontSize: "40px" }} />
          <ArrowDropDownIcon sx={{ color: "white", fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
};
