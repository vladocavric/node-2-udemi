const request = require('supertest')
const app = require('../src/app')
const User = require('../src/modules/user')
const Task = require('../src/modules/task')
const {userOneId, userOne, userTwo, userThree, taskAOne, taskATwo, taskBTwo, taskCTwo, setupDB} = require('./fixtures/db')

beforeEach(setupDB)


test('Should create a task', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
        description: 'nesto'
    }).expect(201)

    const task = Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('Should return 2 tasks for user one', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('Should not delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskAOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404)

    const task = Task.findById(taskAOne._id)
    expect(task).not.toBeNull()
})

test('Should not create task with invalid description/completed', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: true,
            completed: 33
        })
        .expect(400)

    const tasks = await Task.find()
    expect(tasks.length).toBe(6)
})

test('Should not update task with invalid description/completed', async () => {
    const response = await request(app)
        .patch(`/tasks/${taskAOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: true,
            completed: 33
        })
        .expect(400)

    const task = await Task.findById(taskAOne._id)
    expect(task.description).toBe('task A from user one')
    expect(task.completed).toBe(false)
})

test('Should delete user task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskAOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(302)
})

test('Should not delete task if unauthenticated', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskAOne._id}`)
        .send()
        .expect(401)

    const task = await Task.findById(taskAOne._id)
    expect(task).not.toBeNull()
})

test('Should not update other users task', async () => {
    const response = await request(app)
        .patch(`/tasks/${taskAOne.id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description: 'new',
            completed: true
        })
        .expect(400)

    const task = await Task.findById(taskAOne._id)
    expect(task.description).not.toBe('new')
    expect(task.completed).toBe(false)
})

test('Should fetch user task by id', async () => {
    const response = await request(app)
        .get(`/tasks/${taskAOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const task = await Task.findById(taskAOne._id)
    expect(task).not.toBeNull()
})

test('Should not fetch user task by id if unauthenticated', async () => {
    const response = await request(app)
        .get(`/tasks/${taskAOne._id}`)
        .send()
        .expect(401)

    expect(response.body.error).not.toBeNull()
})

test('Should not fetch other users task by id', async () => {
    const response = await request(app)
        .get(`/tasks/${taskAOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
})

test('Should fetch only completed tasks', async () => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const tasks = response.body
    tasks.forEach((task) => {
        expect(task.completed).toBe(true)
    })
})

test('Should fetch only incomplete tasks', async () => {
    const response = await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const tasks = response.body
    tasks.forEach((task) => {
        expect(task.completed).toBe(false)
    })
})

test('Should sort tasks by createdAt asc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=createdAt-asc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const tasks = response.body
    expect(tasks[0].description).toBe('task A from user one')
    expect(tasks[1].description).toBe('task B from user one')
})

test('Should sort tasks by createdAt disc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=createdAt-disc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks[0].description).toBe('task B from user one')
    expect(tasks[1].description).toBe('task A from user one')
})

test('Should sort tasks by updatedAt disc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=updatedAt-disc')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks[0].description).toBe('B updated')
    expect(tasks[3].description).toBe('task a from user two')
})

test('Should sort tasks by updatedAt asc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=updatedAt-asc')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks[0].description).toBe('task a from user two')
    expect(tasks[3].description).toBe('B updated')
})

test('Should filter tasks by completed true', async () => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    tasks.forEach((task) => {
        expect(task.completed).toBe(true)
    })
})

test('Should filter tasks by completed false', async () => {
    const response = await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    tasks.forEach((task) => {
        expect(task.completed).toBe(false)
    })
})

test('Should sort tasks by completed asc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=completed-asc')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks[0].completed).toBe(false)
    expect(tasks[3].completed).toBe(true)
})

test('Should sort tasks by completed disc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=completed-disc')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks[0].completed).toBe(true)
    expect(tasks[3].completed).toBe(false)
})

test('Should sort tasks by description disc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=description-disc')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks[0].description).toEqual('task a from user two')
   expect(tasks[3].description).toEqual('B updated')
})

test('Should sort tasks by description asc', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=description-asc')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    const tasks = response.body
    expect(tasks[0].description).toEqual('B updated')
    expect(tasks[3].description).toEqual('task a from user two')
})

// test('Should fetch page of tasks', async () => {
//     const response = await request(app)
// })