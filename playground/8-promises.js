// const doWorkPromises = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([1, 2, 3])
//         reject('Things went wrong')
//     }, 2000);
// })
//
// doWorkPromises.then((resolved) => {
//  console.log(resolved)
// }).catch((error) => {
//     console.log(error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000)
    })
}

// add(1,3).then((sum) => {
//     console.log(sum)
//
//     add(sum,3).then((sum) => {
//         console.log(sum)
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch((e) => {
//     console.log(e)
// })

add(1,3).then((sum) => {
    console.log(sum)
    return add(sum, 5)
}).then((sum) => {
    console.log(sum)
}).catch((e) => {
    console.log(e)
})