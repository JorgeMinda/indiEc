const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI, {
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

// Sincronización de la base de datos
const syncOptions = process.env.NODE_ENV === 'development' ? { force: true } : { alter: true };

sequelize.sync(syncOptions)
    .then(() => {
        console.log('Base de Datos sincronizadas');
    })
    .catch((error) => {
        console.error('Error al sincronizar la Base de Datos:', error);
    });

// Exportar el objeto sequelize
module.exports = { sequelize };