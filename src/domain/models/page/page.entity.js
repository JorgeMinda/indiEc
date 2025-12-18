// src/domain/models/page/page.entity.js
class Page {
    constructor({ id, titulo, contenido, autorId, publicada = false }) {
      this.id = id;
      this.titulo = titulo;
      this.contenido = contenido;
      this.autorId = autorId;
      this.publicada = publicada;
    }
  
    estaPublicada() {
      return this.publicada;
    }
  }
  
  module.exports = Page;