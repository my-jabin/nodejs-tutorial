var getUser = (id, callback) => {
  var user = {
    id:id,
    name: 'Thomas'
  };

  setTimeout(() => {
    callback(user)
  }, 2000);
};


getUser(21,(userObj) => {
  console.log(userObj);
});
