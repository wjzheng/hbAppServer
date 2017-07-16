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
  let reqBody = this.request.body;
  debug(reqBody);
  var result = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      let uuid = require('node-uuid');
      resolve({isSuc: true, data: {id: uuid.v1()}})
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
  var result = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (loginId === '110') {
        reject({isSuc: false, code: 0})
      } else {
        resolve({isSuc: flag, code: 0})
      }
    }, 2000)
  });
  this.body = result;
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