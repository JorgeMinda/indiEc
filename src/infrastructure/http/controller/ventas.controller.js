const ventasUseCase = require('../../../application/use-cases/ventas/ventas.usecase.js');

const ventasCtl = {};

ventasCtl.registrarVenta = async (req, res) => {
    try {
        const datos = await ventasUseCase.registrarVenta(req.body);
        return res.apiResponse(datos, 201, "Venta registrada exitosamente");
    } catch (error) {
        console.error(error);
        return res.apiError("Error al registrar la venta", 500);
    }
};

ventasCtl.obtenerReporteVentas = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const datos = await ventasUseCase.obtenerReporte(fechaInicio, fechaFin);

        return res.apiResponse(datos, 200, "Reporte de ventas obtenido");
    } catch (error) {
        console.error(error);
        return res.apiError("Error al obtener reporte", 500);
    }
};

module.exports = ventasCtl;
