class AuxiliaresController {
    constructor({ obtenerAuxiliaresUseCase }) {
      this.obtenerAuxiliaresUseCase = obtenerAuxiliaresUseCase;
    }
  
    async list(req, res) {
      try {
        const data = await this.obtenerAuxiliaresUseCase.execute();
        return res.api(data, 200);
      } catch (error) {
        return res.api(error.message, 500);
      }
    }
  }
  
  module.exports = AuxiliaresController;
  