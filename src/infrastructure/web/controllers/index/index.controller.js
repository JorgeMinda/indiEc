class IndexController {
    home(req, res) {
      return res.api({ message: "API funcionando" }, 200);
    }
  }
  
  module.exports = IndexController;
  