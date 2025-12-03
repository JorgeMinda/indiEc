// src/core/application/use-cases/cancion/CrearCancion.js
const Cancion = require('../../../domain/entities/Cancion');

class CrearCancion {
  constructor({ cancionRepository }) {
    this.cancionRepository = cancionRepository;
  }

  async ejecutar(datos) {
    const { titulo, album, año, artistaIdArtista, albumeIdAlbum, duracion, genero, imagen } = datos;

    const cancion = new Cancion({
      titulo,
      album,
      año: parseInt(año),
      artistaId: artistaIdArtista,
      albumeId: albumeIdAlbum,
      duracion,
      genero,
      imagen
    });

    const guardada = await this.cancionRepository.guardar(cancion);
    return { idCancion: guardada.id };
  }
}

module.exports = CrearCancion;