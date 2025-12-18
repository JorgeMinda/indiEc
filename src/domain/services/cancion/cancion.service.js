const orm = require('../../../infrastructure/database/connection/dataBase.orm');
const sql = require('../../../infrastructure/database/connection/dataBase.sql');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose');

class CancionService {
    async obtenerCanciones() {
        const [listaCanciones] = await sql.promise().query(`
            SELECT * FROM canciones
        `);

        return Promise.all(
            listaCanciones.map(async (cancion) => {
                const mongoData = await mongo.cancionModel.findOne({
                    idCancionSql: cancion.idCancion
                });

                return {
                    ...cancion,
                    detallesMongo: mongoData
                };
            })
        );
    }

    async crearCancion(req) {
        const { titulo, album, año, duracion, genero, artistaIdArtista, albumeIdAlbum } = req.body;

        const sqlData = {
            titulo,
            album,
            año: parseInt(año),
            estado: 'activo',
            createCancion: new Date().toLocaleString(),
            artistaIdArtista,
            albumeIdAlbum
        };

        const nuevaCancion = await orm.cancion.create(sqlData);
        const idCancion = nuevaCancion.idCancion;

        const mongoData = {
            duracion,
            genero,
            imagen: req.files?.imagen?.name || null,
            idCancionSql: idCancion,
            createCancionMongo: new Date().toLocaleString()
        };

        await mongo.cancionModel.create(mongoData);

        return { idCancion };
    }

    async obtenerCancionesPorArtista(artistaId) {
        const [canciones] = await sql.promise().query(
            `SELECT * FROM canciones WHERE artistaIdArtista = ?`,
            [artistaId]
        );

        return Promise.all(
            canciones.map(async (cancion) => {
                const mongoData = await mongo.cancionModel.findOne({
                    idCancionSql: cancion.idCancion
                });

                return {
                    ...cancion,
                    duracion: mongoData?.duracion || '',
                    genero: mongoData?.genero || '',
                    imagen: mongoData?.imagen || ''
                };
            })
        );
    }
}

module.exports = new CancionService();
