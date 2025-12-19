const obtenerAlbumes = require('../../../application/use-cases/album/obtenerAlbumes.usecase');
// const crearAlbum = require('../../../application/use-cases/album/crearAlbum.usecase'); // TODO: Crear este archivo

const albumCtl = {};

albumCtl.obtenerAlbumes = async (req, res) => {
    try {
        const data = await obtenerAlbumes.execute();
        return res.apiResponse(data, 200, 'Álbumes obtenidos exitosamente');

    } catch (error) {
        console.error(error);
        return res.apiError('Error al obtener álbumes', 500);
    }
};

// TODO: Descomentar cuando se cree el use case
// albumCtl.crearAlbum = async (req, res) => {
//     try {
//         const data = await crearAlbum.execute(req.body, req.files);
//         return res.apiResponse(data, 201, 'Álbum creado exitosamente');
// 
//     } catch (error) {
//         console.error(error);
//         return res.apiError('Error al crear álbum', 500);
//     }
// };

module.exports = albumCtl;
