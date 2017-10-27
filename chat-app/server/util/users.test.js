const {
  Users
} = require("./users")

var users;
beforeEach(() => {
  // before each test case, we initialize some testing data;
  users = new Users();
  users.users = [{
    id: "1",
    name: "Mike",
    room: "Node"
  }, {
    id: "2",
    name: "Jen",
    room: "JavaScript"
  }, {
    id: "3",
    name: "Rob",
    room: "Node"
  }];
});

test("add new user", () => {
  var users = new Users();
  var user = {
    id: "123",
    name: "Yanbin",
    room: "Room"
  }
  var result = users.addUser(user.id, user.name, user.room);
  expect(users.users).toEqual([user]);
});

test("get users by room name", () => {
  var userList = users.getUserList("Node");
  expect(userList).toEqual(["Mike", "Rob"]);
});

test("get user by id", () => {
  var user = users.getUser("1");
  expect(user).toEqual(users.users[0]);
});

test("remove user by id", () => {
  var userId = "3"
  var user = users.removeUser(userId);
  expect(user.id).toBe(userId);
  expect(users.users.length).toBe(2);
})
