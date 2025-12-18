const AuxiliaresService = require('../../../domain/services/auxiliares/auxiliares.service.js');

const obtenerGenerosUC = async () => {
    return await AuxiliaresService.obtenerGenerosSql();
};

const crearGeneroUC = async (data) => {
    return await AuxiliaresService.crearGeneroSql(data);
};

const obtenerTallasUC = async () => {
    return await AuxiliaresService.obtenerTallasSql();
};

const inicializarDatosUC = async () => {
    return await AuxiliaresService.inicializarDatosSql();  // TODO: Crear este archivo
};

module.exports = {
    obtenerGenerosUC,
    crearGeneroUC,
    obtenerTallasUC,
    inicializarDatosUC
};
