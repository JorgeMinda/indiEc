class GrupoMusicalController {
    constructor({ crearGrupoUseCase, obtenerGruposUseCase }) {
      this.crearGrupoUseCase = crearGrupoUseCase;
      this.obtenerGruposUseCase = obtenerGruposUseCase;
    }
  
    async crear(req, res) {
      try {
        const data = await this.crearGrupoUseCase.execute(req.body);
        return res.api(data, 201);
      } catch (error) {
        return res.api(error.message, 400);
      }
    }
  
    async listar(req, res) {
      try {
        const data = await this.obtenerGruposUseCase.execute();
        return res.api(data, 200);
      } catch (error) {
        return res.api(error.message, 500);
      }
    }
  }
  
  module.exports = GrupoMusicalController;
  