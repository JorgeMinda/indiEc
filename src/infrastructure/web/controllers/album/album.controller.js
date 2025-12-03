// src/infrastructure/web/controllers/album.controller.js → VERSIÓN FINAL Y FUNCIONAL
const orm = require('../../../Database/dataBase.orm');
const mongo = require('../../../Database/dataBaseMongose');

const albumCtl = {};

albumCtl.crearAlbum = async (req, res) => {
  try {
    const { tituloAlbum, artista, anoLanzamiento, artistaIdArtista, enlace, genero } = req.body;
    const imagen = req.files?.imagen?.name || null;

    // Crear en PostgreSQL
    const nuevoAlbum = await orm.album.create({
      tituloAlbum,
      artista,
      anoLanzamiento: parseInt(anoLanzamiento),
      artistaIdArtista,
      estado: 'activo',
      createAlbum: new Date().toLocaleString()
    });

    // Crear en MongoDB
    await mongo.albumModel.create({
      enlace,
      genero,
      imagen,
      idAlbumSql: nuevoAlbum.idAlbum,
      createAlbumMongo: new Date().toLocaleString()
    });

    res.api({ idAlbum: nuevoAlbum.idAlbum }, 201, 'Álbum creado exitosamente');
  } catch (err) {
    console.error('Error creando álbum:', err);
    res.error(err.message || 'Error interno', 500);
  }
};

module.exports = albumCtl;