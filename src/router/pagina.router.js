const express = require("express");
const router = express.Router();
const isLoggedIn = require('../lib/auth');

const { mostrarPagina, mandarPagina } = require('../controller/pagina.controller')

router.get('/lista', isLoggedIn, mostrarPagina)
router.post('/crear', isLoggedIn, mandarPagina)

module.exports = router