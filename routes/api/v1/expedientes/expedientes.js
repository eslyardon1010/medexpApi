const express = require('express');
const router = express.Router();


const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedientesModel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Expedientes',
        updates: new Date(2022, 0, 20, 18, 39, 00),
        author: 'EslyArdon'
    });
});//GET

router.post('/new', async (req, res) => {
  const { identidad, fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;
  try {
    rslt = await expedientesModel.new(identidad, fecha, descripcion, observacion, registros, ultimaActualizacion);
    res.status(200).json(
      {
        status: 'ok',
        result: rslt
      });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(
      {
        status: 'failed',
        result: {}
      });
  }
});//POST // NEW


//todos los expedientes
router.get('/all', async (req, res) => {
  try {
    const rows = await expedientesModel.getAll();
    res.status(200).json({status:'ok', expedientes: rows});
  } catch (ex) {
    console.log(ex);
    res.status(500).json({status:'failed'});
  }
});


//expedientes por id
router.get('/byid/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const row = await expedientesModel.getById(parseInt(id));
    res.status(200).json({ status: 'ok', paciente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

//router.put();
router.put('/update/:id', async (req, res) => {
  try{
    const {fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;
    const { id } = req.params;
    const result = await expedientesModel.updateOne(id, fecha, descripcion, observacion, registros, ultimaActualizacion);
    res.status(200).json({
      status:'ok',
      result
    });
  } catch(ex){
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

//router.delete();
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await expedientesModel.deleteOne(id);
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