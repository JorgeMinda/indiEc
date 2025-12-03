class ActualizarArtista {
    constructor({ artistaRepository, encriptador }) {
      this.artistaRepository = artistaRepository;
      this.encriptador = encriptador;
    }
  
    async ejecutar(id, datos) {
      const artista = await this.artistaRepository.buscarPorId(id);
      if (!artista || !artista.estaActivo()) {
        throw new Error('Artista no encontrado');
      }
  
      // Actualizar campos que vengan
      if (datos.nombre) artista.nombre = datos.nombre;
      if (datos.apellido) artista.apellido = datos.apellido;
      if (datos.correo) artista.correo = await this.encriptador.cifrar(datos.correo);
      if (datos.telefono !== undefined) {
        artista.telefono = datos.telefono ? await this.encriptador.cifrar(datos.telefono) : null;
      }
      if (datos.direccion !== undefined) artista.direccion = datos.direccion;
      if (datos.fotoPerfil !== undefined) artista.fotoPerfil = datos.fotoPerfil;
  
      await this.artistaRepository.actualizar(artista);
      return { mensaje: 'Artista actualizado exitosamente' };
    }
  }
  
  module.exports = ActualizarArtista;