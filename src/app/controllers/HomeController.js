const LoadReceiptsService = require('../services/LoadReceiptsService')

module.exports = {
    async index(req, res) {
        try {
            /*const allReceipts = await LoadReceiptsService.load('receipts')
            const receipts = allReceipts.filter((recipe, index) => index > 2 ? false : true)*/

            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    about(req, res){
        return res.render("home/about")
    }
}