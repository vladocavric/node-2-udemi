// const name = 'Vlado'
// const userAge = 33
//
// const user = {
//     name,
//     age: userAge,
//     job: 'tester'
// }
//
// console.log(user)

const product = {
    label: 'cips',
    price: 155,
    weight: '100g',
    rating: 3.5,
    stack: 35
}

// const {label: productlabel, price, weight, rating = 5} = product
//
// console.log(price)
// console.log(rating)
// console.log(productlabel)

const transaction = (type, {label, stack = 0} = {}) => {
    console.log(type, label, stack)
}

transaction('order', product)