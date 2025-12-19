const orm = require('../../../infrastructure/database/connection/dataBase.orm.js');
const sql = require('../../../infrastructure/database/connection/dataBase.sql.js');

class VentasService {

    async crearVenta(datos) {
        const nuevaVenta = await orm.registroVentas.create(datos);
        return nuevaVenta;
    }

    async obtenerVentas(fechaInicio, fechaFin) {
        let query = `
            SELECT rv.*, 
                   DATE_FORMAT(rv.fecha, '%Y-%m-%d') AS fechaFormateada,
                   MONTH(rv.fecha) AS mes,
                   YEAR(rv.fecha) AS año
            FROM registro_ventas rv
            WHERE rv.estado = 'activo'
        `;

        const params = [];

        if (fechaInicio && fechaFin) {
            query += ` AND rv.fecha BETWEEN ? AND ? `;
            params.push(fechaInicio, fechaFin);
        }

        query += ` ORDER BY rv.fecha DESC`;

        const [ventas] = await sql.promise().query(query, params);

        return ventas;
    }
}

module.exports = new VentasService();
