// src/domain/services/auth/auth.service.js
module.exports = class AuthService {
    constructor({ orm }) {
        this.orm = orm;
    }

    async registerUser(userData) {
        return await this.orm.user.create(userData);
    }

    async findUserByEmail(email) {
        return await this.orm.user.findOne({ where: { emailUser: email } });
    }
};
