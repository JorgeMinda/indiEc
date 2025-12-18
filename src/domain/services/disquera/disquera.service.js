const sql = require('../../../infrastructure/database/connection/dataBase.sql.js');
const orm = require('../../../infrastructure/database/connection/dataBase.orm.js');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose.js');
const { cifrarDatos, descifrarDatos } = require('../../../application/use-cases/auth/encrypDates.js');

const disqueraService = {};

// -------------------------
// 1. SQL: Obtener Perfil
// -------------------------
disqueraService.obtenerPerfilSql = async () => {
    const [rows] = await sql.promise().query(`
        SELECT * FROM perfil_disqueras 
        WHERE estado = 'activo'
        LIMIT 1
    `);
    return rows[0] || null;
};

// -------------------------
// 2. Mongo: Obtener Perfil
// -------------------------
disqueraService.obtenerPerfilMongo = async (idDisqueraSql) => {
    return await mongo.perfilDisqueraModel.findOne({ idDisqueraSql });
};

// -------------------------
// 3. Obtener perfil COMPLETO
// -------------------------
disqueraService.obtenerPerfilCompleto = async () => {
    const sqlData = await disqueraService.obtenerPerfilSql();

    if (!sqlData) return null;

    const mongoData = await disqueraService.obtenerPerfilMongo(sqlData.idDisquera);

    return {
        ...sqlData,
        detallesMongo: mongoData
            ? {
                direccion: mongoData.direccion,
                telefono: descifrarDatos(mongoData.telefono),
                descripcion: mongoData.descripcion,
                fotoImagen: mongoData.fotoImagen
            }
            : null
    };
};

// -------------------------
// 4. SQL: Crear o Actualizar
// -------------------------
disqueraService.gestionarPerfilSql = async (data) => {
    const { nombreDisquera, correo } = data;
    const now = new Date().toISOString();

    const [perfil] = await sql.promise().query(
        'SELECT * FROM perfil_disqueras WHERE estado = "activo" LIMIT 1'
    );

    if (perfil.length > 0) {
        const id = perfil[0].idDisquera;

        await sql.promise().query(`
            UPDATE perfil_disqueras SET 
                nombreDisquera=?, correo=?, updateDisquera=?
            WHERE idDisquera=?
        `, [nombreDisquera, correo, now, id]);

        return id;
    }

    const nuevo = await orm.perfilDisquera.create({
        nombreDisquera,
        correo,
        estado: 'activo',
        createDisquera: now
    });

    return nuevo.idDisquera;
};

// -------------------------
// 5. Mongo: Crear o Actualizar
// -------------------------
disqueraService.gestionarPerfilMongo = async (data) => {
    const { direccion, telefono, descripcion, fotoImagen } = data;

    const idSql = await disqueraService.gestionarPerfilSql(data);

    const mongoPerfil = await mongo.perfilDisqueraModel.findOne({ idDisqueraSql: idSql });

    const payload = {
        direccion,
        telefono: cifrarDatos(telefono),
        descripcion,
        fotoImagen,
        updateDisqueraMongo: new Date().toISOString()
    };

    if (!mongoPerfil) {
        await mongo.perfilDisqueraModel.create({
            ...payload,
            idDisqueraSql: idSql,
            createDisqueraMongo: new Date().toISOString()
        });
    } else {
        await mongo.perfilDisqueraModel.updateOne(
            { idDisqueraSql: idSql },
            { $set: payload }
        );
    }

    return true;
};

module.exports = disqueraService;
