const axios = require("axios");
const { Activity } = require("../db");

const getCountriesApi = async () => {
  const apiInfo = axios.get("https://restcountries.com/v3.1/all");
  const formatedApi = (await apiInfo).data.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      image: country.flags.svg,
      continent: country.continents ? country.continents.join(", ") : "None",
      capital: country.capital ? country.capital.join(", ") : "None",
      subregion: country.subregion ? country.subregion : "None",
      area: country.area,
      population: country.population,
    };
  });
  // console.log(formatedApi);
  return formatedApi;
};

const getById = async (id) => {
  return await Activity.findByPk(id);
};

module.exports = {
  getCountriesApi,
  getById,
};
