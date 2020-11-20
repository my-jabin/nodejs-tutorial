const calculateTip = (total, tipPercent = 0.25) => total + total * tipPercent

const addAsync = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000);
    })
}


module.exports = {
    calculateTip,
    addAsync
}