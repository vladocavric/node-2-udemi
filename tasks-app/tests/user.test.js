const request = require('supertest')
const app = require('../src/app')
const User = require('../src/modules/user')
const {userOneId, userOne, userTwo, userThree, setupDB} = require('./fixtures/db')

beforeEach(setupDB)

test('Should create a user', async () => {
    const response = await request(app)
        .post('/users')
        .send(userThree)
        .expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: userThree.name,
            email: userThree.email
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe(userThree.password)
})

test('Should log-in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.tokens[1].token).toBe(response.body.token)

})

test('Should not log-in', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: '5658626566'
    }).expect(400)
})

test('Should show user profile to autnticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should notshow user profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user account', async () => {
   const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete user account', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Shold upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: userThree.name,
            email: userThree.email,
            age: 33
        }).expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe(userThree.name)
    expect(user.email).toBe(userThree.email)
    expect(user.age).toBe(33)
})

test('Should not update user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'London'
        }).expect(400)

    const user = await User.findById(userOneId)
    expect(user.location).toBe(undefined)
})

test('Should not signup user with invalid name/email/password', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'dovla123321'
        })
        .expect(400)
})

test('Should not signup user with invalid email', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'nesto@nesto.com',
            password: 'dovla123321'
        })
        .expect(400)
})

test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Vlado',
            age: 33
        })
        .expect(401)
})

test('Should not update user with invalid name', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: '33'
        })
        .expect(400)

    const user = await User.findById(userOneId)
    expect(user.nem).not.toBe('33')
})
test('Should not update user with invalid email', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'vlado.vlad@vlad'
        })
        .expect(400)
    const user = await User.findById(userOneId)
    expect(user.email).not.toBe('vlado.vlad@vlad')
})

test('Should not update user with invalid password', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: 'password'
        })
        .expect(400)
})

test('Should not delete user if unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)

    const users = await User.find()
    expect(users.length).toBe(2)
})
