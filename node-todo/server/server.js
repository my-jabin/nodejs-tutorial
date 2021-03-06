var express = require('express');
var bodyParser = require('body-parser');
const _ = require("lodash");
require('./config/config');
var {
  mongoose
} = require('./db/mongoose')

var {
  Todo
} = require('./models/todo')

var {
  User
} = require('./models/user')

var {
  ObjectID
} = require("mongodb");

var {
  authenticate
} = require("./middleware/authenticate")

var app = express();

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// 就是把发送过来的请求的body部分转化成json，然后可以在req.body中获取到
app.use(bodyParser.json());

// create a new todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  });
});

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos: todos,
      code: 'code',
      count: todos.length
    });
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({
      todo
    })
  }).catch((e) => {
    res.status(400).send(e)
  });

});

app.delete("/todos/:id", (req, res) => {
  // get thd id
  var id = req.params.id;
  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemoved(id).then((todo) => {
    if (todo) {
      res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send()
  });
  // success
  // if not todo return 404
  // if doc, send doc back with 200
  // error
  // 400 with empty body
});

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      message: "ID is not valid"
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send({
        message: "this todo exists not"
      });
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send()
  });

})


// POST /user
app.post('/user', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    // append the specified value to the HTTP response header field
    res.append('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get("/user", (req, res) => {
  User.find().then((users) => {
    res.send(users)
  })
})

var r1 = express.Router();
r1.get("/user/me", authenticate);
app.use(r1);

app.get("/user/me", (req, res) => {
  res.send(req.user);
});


// POST: /user/login {email, password}
app.post("/user/login", (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    // now here we need to generate an auth token
    user.generateAuthToken().then((token) => {
      // send the token and user object to client
      res.append('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send(e)
  });
})

// router for deleting token
var r2 = express.Router();
r2.delete("/user/me/token", authenticate);
app.use(r2);

app.delete('/user/me/token', (req, res) => {
  // just remove token, handle success and failed situation

  req.user
    .removeToken(req.token)
    .then(() => {
      res.send();
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})

app.listen(process.env.PORT, () => {
  console.log(`Start on port ${process.env.PORT}`);
})

// for testing purpose
module.exports = {
  app
}


// ======part 1: add a new model(doc) to database
// var newTodo = new Todo({
//   text: '  Cook dinner  '
// });
//
// newTodo.save().then((doc) => {
//   console.log(`Saved todo, ${doc}`);
// }, (err) => {
//   console.log('Unable to save todo');
// });
//
//
// var newUser = new User({
//   email: '  hyb@163.com  '
// });
//
// newUser.save().then((doc) => {
//   console.log(`saved doc\n: ${doc}`);
// }, (err) => {
//   console.log(err);
// })
