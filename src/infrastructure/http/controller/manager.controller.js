const ObtenerManagers = require('../../../application/use-cases/manager/ObtenerManagers.usecase.js');
const CrearManager = require('../../../application/use-cases/manager/CrearManager.usecase.js');
const ActualizarManager = require('../../../application/use-cases/manager/ActualizarManager.usecase.js');
// const EliminarManager = require('../../../application/use-cases/manager/EliminarManager.usecase.js'); // TODO: Crear este use case

const managerCtl = {};

managerCtl.mostrarManagers = async (req, res) => {
    try {
        const data = await ObtenerManagers();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

managerCtl.crearManager = async (req, res) => {
    try {
        const nuevo = await CrearManager(req.body);
        return res.status(201).json({
            message: 'Manager creado exitosamente',
            result: nuevo
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

managerCtl.actualizarManager = async (req, res) => {
    try {
        await ActualizarManager(req.params.id, req.body);
        return res.json({ message: 'Manager actualizado exitosamente' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// TODO: Descomentar cuando se cree el use case EliminarManager
// managerCtl.eliminarManager = async (req, res) => {
//     try {
//         await EliminarManager(req.params.id);
//         return res.json({ message: 'Manager desactivado exitosamente' });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

module.exports = managerCtl;
