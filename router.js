/**
 * Created by kim on 2017/5/10.
 */

var Router = require('koa-router');
var router = new Router().prefix('/api');
var debug = require('debug')('react:router');

/**
 * 通用接口
 */
router.all('/common', function*() {
  var result = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({isSuc: true})
    }, 500)
  });
  this.body = result;
});

router.get('/leancloud', function*() {
  yield this.render('leancloud', {
    layout: false
  })
});

/**
 * 用户认证
 */
router.post('/auth', function*() {
  var loginId = this.request.body.loginId;
  var password = this.request.body.password;
  var flag = loginId.length === 11 && password === '111111';
  debug(`doLogin,loginId:${loginId} password:${password}`);
  //将loginID保存到session中
  if (flag) {
    this.session.logonId = loginId;
  }
  this.body = {
    code: 0,
    isSuc: flag
  }
});

/**
 * 退出
 */
router.post('/logout', function*() {
  debug(`doLogout`);
  this.body = {
    code: 0,
    isSuc: true
  }
});


module.exports = router.routes()