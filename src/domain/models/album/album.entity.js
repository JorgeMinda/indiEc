// src/domain/models/album/album.entity.js
class Album {
    constructor({
      id,
      titulo,
      artistaId,
      fechaLanzamiento,
      portada,
      canciones = [],
      precio = 0,
      activo = true
    }) {
      this.id = id;
      this.titulo = titulo;
      this.artistaId = artistaId;
      this.fechaLanzamiento = fechaLanzamiento;
      this.portada = portada;
      this.canciones = canciones;
      this.precio = precio;
      this.activo = activo;
    }
  
    esValido() {
      return this.titulo && this.canciones.length > 0;
    }
  
    estaActivo() {
      return this.activo;
    }
  }
  
  module.exports = Album;