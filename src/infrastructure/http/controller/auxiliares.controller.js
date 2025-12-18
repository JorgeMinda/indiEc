const obtenerGenerosUC = require("../../../application/use-cases/auxiliares/obtenerGeneros.usecase.js");
const crearGeneroUC = require("../../../application/use-cases/auxiliares/crearGenero.usecase.js");
// const obtenerTallasUC = require("../../../application/use-cases/auxiliares/obtener-tallas.usecase.js"); // TODO: Verificar si existe
const inicializarDatosUC = require("../../../application/use-cases/auxiliares/inicializarDatos.usecase.js");

class AuxiliaresController {

    async obtenerGeneros(req, res) {
        const result = await obtenerGenerosUC.execute();
        return result.error 
            ? res.apiError(result.message, result.status)
            : res.apiResponse(result.data, result.status, result.message);
    }

    async crearGenero(req, res) {
        const result = await crearGeneroUC.execute(req.body);
        return result.error 
            ? res.apiError(result.message, result.status)
            : res.apiResponse(result.data, result.status, result.message);
    }

    // TODO: Descomentar cuando se cree el use case obtenerTallas
    // async obtenerTallas(req, res) {
    //     const result = await obtenerTallasUC.execute();
    //     return result.error 
    //         ? res.apiError(result.message, result.status)
    //         : res.apiResponse(result.data, result.status, result.message);
    // }

    async inicializarDatos(req, res) {
        const result = await inicializarDatosUC.execute();
        return result.error 
            ? res.apiError(result.message, result.status)
            : res.apiResponse(null, result.status, result.message);
    }
}

module.exports = new AuxiliaresController();
