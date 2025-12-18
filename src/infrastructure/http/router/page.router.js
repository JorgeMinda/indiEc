const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');




const { mostrarPagina, crearPagina } = require('../controller/page.controller')

router.get('/lista', isLoggedIn, mostrarPagina)
router.post('/crear', isLoggedIn, crearPagina)

module.exports = router