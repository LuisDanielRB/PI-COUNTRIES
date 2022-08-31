const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getCountriesApi } = require("../controllers");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const countryRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// RUTA GET ALL - DONE!
countryRouter.get("/", async (req, res) => {
  const { name } = req.query;
  const countriesApi = await getCountriesApi();
  const countries = await Country.findAll({
    include: { model: Activity, as: "activities" },
  });
  try {
    if (!countries.length) {
      await Country.bulkCreate(countriesApi);
      // countriesApi.forEach(
      //   async ({
      //     id,
      //     name,
      //     image,
      //     continent,
      //     capital,
      //     subregion,
      //     area,
      //     population,
      //   }) => {
      //     await Country.findCreateFind({
      //       where: {
      //         id: id,
      //         name: name,
      //         image: image,
      //         continent: continent,
      //         capital: capital,
      //         subregion: subregion,
      //         area: area,
      //         population: population,
      //       },
      //     });
      //   }
      // );
    }
    if (name) {
      const countryFound = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      countryFound.length
        ? res.status(200).send(countryFound)
        : res.status(404).send("Country not found");
    } else {
      const countriesExist = await Country.findAll({
        include: { model: Activity, as: "activities" },
      });
      res.status(200).send(countriesExist);
    }
  } catch (error) {
    console.log(error);
  }
});

// RUTA GET ID - DONE!
countryRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const countryId = await Country.findByPk(id, {
        include: { model: Activity, as: "activities" },
      });
      !countryId
        ? res.status(404).send("Country not found")
        : res.status(200).json(countryId);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = countryRouter;
