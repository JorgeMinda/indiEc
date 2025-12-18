class PerfilDisquera {
  constructor({
      id,
      nombreDisquera,
      correo,
      estado,
      direccion,
      telefono,
      descripcion,
      fotoImagen,
      publicada = false
  }) {
      this.id = id;
      this.nombreDisquera = nombreDisquera;
      this.correo = correo;
      this.estado = estado;
      this.direccion = direccion;
      this.telefono = telefono;
      this.descripcion = descripcion;
      this.fotoImagen = fotoImagen;
      this.publicada = publicada;
  }

  estaActiva() {
      return this.estado === 'ACTIVA';
  }
}

module.exports = PerfilDisquera;
