const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, logout, getProfile } = require('../controller/auth.controller');
const isLoggedIn = require('../../../application/use-cases/auth/auth.js');


// Validaciones
const registerValidation = [
    body('nameUsers').notEmpty().withMessage('Name is required'),
    body('emailUser').isEmail().withMessage('Valid email is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phoneUser').optional().isMobilePhone()
  ];

const loginValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
];

// Rutas
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', isLoggedIn, logout);
router.get('/profile', isLoggedIn, getProfile);

module.exports = router;