const express = require('express');
const router = express.Router();
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoute = require('./expedientes/expedientes');


router.use('/pacientes', pacientesRoutes);
router.use('/expedientes', expedientesRoute);


module.exports = router;