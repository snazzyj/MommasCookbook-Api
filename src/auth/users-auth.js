const express = require('express');
const UserAuthService = require('./users-auth-service');
const {TEST_DATABASE_URL} = require('../config');

const userAuthRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
    name: user.name,
    email: user.email,
    password: user.password
});

userAuthRouter
    .route('/login')
    .post(jsonParser, (req, res, next) => {
        const {email, password} = req.body;
        const loginUser = {email, password};
        console.log(loginUser)

        UserAuthService.getUserWithEmail(
            req.app.get('db'),
            loginUser.email
        )
        .then(dbUser => {
            if(!dbUser) {
                return res.status(400).json({
                    error: {message: 'Incorrect email or password'}
                })
            }

            return UserAuthService.comparePasswords(loginUser.password, dbUser.password)
                .then(compareMatch => {
                    if(!compareMatch) {
                        return res.status(400).json({
                            error: { message: 'Incorrect email or password' }
                        })
                    }

                    UserAuthService.getUserData(
                        req.app.get('db'),
                        dbUser.id
                    )
                    .then(data => {
                        const sub = dbUser.email;
                        const payload = {user_id: dbUser.id};

                        let user = {
                            id: dbUser.id,
                            firstName: dbUser.first_name,
                            recipeData: []
                        }
                        res.send({
                            authToken: UserAuthService.createJwt(sub, payload),
                            user
                        })
                    })
                })
        })
    });

userAuthRouter
    .route('/register')
    .post(jsonParser, (req, res, next) => {
        const {email, password, firstName, lastName} = req.body;

        UserAuthService.getUserWithEmail(
            req.app.get('db'),
            email
        )
        .then(user => {

            if(user) {
                res.status(400).json({
                    error: {message: 'Email already exists'}
                })
            }
            return UserAuthService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = {
                        email,
                        password: hashedPassword,
                        first_name: firstName,
                        last_name: lastName

                    }

                    return UserAuthService.insertUser(
                        req.app.get('db'),
                        newUser
                    )
                    .then(user => {
                        res.status(201).json(serializeUser(user)).send(user)
                    })
                })
        })
    })
module.exports = userAuthRouter;