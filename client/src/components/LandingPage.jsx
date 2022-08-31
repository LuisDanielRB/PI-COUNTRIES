import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <React.Fragment>
      <div className="divContenedor">
        <div className="divCentro">
          <img
            src="https://geoguessr.com/seterra/images/system/world-countries.png"
            alt="imagen del mundo"
          />
          <h1>Proyecto Individual Henry Countries </h1>
          <Link to="/home">
            <button className="buttonLanding">ENTRAR</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
