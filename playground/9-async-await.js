const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('no negative numbers')
            }
            resolve(a+b)
        }, 2000)
    })
}

const doTheWork = async () => {
    const sum = await add(1, 5)
    const sum2 = await add(sum, -7)
    const sum3 = await add(sum2, 15)
    return sum3
}

doTheWork().then((result) => {
    console.log('result:', result)
}).catch((e) => {
    console.log('e:', e)
})