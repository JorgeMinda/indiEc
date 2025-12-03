// src/core/application/use-cases/evento/CrearEvento.js
const Evento = require('../../../domain/entities/Evento');
class CrearEvento {
  constructor({ eventoRepository }) { this.eventoRepository = eventoRepository; }
  async ejecutar(datos) {
    const evento = new Evento({ ...datos, fecha: new Date(datos.fecha) });
    const guardado = await this.eventoRepository.guardar(evento);
    return { idEvento: guardado.id };
  }
}
module.exports = CrearEvento;