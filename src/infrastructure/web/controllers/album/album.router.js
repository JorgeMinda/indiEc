const { Router } = require('express');
const router = Router();
const albumCtl = require('./album.controller');

router.post('/', albumCtl.crearAlbum);
// router.get('/', albumCtl.obtenerTodos);
// router.get('/:id', albumCtl.obtenerPorId);

module.exports = router;