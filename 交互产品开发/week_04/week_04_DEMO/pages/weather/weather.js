// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geo_location: "113.678280,23.628439",
    weather_now: "",
    region: ['广东省', '广州市', '从化区']
  },

  bindRegionChange: function (e) {
    this.location()
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  // 请求高德地图API，获得地理位置信息
  location: function() {
    var that = this
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/geo?', // 高德地理编码API接口
      data: {
        address: this.data.region[0] + this.data.region[1] + this.data.region[2],
        key: '137d2023829ab755fded4b9b0998d5b8'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.weather()
        console.log(res.data.geocodes[0].location) //打印数据
        that.setData({
          geo_location: res.data.geocodes[0].location
        })
      }
    })
  },

  // 请求和风天气API
  weather: function() {
    var that = this
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?', // 和风天气实时天气API接口
      data: {
        location: that.data.geo_location,
        key: '788814f7fa84444ca809cb2c63b663c5'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data.now) //打印数据
        that.setData({
          weather_now: res.data.now
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this // 这里that指函数内部，this指页面Page
    that.location(),
    that.weather()
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