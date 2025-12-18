INSERT INTO roles (idRol, nameRol, descriptionRol, stateRol, createRol)
VALUES
(1, 'Administrador', 'Acceso total al sistema', 'active', NOW()),
(2, 'Cliente', 'Usuario regular del sistema', 'active', NOW())
ON DUPLICATE KEY UPDATE idRol = idRol;
