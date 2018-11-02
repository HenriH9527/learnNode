//一、 简单stream进行pipe

/*
 * 首先可以通过管道将输入定位到输出，输入输出可以是控制台或者文件流或者
 * http请求
 */

//  process.stdin.pipe(process.stdout);
//  process.stdin.pipe(fs.createWriteStream(path));
//  fs.createReadStream(path).pipe(process.stdin);

// 二、pipe中间进行处理

/**
 * 
 * 如果我们想要在管道中间进行处理，比如将输入的字符串大写写到输出里，
 * 我们可以使用一些可以作为中间处理的框架，比如through2就很方便
 * 
 */

// var through2 = require('through2');
// var stream = through2(write, end);

// process.stdin
//             .pipe(stream)
//                 .pipe(process.stdout);

// function write(line, _, next) {
//     this.push(line.toString().toUpperCase());
//     next();
// }

// function end(done) {
//     done();
// }

// var through2 = require('through2');
// var split = require('split');

// process.stdin
//             .pipe(split(' '))
//             .pipe(through2(function(line, _, next){
//                 console.log(line.toString().toUpperCase());
//                 next();
//             }));

// 三、stream转化为普通回调
/**
 * 当我们输入是流，而输出是个普通函数，我们需要把输入流转化为普通的buffer，
 * 这时可以使用concat-stream库
 */

//  var concat = require('concat-stream');

//  var reverseStream = concat(function(text) {
//     console.log(text.toString().split("").reverse().join(""));
//  })

//  process.stdin.pipe(reverseStream);

// 四、http server中的流

// var http = require('http');

// var server = http.createServer(function (req, res) {
//     if (req.method === 'POST') {
//         req.pipe(concat(function(body) {
//             var obj = JSON.parse(body);
//             res.end(Object.keys(obj).join('\n'));
//         }))
//     } else {
//         res.end();
//     }
// });
// server.listen(5000);

/**
 * 五、即作为输入也作为输出的流
 * request框架实现了如下功能，将有个流pipe到request请求中，然后将流的内容发给服务器，
 * 然后返回作为流宫其他代码使用
 */

//  var request = require('request');
//  var r = request.post('http://locathost:8099');
//  process.stdin.pipe(r).pipe(process.stdout);

// websocket-stream

// var websocket = require('websocket-stream');
// var stream = websocket('ws://localhost: 80');

// process.stdin.pipe(stream);
// stream.pipe(process.stdout);

/**
 * 六、分支管道
 * 下边是一个例子，这个例子将输入管道中html包含loud class 的元素放入另一个管道
 * 进行大写操作，然后合并输出
 * 
 */

//  var trumpet = require('trumpet');
//  var through2 = require('through2');
//  var fs = require('fs');

//  var tr = trumpet();
//  var stream = tr.select('.loud').createStream();
//  var upper = through2(function(buf, _, next) {
//      this.push(buf.toString().toUpperCase());
//      next();
//  })

//  stream.pipe(upper).pipe(stream);
//  process.stdin.pipe(tr).pipe(process.stdout);

// 合并输入 输出 stream 

/**
 * 合并后的输入输出可像前文request一样使用，下班这个例子实现了用流的方式进行
 * 子进程调用
 * 
 */

 var spawn = require('child_process').spawn;
 var duplexer2 = require('duplexer2');

 module.exports = function(cmd, args) {
     var c = spawn(cmd, args);
     return duplexer2(c.stdin, c.stdout);
 }

//  总结
/**
 * 1.stream 分为 readable/writable
 * 2.stream通过 pipe 方法控制流向
 *3.httpServer和httpClient和file system 和 process.stdin\out\err 通常可以转化为流
 * 4.stream 可以被on(event)转化为普通的变量，普通变量可以呗write装换成stream
 * stream自身可以被拆分、合并、过滤
 */