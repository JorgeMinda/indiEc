// src/infrastructure/database/repositories/mongo/manager.repository.mongo.js
const ManagerRepository = require('../../../../domain/repositories/manager/manager.repository');
const ManagerEntity = require('../../../../domain/models/manager/manager.entity');
const ManagerMongo = require('../../../mongo/manager'); // src/infrastructure/database/mongo/manager.js

class ManagerRepositoryMongo extends ManagerRepository {
  async create(data) {
    const created = await ManagerMongo.create(data);
    return this._mapToEntity(created);
  }

  async findAll() {
    const docs = await ManagerMongo.find();
    return docs.map(d => this._mapToEntity(d));
  }

  async findById(id) {
    const doc = await ManagerMongo.findById(id);
    return doc ? this._mapToEntity(doc) : null;
  }

  async update(id, data) {
    const updated = await ManagerMongo.findByIdAndUpdate(id, data, { new: true });
    return updated ? this._mapToEntity(updated) : null;
  }

  async delete(id) {
    return await ManagerMongo.findByIdAndDelete(id);
  }

  _mapToEntity(doc) {
    return new ManagerEntity({
      id: doc._id.toString(),
      nombre: doc.nombre || null, // si guardas nombre completo en mongo, úsalo; si no, combínalo
      email: doc.correo || doc.email || null,
      artistasGestionados: doc.artistasGestionados || []
    });
  }
}

module.exports = ManagerRepositoryMongo;
