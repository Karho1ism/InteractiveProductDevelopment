// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geo_location: "113.678280,23.628439",
    weather_now: "",
    region: ['广东省', '广州市', '海珠区']
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.location()
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
        console.log(res.data.geocodes[0].location) //打印数据
        that.setData({
          geo_location: res.data.geocodes[0].location
        })
        that.weather()
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

    // 获取当前位置信息
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        // 获取位置信息成功后，调用 1.逆地理编码（省市区） 2.省市区存起来，写到picker 3.天气？经纬度
        console.log("当前位置:",res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          geo_location: res.longitude + ',' + res.latitude
        })
        that.weather()
        // 逆地理编码获取省市区API
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?parameters',
          data:{
            key:'137d2023829ab755fded4b9b0998d5b8',
            location: res.longitude + ',' + latitude
          },
          success(res){
            console.log("当前逆地理编码",res.data.regeocode.addressComponent)
            const province = res.data.regeocode.addressComponent.province
            const city = res.data.regeocode.addressComponent.city
            const district = res.data.regeocode.addressComponent.district
            that.setData({
              region: [ province, city, district ]
            })
          }
        })
      }
     })
     
    // that.location(),
    // that.weather()
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