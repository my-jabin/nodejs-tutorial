module.exports = config = {
  database: "test",
  username: "root",
  password: "root",
  host: "localhost",
  port: 3306,
  dialect: "mysql"
};

// production environment
// please config if the app runs on real environment
if (process.env.NODE_ENV === "production") {
  config.database = "social";
  config.username = "root";
  config.password = "root";
  config.host = "localhost";
  config.port = "3306";
  config.dialect = "mysql";
}
