import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountries,
  filterByContinent,
  orderByName,
  orderByPopulation,
  getActivities,
  filterActivities,
} from "../actions";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import NavBar from "./NavBar";

export default function Home() {
  const dispatch = useDispatch();

  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countries);
  const countriesFormated = useSelector((state) => state.countriesFormated);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countriesFormated.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pagination = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  const handleContinetsSort = (e) => {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
  };

  const handleNameSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    // console.log(countriesFormated);
    // console.log(currentCountries);
  };

  const handlePopSort = (e) => {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
  };

  const handleActivity = (e) => {
    e.preventDefault();
    dispatch(filterActivities(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!countries.lenght) dispatch(getCountries());
    if (!countriesFormated.lenght) dispatch(getCountries());
    if (!activities.lenght) dispatch(getActivities());
  }, [dispatch]);

  const continents = countries?.map((country) => country.continent);
  // const allContinents = continents.filter((continent, index) => {
  //   return continents.indexOf(continent) === index;
  // });
  const allContinents = [...new Set(continents)];

  return (
    <>
      <div className="divHomeImageBg">
        <NavBar />

        <div className="divHero">
          <div className="divHeroHalf">
            <h1>
              Find Your Next Activity,
              <br />
              Discover New Places
            </h1>
          </div>
          <div className="divHeroHalf"></div>
        </div>
      </div>

      {/* <div className="divTop">
        <Link to="/activity/create">
          <button className="buttonCreate">Create Activity</button>
        </Link>
      </div> */}

      <div className="filterContainer">
        <div className="divSelects">
          <select className="select" onChange={(e) => handleContinetsSort(e)}>
            <option value="All">All Continents</option>
            {allContinents &&
              allContinents.map((continent) => {
                return (
                  <option key={continent} value={continent}>
                    {continent}
                  </option>
                );
              })}
          </select>

          <select className="select" onChange={(e) => handleNameSort(e)}>
            <option value="All">Alphabetic Order</option>
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>

          <select className="select" onChange={(e) => handlePopSort(e)}>
            <option value="All">Population Order</option>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest </option>
          </select>

          <select className="select" onChange={(e) => handleActivity(e)}>
            <option value="All">Select Activity</option>
            {activities &&
              activities.map((activity) => {
                return (
                  <option key={activity.id} value={activity.name}>
                    {activity.name}
                  </option>
                );
              })}
          </select>
        </div>

        <SearchBar />
      </div>

      <Pagination
        allCountries={countriesFormated.length}
        pagination={pagination}
        currentPage={currentPage}
        countriesPerPage={countriesPerPage}
      />

      <div className="divCards" id="cards">
        {currentCountries.length === 0 ? (
          <Spinner />
        ) : (
          currentCountries?.map((country) => {
            return (
              <Card
                key={country.id}
                id={country.id}
                name={country.name}
                image={country.image}
                continent={country.continent}
              />
            );
          })
        )}
      </div>
      <footer>
        <Pagination
          allCountries={countriesFormated.length}
          pagination={pagination}
          currentPage={currentPage}
          countriesPerPage={countriesPerPage}
        />
      </footer>
    </>
  );
}
