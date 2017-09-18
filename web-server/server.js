const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.port || 8888;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view eigine', 'hbs');

//app.use()  to register a middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${req.method} method, url= ${req.url} on ${now}`;
  //console.log(log);
  fs.appendFile('server.log', log + "\n", (err) => {
    console.log(err);
  })
  next(); //all of the requests will be stuck here, until we call the next()
})

// use the middleware to show only the maintance page.
// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// })
// we move the middleware express.static('public') after this middleware call, so that we cannot open the help.html page
// middleware are responsed in order

// to serve static files such images, CSS files, and js files
app.use(express.static('public')); //open with : http://localhost:8888/help.html

// {{getCurrentYear}}
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// to case a text to capital letter: {{toUpperCase text}}
hbs.registerHelper('toUpperCase', (text) => {
  return text.toUpperCase();
});


app.get("/", (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    username: 'yanbin'
  });
});

// app.get("/about", (req, res) => {
//   res.send("about page");
// });
app.get("/about", (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    username: 'yanbin'
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: 'error occurs'
  });
});

app.listen(port, () => {
  console.log('server up on port 8888');
});
