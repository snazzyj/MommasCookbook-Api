const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserAuthService = {
    getUserWithEmail(knex, email) {
        return knex.select('*').from('users').where('email', email).first()
    },

    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },

    getUserData(knex, id) {
        return knex.select('*').from('recipes')
        .where('creator_id', id)
    },

    createJwt(subject, payload) {
        return jwt.sign(
            payload,
            config.JWT_SECRET,
            {
                subject,
                algorithm: 'HS256'
            }
        )
    },

    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = UserAuthService;