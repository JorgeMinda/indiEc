const orm = require('../../../infrastructure/database/connection/dataBase.orm');
const sql = require('../../../infrastructure/database/connection/dataBase.sql');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose');

class CancionService {

    // Obtener todas las canciones
    async obtenerCanciones() {
        try {
            const [canciones] = await sql.promise().query(`
                SELECT c.*, a.nombre as nombreArtista, a.apellido as apellidoArtista
                FROM canciones c
                LEFT JOIN artistas a ON c.idArtista = a.idArtista
                WHERE c.estado = 'activo'
                ORDER BY c.createCancion DESC
            `);

            const cancionesCompletas = await Promise.all(
                canciones.map(async (cancion) => {
                    const cancionMongo = await mongo.cancionModel.findOne({
                        idCancionSql: cancion.idCancion
                    });

                    return {
                        id: cancion.idCancion,
                        titulo: cancion.titulo,
                        album: cancion.album || 'Single',
                        duracion: cancionMongo?.duracion || '0:00',
                        streams: cancion.streams || 0,
                        año: cancion.año,
                        genero: cancionMongo?.genero || '',
                        artista: `${cancion.nombreArtista} ${cancion.apellidoArtista}`,
                        idArtista: cancion.idArtista
                    };
                })
            );

            return cancionesCompletas;

        } catch (error) {
            throw new Error('Error al obtener canciones: ' + error.message);
        }
    }

    // Obtener canciones de un artista específico
    async obtenerCancionesPorArtista(idArtista) {
        try {
            const [canciones] = await sql.promise().query(`
                SELECT * FROM canciones 
                WHERE idArtista = ? AND estado = 'activo'
                ORDER BY año DESC, titulo ASC
            `, [idArtista]);

            const cancionesCompletas = await Promise.all(
                canciones.map(async (cancion) => {
                    const cancionMongo = await mongo.cancionModel.findOne({
                        idCancionSql: cancion.idCancion
                    });

                    return {
                        id: cancion.idCancion,
                        titulo: cancion.titulo,
                        album: cancion.album || 'Single',
                        duracion: cancionMongo?.duracion || '0:00',
                        streams: cancion.streams || 0,
                        año: cancion.año
                    };
                })
            );

            return cancionesCompletas;

        } catch (error) {
            throw new Error('Error al obtener canciones del artista: ' + error.message);
        }
    }

    // Crear canción
    async crearCancion(datos) {
        try {
            const { idArtista, titulo, album, año, duracion, genero } = datos;

            // Validar que el artista exista
            const [artista] = await sql.promise().query(
                'SELECT idArtista FROM artistas WHERE idArtista = ? AND estado = "activo"',
                [idArtista]
            );

            if (artista.length === 0) {
                throw new Error('El artista no existe o está inactivo');
            }

            // Insert SQL
            const datosSql = {
                idArtista,
                titulo,
                album: album || 'Single',
                año: año || new Date().getFullYear(),
                streams: 0,
                estado: 'activo',
                createCancion: new Date().toLocaleString()
            };

            const nueva = await orm.cancion.create(datosSql);
            const idCancion = nueva.idCancion;

            // Insert Mongo
            const datosMongo = {
                duracion: duracion || '0:00',
                genero: genero || '',
                imagen: null,
                idCancionSql: idCancion,
                createCancionMongo: new Date().toLocaleString()
            };

            await mongo.cancionModel.create(datosMongo);

            return { 
                idCancion,
                message: 'Canción creada exitosamente'
            };

        } catch (error) {
            throw new Error('Error al crear canción: ' + error.message);
        }
    }

    // Actualizar canción
    async actualizarCancion(id, datos) {
        try {
            const { titulo, album, año, duracion, genero, streams } = datos;

            await sql.promise().query(`
                UPDATE canciones
                SET titulo = ?, album = ?, año = ?, streams = ?, updateCancion = ?
                WHERE idCancion = ?
            `, [
                titulo,
                album || 'Single',
                año || new Date().getFullYear(),
                streams || 0,
                new Date().toLocaleString(),
                id
            ]);

            await mongo.cancionModel.updateOne(
                { idCancionSql: id },
                {
                    duracion: duracion || '0:00',
                    genero: genero || '',
                    updateCancionMongo: new Date().toLocaleString()
                }
            );

            return { message: 'Canción actualizada exitosamente' };

        } catch (error) {
            throw new Error('Error al actualizar canción: ' + error.message);
        }
    }

    // Eliminar canción (soft delete)
    async eliminarCancion(id) {
        try {
            await sql.promise().query(`
                UPDATE canciones
                SET estado = 'inactivo', updateCancion = ?
                WHERE idCancion = ?
            `, [new Date().toLocaleString(), id]);

            return { message: 'Canción eliminada exitosamente' };

        } catch (error) {
            throw new Error('Error al eliminar canción: ' + error.message);
        }
    }

    // Incrementar streams
    async incrementarStreams(id) {
        try {
            await sql.promise().query(`
                UPDATE canciones
                SET streams = streams + 1
                WHERE idCancion = ?
            `, [id]);

            return { message: 'Streams incrementados' };

        } catch (error) {
            throw new Error('Error al incrementar streams: ' + error.message);
        }
    }
}

module.exports = new CancionService();