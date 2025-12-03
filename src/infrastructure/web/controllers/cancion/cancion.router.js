const { Router } = require('express');
const router = Router();
const cancionCtl = require('./cancion.controller');

router.post('/', cancionCtl.crearCancion);
// router.get('/', cancionCtl.obtenerTodas);
// router.get('/artista/:id', cancionCtl.obtenerPorArtista);

module.exports = router;