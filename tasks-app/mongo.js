const {MongoClient, ObjectID} = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'task-app-test'

const id = new ObjectID()
// console.log(id)
// console.log(id.id)
// console.log(id.toHexString())
// console.log(id.toHexString().length)
// console.log(id.id.length)
// console.log(id.getTimestamp())

MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log(error)
    }

    const db = client.db(dbName)
    const users = db.collection('users')
    const tasks = db.collection('tasks')

    // tasks.updateMany(
    //     {'completed': false},
    //     {$set: {'completed': true}}).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // users.deleteMany({age: {$lt: 30}}).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    //
    // tasks.deleteOne({description: 'Monika'}).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    tasks.deleteOne({description: 'Ros'}, (err, res) => {
        try {
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    })

})