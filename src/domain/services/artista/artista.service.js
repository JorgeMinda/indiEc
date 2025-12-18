const orm = require('../../../infrastructure/database/connection/dataBase.orm');
const sql = require('../../../infrastructure/database/connection/dataBase.sql');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose');
const { descifrarDatos, cifrarDatos } = require('../../../application/use-cases/auth/encrypDates');

class ArtistaService {

    // Obtener todos
    async obtenerArtistas() {
        try {
            const [listaArtistas] = await sql.promise().query(`
                SELECT * FROM artistas
            `);

            const artistasCompletos = await Promise.all(
                listaArtistas.map(async (artista) => {

                    const artistaMongo = await mongo.artistaModel.findOne({
                        idArtistaSql: artista.idArtista
                    });

                    return {
                        ...artista,
                        correo: descifrarDatos(artista.correo),
                        detallesMongo: artistaMongo
                    };
                })
            );

            return artistasCompletos;

        } catch (error) {
            throw new Error('Error al obtener artistas: ' + error.message);
        }
    }

    // Crear artista
    async crearArtista(datos, archivos) {
        try {
            const { nombre, apellido, correo, telefono, direccion } = datos;

            // Verificar duplicado
            const [existe] = await sql.promise().query(
                'SELECT * FROM artistas WHERE correo = ?',
                [cifrarDatos(correo)]
            );

            if (existe.length > 0) {
                throw new Error('El artista ya existe con ese correo');
            }

            // Insert SQL
            const datosSql = {
                nombre,
                apellido,
                correo: cifrarDatos(correo),
                estado: 'activo',
                createArtista: new Date().toLocaleString()
            };

            const nuevo = await orm.artista.create(datosSql);
            const idArtista = nuevo.idArtista;

            // Insert Mongo
            const datosMongo = {
                telefono: cifrarDatos(telefono),
                direccion,
                fotoPerfil: archivos?.fotoPerfil?.name || null,
                idArtistaSql: idArtista,
                createArtistaMongo: new Date().toLocaleString()
            };

            await mongo.artistaModel.create(datosMongo);

            return { idArtista };

        } catch (error) {
            throw new Error('Error al crear artista: ' + error.message);
        }
    }

    // Obtener por ID
    async obtenerArtistaPorId(id) {
        try {
            const [artista] = await sql.promise().query(
                'SELECT * FROM artistas WHERE idArtista = ?',
                [id]
            );

            if (artista.length === 0) {
                throw new Error('Artista no encontrado');
            }

            const artistaMongo = await mongo.artistaModel.findOne({
                idArtistaSql: id
            });

            return {
                ...artista[0],
                correo: descifrarDatos(artista[0].correo),
                telefono: artistaMongo ? descifrarDatos(artistaMongo.telefono) : '',
                direccion: artistaMongo?.direccion || '',
                fotoPerfil: artistaMongo?.fotoPerfil || ''
            };

        } catch (error) {
            throw new Error('Error al obtener artista: ' + error.message);
        }
    }

    // Actualizar artista
    async actualizarArtista(id, datos) {
        try {
            const { nombre, apellido, correo, telefono, direccion } = datos;

            await sql.promise().query(`
                UPDATE artistas
                SET nombre = ?, apellido = ?, correo = ?, updateArtista = ?
                WHERE idArtista = ?
            `, [
                nombre,
                apellido,
                cifrarDatos(correo),
                new Date().toLocaleString(),
                id
            ]);

            await mongo.artistaModel.updateOne(
                { idArtistaSql: id },
                {
                    telefono: cifrarDatos(telefono),
                    direccion,
                    updateArtistaMongo: new Date().toLocaleString()
                }
            );

            return true;

        } catch (error) {
            throw new Error('Error al actualizar artista: ' + error.message);
        }
    }

    // Eliminar artista (estado = inactivo)
    async eliminarArtista(id) {
        try {
            await sql.promise().query(`
                UPDATE artistas
                SET estado = 'inactivo', updateArtista = ?
                WHERE idArtista = ?
            `, [new Date().toLocaleString(), id]);

            return true;

        } catch (error) {
            throw new Error('Error al eliminar artista: ' + error.message);
        }
    }
}

module.exports = new ArtistaService();
