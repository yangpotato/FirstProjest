// pages/home.js
//引入代码
var request = require("../../utils/request.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
      banarList : [],
      dynamicList : []
  },

  goto_community: function(options){
    wx.navigateTo({
      url: '../community/community',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var params = {
      categoryid : 1
    }
    request.requestGet("banner/list", params, this.getBanarSuccess, this.getBanarFailed)
  
    var dynamicParams={
      from : 0,
      limit : 10,
      token : "TKCC04289356208651",
      type : 1
    }
    request.requestGet("social/dynamic/list", dynamicParams, this.getDynamicSuccess, null)
  },
  getDynamicSuccess: function(data){
    console.log(data)
      this.setData({
        dynamicList : data.data.list
      })
  },
  getBanarSuccess: function(data){
    console.log(data.data.banner)
    var that = this;
    that.setData({
      banarList : data.data.banner
    })

  },
  getBanarFailed: function(data){
    console.log("失败")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})