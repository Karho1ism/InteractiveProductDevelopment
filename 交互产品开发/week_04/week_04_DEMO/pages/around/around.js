// pages/around/around.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridCol:3,
    iconList: [{
      icon: 'shop',
      color: 'red',
      badge: 0,
      name: '餐饮',
      amap: '050000'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 0,
      name: '风景',
      amap: '110000'
    }, {
      icon: 'read',
      color: 'yellow',
      badge: 0,
      name: '科教',
      amap: '140000'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 0,
      name: '生活服务',
      amap: '070000'
    }, {
      icon: 'safe',
      color: 'cyan',
      badge: 0,
      name: '医疗',
      amap: '090000'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '购物',
      amap: '060000'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    geo_address:'',
    location:'',
    inputValue:''
  },

  // 事件函数: 跳转事件
  nav_detail: function(e){
    console.log("around页面的事件数据: ",e.currentTarget.dataset)
    // console.log("around页面的location数据: ",e.currentTarget.dataset)
    var title = e.currentTarget.dataset.name
    var now_location = this.data.location
    var amap = e.currentTarget.dataset.amap
    // var amap = e.currentTarget.dataset.amap
    wx.navigateTo({
      // 'path'?key=value&key2=value2
      url: '/pages/around_detail/around_detail' + '?' + 'detail_title=' + title + '&' + 'detail_location=' + now_location + '&' + 'detail_amap=' + amap,
    })
  },

  // 用户输入事件函数: 输入事件
  bindKeyInput: function (e) {
    console.log("用户输入：", e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 搜索事件: 点击事件
  search: function(e) {
    var that = this
    console.log("点击搜索产生的数据：",e.currentTarget.dataset.inputv)
    var search_value = e.currentTarget.dataset.inputv

    // 请求周边搜索API
    wx.request({
      url: 'https://restapi.amap.com/v3/place/text?parameters', //周边搜索API
      data: {
        key: '137d2023829ab755fded4b9b0998d5b8', //高德API key
        location: this.data.location,
        keywords: search_value
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // 1.获取当前位置经纬度
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log("当前位置经纬度",res)
        that.setData({
          location: longitude + ',' + latitude
        })

        // 2.高德API获取结构化地址
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
            const township = res.data.regeocode.addressComponent.township
            that.setData({
              geo_address: city + " " + district + " " + township
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