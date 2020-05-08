const express = require('express');
const RecipeService = require('./recipe-service');

const recipeRouter = express.Router();
const jsonParser = express.json();

recipeRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {creator_id, recipeName, ingredients, directions, prepTime, cookTime, servingSize, recipe_tags} = req.body
        const newRecipe = {
            creator_id,
            recipe_name: recipeName,
            ingredients,
            directions,
            preptime: prepTime,
            cooktime: cookTime,
            servingsize: servingSize,
            recipe_tags
        }

        console.log(newRecipe)

        RecipeService.insertNewRecipe(
            req.app.get('db'),
            newRecipe
        )
        .then(result => {
            res.status(201).send(result)
        })
        .catch(next)
    })

recipeRouter
    .route('/:id')
    .get((req, res, next) => {
        const {id} = req.params
        RecipeService.getRecipeById(
            req.app.get('db'),
            id
        )
        .then(recipe => {
            res.status(200).send(recipe)
        })
    })

module.exports = recipeRouter;