var mysql = require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'mysqltest',
    password:'mysqltest',
    database:'mysqldb'
});
connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('connected!:)');
    }
});
module.exports = connection;