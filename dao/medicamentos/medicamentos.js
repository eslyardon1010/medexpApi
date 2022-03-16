const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');

let db = null;

class Medicamentos {
  collection = null;
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Medicamentos');
        if (process.env.MIGRATE === 'true') {
          // Por Si se ocupa algo
        }
      })
      .catch((err) => { console.error(err) });
  }

  async new(codigo, nombre, costo, cantidad, fechaVencimiento) {
    const newMedicamento = {
         codigo,
         nombre, 
         costo, 
         cantidad, 
         fechaVencimiento
    };
    const rslt = await this.collection.insertOne(newMedicamento);
    return rslt;
  }


  async getAll() {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

  async getFaceted(page, items, filter = {}) {
    const cursor = this.collection.find(filter);
    const totalItems = await cursor.count();
    cursor.skip((page -1) * items);
    cursor.limit(items);
    const resultados = await cursor.toArray();
    return {
      totalItems,
      page,
      items,
      totalPages: (Math.ceil(totalItems / items)),
      resultados
    };
  }
  async getById(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }
  async updateOne(id, codigo, nombre, costo, cantidad, fechaVencimiento) {
    const filter = {_id: new ObjectId(id)};
    // UPDATE Medicamentos SET campo=valor, campo=valor where id= id;
    const updateCmd = {
      '$set':{
        codigo,
        nombre,
        costo,
        cantidad,
        fechaVencimiento
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }

  
  async deleteOne(id) {
    
  }


}

module.exports = Medicamentos;