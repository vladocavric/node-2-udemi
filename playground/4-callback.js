// setTimeout(() => {
//     console.log(`sto 2s`)
// }, 2000)
//
// const geocode = (addresse, cb) => {
//     setTimeout(() => {
//         const data = {
//             lat: 0,
//             lon: 0
//         }
//         cb(data)
//     }, 1000)
// }
//
// geocode('novi sad', (data) => {
//     console.log(data)
// })


//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a, b, cb) => {
    setTimeout(() => {
        const sum = a + b
        cb(sum)
    }, 2000)
}


add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})