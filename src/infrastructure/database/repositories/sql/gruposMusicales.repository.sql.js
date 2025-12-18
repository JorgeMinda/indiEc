const GrupoMusical = require('../../../domain/models/grupoMusical/grupoMusical.entity');

class GruposMusicalesRepositorySQL {
    constructor(db) {
        this.db = db;
        this.model = db.models.grupos_musicales;
    }

    async crear(data) {
        const nuevo = await this.model.create(data);
        return this._mapToEntity(nuevo);
    }

    async actualizar(id, data) {
        await this.model.update(data, { where: { idGrupo: id } });
        const actualizado = await this.model.findOne({ where: { idGrupo: id } });
        return actualizado ? this._mapToEntity(actualizado) : null;
    }

    async eliminar(id) {
        return await this.model.destroy({ where: { idGrupo: id } });
    }

    async obtenerPorId(id) {
        const grupo = await this.model.findOne({ where: { idGrupo: id } });
        return grupo ? this._mapToEntity(grupo) : null;
    }

    async obtenerTodos() {
        const grupos = await this.model.findAll();
        return grupos.map(g => this._mapToEntity(g));
    }

    _mapToEntity(model) {
        return new GrupoMusical({
            id: model.idGrupo,
            nombre: model.nombreGrupo,
            generoMusical: null, // SQL no lo tiene
            descripcion: null,   // SQL no lo tiene
            plataforma: null,    // SQL no lo tiene
            imagen: null,        // SQL no lo tiene
            activo: model.estado === 'activo'
        });
    }
}

module.exports = GruposMusicalesRepositorySQL;
