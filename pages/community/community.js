// pages/community/community.js
var app = getApp();
var request = require("../../utils/request.js")
let startY = 0;
let rulerPopupHeight =0;
var showPopupStatus = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight:"",//窗口高度
    currentTab:0, //预设当前项的值
    scrollLeft:0, //tab标题的滚动条位置

    //section header 距离 ‘当前顶部’ 距离
    sectionHeaderLocationTop: 0,
    //页面滚动距离
    scrollTop: 0,
    //是否悬停
    fixed: false,
    community_id : -1,
    dynamicList: [],
    communityInfo : Object,
    rulerPopupHeight : 0,
    showPopupStatus : true,
    tabItemNode: [], //   导航条节点信息
  },
   // 滚动切换标签样式
  switchTab:function(e){
    let index = e.detail.current;
    let tabItemNode=this.data.tabItemNode;
    let left=0;
    for(let i=2;i<index;i++){
      left+=tabItemNode[i].width
    }
    this.setData({ 
      currentTab:e.detail.current,
      scrollLeft:left
    })
  },

  // 点击标题切换当前页时改变样式
  swichNav:function(e){
    wx.pageScrollTo({scrollTop: this.data.navbarInitTop});

    let index = e.currentTarget.dataset.index;
    let tabItemNode = this.data.tabItemNode;
    let left = 0;
    for (let i = 2; i < index; i++) {
      left += tabItemNode[i].width
    }
    console.log(left, index, tabItemNode)
    this.setData({
      currentTab: index,
      scrollLeft: left
    })
    console.log(index, this.scrollLeft)
  },
 
  tabTouch: function(e){
    // 当用户点击my-swiper组件时，将其置顶
    const top = e.currentTarget.offsetTop
    // 滚动到顶部
    wx.pageScrollTo({scrollTop: this.data.sectionHeaderLocationTop});
    console.log("tabTouch")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this
    this.data.community_id = options.community_id
    var params = {
      community_id: that.data.community_id,
      token: "TKCC09547970830828"
    }
    request.requestGet("community/info", params, this.getInfoSuccess, null)

    var dynamicParams = {
      from: 0,
      limit: 10,
      token: "TKCC09547970830828",
      type: 1
    }
    request.requestGet("social/dynamic/list", dynamicParams, this.getDynamicSuccess, null)

    console.log("community_id:" + this.data.community_id)
    
  },
  footerTap:app.footerTap,

  getDynamicSuccess : function(data){
    var that = this
    this.setData({
      dynamicList : data.list
    })

    wx.createSelectorQuery().select(".dynamic_template").boundingClientRect(function (res) {
      console.log("dynamic_template.height:" + res.height)
      that.setData({
        winHeight: res.height
      })
    }).exec()

    // wx.createSelectorQuery().select(".ruler_popup").boundingClientRect(function(res){
    //   console.log("ruler_popup.height:" + res.height)
    //   that.data.rulerPopupHeight = res.height
    // }).exec()

    wx.getSystemInfo({
      success: function (res, rect) {
        console.log("windowHeight.height:" + res.windowHeight)
        rulerPopupHeight = res.windowHeight
      }
    })

    
    wx.createSelectorQuery().selectAll('.tab_layout .tab_layout_block').boundingClientRect(function (rect) {
      console.log("tabItemNode" + rect[3].width)
      that.setData({
        tabItemNode: rect
      })
     

    }).exec();

  },
  getInfoSuccess : function(data){
    this.setData({
      communityInfo : data
    })
  },

  // 显示弹窗
  showRulerPopup : function(e){
    var animation = wx.createAnimation({
      duration : 200,
      timingFunction : "linear",
      delay: 0
    })
    animation.translateY(rulerPopupHeight * 0.9).step()
    this.setData({
      animationData : animation.export(),
      showPopupStatus : false,
    })
  
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData : animation
      })
    }.bind(this), 0)
    
    wx.createSelectorQuery().select(".ruler_popup").boundingClientRect(function(res){
      console.log("ruler_popup.height:" + res.top)
      // rulerPopupHeight = res.height
    }).exec()
  },
  //隐藏弹窗
  hideRulerPopup : function(e){
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    animation.translateY(rulerPopupHeight * 0.9).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showPopupStatus: true
      })
    }.bind(this), 0)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      let that = this
      let query = wx.createSelectorQuery()
      query.select(".view_dynamic").boundingClientRect(function (res){
        that.setData({
          sectionHeaderLocationTop : res.top
        })
        console.log("res.top:" + res.top)
      }).exec()
      
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


    
  },

  // onPageScroll: function(e){
  //   //console.log(e)
  //   this.data.scrollTop = e.scrollTop;
  //   if (e.scrollTop >= this.data.sectionHeaderLocationTop) {
  //     this.setData({
  //       fixed: true
  //     })
  //   } else {
  //     this.setData({
  //       fixed: false
  //     })
  //   }
  // }
})