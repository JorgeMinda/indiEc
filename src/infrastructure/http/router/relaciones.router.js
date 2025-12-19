const express = require("express");
const router = express.Router();
const {
    asignarArtistaEvento,
    obtenerArtistasEvento,
    asignarArtistaGrupo,
    obtenerMiembrosGrupo
} = require('../controller/relaciones.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

// Relaciones artista-evento
router.post('/artista-evento', isLoggedIn, asignarArtistaEvento);
router.get('/evento/:eventoId/artistas', isLoggedIn, obtenerArtistasEvento);

// Relaciones artista-grupo
router.post('/artista-grupo', isLoggedIn, asignarArtistaGrupo);
router.get('/grupo/:grupoId/miembros', isLoggedIn, obtenerMiembrosGrupo);

module.exports = router;