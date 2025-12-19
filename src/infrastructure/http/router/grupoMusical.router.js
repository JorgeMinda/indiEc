const express = require('express');
const router = express.Router();

const { 
    mostrarGrupos, 
    crearGrupo, 
    actualizarGrupo, 
    eliminarGrupo 
} = require('../controller/grupoMusical.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');

// Obtener todos los grupos musicales
router.get('/lista', isLoggedIn, mostrarGrupos);

// Crear nuevo grupo musical
router.post('/crear', isLoggedIn, crearGrupo);

// Actualizar un grupo musical existente
router.put('/actualizar/:id', isLoggedIn, actualizarGrupo);

// Eliminar (desactivar) un grupo musical
router.delete('/eliminar/:id', isLoggedIn, eliminarGrupo);

module.exports = router;
