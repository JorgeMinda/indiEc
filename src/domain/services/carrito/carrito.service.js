const Carrito = require('../../../infrastructure/database/sql/carrito');
const sql = require('../../../infrastructure/database/connection/dataBase.sql');

class CarritoService {

    async obtenerActivos() {
        const [rows] = await sql.promise().query(
            `SELECT * FROM carritos WHERE estado = "activo"`
        );
        return rows;
    }

    async crearCarrito({ producto, tipoProducto, cantidad }) {
        return await Carrito.create({
            producto,
            tipoProducto,
            cantidad,
            estado: 'activo',
            createCarrito: new Date().toLocaleString()
        });
    }

    async actualizarCarrito(id, data) {
        const [result] = await sql.promise().query(`
            UPDATE carritos 
            SET producto = ?, tipoProducto = ?, cantidad = ?, updateCarrito = ?
            WHERE idCarrito = ?
        `, [
            data.producto,
            data.tipoProducto,
            data.cantidad,
            new Date().toLocaleString(),
            id
        ]);

        return result;
    }

    async eliminarCarrito(id) {
        const [result] = await sql.promise().query(`
            UPDATE carritos 
            SET estado = 'inactivo', updateCarrito = ?
            WHERE idCarrito = ?
        `, [new Date().toLocaleString(), id]);

        return result;
    }
}

module.exports = new CarritoService();
