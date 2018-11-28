var express = require('express');
var router = express.Router();

// 路由拦截

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 登录页面 */
router.all('/login', notAuthentication);
router.get('/login', function(req, res, next) {
  res.render('login', {title: '用户登录'});
});
/* 验证登录 */
router.post('/login', function(req, res) {
  var user = {
    username: 'admin',
    password: 'admin',
  }

  if(req.body.username === user.username && req.body.password === user.password) {
    req.session.user = user;
    return res.redirect('/home');
  }
  req.session.error = '用户名或密码不正确';
  return res.redirect('/login');
});

/* 主页 */
router.get('/home', authentication);
router.get('/home', function(req, res) {
  res.render('home', {title: 'Home'});
});
/* 登出 */
router.get('/logout', authentication);
router.get('/logout', function(req, res) {
  req.session.user = null;
  return res.redirect('/');
});

function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error = "请先登录";
    return res.redirect('/login');
  }

  next();
};

function notAuthentication(req, res, next) {
  if (req.session.user) {
    req.session.error = "已登录";
    return res.redirect('/home');
  }

  next();
};

module.exports = router;
