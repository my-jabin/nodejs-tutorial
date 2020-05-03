// object property shorthand
const name = "Huston"
const userAge = 22

const user = {
    name: name,
    age: userAge,
    location: "Germany"
}
console.log(user)

const age = 32
const location = "Germany"
const author = {
    name,
    age,
    location
}
console.log(author)

// object destructuring
const product = {
    label: "Red notebook",
    price: 3,
    stock: 201,
    salePrice: undefined
}
// for each field needs a variable. NOT 
// let label = product.label
// let stock = product.stock

const { label, stock: productStock, salePrice, description = "default description" } = product
console.log(label)
// console.log(stock) 
console.log(productStock)//rename stock to productStock
console.log(salePrice)
console.log(description) // there is no such property in object product, it uses the default value which is "default description" defined above

// the second parameter is a type of product, we can destructure the object and set up the default value
const transaction = (type, { label, stock, salePrice = 0.0 }) => {
    console.log(type, label, stock, salePrice)
}

transaction("Order", product)