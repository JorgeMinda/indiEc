// src/infrastructure/web/controllers/evento.controller.js → VERSIÓN FINAL Y FUNCIONAL
const orm = require('../../../Database/dataBase.orm');
const mongo = require('../../../Database/dataBaseMongose');

const eventoCtl = {};

eventoCtl.crearEvento = async (req, res) => {
  try {
    const { nombreEvento, ubicacion, fecha, generoMusical, contacto, capacidad, descripcion } = req.body;
    const imagen = req.files?.imagen?.name || null;

    // Crear en PostgreSQL
    const nuevoEvento = await orm.evento.create({
      nombreEvento,
      ubicacion,
      fecha: new Date(fecha),
      generoMusical,
      estado: 'activo',
      createEvento: new Date().toLocaleString()
    });

    // Crear en MongoDB
    await mongo.eventoModel.create({
      contacto,
      capacidad: parseInt(capacidad),
      descripcion,
      imagen,
      idEventoSql: nuevoEvento.idEvento,
      createEventoMongo: new Date().toLocaleString()
    });

    res.api({ idEvento: nuevoEvento.idEvento }, 201, 'Evento creado exitosamente');
  } catch (err) {
    console.error('Error creando evento:', err);
    res.error(err.message || 'Error interno', 500);
  }
};

module.exports = eventoCtl;