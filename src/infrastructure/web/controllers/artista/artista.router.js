// src/router/artista.router.js → VERSIÓN FINAL Y CORRECTA
const { Router } = require('express');
const router = Router();
const artistaCtl = require('./artista.controller');

// Rutas que SÍ tienes definidas en el controlador
router.post('/', artistaCtl.crearArtista);
router.get('/:id', artistaCtl.obtenerArtistaPorId);

// Comentamos temporalmente las que aún no tienes
// router.put('/:id', artistaCtl.actualizarArtista);
// router.delete('/:id', artistaCtl.eliminarArtista);

module.exports = router;