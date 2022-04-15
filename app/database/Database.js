const mongoose = require("mongoose");
const config = require("../config/config");

class Database {
  getConnection() {
    if (!Database.instance) {
      mongoose.connect(config.mongoURI);

      console.info("New Connection");
      Database.instance = mongoose.connection;
    }

    return Database.instance;
  }
}

module.exports = new Database().getConnection();
