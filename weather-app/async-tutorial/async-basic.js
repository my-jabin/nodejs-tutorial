console.log('start app');

// after 2 seconds, function be executed
setTimeout(() => {
  console.log('set time out execute');
},2000);

// It won't execute after 0 second. It actually executes after 'end app'
// reason explain in udemy online video "The Complete Node.js Developer Course" lesson "27.Call stack & Event Loop"
setTimeout(() => {
  console.log('right away executed');
},0);

console.log('end app');
