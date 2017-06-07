/**
 * Created by kim on 2017/5/10.
 */

var app = require('koa')()
  , AV = require('leanengine');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});
app.use(AV.koa());

app.use(function *(next) {
  if (this.url === '/') {
    // https://github.com/tj/co-views
    yield coViews('views')('index', {title: 'Hello world'});
  } else {
    yield next;
  }
});

app.listen(process.env.LEANCLOUD_APP_PORT || '8080');

