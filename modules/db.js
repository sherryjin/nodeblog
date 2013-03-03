var databaseUrl = "mydb";
var collections = ["articles", "users"];
var db = require('mongojs').connect(databaseUrl, collections);

exports.db = db