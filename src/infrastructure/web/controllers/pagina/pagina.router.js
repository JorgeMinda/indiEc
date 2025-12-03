const { Router } = require('express');
const router = Router();
const orm = require('../../../Database/dataBase.orm');
const mongo = require('../../../Database/dataBaseMongose');
const isLoggedIn = require('../middlewares/lib/auth');

router.get('/lista', isLoggedIn, async (req, res) => {
  const pagina = await orm.pagina.findOne();
  res.api(pagina || {});
});

router.post('/crear', isLoggedIn, async (req, res) => {
  const sql = await orm.pagina.create(req.body);
  await mongo.pageModel.create({ ...req.body, idPageSql: sql.idPage });
  res.api(null, 'Página creada');
});

module.exports = router;