const { Router } = require("express");
const { Activity, Country } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const activityRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ROUTE GET ALL - DONE!
activityRouter.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({ include: Country });
    console.log(activities);
    if (activities) {
      return res.json(activities);
    } else {
      return res.send("No activities found, create one");
    }
  } catch (error) {
    console.log(error);
  }
});

// ROUTE POST - DONE!
activityRouter.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    countries.forEach(async (country) => {
      const countryFound = await Country.findOne({ where: { name: country } });
      await newActivity.addCountry(countryFound);
    });
    return res.status(200).send(newActivity);
  } catch (error) {
    console.log(error);
  }
});

module.exports = activityRouter;
