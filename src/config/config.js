require("dotenv").config();

module.exports = {
  app_url: process.env.APP_URL,
  nodeEnv: process.env.NODE_ENV,
  token_secret: process.env.TOKEN_SECRET,
  mongoDB: {
    db_url: process.env.MONGODB_URL,
    db_url_test: process.env.MONGODB_URL_TEST,
  },
};
