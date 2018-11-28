// 加载依赖库
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');


const session = require('express-session');

// 打印日志
var logger = require('morgan');

//加载路由控制
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//创建项目实例
var app = express();

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// session设置
app.use(session({
  secret: 'iqjmvh-178fd-fwh8f-cfenp',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 1000 * 30}
}));

app.use(function(req, res, next){
  // 保存session
  res.locals.user = req.session.user;
  //设置错误提示
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";
  if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>'
  
  next();
});

// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 更改浏览器的请求
app.use(methodOverride('_method'));
// 定义cookie解析器
app.use(cookieParser());
//定义静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
// 定义icon图标
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//匹配路径和路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

//404错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//开发环境，500c错误处理和错误堆栈跟踪
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 输出模型app
module.exports = app;