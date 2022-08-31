import React, { useEffect } from "react";
import "./CountryDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function CountryDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const country = useSelector((state) => state.detail);

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

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

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

  function season(season) {}

  return (
    <>
      <NavBar />
      <div className="backButton">
        <Link to="/home">
          <button className="backButton">GO BACK</button>
        </Link>
      </div>

      <div className="detailContainer">
        <div className="detailCard">
          <div className="detailImage">
            <img src={country.image} alt="" />
          </div>
          <div className="detailInfo">
            <div className="detailCountryInfo">ID {country.id}</div>
            <div className="detailCountryInfo">{country.name}</div>
            <div className="detailCountryInfo">{country.continent}</div>
            <div className="detailCountryInfo">Capital: {country.capital}</div>
            <div className="detailCountryInfo">
              Subregion: {country.subregion}
            </div>
            <div className="detailCountryInfo">Area: {country.area} km2</div>
            <div className="detailCountryInfo">
              Population: {country.population}
            </div>
          </div>
        </div>
      </div>

      <h3>Activities:</h3>
      <div className="detailContainer">
        <div className="detailActivities">
          {country.activities?.map((activity) => {
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
