
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

// this is an async function
// async function always returns a promise
const doWork = async () => {
    return "A Text"
}

console.log(doWork()) // print out on the console : " Promise { 'A Text' } "


doWork()
    .then((result) => {
        console.log(`result = ${result}`)
    })
    .catch((e) => {
        console.log(e)
    })

// await operator is used to wait for a Promise. It can only be used inside an async function.
// the return value of await operator is the return value of the fulfilled promise.
// if the promise is rejected, the await expression throws the rejected value
const doMath = async () => {
    let sum = await add(1, 1) // await the add promise return the succesful value
    let sum2 = await add(sum, 2)
    let sum3 = await add(sum2, 3)
    let sum4 = await add(sum3, 5)
    let sum5 = await add(sum4, 8)
    return sum5
}

doMath().then((result) => {
    console.log(result)
})
