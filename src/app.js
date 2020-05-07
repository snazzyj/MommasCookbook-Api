require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const userAuth = require('./auth/users-auth');
const recipeRoute = require('./recipes/recipe-route');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// route for login and sign up. creates jwt token
// gets recipe data for user upon login
app.use('/api/auth', userAuth);

//route to post a new recipe, inserts recipe into db
//get req to get a recipe by id
app.use('/api/recipes', recipeRoute);

app.get('/', (req, res) => {
    res.send('Hello, world!')
});

app.use(function errorHandler(error, req, res, next) {
    let response;

    if(NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    } else {
        response = {message: error.message, error}
    }

    res.status(500).json(response);
});

module.exports = app