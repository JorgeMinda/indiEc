const sql = require('../../../infrastructure/database/connection/dataBase.sql.js');
const orm = require('../../../infrastructure/database/connection/dataBase.orm.js');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose.js');

const grupoService = {};

// ---------------------------------------------
// 1. Obtener datos SQL
// ---------------------------------------------
grupoService.obtenerGruposSql = async () => {
    const [rows] = await sql.promise().query(`
        SELECT * FROM grupos_musicales 
        WHERE estado = 'activo'
    `);
    return rows;
};

// ---------------------------------------------
// 2. Obtener detalles Mongo
// ---------------------------------------------
grupoService.obtenerGrupoMongo = async (idGrupoSql) => {
    return await mongo.grupoMusical.findOne({ idGrupoSql });
};

// ---------------------------------------------
// 3. Unir SQL + Mongo
// ---------------------------------------------
grupoService.obtenerGruposCompletos = async () => {
    const grupos = await grupoService.obtenerGruposSql();

    return await Promise.all(
        grupos.map(async (gr) => {
            const mongoData = await grupoService.obtenerGrupoMongo(gr.idGrupo);
            return { ...gr, detallesMongo: mongoData || null };
        })
    );
};

// ---------------------------------------------
// 4. Crear grupo
// ---------------------------------------------
grupoService.crearGrupo = async (data) => {
    const { nombreGrupo, generoMusical, plataforma, descripcion, imagen } = data;

    const now = new Date().toISOString();

    const sqlNuevo = await orm.grupoMusical.create({
        nombreGrupo,
        estado: 'activo',
        createGrupo: now
    });

    await mongo.grupoMusical.create({
        generoMusical,
        plataforma,
        descripcion,
        imagen,
        idGrupoSql: sqlNuevo.idGrupo,
        createGrupoMongo: now
    });

    return sqlNuevo.idGrupo;
};

// ---------------------------------------------
// 5. Actualizar grupo
// ---------------------------------------------
grupoService.actualizarGrupo = async (id, data) => {
    const { nombreGrupo, generoMusical, plataforma, descripcion, imagen } = data;

    const now = new Date().toISOString();

    const [result] = await sql.promise().query(`
        UPDATE grupos_musicales
        SET nombreGrupo = ?, updateGrupo = ?
        WHERE idGrupo = ?
    `, [nombreGrupo, now, id]);

    if (result.affectedRows === 0) {
        throw new Error('Grupo musical no encontrado');
    }

    await mongo.grupoMusical.updateOne(
        { idGrupoSql: id },
        {
            $set: {
                generoMusical,
                plataforma,
                descripcion,
                imagen,
                updateGrupoMongo: now
            }
        }
    );
};

// ---------------------------------------------
// 6. Eliminar grupo (soft delete)
// ---------------------------------------------
grupoService.eliminarGrupo = async (id) => {
    const now = new Date().toISOString();

    const [result] = await sql.promise().query(`
        UPDATE grupos_musicales
        SET estado = 'inactivo', updateGrupo = ?
        WHERE idGrupo = ?
    `, [now, id]);

    if (result.affectedRows === 0) {
        throw new Error('Grupo musical no encontrado');
    }
};

module.exports = grupoService;
