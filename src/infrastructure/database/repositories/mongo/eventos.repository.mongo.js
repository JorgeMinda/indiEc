// src/infrastructure/repositories/evento/eventos.repository.mongo.js
const EventoMongo = require('../../../database/mongo/models/evento.mongo');
const Evento = require('../../../domain/models/evento/evento.entity');

class EventosRepositoryMongo {
    async crear(data) {
        const nuevo = await EventoMongo.create(data);
        return this._mapToEntity(nuevo);
    }

    async actualizar(id, data) {
        const actualizado = await EventoMongo.findByIdAndUpdate(id, data, { new: true });
        return actualizado ? this._mapToEntity(actualizado) : null;
    }

    async eliminar(id) {
        return await EventoMongo.findByIdAndDelete(id);
    }

    async obtenerPorId(id) {
        const evento = await EventoMongo.findById(id);
        return evento ? this._mapToEntity(evento) : null;
    }

    async obtenerTodos() {
        const eventos = await EventoMongo.find();
        return eventos.map(e => this._mapToEntity(e));
    }

    _mapToEntity(model) {
        return new Evento({
            id: model._id.toString(),
            titulo: model.titulo || model.nombreEvento,
            descripcion: model.descripcion,
            fecha: model.fecha,
            lugar: model.lugar || model.ubicacion,
            artistas: model.artistas || [],
            precioEntrada: model.precioEntrada ?? 0,
            imagen: model.imagen,
            activo: model.activo ?? true
        });
    }
}

module.exports = EventosRepositoryMongo;
