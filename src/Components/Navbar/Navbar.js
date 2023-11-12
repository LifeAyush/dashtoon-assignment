import React from "react";
import "./navbar.css";
import dashtoonLogo from "../../Assets/dashtoon-logo.png";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-title">
        <img src={dashtoonLogo} alt="Logo" className="nav-logo" />
        <span className="nav-title">DASHTOON COMIC CREATOR</span>
      </div>
    </div>
  );
};

export default Navbar;
