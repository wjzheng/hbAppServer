/**
 * Created by kim on 2017/5/10.
 */

var app = require('koa')()
  , path = require('path')
  , appRouter = require('./router')
  , EJSRender = require('koa-ejs')
  , debug = require('debug')('react:app')
  , AV = require('leanengine');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});
app.use(AV.koa());
var viewRoot = path.join(__dirname, 'www');
app.viewRoot = viewRoot;
//EJS模版引擎的配置
EJSRender(app, {
  root: viewRoot,
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(appRouter);

//处理页面未找到异常
app.use(function*(next) {
  if (this.status == 404) {
    this.body = '404'
  } else {
    yield next;
  }
});

//监听服务端异常信息
app.on('error', function (err) {
  debug(err);
});
app.listen(process.env.LEANCLOUD_APP_PORT || '8080');

