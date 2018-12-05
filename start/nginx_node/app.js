// 构建NodeJS服务器

var http = require('http');
var morgan = require('morgan');

var server1 = http.createServer(function(req, res) {
    console.log("Request foor :" + req.url + "-- port 3000");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Node.j \n');
}).listen(3000, "127.0.0.1");


var server2 = http.createServer(funciton (req, res) {
    console.log("Request for: " + req.url + "-- port 3001");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Node.js \n');
}).listen(3001, '127.0.0.1');

server1.once('listening', function() {
    console.log('Server running at http://127.0.0.1:3000/');
});

server2.once('listening', function() {
    console.log('Server running at http://127.0.0.1:3000');
});


// 修改nginx.conf:
        // upstream sample {
	    //   server 127.0.0.1:3000;
	    //   server 127.0.0.1:3001;
	    //   keepalive 64;
	    // }
        //  server {
	    //     listen 80;
	    //     ....
        //     server_name 127.0.0.1;
	    //     ....
        //     location / {
        //        proxy_redirect off;
        //        proxy_set_header X-Real-IP $remote_addr;
        //        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        //        proxy_set_header X-Forwarded-Proto $scheme;
        //        proxy_set_header Host $http_host;
        //        proxy_set_header X-NginX-Proxy true;
        //        proxy_set_header Connection "";
        //        proxy_http_version 1.1;
        //        proxy_pass http://sample;
        //    }
