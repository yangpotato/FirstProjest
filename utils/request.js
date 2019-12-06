var app = getApp();
var host = 'http://jdapp.1netbi.com/api/';


/**
 * 
 * @param {String} url           接口地址
 * @param {Object} params        请求的参数
 * @param {Function} doSuccess   接口调用成功返回的回调函数
 * @param {Function} doFail      接口调用失败的回调函数
 */
function requestPost(url, params, doSuccess, doFail) {
  requestApi(url, params, 'POST', doSuccess, doFail)
}

/**
 * 
 * @param {String} url           接口地址
 * @param {Object} params        请求的参数
 * @param {Function} doSuccess   接口调用成功返回的回调函数
 * @param {Function} doFail      接口调用失败的回调函数
 */
function requestGet(url, params, doSuccess, doFail) {
  requestApi(url, params, 'GET', doSuccess, doFail)
}

/**
 * 请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Function} doSuccess  接口调用成功返回的回调函数
 * @param  {Function} doFail     接口调用失败的回调函数
 */
function requestApi(url, params, method, doSuccess, doFail) {
  wx.showLoading({
    title: '加载中',
  })
  if (method == 'POST') {
      var contentType = 'application/x-www-form-urlencoded'
  } else {
      var contentType = 'application/json;charset=UTF-8'
  }
  wx.request({
      url:    host + url,
      method: method,
      data:   params,
      header: {'Content-Type': contentType},
      success: function (res) {
        wx.hideLoading();
        if(res.data.error == ""){
          // var data = res.data;
          // if(data.is_success == '1' || data.issuccess == '1' 
          //     || data.issuccess == 'true' || data.is_success == 'true')
          
          typeof doSuccess == 'function' && doSuccess(res.data)
        }else{
          // console.log(res.data.error)
          wx.showToast({
              title: res.data.error,
              icon: 'none',
              duration: 2000
          });
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: res.error,
          icon: 'none',
          duration: 2000
          });
        typeof doFail == 'function' && doFail(res.data)
      }
  })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
// module.exports = { 
//   requestPost,
//   requestGet
// }
module.exports.requestPost = requestPost;
module.exports.requestGet = requestGet;