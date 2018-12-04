var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '阿飞的爬虫' });
// });

router.get('/', function(req, res, next) {
  // var page = req.param('page');
  // console.log("page: " + page);
  var Res = res;

  var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';

  http.get(url, function(res) {
    var chunks = [];
    var size = 0;
    res.on('data', function(chunk) {
      chunks.push(chunk);
      size += chunk.length;
    });

    res.on('end', function() {
      var titles = [];
      // var data = Buffer.concat(chunks, size);
      // var html = data.toString();
      
      // 利用iconv解决乱码的问题
      //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
      var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
      // console.log(html);

      var $ = cheerio.load(html, {decodeEntities: false});

      $('.co_content8 .ulink').each(function (idx, element) {
        var $element = $(element);
        titles.push({
          title: $element.text()
        })
      });
      console.log(titles);
      Res.json({
        jobs: titles
      });
    })
  })
})

module.exports = router;
