const getDb = require('../db');
let db = null;


class Expedientes { 
   constructor() {
    getDb()
    .then( (database) => {
      db = database;
      if (process.env.MIGRATE === 'true') {
        const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (identidad TEXT PRIMARY KEY, fecha TEXT, descripcion TEXT, observacion TEXT, registros TEXT, ultimaActualizacion TEXT, foreign key(identidad) references pacientes(identidad));';
        db.run(createStatement);
      }
    })
    .catch((err) => { console.error(err)});
    }
    

  new ( identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
    return new Promise( (accept, reject)=> {
      db.run(
        'INSERT INTO expedientes (identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) VALUES (?, ?, ?, ?, ?, ?);',
        [identidad, fecha, descripcion, observacion, registros, ultimaActualizacion],
        (err, rslt)=>{
          if(err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });
    }
    
    
  getAll () {
    return new Promise ( (accept, reject) => {
      db.all('SELECT * from expedientes;', (err, rows) => {
        if(err){
          console.error(err);
          reject(err);
        } else {
          accept(rows);
        }
      });
    });
    }
    
     getById(id) {
    return new Promise((accept, reject) => {
      db.get(
        'SELECT * from expedientes where id=?;',
        [id],
        (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          accept(row);
        }
      });
    });
  }

    
  updateOne (identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
    return new Promise(
      (accept, reject) => {
        const sqlUpdate = 'UPDATE expedientes set fecha = ?, descripcion = ?, observacion = ?, registros = ?, ultimaActualizacion = ? where identidad = ?;';
        db.run(
          sqlUpdate,
          [fecha, descripcion, observacion, registros, ultimaActualizacion, identidad],
          function (err) {
            if(err){
              reject(err);
            } else {
              accept(this);
            }
          }
        );
      }
    );
    }
    
    
  deleteOne(id) {
    return new Promise(
      (accept, reject) => {
        const sqlDelete = 'DELETE FROM expedientes where identidad = ?;';
        db.run(
          sqlDelete,
          [id],
          function (err) {
            if (err) {
              reject(err);
            } else {
              accept(this);
            }
          }
        );
      }
    );
  }
}


module.exports = Expedientes;