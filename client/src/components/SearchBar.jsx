import React, { useState } from "react";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState();

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryByName(name));
  };

  return (
    <>
      <div className="divContenedorSearch">
        <div className="divSearch">
          <input
            className="input"
            type="text"
            placeholder="Search"
            onChange={(e) => handleInputChange(e)}
          />
          <button
            className="button"
            onClick={(e) => handleClickSubmit(e)}
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
