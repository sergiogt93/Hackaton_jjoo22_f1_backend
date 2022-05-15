const { connect, connection } = require("mongoose");
const CONFIG = require("../config/config");

const connectDatabase = async () => {
  CONFIG.nodeEnv == "test"
    ? await connect(CONFIG.mongoDB.db_url_test)
    : await connect(CONFIG.mongoDB.db_url);
};

module.exports = {
  connectDatabase,
  connection,
};
