// src/core/domain/entities/Album.js
class Album {
    constructor({
      id = null,
      titulo,
      artista,
      anoLanzamiento,
      artistaIdArtista,
      enlace = null,
      genero = null,
      imagen = null,
      estado = 'activo'
    }) {
      this.id = id;
      this.titulo = titulo;
      this.artista = artista;
      this.anoLanzamiento = anoLanzamiento;
      this.artistaIdArtista = artistaIdArtista;
      this.enlace = enlace;
      this.genero = genero;
      this.imagen = imagen;
      this.estado = estado;
    }
  
    estaActivo() {
      return this.estado === 'activo';
    }
  
    desactivar() {
      this.estado = 'inactivo';
    }
  }
  
  module.exports = Album;