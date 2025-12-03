const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const authCtl = require('./auth.controller');
const isLoggedIn = require('../middlewares/lib/auth');

// Validaciones
const registerValidation = [
  body('nameUsers').notEmpty().withMessage('El nombre es requerido'),
  body('emailUser').isEmail().withMessage('Correo válido requerido'),
  body('userName').notEmpty().withMessage('Username requerido'),
  body('passwordUser').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres')
];

const loginValidation = [
  body('username').notEmpty().withMessage('Username requerido'),
  body('password').notEmpty().withMessage('Contraseña requerida')
];

// Rutas
router.post('/register', registerValidation, authCtl.registrar);
router.post('/login', loginValidation, authCtl.login);
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout(() => res.api('Sesión cerrada', 200));
});
router.get('/profile', isLoggedIn, (req, res) => res.api(req.user));

module.exports = router;