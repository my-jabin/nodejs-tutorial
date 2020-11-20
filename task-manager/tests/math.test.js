const { calculateTip, addAsync } = require("../src/math")


beforeAll(() => {
    console.log("before all inside math.test.js is called");
})

beforeEach(() => {
    console.log("before each inside math.test.js is called");
})

test('Hello World', () => {

})

// test('This should fail', () => {
//     throw new Error("Failure!")
// })

test("should calculate total with tip", () => {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
})

test("should calculate total with default tip", () => {
    expect(calculateTip(10)).toBe(12.5)
})

test("Async test demo. It should fail", (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done() // call done() to end this test case
    }, 200)
})

test("Should add two number", (done) => {
    addAsync(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

// use async / await to test
test("Should add two number async/await", async () => {
    const sum = await addAsync(5, 3)
    expect(sum).toBe(8)
})