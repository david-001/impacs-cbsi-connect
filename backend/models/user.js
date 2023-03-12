const db = require("../util/database");

module.exports = class User {
  constructor(
    first_name,
    last_name,
    other_names,
    country,
    email,
    telephone,
    password
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.other_names = other_names;
    this.country = country;
    this.email = email;
    this.telephone = telephone;
    this.password = password;
  }

  // static method - don't have to instantiate class (User.save(user))
  static save(user) {
    // Escape unwanted strings for example drop table.
    return db.execute(
      "INSERT INTO users (first_name, last_name, other_names, country, email, telephone, password) VALUES (?,?,?,?,?,?,?)",
      [
        user.first_name,
        user.last_name,
        user.other_names,
        user.country,
        user.email,
        user.telephone,
        user.password,
      ]
    );
  }

  static find(email) {
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
  }
};
