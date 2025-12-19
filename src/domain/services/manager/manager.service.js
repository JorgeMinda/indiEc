const sql = require('../../../infrastructure/database/connection/dataBase.sql.js');
const orm = require('../../../infrastructure/database/connection/dataBase.orm.js');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose.js');
const { cifrarDatos, descifrarDatos } = require('../../../application/use-cases/auth/encrypDates');

const managerService = {};

managerService.obtenerManagers = async () => {
    const managersSql = await sqlRepo.obtenerManagers();

    const managers = await Promise.all(
        managersSql.map(async (m) => {
            const mongo = await mongoRepo.obtenerManagerPorSqlId(m.idManager);

            return {
                ...m,
                nombres: descifrarDatos(m.nombres),
                apellidos: descifrarDatos(m.apellidos),
                correo: descifrarDatos(m.correo),
                detallesMongo: mongo || null
            };
        })
    );

    return managers;
};

managerService.crearManager = async (data) => {
    const sqlData = {
        nombres: cifrarDatos(data.nombres),
        apellidos: cifrarDatos(data.apellidos),
        correo: cifrarDatos(data.correo),
        estado: 'activo',
        createManager: new Date().toLocaleString()
    };

    const nuevo = await sqlRepo.crearManager(sqlData);

    const mongoData = {
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        imagen: data.imagen,
        idManagerSql: nuevo.idManager,
        createManagerMongo: new Date().toLocaleString()
    };

    await mongoRepo.crearManager(mongoData);

    return { idManager: nuevo.idManager };
};

managerService.actualizarManager = async (id, data) => {
    const sqlData = {
        nombres: cifrarDatos(data.nombres),
        apellidos: cifrarDatos(data.apellidos),
        correo: cifrarDatos(data.correo),
        updateManager: new Date().toLocaleString()
    };

    await sqlRepo.actualizarManager(id, sqlData);

    const mongoData = {
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        imagen: data.imagen,
        updateManagerMongo: new Date().toLocaleString()
    };

    await mongoRepo.actualizarManager(id, mongoData);

    return true;
};

managerService.eliminarManager = async (id) => {
    await sqlRepo.eliminarManager(id);
    return true;
};

module.exports = managerService;
