class PaginaController {
    constructor({ obtenerPaginaUseCase }) {
      this.obtenerPaginaUseCase = obtenerPaginaUseCase;
    }
  
    async obtener(req, res) {
      try {
        const data = await this.obtenerPaginaUseCase.execute(req.params.id);
        return res.api(data, 200);
      } catch (error) {
        return res.api(error.message, 404);
      }
    }
  }
  
  module.exports = PaginaController;
  