// nodejs  分页查询设计

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// router.all('/api', function(req, res, next) {
//     var param = '';
//     if (req.method === "POST") {
//         param = req.body;
//     } else {
//         param = req.query || req.params;
//     }

//     if (param.page === "" || param.page === null || param.page === undefined) {
//         return;
//     }

    var start = (2 - 1) * 20;
    var sql = "SELECT * FROM t_user LIMIT 0,20";
    var sqlTotal = "SELECT COUNT(*) FROM t_user";

    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'node_test',
        port: 3306,
    });

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(sql, function(err,results) {
            if (err) {
                throw err;
            } else {
                // 计算总页数
                var allCount = results[0]['COUNT(*)'];
                var allPage = parseInt(allCount) / 20;
                var pageStr = allPage.toString();
                //不能被整除
                if (pageStr.indexOf('.') > 0) {
                    allPage = parseInt(pageStr.split('.')[0]) + 1;
                }
                var userList = results[1];
                res.end(JSON.stringify({msg: '操作成功',status: '100', totolPages: allPage,currentPage: param.page, data: userList}));
                console.log(results);
            }
        });
        connection.release();
    })
// })