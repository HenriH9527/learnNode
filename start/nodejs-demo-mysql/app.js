var mysql = require('mysql');


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_test',
    port: 3306
});

conn.connect();

// mysql的 增 删 改 查 

var insertSQL = 'insert into t_user(name) values("笨笨"),("呆呆")';

var selectSQL = 'select * from t_user limit 10';

var deleteSQL = 'delete from t_user';

var updatedSQL = 'update t_user set name="笨笨是啥子" where name="笨笨"';

//delete
conn.query(deleteSQL, function(err0, res0) {
    if (err0) console.log(err0);
    console.log("DELETE RETURN ===> ");
    console.log(res0);
})

//insert
conn.query(insertSQL, function(err1, res1) {
    if (err1) console.log(err1);
    console.log("INSERT RETURN ===> ");
    console.log(res1);
})

// query
conn.query(selectSQL, function(err2, rows) {
    if (err2) console.log(err);
    console.log("SESLECT ==> ");
    for(var i in rows) {
        console.log(rows[i]);
    }
})

//update
conn.query(updatedSQL, function(err3, res3) {
    if (err3) console.log(err3);
    console.log("UPDATE RETURN ===> ");
    console.log(res3);
})


conn.end();