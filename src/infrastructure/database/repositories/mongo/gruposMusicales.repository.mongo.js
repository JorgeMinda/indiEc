const GrupoMusicalMongo = require('../../../database/mongo/models/grupoMusical.mongo');
const GrupoMusical = require('../../../domain/models/grupoMusical/grupoMusical.entity');

class GruposMusicalesRepositoryMongo {

    async crear(data) {
        const nuevo = await GrupoMusicalMongo.create(data);
        return this._mapToEntity(nuevo);
    }

    async actualizar(id, data) {
        const actualizado = await GrupoMusicalMongo.findByIdAndUpdate(id, data, { new: true });
        return actualizado ? this._mapToEntity(actualizado) : null;
    }

    async eliminar(id) {
        return await GrupoMusicalMongo.findByIdAndDelete(id);
    }

    async obtenerPorId(id) {
        const grupo = await GrupoMusicalMongo.findById(id);
        return grupo ? this._mapToEntity(grupo) : null;
    }

    async obtenerTodos() {
        const grupos = await GrupoMusicalMongo.find();
        return grupos.map(g => this._mapToEntity(g));
    }

    _mapToEntity(model) {
        return new GrupoMusical({
            id: model._id.toString(),
            nombre: model.nombreGrupo || null,
            generoMusical: model.generoMusical,
            descripcion: model.descripcion,
            plataforma: model.plataforma,
            imagen: model.imagen,
            activo: true
        });
    }
}

module.exports = GruposMusicalesRepositoryMongo;
