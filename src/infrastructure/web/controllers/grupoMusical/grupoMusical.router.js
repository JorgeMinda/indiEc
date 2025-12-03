const { Router } = require('express');
const router = Router();
const orm = require('../../../Database/dataBase.orm');
const mongo = require('../../../Database/dataBaseMongose');
const isLoggedIn = require('../middlewares/lib/auth');

router.get('/lista', isLoggedIn, async (req, res) => {
  const grupos = await orm.grupoMusical.findAll({ where: { estado: 'activo' } });
  res.api(grupos);
});

router.post('/crear', isLoggedIn, async (req, res) => {
  const grupo = await orm.grupoMusical.create({ ...req.body, estado: 'activo' });
  if (req.body.extra) await mongo.grupoMusical.create({ ...req.body.extra, idGrupoSql: grupo.idGrupo });
  res.api({ idGrupo: grupo.idGrupo });
});

router.put('/actualizar/:id', isLoggedIn, async (req, res) => {
  await orm.grupoMusical.update(req.body, { where: { idGrupo: req.params.id } });
  res.api(null, 'Grupo actualizado');
});

router.delete('/eliminar/:id', isLoggedIn, async (req, res) => {
  await orm.grupoMusical.update({ estado: 'inactivo' }, { where: { idGrupo: req.params.id } });
  res.api(null, 'Grupo eliminado');
});

module.exports = router;