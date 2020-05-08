const express = require('express');
const SearchService = require('./search-service');

const searchRouter = express.Router();

searchRouter
    .route('/')
    .get((req, res, next) => {
        const {query} = req.query;
        SearchService.searchByTag(
            req.app.get('db'),
            query
        )
        .then(searchRes => {
            res.status(200).send(searchRes)
        })
})

module.exports = searchRouter;