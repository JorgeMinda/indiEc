// src/infrastructure/container.js
const NodeEncriptador = require('./services/NodeEncriptador');

// Repositorios
const SequelizeAlbumRepository = require('../Database/sql/repositories/SequelizeAlbumRepository');
const SequelizeArtistaRepository = require('../Database/sql/repositories/SequelizeArtistaRepository');
const SequelizeCancionRepository = require('../Database/sql/repositories/SequelizeCancionRepository');
const SequelizeCarritoRepository = require('../Database/sql/repositories/SequelizeCarritoRepository');
const SequelizeClienteRepository = require('../Database/sql/repositories/SequelizeClienteRepository');
const SequelizeEventoRepository = require('../Database/sql/repositories/SequelizeEventoRepository');

// Inyección
const encriptador = new NodeEncriptador();

module.exports = {
  encriptador,
  albumRepository: new SequelizeAlbumRepository(),
  artistaRepository: new SequelizeArtistaRepository({ encriptador }),
  cancionRepository: new SequelizeCancionRepository(),
  carritoRepository: new SequelizeCarritoRepository(),
  clienteRepository: new SequelizeClienteRepository({ encriptador }),
  eventoRepository: new SequelizeEventoRepository()
};