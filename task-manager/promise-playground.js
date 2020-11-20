const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

// promise is good, but it has also problem when multimple promise chaining together.
// The code is mess, see the following example
// add(1, 2).then((sum) => {
//     console.log(sum)
//     add(sum, 3).then((sum) => {
//         console.log(sum)
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch((e) => {
//     console.log(e)
// })


// sample of promise chaining
add(1, 1)
    .then((sum) => {
        console.log(sum)
        return add(sum, 2)
    })
    .then((sum) => {
        console.log(sum)
    })
    .catch((e) => {
        console.log(e)
    })