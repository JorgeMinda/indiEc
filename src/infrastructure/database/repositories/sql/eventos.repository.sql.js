// src/infrastructure/repositories/evento/eventos.repository.sql.js
const EventoSQL = require('../../../database/sql/models/evento.sql');
const Evento = require('../../../domain/models/evento/evento.entity');

class EventosRepositorySQL {
    constructor(db) {
        this.db = db; // sequelize instance
        this.model = db.models.eventos;
    }

    async crear(data) {
        const nuevo = await this.model.create(data);
        return this._mapToEntity(nuevo);
    }

    async actualizar(id, data) {
        await this.model.update(data, { where: { idEvento: id } });
        const actualizado = await this.model.findOne({ where: { idEvento: id } });
        return actualizado ? this._mapToEntity(actualizado) : null;
    }

    async eliminar(id) {
        return await this.model.destroy({ where: { idEvento: id } });
    }

    async obtenerPorId(id) {
        const evento = await this.model.findOne({ where: { idEvento: id } });
        return evento ? this._mapToEntity(evento) : null;
    }

    async obtenerTodos() {
        const eventos = await this.model.findAll();
        return eventos.map(e => this._mapToEntity(e));
    }

    _mapToEntity(model) {
        return new Evento({
            id: model.idEvento,
            titulo: model.nombreEvento,
            descripcion: model.descripcion,
            fecha: model.fecha,
            lugar: model.ubicacion,
            artistas: [], // SQL model aún no tiene relación, se agrega después
            precioEntrada: 0, // tabla SQL no lo contiene
            imagen: model.imagen,
            activo: model.estado === 'activo'
        });
    }
}

module.exports = EventosRepositorySQL;
