const db = require("../util/database");

module.exports = class Home {
  static fetchName(id) {
    return db.execute("SELECT first_name, last_name FROM users WHERE id = ?", [
      id,
    ]);
  }

  static updatePassword(id, newpassword) {
    return db.execute("UPDATE users SET password = ? WHERE id = ?", [
      newpassword,
      id,
    ]);
  }
};
