// src/domain/models/manager/manager.entity.js
class Manager {
    constructor({ id, nombre, email, artistasGestionados = [] }) {
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.artistasGestionados = artistasGestionados;
    }
  
    gestionaArtista(artistaId) {
      return this.artistasGestionados.includes(artistaId);
    }
  }
  
  module.exports = Manager;