const Recipe = require('../models/Recipe')

async function getImages(recipeId) {
    let files = await recipe.files(recipeId)
    files = files.map(file => ({
        ...file,
        src: `${file.path.replace("public", "")}`
    }))

    return files
}

async function format(recipe) {
    const files = await getImages(recipe.id)
    recipe.img = files.length > 0 ? files[0].src : null
    recipe.files = files || []

    const { day, hour, minutes, month } = date(recipe.updated_at)

    return recipe
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async recipe() {
        try {
            const recipe = await recipe.findOne(this.filter)
            return format(recipe)
        } catch (err) {
            console.error(err)
        }
    },
    async recipes() {
        try {
            const recipes = await recipe.findAll(this.filter)
            const recipesPromise = recipes.map(format)
            return Promise.all(recipesPromise)   
        } catch (err) {
            console.error(err)
        }
    },
    format
}

module.exports = LoadService