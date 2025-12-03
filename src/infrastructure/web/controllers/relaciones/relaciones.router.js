const { Router } = require('express');
const router = Router();
const orm = require('../../../Database/dataBase.orm');
const isLoggedIn = require('../middlewares/lib/auth');

router.post('/artista-evento', isLoggedIn, async (req, res) => {
  const { artistaId, eventoId } = req.body;
  const artista = await orm.artista.findByPk(artistaId);
  const evento = await orm.evento.findByPk(eventoId);
  await artista.addEvento(evento);
  res.api(null, 'Artista asignado al evento');
});

router.get('/evento/:eventoId/artistas', isLoggedIn, async (req, res) => {
  const evento = await orm.evento.findByPk(req.params.eventoId, { include: orm.artista });
  res.api(evento?.artistas || []);
});

router.post('/artista-grupo', isLoggedIn, async (req, res) => {
  const { artistaId, grupoId } = req.body;
  const artista = await orm.artista.findByPk(artistaId);
  const grupo = await orm.grupoMusical.findByPk(grupoId);
  await artista.addGrupoMusical(grupo);
  res.api(null, 'Artista asignado al grupo');
});

router.get('/grupo/:grupoId/miembros', isLoggedIn, async (req, res) => {
  const grupo = await orm.grupoMusical.findByPk(req.params.grupoId, { include: orm.artista });
  res.api(grupo?.artistas || []);
});

module.exports = router;