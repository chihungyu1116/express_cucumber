var environment = "development";

module.exports = function() {
  var settings = {
    development: {
      db: "mongodb://localhost/nodebackbone",
      port: 3000
    },
    test: {
      db: 'mongodb://localhost/my_test_db',
      port: 8888
    },
    production: {
      db: 'mongodb://localhost/my_test_db',
      port: 8080
    }
  };

  return {
    db: function() {
      return settings[environment].db;
    },
    port: function() {
      return settings[environment].port;
    }
  }
}