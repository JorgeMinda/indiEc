class RelacionesController {
    constructor({ obtenerRelacionesUseCase }) {
      this.obtenerRelacionesUseCase = obtenerRelacionesUseCase;
    }
  
    async listar(req, res) {
      try {
        const data = await this.obtenerRelacionesUseCase.execute();
        return res.api(data, 200);
      } catch (error) {
        return res.api(error.message, 500);
      }
    }
  }
  
  module.exports = RelacionesController;
  