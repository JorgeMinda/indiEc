const Artista = require('../../../domain/entities/Artista');

class CrearArtista {
  constructor({ artistaRepository, encriptador }) {
    this.artistaRepository = artistaRepository;
    this.encriptador = encriptador;
  }

  async ejecutar(datos) {
    const { nombre, apellido, correo, telefono, direccion, fotoPerfil } = datos;

    // Regla de negocio: correo único
    const existe = await this.artistaRepository.buscarPorCorreo(correo);
    if (existe) {
      throw new Error('Ya existe un artista con ese correo');
    }

    const artista = new Artista({
      nombre,
      apellido,
      correo: await this.encriptador.cifrar(correo),
      telefono: telefono ? await this.encriptador.cifrar(telefono) : null,
      direccion,
      fotoPerfil,
    });

    const artistaGuardado = await this.artistaRepository.guardar(artista);
    return { idArtista: artistaGuardado.id };
  }
}

module.exports = CrearArtista;