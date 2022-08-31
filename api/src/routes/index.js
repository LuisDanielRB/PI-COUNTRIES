const { Router } = require("express");
const countryRouter = require("./countryRoute");
const activityRouter = require("./activityRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/country", countryRouter);
router.use("/activity", activityRouter);

module.exports = router;
