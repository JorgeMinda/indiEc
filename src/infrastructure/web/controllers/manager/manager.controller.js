class ManagerController {
    constructor({ crearManagerUseCase, obtenerManagersUseCase }) {
      this.crearManagerUseCase = crearManagerUseCase;
      this.obtenerManagersUseCase = obtenerManagersUseCase;
    }
  
    async crear(req, res) {
      try {
        const data = await this.crearManagerUseCase.execute(req.body);
        return res.api(data, 201);
      } catch (error) {
        return res.api(error.message, 400);
      }
    }
  
    async listar(req, res) {
      try {
        const data = await this.obtenerManagersUseCase.execute();
        return res.api(data, 200);
      } catch (error) {
        return res.api(error.message, 500);
      }
    }
  }
  
  module.exports = ManagerController;
  