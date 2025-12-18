const ObtenerPerfilDisquera = require('../../../application/use-cases/disquera/ObtenerPerfilDisquera.usecase.js');
const GestionarPerfilDisquera = require('../../../application/use-cases/disquera/GestionarPerfilDisquera.usecase.js');

const disqueraCtl = {};

disqueraCtl.obtenerPerfil = async (req, res) => {
    try {
        const perfil = await ObtenerPerfilDisquera();
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

disqueraCtl.gestionarPerfil = async (req, res) => {
    try {
        const data = {
            ...req.body,
            fotoImagen: req.files?.fotoImagen?.name || null
        };

        await GestionarPerfilDisquera(data);
        res.json({ message: 'Perfil gestionado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = disqueraCtl;
