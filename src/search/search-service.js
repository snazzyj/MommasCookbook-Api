const SearchService = {
    searchByTag(knex, query) {
        return knex
            .select('*')
            .from('recipes')
            .where('recipe_tags', 'ilike', `%${query}%`)
            .then(result => {
                return result;
            })
    }
}

module.exports = SearchService;