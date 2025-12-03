class EliminarArtista {
    constructor({ artistaRepository }) {
      this.artistaRepository = artistaRepository;
    }
  
    async ejecutar(id) {
      const artista = await this.artistaRepository.buscarPorId(id);
      if (!artista || !artista.estaActivo()) {
        throw new Error('Artista no encontrado');
      }
  
      artista.desactivar();
      await this.artistaRepository.actualizar(artista);
      return { mensaje: 'Artista eliminado exitosamente' };
    }
  }
  
  module.exports = EliminarArtista;