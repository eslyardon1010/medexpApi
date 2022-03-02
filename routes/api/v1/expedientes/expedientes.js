const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'expedientes',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    });
}); //GET /

router.post('/new', async(req, res) => {
    const { pacienteId, text, seccionInfo, seccionData, userId } = req.body;
    try {
        rslt = await expedienteModel.new(pacienteId, text, seccionInfo, seccionData, userId);
        res.status(200).json({
            status: 'ok',
            result: rslt
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            status: 'failed',
            result: {}
        });
    }
});
//all
router.get('/all', async(req, res) => {
    try {
        const rows = await expedienteModel.getAll();
        res.status(200).json({ status: 'ok', expedientes: rows });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});
//get facet
router.get('/facet/:page/:items', async(req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);
    if (allowedItemsNumber.includes(items)) {
        try {
            const expedientes = await expedienteModel.getFaceted(page, items);
            res.status(200).json({ docs: expedientes });
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'failed' });
        }
    } else {
        return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10,15,20)' });
    }

});

// /byid/1;
router.get('/byid/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const row = await expedienteModel.getById(id);
        res.status(200).json({ status: 'ok', expedientes: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

//update
router.put('/update/:id', async(req, res) => {
    try {
        const { pacienteId, text, seccionInfo, seccionData, userId } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateOne(id, pacienteId, text, seccionInfo, seccionData, userId);
        res.status(200).json({
            status: 'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});
//delete

router.delete('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await expedienteModel.deleteOne(id);
        res.status(200).json({
            status: 'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

module.exports = router;