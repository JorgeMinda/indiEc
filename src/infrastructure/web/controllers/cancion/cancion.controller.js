// src/infrastructure/web/controllers/cancion.controller.js → VERSIÓN FINAL Y FUNCIONAL
const orm = require('../../../Database/dataBase.orm');
const mongo = require('../../../Database/dataBaseMongose');

const cancionCtl = {};

cancionCtl.crearCancion = async (req, res) => {
  try {
    const { titulo, album, año, artistaIdArtista, albumeIdAlbum, duracion, genero } = req.body;
    const imagen = req.files?.imagen?.name || null;

    // Crear en PostgreSQL
    const nuevaCancion = await orm.cancion.create({
      titulo,
      album,
      año: parseInt(año),
      artistaIdArtista,
      albumeIdAlbum,
      estado: 'activo',
      createCancion: new Date().toLocaleString()
    });

    // Crear en MongoDB
    await mongo.cancionModel.create({
      duracion,
      genero,
      imagen,
      idCancionSql: nuevaCancion.idCancion,
      createCancionMongo: new Date().toLocaleString()
    });

    res.api({ idCancion: nuevaCancion.idCancion }, 201, 'Canción creada exitosamente');
  } catch (err) {
    console.error('Error creando canción:', err);
    res.error(err.message || 'Error interno', 500);
  }
};

module.exports = cancionCtl;