const nock = require("nock")
const mockUsers = require('./mockUsers');
var request = require('request-promise');


beforeAll(() => {
    // mock the http request
    console.log("before all inside users.test.js is called");
    const interceptor = nock('http://localhost:3000')
        .get('/users')
        .reply(200, {
            users: [
                mockUsers.userOne, mockUsers.userTwo, mockUsers.userThree
            ]
        })

    var name = "world"

    var regex = new RegExp(`hello\\/${name}\\/[^\\/]+$`)

    const scope = nock('http://localhost:3000')
        .get(regex)
        .reply(200, 'path using regex matched')

    // nock('http://localhost:3000')
    //     .get(/source\/$/)
    //     .reply(200, 'path using regex matched')
})



beforeEach(() => {
    console.log("before each inside users.test.js is called");
})

test("test mock getting all users via GET ", async () => {
    let options = {
        method: 'GET',
        uri: 'http://localhost:3000/users',
        json: true // Automatically stringifies the body to JSON
    }

    let body = await request(options);
    expect(body.users.length).toBe(3)

    expect(body.users[0]).toStrictEqual(mockUsers.userOne)
    expect(body.users[1]).toStrictEqual(mockUsers.userTwo)
    expect(body.users[2]).toStrictEqual(mockUsers.userThree)
})


test("test nock with regex path ", async () => {
    let options = {
        method: 'GET',
        uri: 'http://localhost:3000/hello/world/22',
        json: true // Automatically stringifies the body to JSON
    }

    let body = await request(options);
    expect(body).toBe("path using regex matched")
})
