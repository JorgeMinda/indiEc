// src/core/ports/repositories/ClienteRepository.js
class ClienteRepository {
    async guardar(cliente) { throw new Error('guardar() no implementado'); }
    async buscarPorId(id) { throw new Error('buscarPorId() no implementado'); }
    async buscarPorUsername(username) { throw new Error('buscarPorUsername() no implementado'); }
    async actualizar(cliente) { throw new Error('actualizar() no implementado'); }
  }
  
  module.exports = ClienteRepository;