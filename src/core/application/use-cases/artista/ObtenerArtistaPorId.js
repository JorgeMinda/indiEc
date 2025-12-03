class ObtenerArtistaPorId {
    constructor({ artistaRepository, encriptador }) {
      this.artistaRepository = artistaRepository;
      this.encriptador = encriptador;
    }
  
    async ejecutar(id) {
      const artista = await this.artistaRepository.buscarPorId(id);
      if (!artista || !artista.estaActivo()) {
        throw new Error('Artista no encontrado');
      }
  
      // Desencriptar datos sensibles solo para devolver al cliente
      return {
        idArtista: artista.id,
        nombre: artista.nombre,
        apellido: artista.apellido,
        correo: await this.encriptador.descifrar(artista.correo),
        telefono: artista.telefono ? await this.encriptador.descifrar(artista.telefono) : '',
        direccion: artista.direccion || '',
        fotoPerfil: artista.fotoPerfil || '',
        estado: artista.estado
      };
    }
  }
  
  module.exports = ObtenerArtistaPorId;