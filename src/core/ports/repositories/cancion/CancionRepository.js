// src/core/ports/repositories/CancionRepository.js
class CancionRepository {
    async guardar(cancion) { throw new Error('guardar() no implementado'); }
    async buscarPorId(id) { throw new Error('buscarPorId() no implementado'); }
    async buscarTodas() { throw new Error('buscarTodas() no implementado'); }
    async buscarPorArtista(artistaId) { throw new Error('buscarPorArtista() no implementado'); }
    async actualizar(cancion) { throw new Error('actualizar() no implementado'); }
  }
  
  module.exports = CancionRepository;