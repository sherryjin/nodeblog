var databaseUrl = "mydb";
var collections = ["articles"];
var db = require('mongojs').connect(databaseUrl, collections);

exports.db = db