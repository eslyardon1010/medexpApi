const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Expedientes',
        updates: new Date(2022, 0, 20, 18, 39, 00),
        author: 'EslyArdon'
    });
});//GET




router.post('/new', async (req, res) => {
    const { identidad,
            fecha = new Date().toString,
            descripcion,
            observacion,
            registros,
            ultimaActualizacion } = req.body
    
    res.status(200).json({
        status: 'ok',
        revieved: {
            identidad,
            fecha,
            descripcion,
            observacion,
            registros,
            ultimaActualizacion
        }
    });

})//POST // NEW

module.exports = router;