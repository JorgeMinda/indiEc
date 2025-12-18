const orm = require('../../../infrastructure/database/connection/dataBase.orm');
const sql = require('../../../infrastructure/database/connection/dataBase.sql');

const ropaService = {};

// 🔍 Mostrar ropa
ropaService.obtenerRopa = async () => {
    const [lista] = await sql.promise().query(`
        SELECT * FROM ropas WHERE estado = 'activo'
    `);
    return lista;
};

// 🆕 Crear ropa
ropaService.crearRopa = async (data) => {
    const { nombre, artista, tipo, talla } = data;

    if (!nombre || !artista || !tipo || !talla) {
        throw new Error("Todos los campos son requeridos");
    }

    const sqlData = {
        nombre,
        artista,
        tipo,
        talla,
        estado: 'activo',
        createRopa: new Date().toLocaleString(),
    };

    const nueva = await orm.ropa.create(sqlData);

    return { idRopa: nueva.idRopa };
};

// ✏ Actualizar ropa
ropaService.actualizarRopa = async (id, data) => {
    const { nombre, artista, tipo, talla } = data;

    if (!nombre || !artista || !tipo || !talla) {
        throw new Error("Todos los campos son requeridos");
    }

    const [result] = await sql.promise().query(`
        UPDATE ropas
        SET nombre=?, artista=?, tipo=?, talla=?, updateRopa=?
        WHERE idRopa=?
    `, [
        nombre,
        artista,
        tipo,
        talla,
        new Date().toLocaleString(),
        id
    ]);

    if (result.affectedRows === 0) {
        throw new Error("Ropa no encontrada");
    }

    return true;
};

// 🗑 Eliminar ropa
ropaService.eliminarRopa = async (id) => {
    const [result] = await sql.promise().query(`
        UPDATE ropas
        SET estado='inactivo', updateRopa=?
        WHERE idRopa=?
    `, [new Date().toLocaleString(), id]);

    if (result.affectedRows === 0) {
        throw new Error("Ropa no encontrada");
    }

    return true;
};

module.exports = ropaService;
