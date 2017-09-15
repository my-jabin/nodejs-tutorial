// What is promise:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

// promis is like we do something first,
// then call the success callback function if we succeed or failure callback function if we failed
// can be short as :

// let promise = doSomething();
// promise.then(successCallback, failureCallback);
// or doSomething().then(successCallback, failureCallback);

// Basically, each promise represents the completion of another asynchronous step in the chain.
// 简单说，每一个promise代表了异步链里的另一个异步的完成。
// 每一个异步的完成就可以触发下一个异步的启动，从而形成一条链的结构

// with modern functions: we first do something, then dosomethielse, then doThirdThing, then finalResult
// what if an error occurs during this process, go to catch parts, execute the failureCallback method
// doSomething()
// .then(result => doSomethingElse(result)) // successCallback
// .then(newResult => doThirdThing(newResult))// successCallback
// .then(finalResult => { // successCallback
//   console.log(`Got the final result: ${finalResult}`);
// })
// .catch(failureCallback);


// new Promise( /* executor */ function(resolve, reject) );
// executor is called before the promise constructor even returns the created object.
// the resolve and reject functions, when called, resolve or reject the promise, respectively.
// the executor normally initiates some async work, and then , once that ccompletes, either calls the resolve function so resolve
// the promise or rejcets it if an error occurred

var somePromise = new Promise((resolve, reject) => {
  // inside this function, we are going to make a promise, do something, we could succeed or failed
  // if succeed, call resolve , if failed, call reject. resolve and reject are both function, but accept only one parameter

  // simulate that we are going to fetch data from datebase or website
  setTimeout(() => {
    // if we succeed, call resolve function, it takes only a string parameter in this case
    resolve("Hi, It worked");
    // for testing, we call reject here
    reject("Hi, it failed"); // we can only execute one method, either resolve or reject
  }, 2000);


});

// then(successCallback, failureCallback): successCallback is resolve function , failureCallback is reject function
// both functions take one parameter.
somePromise.then((message) => {
  console.log("success:", message);
}, (message) => {
  console.log("Failde:", message);
});

//  ====== EXAMPLE
// add two number asnyc. asyncAdd method is a Promise
var asyncAdd = (a, b) => {
  // return a promise
  return new Promise((resolve, reject) => {
    // simulate delay
    setTimeout(() => {
      // If arguments are number then we call resolve method, otherwise call reject method
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1000);
  });
};

// here we call the Promise function, then(successCallback, failureCallback).
// if arguments are numbers, call successCallback, otherwise call failureCallback
asyncAdd(5, 5).then((result) => {
  console.log(result);
}, (error) => {
  console.log(error);
});

//promise chaining:
// we simulate a fibonacci number  1+1+2+3
asyncAdd(1, 1).then((result) => {
    return asyncAdd(result, 2);
  }, (error) => {
    console.log(error);
  })
  .then((result) => {
    return asyncAdd(result, 3);
  }, (error) => {
    console.log(error);
  })
  .then((result) => {
    console.log(result);
  }, (error) => {
    console.log(error);
  });


// the above example we have to write repeated code for error message, following is a short way
// once we had an error, handling the error will be in catch parts, and then method after the error will not be called
asyncAdd(1, 1).then((result) => {
    return asyncAdd(result, '2');
  })
  .then((result) => {
    return asyncAdd(result, 3);
  })
  .then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
