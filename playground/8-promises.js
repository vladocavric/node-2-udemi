const doWorkPromises = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([1, 2, 3])
        reject('Things went wrong')
    }, 2000);
})

doWorkPromises.then((resolved) => {
 console.log(resolved)
}).catch((error) => {
    console.log(error)
})