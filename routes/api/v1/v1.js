const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');

const { passport, jwtMiddleware } = require('./seguridad/jwtHelper');

const medicamentosRoutes = require('./medicamentos/medicamentos');
const seguridadRoutes = require('./seguridad/seguridad');

router.use(passport.initialize());
//public
router.use('/seguridad', verifyApiHeaderToken, seguridadRoutes);
//middlewares

router.use('/medicamentos',
    verifyApiHeaderToken,
    jwtMiddleware,
    medicamentosRoutes);

    
module.exports = router;