const orm = require('../../../infrastructure/database/connection/dataBase.orm.js');
const sql = require('../../../infrastructure/database/connection/dataBase.sql.js');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose.js');

class AlbumService {

    async obtenerAlbumes() {
        try {
            // Obtener álbumes desde SQL
            const [listaAlbumes] = await sql.promise().query(`
                SELECT * FROM albumes
            `);

            // Unir con Mongo
            const albumesCompletos = await Promise.all(
                listaAlbumes.map(async (album) => {
                    const albumMongo = await mongo.albumModel.findOne({
                        idAlbumSql: album.idAlbum
                    });

                    return {
                        ...album,
                        detallesMongo: albumMongo
                    };
                })
            );

            return albumesCompletos;

        } catch (error) {
            throw new Error('Error al obtener álbumes: ' + error.message);
        }
    }


    async crearAlbum(datosAlbum, archivos) {
        try {

            const {
                tituloAlbum,
                artista,
                anoLanzamiento,
                enlace,
                genero,
                artistaIdArtista
            } = datosAlbum;

            // INSERT SQL
            const datosSql = {
                tituloAlbum,
                artista,
                anoLanzamiento: parseInt(anoLanzamiento),
                estado: 'activo',
                createAlbum: new Date().toLocaleString(),
                artistaIdArtista
            };

            const nuevoAlbum = await orm.album.create(datosSql);
            const idAlbum = nuevoAlbum.idAlbum;

            // INSERT Mongo
            const datosMongo = {
                enlace,
                genero,
                imagen: archivos?.imagen?.name || null,
                idAlbumSql: idAlbum,
                createAlbumMongo: new Date().toLocaleString()
            };

            await mongo.albumModel.create(datosMongo);

            return { idAlbum };

        } catch (error) {
            throw new Error('Error al crear álbum: ' + error.message);
        }
    }
}

module.exports = new AlbumService();
