const express = require('express');
const router = express.Router();
const {verifyApiHeaderToken} = require('./headerVerifyMiddleware');

const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoute = require('./expedientes/expedientes');


router.use(
    '/pacientes', 
    verifyApiHeaderToken,
 pacientesRoutes);
router.use('/expedientes', expedientesRoute);


module.exports = router;