const Koa = require('koa')
const fs = require('fs')
const path = require('path')
// const content = require('./util/content')
// const mimes = require('./util/mimes')

// 路由中间件  koa-router

// const Router = require('koa-router')

// let home = new Router()

// 子路由1
// home.get('/', async ( ctx )=>{
//   let html = `
//     <ul>
//       <li><a href="/page/helloworld">/page/helloworld</a></li>
//       <li><a href="/page/404">/page/404</a></li>
//     </ul>
//   `
//   ctx.body = html
// })

// // 子路由2
// let page = new Router()
// page.get('/404', async ( ctx )=>{
//   ctx.body = '404 page!'
// }).get('/helloworld', async ( ctx )=>{
//   ctx.body = 'helloworld page!'
// })

// // 装载所有子路由
// let router = new Router()
// router.use('/', home.routes(), home.allowedMethods())
// router.use('/page', page.routes(), page.allowedMethods())

// // 加载路由中间件
// app.use(router.routes()).use(router.allowedMethods())


// GET 请求数据获取
// app.use( async ( ctx ) => {
//     let url = ctx.url;
//     //从上下文的request对象中获取
//     let request = ctx.request;
//     let req_query = request.query;
//     let req_querystring = request.querystring;

//     // 从上下文直接获取
//     let ctx_query = ctx.query;
//     let ctx_querystring = ctx.querystring;

//     ctx.body = {
//         url,
//         req_query,
//         req_querystring,
//         ctx_query,
//         ctx_querystring
//     }
// } )

// app.use( async( ctx ) => {
//     if ( ctx.url === '/' && ctx.method === 'GET' ) {
//         //当GET请求时  返回表单页面
//         let html = `
//         <h1>koa2 request post demo</h1>
//         <form method="POST" action="/">
//           <p>userName</p>
//           <input name="userName" /><br/>
//           <p>nickName</p>
//           <input name="nickName" /><br/>
//           <p>email</p>
//           <input name="email" /><br/>
//           <button type="submit">submit</button>
//         </form>       
//         `
//         ctx.body = html;
//     } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
//         //当POST请求的时候，解析POST表单里的数据，并显示出来
//         let postData = await parsePostData( ctx );
//         ctx. body = postData;
//     } else {
//         //其他请求显示404
//         ctx.body = `<h1>404！！！ o(╯□╰)o</h1>`;
//     }
// } )

// // 解析上下文里node原生请求的POST参数

// function parsePostData( ctx ) {
//     return new Promise((resolve, reject) => {
//         try {
//             let postdata = "";
//             ctx.req.addListener('data', ( data ) => {
//                 postdata += data;
//             });
//             ctx.req.addListener('end', function() {
//                 let parseData = parseQueryStr( postdata );
//                 resolve( parseData );
//             })
//         } catch ( err ) {
//             reject( err );
//         }
//     })
// }

// //将POST请求参数字符串解析成JSON
// function parseQueryStr( queryStr ) {
//     let queryData = {};
//     let queryStrList = queryStr.split('&');
//     console.log( queryStrList );

// /**  entries()的用法  返回数组的迭代对象
//  * var fruits = ["Banana", "Orange", "Apple", "Mango"];
//  * fruits.entries();
//  * 
//  * [0, "Banana"]
//  * [1, "Orange"]
//  * [2, "Apple"]
//  * [3, "Mango"]
//  */

//     for ( let [ index, queryStr ] of queryStrList.entries() ) {
//         let itemList = queryStr.split( '=' );
//         queryData[ itemList[0] ] = decodeURIComponent(itemList[1]);
//     }

//     return queryData;

// }

// koa-bodyparser中间件
//对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

/**   原生Koa2实现景台服务器  */

//静态资源目录对于相对入口文件index.js的路径
// const staticPath = './static'

// //解析资源类型
// function parseMime( url ) {
//   let extName = path.extname( url )
//   extName = extName ? extName.slice(1) : 'unkown'
//   return mimes[ extName ]  
// }

// app.use( async ( ctx ) => {
//   //静态资源目录在本地的绝对路径
//   let fullStaticPath = path.join(__dirname, staticPath);

//   //获取静态资源内容，有可能是文件内容，目录，或404
//   let _content = await content( ctx, fullStaticPath );

//   //解析请求内容的类型
//   let _mime = parseMime( ctx.url );

//   //如果有对应的文件类型，就配置上下文的类型
//   if ( _mime ) {
//     ctx.type = _mime
//   }

//   //输出静态资源内容
//   if (_mime && _mime.indexOf('image/') >= 0) {
//     //如果是图片，则用node原生res,输出二进制数据
//     ctx.res.writeHead(200)
//     ctx.res.write(_content, 'binary')
//     ctx.res.end()
//   } else {
//     //其他则输出文本
//     ctx.body = _content
//   }

// } )

/**  在Koa2使用cookie     */ 

// app.use( async ( ctx ) => {

//   if ( ctx.url === '/index' ) {
//     ctx.cookies.set(
//       'cid',
//       'hello world',
//       {
//         domain: 'localhost', //写cookie所在的域名
//         path: '/index',      //写cookie所在的路径
//         maxAge: 10 * 60 * 1000,  //cookie有效时长
//         expires: new Date('2019-02-15'),  //cookie失效时间
//         httpOnly: false,  //是否只用于http请求中获取
//         overwrite: false  //是否允许重写
//       }
//     )
//     ctx.body = 'cookie is ok'
//   } else {
//     ctx.body = 'hello world'
//   }

// } )

/**    Koa2 实现 session */

const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

//配置存储session信息的mysql

let store = new MysqlSession({
  user: 'root',
  password: 'root',
  database: 'node_test',
  host: '127.0.0.1'
})

//存放sessionId的cookie配置
let cookie = {
  maxAge: 10 * 60 * 1000, //cookie有效时长
  expires: new Date('2019-02-15'), //cookie失效时间
  path: '/', //写cookie所在的路径
  domain: 'localhost', //写cookie所在的域
  httpOnly: '', //是否只用于http请求中获取
  overwrite: '', //是否允许重写
  secure: '',
  signed: '',
}

//使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

//设置session
app.use( async ( ctx ) => {
  if( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {
    //读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  }
})

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})