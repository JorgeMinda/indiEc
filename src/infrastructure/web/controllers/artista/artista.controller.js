// src/infrastructure/web/controllers/artista.controller.js → VERSIÓN FINAL SIN REPOSITORIOS
const orm = require('../../../Database/dataBase.orm');
const { cifrarDatos, descifrarDatos } = require('../middlewares/lib/encrypDates');

const artistaCtl = {};

artistaCtl.crearArtista = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, direccion } = req.body;
    const fotoPerfil = req.files?.fotoPerfil?.name || null;

    const nuevo = await orm.artista.create({
      nombre,
      apellido,
      correo: await cifrarDatos(correo),
      telefono: telefono ? await cifrarDatos(telefono) : null,
      direccion,
      fotoPerfil,
      estado: 'activo'
    });

    res.api({ idArtista: nuevo.idArtista }, 201, 'Artista creado');
  } catch (err) {
    res.error(err.message, 400);
  }
};

artistaCtl.obtenerArtistaPorId = async (req, res) => {
  try {
    const artista = await orm.artista.findByPk(req.params.id);
    if (!artista) throw new Error('Artista no encontrado');

    const mongoData = await require('../../../Database/dataBaseMongose').artistaModel.findOne({ idArtistaSql: artista.idArtista });

    res.api({
      idArtista: artista.idArtista,
      nombre: artista.nombre,
      apellido: artista.apellido,
      correo: await descifrarDatos(artista.correo),
      telefono: mongoData?.telefono ? await descifrarDatos(mongoData.telefono) : null,
      direccion: mongoData?.direccion || null,
      fotoPerfil: mongoData?.fotoPerfil || null,
      estado: artista.estado
    });
  } catch (err) {
    res.error(err.message, 404);
  }
};



module.exports = artistaCtl;