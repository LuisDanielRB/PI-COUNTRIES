import React, { useState, useEffect } from "react";
import "./ActivityCreate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  createActivity,
  getActivities,
  deleteActivity,
} from "../actions";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function ActivityCreate() {
  const whiteStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svgDifficulty"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );

  const blackStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svgDifficulty"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

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
    setInput({ ...input, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name === "" ||
      input.difficulty === "" ||
      input.duration < 0 ||
      input.season === "" ||
      input.countries.length < 1
    ) {
      alert("Invalid fields, please try again");
    } else {
      dispatch(createActivity(input));
      alert(`Activity ${input.name} created!`);
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
      document.getElementById("form").reset();
    }
    // redirigir al home?
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

  function rating(number) {
    switch (number) {
      case "1":
        return (
          <div className="activityDifficulty">
            <div className="divSvg">
              {blackStar}
              {whiteStar}
              {whiteStar}
              {whiteStar}
              {whiteStar}
            </div>
            <p>DIFFICULTY</p>
          </div>
        );
      case "2":
        return (
          <div className="activityDifficulty">
            <div>
              {blackStar}
              {blackStar}
              {whiteStar}
              {whiteStar}
              {whiteStar}
            </div>

            <p>DIFFICULTY</p>
          </div>
        );
      case "3":
        return (
          <div className="activityDifficulty">
            <div>
              {blackStar}
              {blackStar}
              {blackStar}
              {whiteStar}
              {whiteStar}
            </div>

            <p>DIFFICULTY</p>
          </div>
        );
      case "4":
        return (
          <div className="activityDifficulty">
            <div>
              {blackStar}
              {blackStar}
              {blackStar}
              {blackStar}
              {whiteStar}
            </div>

            <p>DIFFICULTY</p>
          </div>
        );
      case "5":
        return (
          <div className="activityDifficulty">
            <div>
              {blackStar}
              {blackStar}
              {blackStar}
              {blackStar}
              {blackStar}
            </div>
            <p>DIFFICULTY</p>
          </div>
        );

      default:
        break;
    }
  }

  function handleDelete(e, id) {
    e.preventDefault();
    // console.log(id);
    dispatch(deleteActivity(id));
  }

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
          <form className="form" id="form">
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
                <option value="" hidden>
                  Select a difficulty
                </option>
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
                <option value="" hidden>
                  Select a season
                </option>
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
              {select.countries === 0 ? (
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
          </form>
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

        <br />

        <h3>Activities</h3>
        <div className="detailContainer">
          <div className="activitiesSection">
            {activities ? (
              activities.map((activity) => {
                return (
                  <div className="activityCard" key={activity.id}>
                    <p>{activity.name}</p>
                    {rating(activity.difficulty)}
                    <p> {activity.duration} Minutes</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svgDifficulty"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>{activity.season}</p>
                    <button onClick={(e) => handleDelete(e, activity.id)}>
                      DELETE
                    </button>
                  </div>
                );
              })
            ) : (
              <div>No Activities... Yet!</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
