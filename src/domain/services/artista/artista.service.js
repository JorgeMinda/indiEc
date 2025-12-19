const orm = require('../../../infrastructure/database/connection/dataBase.orm');
const sql = require('../../../infrastructure/database/connection/dataBase.sql');
const mongo = require('../../../infrastructure/database/connection/dataBaseMongose');
const { descifrarDatos, cifrarDatos } = require('../../../application/use-cases/auth/encrypDates');
const path = require('path');
const fs = require('fs');

class ArtistaService {

    // Obtener todos
    async obtenerArtistas() {
        try {
            const [listaArtistas] = await sql.promise().query(`
                SELECT * FROM artistas WHERE estado = 'activo'
            `);

            const artistasCompletos = await Promise.all(
                listaArtistas.map(async (artista) => {
                    const artistaMongo = await mongo.artistaModel.findOne({
                        idArtistaSql: artista.idArtista
                    });

                    // Obtener canciones del artista
                    const [canciones] = await sql.promise().query(`
                        SELECT * FROM canciones 
                        WHERE idArtista = ? AND estado = 'activo'
                    `, [artista.idArtista]);

                    // Obtener álbumes únicos
                    const albumesSet = new Set();
                    canciones.forEach(c => {
                        if (c.album && c.album !== 'Single') {
                            albumesSet.add(c.album);
                        }
                    });

                    return {
                        id: artista.idArtista,
                        nombre: `${artista.nombre} ${artista.apellido}`,
                        email: descifrarDatos(artista.correo),
                        telefono: artistaMongo ? descifrarDatos(artistaMongo.telefono) : '',
                        genero: artista.genero || '',
                        ciudad: artista.ciudad || '',
                        biografia: artista.biografia || '',
                        photoUrl: artistaMongo?.fotoPerfil || null,
                        canciones: [],
                        albumes: []
                    };
                })
            );

            return artistasCompletos;

        } catch (error) {
            throw new Error('Error al obtener artistas: ' + error.message);
        }
    }

    // Obtener por ID CON CANCIONES Y ÁLBUMES
    async obtenerArtistaPorId(id) {
        try {
            const [artista] = await sql.promise().query(
                'SELECT * FROM artistas WHERE idArtista = ? AND estado = "activo"',
                [id]
            );

            if (artista.length === 0) {
                throw new Error('Artista no encontrado');
            }

            const artistaMongo = await mongo.artistaModel.findOne({
                idArtistaSql: id
            });

            // OBTENER CANCIONES DEL ARTISTA
            const [canciones] = await sql.promise().query(`
                SELECT * FROM canciones 
                WHERE idArtista = ? AND estado = 'activo'
                ORDER BY año DESC, titulo ASC
            `, [id]);

            // Mapear canciones con datos de MongoDB
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
                        streams: cancion.streams || 0
                    };
                })
            );

            // OBTENER ÁLBUMES ÚNICOS
            const albumesMap = new Map();
            canciones.forEach(cancion => {
                if (cancion.album && cancion.album !== 'Single') {
                    if (!albumesMap.has(cancion.album)) {
                        albumesMap.set(cancion.album, {
                            id: cancion.idCancion, // Usar ID de la primera canción como referencia
                            titulo: cancion.album,
                            año: cancion.año || new Date().getFullYear(),
                            canciones: 1
                        });
                    } else {
                        albumesMap.get(cancion.album).canciones++;
                    }
                }
            });

            const albumes = Array.from(albumesMap.values());

            return {
                id: artista[0].idArtista,
                nombre: `${artista[0].nombre} ${artista[0].apellido}`,
                email: descifrarDatos(artista[0].correo),
                telefono: artistaMongo ? descifrarDatos(artistaMongo.telefono) : '',
                genero: artista[0].genero || '',
                ciudad: artista[0].ciudad || '',
                biografia: artista[0].biografia || '',
                photoUrl: artistaMongo?.fotoPerfil || null,
                canciones: cancionesCompletas,
                albumes: albumes
            };

        } catch (error) {
            throw new Error('Error al obtener artista: ' + error.message);
        }
    }

    // Crear artista
    async crearArtista(datos, archivos) {
        try {
            const { nombre, apellido, email, telefono, genero, ciudad, biografia } = datos;

            // Verificar duplicado por email
            const [existe] = await sql.promise().query(
                'SELECT * FROM artistas WHERE correo = ?',
                [cifrarDatos(email)]
            );

            if (existe.length > 0) {
                throw new Error('El artista ya existe con ese correo');
            }

            // Insert SQL
            const datosSql = {
                nombre,
                apellido,
                correo: cifrarDatos(email),
                genero: genero || '',
                ciudad: ciudad || '',
                biografia: biografia || '',
                estado: 'activo',
                createArtista: new Date().toLocaleString()
            };

            const nuevo = await orm.artista.create(datosSql);
            const idArtista = nuevo.idArtista;

            // Manejar foto si viene
            let nombreFoto = null;
            if (archivos && archivos.photo) {
                const foto = archivos.photo;
                nombreFoto = `artista_${idArtista}_${Date.now()}${path.extname(foto.name)}`;
                const rutaFoto = path.join(__dirname, '../../../public/uploads/artistas/', nombreFoto);
                
                // Crear directorio si no existe
                const dirUploads = path.join(__dirname, '../../../public/uploads/artistas/');
                if (!fs.existsSync(dirUploads)) {
                    fs.mkdirSync(dirUploads, { recursive: true });
                }
                
                await foto.mv(rutaFoto);
            }

            // Insert Mongo
            const datosMongo = {
                telefono: cifrarDatos(telefono || ''),
                direccion: ciudad || '',
                fotoPerfil: nombreFoto,
                idArtistaSql: idArtista,
                createArtistaMongo: new Date().toLocaleString()
            };

            await mongo.artistaModel.create(datosMongo);

            return { 
                idArtista,
                message: 'Artista creado exitosamente'
            };

        } catch (error) {
            throw new Error('Error al crear artista: ' + error.message);
        }
    }

    // Actualizar artista
    async actualizarArtista(id, datos) {
        try {
            const { nombre, apellido, email, telefono, genero, ciudad, biografia } = datos;

            // Separar nombre completo si viene junto
            let nombreFinal = nombre;
            let apellidoFinal = apellido;
            
            if (nombre && !apellido && nombre.includes(' ')) {
                const partes = nombre.split(' ');
                nombreFinal = partes[0];
                apellidoFinal = partes.slice(1).join(' ');
            }

            await sql.promise().query(`
                UPDATE artistas
                SET nombre = ?, apellido = ?, correo = ?, genero = ?, ciudad = ?, biografia = ?, updateArtista = ?
                WHERE idArtista = ?
            `, [
                nombreFinal,
                apellidoFinal,
                cifrarDatos(email),
                genero || '',
                ciudad || '',
                biografia || '',
                new Date().toLocaleString(),
                id
            ]);

            await mongo.artistaModel.updateOne(
                { idArtistaSql: id },
                {
                    telefono: cifrarDatos(telefono || ''),
                    direccion: ciudad || '',
                    updateArtistaMongo: new Date().toLocaleString()
                }
            );

            return { message: 'Artista actualizado exitosamente' };

        } catch (error) {
            throw new Error('Error al actualizar artista: ' + error.message);
        }
    }

    // Eliminar artista (soft delete)
    async eliminarArtista(id) {
        try {
            await sql.promise().query(`
                UPDATE artistas
                SET estado = 'inactivo', updateArtista = ?
                WHERE idArtista = ?
            `, [new Date().toLocaleString(), id]);

            return { message: 'Artista eliminado exitosamente' };

        } catch (error) {
            throw new Error('Error al eliminar artista: ' + error.message);
        }
    }

    // Subir foto de artista
    async subirFoto(id, archivo) {
        try {
            if (!archivo) {
                throw new Error('No se proporcionó ninguna imagen');
            }

            const nombreFoto = `artista_${id}_${Date.now()}${path.extname(archivo.name)}`;
            const rutaFoto = path.join(__dirname, '../../../public/uploads/artistas/', nombreFoto);
            
            // Crear directorio si no existe
            const dirUploads = path.join(__dirname, '../../../public/uploads/artistas/');
            if (!fs.existsSync(dirUploads)) {
                fs.mkdirSync(dirUploads, { recursive: true });
            }

            // Eliminar foto anterior si existe
            const artistaMongo = await mongo.artistaModel.findOne({ idArtistaSql: id });
            if (artistaMongo?.fotoPerfil) {
                const rutaAnterior = path.join(__dirname, '../../../public/uploads/artistas/', artistaMongo.fotoPerfil);
                if (fs.existsSync(rutaAnterior)) {
                    fs.unlinkSync(rutaAnterior);
                }
            }

            await archivo.mv(rutaFoto);

            // Actualizar en Mongo
            await mongo.artistaModel.updateOne(
                { idArtistaSql: id },
                { 
                    fotoPerfil: nombreFoto,
                    updateArtistaMongo: new Date().toLocaleString()
                }
            );

            return { 
                photoUrl: nombreFoto,
                message: 'Foto actualizada exitosamente'
            };

        } catch (error) {
            throw new Error('Error al subir foto: ' + error.message);
        }
    }
}

module.exports = new ArtistaService();