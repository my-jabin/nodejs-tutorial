class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room
    }
    this.users.push(user);
    return user;
  }

  getUser(id) {
    var filterUsers = this.users.filter(user => user.id === id);
    return filterUsers[0];
  }

  removeUser(id) {
    // return user that was removed
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }

  getUserList(room) {
    var filterUsers = this.users.filter((user) => {
      return user.room === room;
    })
    var names = filterUsers.map(user => {
      return user.name;
    });
    return names;
  }
}


module.exports = {
  Users
};

// class Person {
//
//   // call by default
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   // method
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old`
//   }
// }
// var me = new Person('Yanbin', 18);
// console.log(me.getUserDescription());
