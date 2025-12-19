const ArtistaRepository = require('../../../domain/repositories/artista/artista.repository');
const ArtistaSQL = require('../../sql/artista'); // modelo Sequelize correcto

class ArtistaRepositorySQL extends ArtistaRepository {

    async create(data) {
        return await ArtistaSQL.create(data);
    }

    async findAll() {
        return await ArtistaSQL.findAll();
    }

    async findById(id) {
        return await ArtistaSQL.findOne({ where: { idArtista: id } });
    }

    async update(id, data) {
        await ArtistaSQL.update(data, { where: { idArtista: id } });
        return await this.findById(id);
    }

    async delete(id) {
        return await ArtistaSQL.destroy({ where: { idArtista: id } });
    }
}

module.exports = ArtistaRepositorySQL;
