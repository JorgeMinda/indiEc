const express = require('express');
const router = express.Router();

const { 
    mostrarCarritos, 
    crearCarrito, 
    actualizarCarrito, 
    eliminarCarrito 
} = require('../controller/carrito.controller');
const isLoggedIn = require('../lib/auth');

// Obtener todos los carritos
router.get('/lista', isLoggedIn, mostrarCarritos);

// Crear nuevo carrito
router.post('/crear', isLoggedIn, crearCarrito);

// Actualizar un carrito existente
router.put('/actualizar/:id', isLoggedIn, actualizarCarrito);

// Eliminar (desactivar) un carrito
router.delete('/eliminar/:id', isLoggedIn, eliminarCarrito);

module.exports = router;
