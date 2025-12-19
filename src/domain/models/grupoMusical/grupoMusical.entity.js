class GrupoMusical {
  constructor({
      id,
      nombre,
      generoMusical,
      descripcion,
      plataforma,
      imagen,
      activo = true
  }) {
      this.id = id;
      this.nombre = nombre;
      this.generoMusical = generoMusical;
      this.descripcion = descripcion;
      this.plataforma = plataforma;
      this.imagen = imagen;
      this.activo = activo;
  }
}

module.exports = GrupoMusical;
