// src/Database/dataBaseMongose.js → VERSIÓN INDESTRUCTIBLE
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../../keys');

// Usamos process.stdout.write para evitar el conflicto con Winston
const log = (msg) => process.stdout.write(`${msg}\n`);
const error = (msg) => process.stderr.write(`ERROR: ${msg}\n`);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    log('MongoDB conectado correctamente');
  } catch (err) {
    error('FALLA CRÍTICA en conexión MongoDB: ' + err.message);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => log('Mongoose conectado a MongoDB'));
mongoose.connection.on('error', (err) => error('Error Mongoose: ' + err.message));
mongoose.connection.on('disconnected', () => log('Mongoose desconectado'));

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  log('Conexión MongoDB cerrada');
  process.exit(0);
});

connectDB();

module.exports = {};