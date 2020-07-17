const dbConnection = require('../src/db/mongoose')
const Task = require('../src/modules/task')

// Task.findByIdAndDelete('5f11651e85a5f830c4c5ea96').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    if (!task) {
        throw new Error('there is no task with that id')
    }
    const count = await Task.countDocuments({completed})
    return count
}

deleteAndCount('5f11a4cc06e2e61a94174816', true).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})