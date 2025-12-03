// src/core/application/use-cases/album/CrearAlbum.js
const Album = require('../../../domain/entities/Album');

class CrearAlbum {
  constructor({ albumRepository }) {
    this.albumRepository = albumRepository;
  }

  async ejecutar(datos) {
    const { tituloAlbum, artista, anoLanzamiento, artistaIdArtista, enlace, genero, imagen } = datos;

    const album = new Album({
      titulo: tituloAlbum,
      artista,
      anoLanzamiento: parseInt(anoLanzamiento),
      artistaIdArtista,
      enlace,
      genero,
      imagen
    });

    const guardado = await this.albumRepository.guardar(album);
    return { idAlbum: guardado.id };
  }
}

module.exports = CrearAlbum;