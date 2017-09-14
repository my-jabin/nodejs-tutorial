var squre = (x) => x * x;
console.log(squre(3));


var user = {
  name: 'HYB',
  sayHi: () => {
    console.log(`Hi, I am ${user.name}`)
  },
  sayHiAll() {
    console.log(`Hi, I am ${this.name}`);
  }
};

user.sayHi();
user.sayHiAll();
