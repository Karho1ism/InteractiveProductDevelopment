// pages/around/around.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    geo_location: "",
    around:'',
    types: ''
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
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // options 用来监听页面加载过程中的数据
    console.log("around页面传递的数据: ",options)
    this.setData({
      title: options.detail_title
    })
    
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

        // 请求周边搜索API
        wx.request({
          url: 'https://restapi.amap.com/v3/place/text?parameters', //周边搜索API
          data: {
            key: '137d2023829ab755fded4b9b0998d5b8', //高德API key
            location: options.detail_location,
            types: options.detail_amap
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {    
            console.log(res.data)
            that.setData({
              around: res.data.pois
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