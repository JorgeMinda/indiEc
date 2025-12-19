const authorize = (rolesPermitidos = []) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.apiError('No autenticado', 401);
        }

        const userRoleId = req.user.rolId;
        const userRoleName = userRoleId === 1 ? 'Administrador' : 'Cliente';

        if (rolesPermitidos.length && !rolesPermitidos.includes(userRoleName)) {
            return res.apiError('Acceso denegado', 403);
        }

        next();
    };
};

module.exports = authorize;