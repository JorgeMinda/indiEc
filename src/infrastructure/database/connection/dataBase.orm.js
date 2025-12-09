const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../../../config/keys");

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

//extracionModelos
const usuarioModel = require('../../../domain/models/sql/usuario')
const rolModel = require('../../../domain/models/sql/rol')
const detalleRolModel = require('../../../domain/models/sql/detalleRol')
const pageModel = require('../../../domain/models/sql/page')
const artistaModel = require('../../../domain/models/sql/artista');
const cancionModel = require('../../../domain/models/sql/cancion');
const albumModel = require('../../../domain/models/sql/album');
const grupoMusicalModel = require('../../../domain/models/sql/grupoMusical');
const managerModel = require('../../../domain/models/sql/manager');
const eventoModel = require('../../../domain/models/sql/evento');
const perfilDisqueraModel = require('../../../domain/models/sql/perfilDisquera');
const gestionArtistasModel = require('../../../domain/models/sql/gestionArtistas');
const registroVentasModel = require('../../../domain/models/sql/registroVentas');
const clienteModel = require('../../../domain/models/sql/cliente');
const ropaModel = require('../../../domain/models/sql/ropa');
const carritoModel = require('../../../domain/models/sql/carrito');
const artista_EventoModel = require("../../../domain/models/sql/artista_evento");
const generoModel = require("../../../domain/models/sql/genero");
const tallaModel = require("../../../domain/models/sql/talla");
const estadoModel = require("../../../domain/models/sql/estado");

//intaciar los modelos a sincronizar
const usuario = usuarioModel(sequelize, Sequelize)
const rol = rolModel(sequelize, Sequelize)
const detalleRol = detalleRolModel(sequelize, Sequelize)
const page = pageModel(sequelize, Sequelize)
const artista = artistaModel(sequelize, Sequelize);
const cancion = cancionModel(sequelize, Sequelize);
const album = albumModel(sequelize, Sequelize);
const grupoMusical = grupoMusicalModel(sequelize, Sequelize);
const manager = managerModel(sequelize, Sequelize);
const evento = eventoModel(sequelize, Sequelize);
const perfilDisquera = perfilDisqueraModel(sequelize, Sequelize);
const gestionArtistas = gestionArtistasModel(sequelize, Sequelize);
const registroVentas = registroVentasModel(sequelize, Sequelize);
const cliente = clienteModel(sequelize, Sequelize);
const ropa = ropaModel(sequelize, Sequelize);
const carrito = carritoModel(sequelize, Sequelize);
const artista_Evento = artista_EventoModel(sequelize, Sequelize);
const genero = generoModel(sequelize, Sequelize);
const talla = tallaModel(sequelize, Sequelize);
const estado = estadoModel(sequelize, Sequelize)


//relaciones o foreingKeys

usuario.hasMany(detalleRol)
detalleRol.belongsTo(usuario)

rol.hasMany(detalleRol)
detalleRol.belongsTo(rol)

usuario.hasMany(page)
page.belongsTo(usuario)

artista.hasMany(cancion);
cancion.belongsTo(artista);

artista.hasMany(album);
album.belongsTo(artista);

album.hasMany(cancion);
cancion.belongsTo(album);

manager.hasMany(artista);
artista.belongsTo(manager);

perfilDisquera.hasMany(gestionArtistas);
gestionArtistas.belongsTo(perfilDisquera);

cliente.hasMany(carrito);
carrito.belongsTo(cliente);

artista.hasMany(artista_Evento);
artista_Evento.belongsTo(artista);

evento.hasMany(artista_Evento);
artista_Evento.belongsTo(evento);

// Artistas y Grupos Musicales (muchos a muchos)
artista.belongsToMany(grupoMusical, { 
    through: 'artista_grupo_musical',
    foreignKey: 'artistaId',
    otherKey: 'grupoId'
});
grupoMusical.belongsToMany(artista, { 
    through: 'artista_grupo_musical',
    foreignKey: 'grupoId',
    otherKey: 'artistaId'
}); 

// Exportar el objeto sequelize
module.exports = {
    usuario,
    rol,
    detalleRol,
    page,
    artista,
    cancion,
    album,
    manager,
    perfilDisquera,
    gestionArtistas,
    cliente,
    carrito,
    artista_Evento,
    evento,
    registroVentas,
    ropa,
    grupoMusical,
    genero,
    talla,
    estado

};