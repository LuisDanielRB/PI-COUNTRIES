const { Router } = require("express");
const { Activity, Country } = require("../db");
const { getById } = require("../controllers/index");
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

// ROUTE DELETE - DONE
activityRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = getById(id);
    if (activity) {
      await Activity.destroy({
        where: { id: id },
      });
    }
    res.status(200).send(`${id} deleted from db`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ROUTE EDIT - ?
activityRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    const activity = await Activity.update(body, {
      where: { id: id },
    });
    res.status(200).send(activity).data;
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = activityRouter;
