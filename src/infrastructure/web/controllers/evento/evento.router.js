const { Router } = require('express');
const router = Router();
const eventoCtl = require('./evento.controller');

router.post('/', eventoCtl.crearEvento);
// router.get('/', eventoCtl.obtenerTodos);

module.exports = router;