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
    }
}

module.exports = RecipeService;
