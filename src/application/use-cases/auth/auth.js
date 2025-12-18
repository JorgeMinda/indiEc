const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log('Usuario no autenticado');
        return res.apiError('No autenticado. Por favor inicia sesión', 401);
    }
};

module.exports = isLoggedIn;
