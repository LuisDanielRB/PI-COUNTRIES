import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, continent }) {
  return (
    <>
      <div className="divCard">
        <div className="divInnerCardHalf">
          <img className="divImage" src={image} alt="" />
        </div>
        <div className="divInnerCardHalf">
          <div className="divName">{name}</div>
          <p className="pInfo">{continent}</p>
          <div className="linkDetail">
            <Link to={`/country/${id}`}>
              <button className="linkButton">DETALLE</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
