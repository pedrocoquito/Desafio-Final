async function getImages(productId) {
    let files = await Product.files(productId)
    files = files.map(file => ({
        ...file,
        src: `${file.path.replace("public", "")}`
    }))

    return files
}