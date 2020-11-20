const Task = require('./model/Task')

var {
    ObjectID
} = require("mongodb");
const express = require("express")
const app = express()

const userRouter = require('./routes/userRouter')

const taskRouter = require('./routes/taskRouter')

const port = process.env.port || 3000

// parse incomming json to an object, so that we access it through req.body
app.use(express.json())

app.use(userRouter)

app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

