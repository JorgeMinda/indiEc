const sql = require('../../../infrastructure/database/connection/dataBase.sql.js');
const orm = require('../../../infrastructure/database/connection/dataBase.orm.js');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose.js');

const eventoService = {};

// -------------------------------------
// 1. Obtener eventos SQL
// -------------------------------------
eventoService.obtenerEventosSql = async () => {
    const [rows] = await sql.promise().query(`
        SELECT * FROM eventos 
        WHERE estado = 'activo'
        ORDER BY fecha DESC
    `);
    return rows;
};

// -------------------------------------
// 2. Obtener detalles Mongo
// -------------------------------------
eventoService.obtenerEventoMongo = async (idEventoSql) => {
    return await mongo.eventoModel.findOne({ idEventoSql });
};

// -------------------------------------
// 3. Obtener EVENTOS COMPLETOS (SQL + Mongo)
// -------------------------------------
eventoService.obtenerEventosCompletos = async () => {
    const eventos = await eventoService.obtenerEventosSql();

    const eventosCompletos = await Promise.all(
        eventos.map(async (ev) => {
            const mongoData = await eventoService.obtenerEventoMongo(ev.idEvento);
            return {
                ...ev,
                detallesMongo: mongoData || null
            };
        })
    );

    return eventosCompletos;
};

// -------------------------------------
// 4. Crear evento (SQL + Mongo)
// -------------------------------------
eventoService.crearEvento = async (data) => {
    const {
        nombreEvento,
        ubicacion,
        fecha,
        generoMusical,
        contacto,
        capacidad,
        descripcion,
        imagen
    } = data;

    const fechaSQL = new Date(fecha);
    const now = new Date().toISOString();

    // Crear SQL
    const eventoSql = await orm.evento.create({
        nombreEvento,
        ubicacion,
        fecha: fechaSQL,
        generoMusical,
        estado: 'activo',
        createEvento: now
    });

    const idEvento = eventoSql.idEvento;

    // Crear Mongo
    await mongo.eventoModel.create({
        contacto,
        capacidad: parseInt(capacidad),
        descripcion,
        imagen,
        idEventoSql: idEvento,
        createEventoMongo: now
    });

    return idEvento;
};

module.exports = eventoService;
