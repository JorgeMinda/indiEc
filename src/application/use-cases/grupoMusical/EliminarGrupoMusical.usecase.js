const grupoService = require('../../../domain/services/grupoMusical/grupoMusical.service');

module.exports = async (id) => {
    try {
        await grupoService.eliminarGrupoSql(id);
        await grupoService.eliminarGrupoMongo(id); // TODO: Implementar cuando se implemente el servicio de MongoDB
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};
