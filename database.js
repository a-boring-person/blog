const mysql = require('mysql');

// 创建连接
const database = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'yangkai',
        database:'blog'
    }
);

// 连接mysql 
database.connect(function(err){
    if (err) {
        console.log('连接错误：'+err.stack);
        return;
    }

    console.log('数据库已连接');
});

module.exports = database;