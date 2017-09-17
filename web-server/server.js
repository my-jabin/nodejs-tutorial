const express = require('express');
var app = express();

app.set('view eigine', 'hbs');

// to serve static files such images, CSS files, and js files
app.use(express.static('public')); //open with : http://localhost:8888/help.html




app.get("/", (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear(),
    username: 'yanbin'
  });
});

// app.get("/about", (req, res) => {
//   res.send("about page");
// });
app.get("/about", (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear(),
    username: 'yanbin'
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: 'error occurs'
  });
});

app.listen(8888, () => {
  console.log('server up on port 8888');
});
