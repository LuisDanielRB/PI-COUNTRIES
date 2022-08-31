import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="navbarContainer">
        <div className="navbarLogo">
          <p>
            E X P L O R E <span>🌏</span>
          </p>
        </div>
        <div className="navbarLinks">
          <NavLink to="/home" activeClassName="navbarLinkSelected">
            <p>Countries</p>
          </NavLink>
          <NavLink to="/activity/create" activeClassName="navbarLinkSelected">
            <p>Activities</p>
          </NavLink>
          <NavLink to="/aboutus" activeClassName="navbarLinkSelected">
            <p>About Us</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
