const grupoService = require('../../../domain/services/grupoMusical/grupoMusical.service.js');

    const actualizarGrupoMusicalUseCase = async (id, data) => {
    try {
        await grupoService.actualizarGrupoSql(id, data);
        await grupoService.actualizarGrupoMongo(id, data); // TODO: Implementar cuando se implemente el servicio de MongoDB
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = actualizarGrupoMusicalUseCase;