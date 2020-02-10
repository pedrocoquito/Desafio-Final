module.exports = {
    filteredArray(array) {
        const cleanedArray = array.map(item => {
            return item.replace(/'/g, ".")
        })

        return cleanedArray.filter(array => array != "")
    }
}