import React, { useState, useEffect } from "react";
import "./ActivityCreate.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, createActivity } from "../actions";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [select, setSelect] = useState({
    countries: [],
  });

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    e.preventDefault();
    setInput({ ...input, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input);
    dispatch(createActivity(input));
    setSelect({
      countries: [],
    });
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  }

  function handleSelect(e) {
    const { value } = e.target;
    const country = countries.filter((country) => country.name === value);
    if (value && !select.countries.includes(value)) {
      setSelect({ countries: [value, ...select.countries] });
      setInput({
        ...input,
        countries: [country[0].name, ...input.countries],
      });
    }
  }

  function handleDeleteCountry(e) {
    e.preventDefault();
    const { value } = e.target;
    const countryId = countries.filter((country) => country.name === value);
    // console.log(countryId);
    if (value && select.countries.includes(value)) {
      const newCountrySelect = select.countries.filter(
        (country) => country !== value
      );
      const newCountryInput = input.countries.filter(
        (name) => name !== countryId[0].name
      );
      setSelect({ countries: newCountrySelect });
      setInput({
        ...input,
        countries: newCountryInput,
      });
    }
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <>
      <div className="createContainer">
        <NavBar />
        <div className="backButton">
          <Link to="/home">
            <button className="backButton">GO BACK</button>
          </Link>
        </div>

        <div className="divContainer">
          <div className="form" onSubmit={(e) => handleSubmit(e)}>
            <h2>Create a New Acitivty</h2>
            <div className="divInput">
              <label className="labelName">Name</label>
              <input
                className="inputName"
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="name"
              />
            </div>

            <div className="divInput">
              <label className="labelDifficulty">Activity Difficulty</label>
              <select name="difficulty" onChange={(e) => handleInputChange(e)}>
                <option value="">Select a difficulty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="divInput">
              <label className="labelDuration">Duration</label>
              <input
                className="inputDuration"
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="duration"
              />
            </div>

            <div className="divInput">
              <label className="labelSeason">Season</label>
              <select name="season" onChange={(e) => handleInputChange(e)}>
                <option value="">Select a season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Autumn">Autum</option>
              </select>
            </div>

            <div className="divInput">
              <select
                name="activities"
                onChange={(e) => handleSelect(e)}
                id="activities"
              >
                <option value="">Add a Country</option>
                {countries &&
                  countries.map((country) => {
                    return (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="divCountries">
              {select.countries == 0 ? (
                <div className="noDivSelect">Select the Countries</div>
              ) : (
                select.countries?.map((country) => {
                  return (
                    <div className="containerCountries" key={country}>
                      <p className="pCountries">{country}</p>
                      <button
                        className="buttonCountries"
                        type="button"
                        value={country}
                        onClick={(e) => handleDeleteCountry(e)}
                      >
                        X
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="divSubmit">
          <button
            className="button"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Create Activity
          </button>
        </div>
      </div>
    </>
  );
}
