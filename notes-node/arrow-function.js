
// a squre function: 
// take a x as input, multi x as output

// const squre = function(x){
//   return x * x
// }

// the arrow function
var squre = (x) => x * x;
console.log(squre(3));

// create an object user
var user = {
  name: 'HYB', // property
  // arrow function
  sayHi: () => {
    console.log(`Hi, I am ${user.name}`) // cannot use this.name, because arrow functions don't bind this key word
  },
  sayHiAll() {
    console.log(`Hi, I am ${this.name}`); //  standard functioin declartion. Allow to use this key words
  }
};

user.sayHi();
user.sayHiAll();


const event = {
  name: "Birthday party",
  guestList: ['Mike', 'Jake', 'Anne'],
  printGuestList() {
    console.log(`Guest list for ${this.name}`)
    this.guestList.forEach((guest) => {
      console.log(guest + " is attending " + this.name) // arrow function does not bind with this, so here we can use this key word
    })
  }
}

event.printGuestList()