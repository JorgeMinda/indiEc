// src/app.js (o index.js) - VERSIÓN FINAL ÉPICA
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const winston = require('winston');
const fs = require('fs');
const crypto = require('crypto');
const hpp = require('hpp');
const toobusy = require('toobusy-js');
const cors = require('cors');

const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT } = require('./keys');
require('./infrastructure/web/controllers/middlewares/lib/passport');

const app = express();

// ==================== LOGS PRO (Winston) ====================
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'app.log'), maxsize: 10 * 1024 * 1024, maxFiles: 5 }),
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
  ]
});

// Reemplazar console


app.use(morgan('dev', {
  stream: { write: msg => logger.info(msg.trim()) }
}));

// ==================== SEGURIDAD HARDENED ====================
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', credentials: true }));
app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Rate limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

// Too busy protection
app.use((req, res, next) => toobusy() ? res.status(503).json({ error: 'Server too busy' }) : next());

// Cookies + Session segura
app.use(cookieParser(crypto.randomBytes(64).toString('hex')));
const sessionStore = new MySQLStore({ host: MYSQLHOST, port: MYSQLPORT, user: MYSQLUSER, password: MYSQLPASSWORD, database: MYSQLDATABASE });

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  },
  name: 'indiec.sid'
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Subida de archivos
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 }, abortOnLimit: true }));

// ==================== RESPUESTAS API UNIFICADAS ====================
app.use((req, res, next) => {
  res.api = (data = null, message = 'Éxito', status = 200) => {
    res.status(status).json({ success: true, message, data });
  };
  res.error = (message = 'Error', status = 400, errors = null) => {
    res.status(status).json({ success: false, message, errors });
  };
  next();
});

// ==================== RUTAS API (HEXAGONALES) ====================
app.use('/', require('./infrastructure/web/controllers/index/index'));
app.use('/api/artistas', require('./infrastructure/web/controllers/artista/artista.router'));
app.use('/api/albums', require('./infrastructure/web/controllers/album/album.router'));
app.use('/api/canciones', require('./infrastructure/web/controllers/cancion/cancion.router'));
app.use('/api/eventos', require('./infrastructure/web/controllers/evento/evento.router'));
app.use('/api/carrito', require('./infrastructure/web/controllers/carrito/carrito.router'));
app.use('/api/auth', require('./infrastructure/web/controllers/auth/auth.router'));
app.use('/api/ventas', require('./infrastructure/web/controllers/ventas/ventas.router'));
app.use('/api/ropa', require('./infrastructure/web/controllers/ropa/ropa.router'));
app.use('/api/disquera', require('./infrastructure/web/controllers/disquera/disquera.router'));
app.use('/api/grupos', require('./infrastructure/web/controllers/grupoMusical/grupoMusical.router'));
app.use('/api/managers', require('./infrastructure/web/controllers/manager/manager.router'));
app.use('/api/auxiliares', require('./infrastructure/web/controllers/auxiliares/auxiliares.router'));
app.use('/api/relaciones', require('./infrastructure/web/controllers/relaciones/relaciones.router'));

// ==================== 404 & ERROR HANDLER ====================
app.use((req, res) => {
  logger.warn(`404 → ${req.method} ${req.originalUrl}`);
  res.error('Ruta no encontrada', 404);
});

app.use((err, req, res, next) => {
  logger.error(`ERROR: ${err.message}\n${err.stack}`);
  res.error('Error interno del servidor', 500);
});

// ==================== INICIO DEL SERVIDOR ====================
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logger.info(`INDIEC BACKEND corriendo en puerto ${PORT}`);
  logger.info(`Modo: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Arquitectura: 100% HEXAGONAL`);
});

module.exports = app;