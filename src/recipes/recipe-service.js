const RecipeService = {
    insertNewRecipe(knex, newRecipe) {
        return knex
            .insert(newRecipe)
            .into('recipes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getRecipeById(knex, id) {
        return knex.select('*').from('recipes').where('recipe_id', id)
    },

    updateRecipe(knex, id, recipeToUpdate) {
        return knex.from('recipes')
            .where('recipe_id', id)
            .update(
                recipeToUpdate,
                 ['recipe_id', 'creator_id', 'recipe_name',
                  'ingredients','directions', 'preptime',
                   'cooktime', 'servingsize', 'recipe_tags' ]
                )
            
    },
    deleteRecipe(knex, id) {
        return knex.from('recipes')
            .where('recipe_id', id)
            .delete()
    }
}

module.exports = RecipeService;
