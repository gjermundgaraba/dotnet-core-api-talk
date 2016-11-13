const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 5001
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/BookDB'
  }
};

module.exports = config;
