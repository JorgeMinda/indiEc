// src/infrastructure/database/repositories/sql/manager.repository.sql.js
const ManagerRepository = require('../../../../domain/repositories/manager/manager.repository');
const ManagerEntity = require('../../../../domain/models/manager/manager.entity');
const ManagerSQL = require('../../../sql/manager'); // modelo Sequelize (src/infrastructure/database/sql/manager.js)

class ManagerRepositorySQL extends ManagerRepository {
  async create(data) {
    const created = await ManagerSQL.create(data);
    return this._mapToEntity(created);
  }

  async findAll() {
    const rows = await ManagerSQL.findAll();
    return rows.map(r => this._mapToEntity(r));
  }

  async findById(id) {
    const row = await ManagerSQL.findOne({ where: { idManager: id } });
    return row ? this._mapToEntity(row) : null;
  }

  async update(id, data) {
    await ManagerSQL.update(data, { where: { idManager: id } });
    const row = await ManagerSQL.findOne({ where: { idManager: id } });
    return row ? this._mapToEntity(row) : null;
  }

  async delete(id) {
    return await ManagerSQL.destroy({ where: { idManager: id } });
  }

  _mapToEntity(model) {
    // model puede ser instancia de Sequelize
    const nombres = model.nombres || model.get?.('nombres') || '';
    const apellidos = model.apellidos || model.get?.('apellidos') || '';
    return new ManagerEntity({
      id: model.idManager ?? model.get?.('idManager'),
      nombre: `${nombres} ${apellidos}`.trim(),
      email: model.correo ?? model.get?.('correo'),
      artistasGestionados: [] // SQL no maneja este campo, se agrega desde otra fuente si aplica
    });
  }
}

module.exports = ManagerRepositorySQL;
