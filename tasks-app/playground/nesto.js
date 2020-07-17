const dbConnection = require('../src/db/mongoose')
const User = require('../src/modules/user')

// User.findByIdAndUpdate('5f10ce09b7a45110a039ed03', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((users) => {
//     console.log(users)
// }).catch((e) => {
//     console.log(e)
// })

const updateAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAndCount('5f10cccef29d3e2fb45413cd', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})