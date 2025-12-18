const ventasService = require('../../../domain/services/ventas/ventas.service.js');

class VentasUseCase {

    async registrarVenta({ productoNombre, tipoProducto, cantidad, precioUnitario }) {

        const datosSql = {
            productoNombre,
            tipoProducto,
            cantidad: parseInt(cantidad),
            precioUnitario,
            fecha: new Date(),
            estado: 'activo',
            createVenta: new Date().toLocaleString()
        };

        const nuevaVenta = await ventasService.crearVenta(datosSql);

        return {
            idVenta: nuevaVenta.idVenta,
            total: cantidad * precioUnitario
        };
    }

    async obtenerReporte(fechaInicio, fechaFin) {
        const ventas = await ventasService.obtenerVentas(fechaInicio, fechaFin);

        const totalVentas = ventas.reduce((sum, v) => sum + v.cantidad, 0);
        const tiposProducto = [...new Set(ventas.map(v => v.tipoProducto))];

        return {
            ventas,
            estadisticas: {
                totalRegistros: ventas.length,
                totalVentas,
                tiposProducto,
                ventasPorTipo: tiposProducto.map(tipo => ({
                    tipo,
                    cantidad: ventas
                        .filter(v => v.tipoProducto === tipo)
                        .reduce((s, v) => s + v.cantidad, 0)
                }))
            }
        };
    }
}

module.exports = new VentasUseCase();
