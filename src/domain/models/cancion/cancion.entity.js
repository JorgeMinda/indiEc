// src/domain/models/cancion/cancion.entity.js
class Cancion {
    constructor({
      id,
      titulo,
      duracion,
      albumId,
      artistaId,
      archivo,
      precio = 0,
      activo = true
    }) {
      this.id = id;
      this.titulo = titulo;
      this.duracion = duracion;
      this.albumId = albumId;
      this.artistaId = artistaId;
      this.archivo = archivo;
      this.precio = precio;
      this.activo = activo;
    }
  
    esReproducible() {
      return this.archivo && this.activo;
    }
  }
  
  module.exports = Cancion;