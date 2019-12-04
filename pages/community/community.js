// pages/community/community.js
var app = getApp();

let startY = 0;
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
    fixed: false
  },
  //  // 滚动切换标签样式
  // switchTab:function(e){
  //   this.setData({
  //     currentTab:e.detail.current
  //   });
  //   this.checkCor();
  // },

  // // 点击标题切换当前页时改变样式
  // swichNav:function(e){
  //   var cur=e.target.dataset.current;
  //   if(this.data.currentTaB==cur){return false;}
  //   else{
  //       this.setData({
  //           currentTab:cur
  //       })
  //   }
  // },
  // //判断当前滚动超过一屏时，设置tab标题滚动条。
  // checkCor:function(){
  //   if (this.data.currentTab>4){
  //     this.setData({
  //       scrollLeft:300
  //     })
  //   }else{
  //     this.setData({
  //       scrollLeft:0
  //     })
  //   }
  // },

  tabTouch: function(e){
    // 当用户点击my-swiper组件时，将其置顶
    const top = e.currentTarget.offsetTop
    // 滚动到顶部
    wx.pageScrollTo({scrollTop: this.data.sectionHeaderLocationTop});
    console.log("tabTouch")
  },
  // touchStart: function(e){
  //   startY = e.changedTouches[0].clientY
  //   console.log('start', startY)
  // },
  // touchEnd: function(e){
  //   const endY = e.changedTouches[0].clientY
  //   // 当手势向上滑动时，把my-swiper组件置顶
  //   // if (startY - endY > 10) {
  //     // const top = e.currentTarget.offsetTop
  //     // wx.pageScrollTo({scrollTop: top + (endY - startY)});
  //     // wx.pageS
  //   // }
  //   console.log('end', endY)
  // },
  // handletouchmove: function(e){
  //   var currentX = event.touches[0].pageX
  //   var currentY = event.touches[0].pageY
  //   var tx = currentX - this.data.lastX 
  //   var ty = currentY - this.data.lastY
  //   if (ty < 0)
  //     console.log("向上滑动：" + ty)
  //   else
  //     console.log("向下滑动：" + ty)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    //  高度自适应
    // wx.getSystemInfo( {  
    //     success: function( res ) {  
    //         var clientHeight = res.windowHeight,
    //             clientWidth = res.windowWidth,
    //             rpxR = 750 / clientWidth;
    //       var  calc = clientHeight * rpxR + (76 * rpxR);
    //         console.log("calc:" + calc)
    //         that.setData( {  
    //             winHeight: calc  
    //         });  
    //     }  
    // });
    
    wx.createSelectorQuery().select(".dynamic_template").boundingClientRect(function(res){
      console.log("res.height:" + res.height)
      that.setData({
        winHeight: res.height
      })
    }).exec()

  },
  footerTap:app.footerTap,
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

  onPageScroll: function(e){
    //console.log(e)
    this.data.scrollTop = e.scrollTop;
    console.log("e.scrollTop=" +e.scrollTop)
    if (e.scrollTop >= this.data.sectionHeaderLocationTop) {
      this.setData({
        fixed: true
      })
    } else {
      this.setData({
        fixed: false
      })
    }
  }
})