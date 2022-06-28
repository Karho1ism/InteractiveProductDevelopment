// pages/ai/ai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll: false,
    curIndex: 0, // 决定左侧分类
    category:[
      {
        "title":"红酒识别",
        "id":'hjsb',
        "bg_img":'http://rcqjc8g2w.hn-bkt.clouddn.com/hongjiu.jpg',
        "content":'识别图像中的红酒标签，返回红酒名称、国家、产区、酒庄、类型、糖分、葡萄品种、酒品描述等信息，可识别数十万中外红酒；支持自定义红酒图库，在自建库中搜索特定红酒信息',
        "url":'https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine'
      },
      {
        "title":"植物识别",
        "id":"zwsb",
        "bg_img":'http://rcqjc8g2w.hn-bkt.clouddn.com/zwsb-bg.jpeg',
        "content":'可识别超过2万种常见植物和近8千种花卉，接口返回植物的名称，并支持获取识别结果对应的百科信息；还可使用EasyDL定制训练平台，定制识别植物种类。适用于拍照识图、幼教科普、图像内容分析等场景',
        "url":'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant'
      },
      {
        "title":"动物识别",
        "id":"dwsb",
        "bg_img":'http://rcqjc8g2w.hn-bkt.clouddn.com/dwsb-bg.jpeg',
        "content":'识别近八千种动物，接口返回动物名称，并可获取识别结果对应的百科信息；还可使用EasyDL定制训练平台，定制识别分类标签。适用于拍照识图、幼教科普、图像内容分析等场景',
        "url":'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal'
      },
      {
        "title":"地标识别",
        "id":"dbsb",
        "bg_img":'http://rcqjc8g2w.hn-bkt.clouddn.com/dbsb-bg.jpeg',
        "content":'支持识别12万中外著名地标、热门景点；还可使用EasyDL定制训练平台，定制地标分类标签。广泛应用于拍照识图、幼教科普、图片分类等场景',
        "url":'https://aip.baidubce.com/rest/2.0/image-classify/v1/landmark'
      },
      {
        "title":"货币识别",
        "id":"hbsb",
        "bg_img":'http://rcqjc8g2w.hn-bkt.clouddn.com/hbsb-bg.jpeg',
        "content":'识别图像中的货币类型，返回货币名称、代码、面值、年份信息，可识别百余种国内外常见货币；还可使用EasyDL定制训练平台，定制识别货币种类',
        "url":'https://aip.baidubce.com/rest/2.0/image-classify/v1/currency'
      }
    ],
    toView: 'hjsb' // 决定右侧的视图显示，与curIndex一一对应
  },

  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
      console.log("e.target.dataset.id",e.target.dataset.id)
      console.log("e.target.dataset.index",e.target.dataset.index)
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)
  },

  // 模态窗的显示和隐藏函数
  showModal(e) {
    wx.hideTabBar({
      animation: true,
    })
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    wx.showTabBar({
      animation: true,
    })
  },

  // 选择本地图片
  selectImage:function() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        var selectedImage = res.tempFiles[0].tempFilePath
        wx.navigateTo({
          url: '/pages/cv/cv?image=' + selectedImage + '&title=',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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