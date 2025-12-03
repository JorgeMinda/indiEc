// src/core/ports/repositories/AlbumRepository.js
class AlbumRepository {
    async guardar(album) { throw new Error('guardar() no implementado'); }
    async buscarPorId(id) { throw new Error('buscarPorId() no implementado'); }
    async buscarTodos() { throw new Error('buscarTodos() no implementado'); }
  }
  
  module.exports = AlbumRepository;