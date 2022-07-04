// pages/cv/cv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: "",
    img_data: [],
    bg_image: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("从ai页面传递过来的图片链接：",options)
    this.setData({
      bg_image: options.image
    })
    var that = this
    // 1.获取access_token
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',  // 百度access_token url地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'MM15jzqAyGSPYAAr2ObYzqKP', // API Key
        client_secret: 'DdpqwHtR7xNVGuiA2rbBb8LmBpX1HVC9' // Secret Key
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data.access_token)
        that.setData({
          access_token: res.data.access_token
        })

        // 2.input:图片 --> output:识别文本
        const fsm = wx.getFileSystemManager()
        fsm.readFile({ // 读取本地文件
          // filePath: '/images/xihu.jpg',
          filePath: that.data.bg_image,
          success: function(res){
            // 2.2 将图片格式转化为API指定要求的base64格式
            var image_base64 = wx.arrayBufferToBase64(res.data)
            // console.log(image_base64)
            // console.log(that.data.access_token)
            
            // 2.3 发起请求
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general', // 通用物体和场景识别API接口       
              data: {
                access_token: that.data.access_token,
                image: image_base64,
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 使用百度的请求header，切勿使用微信请求的默认值
              },
              success (res) {
                console.log(res.data)
                var img_data = res.data.result
                that.setData({
                  img_data: img_data
                })
                console.log("img_data:",img_data)
              }
            })
          }
        })
      }
    })
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