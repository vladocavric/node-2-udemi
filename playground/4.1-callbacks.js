const doWorkCallback = (cb) => {
    setTimeout(() => {
        cb('something went wrong', undefined)
        // cb(undefined, [1, 2, 3])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }

    console.log(result)
})