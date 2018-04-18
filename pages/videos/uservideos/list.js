// pages/videos/uservideos/list.js
var apis = require('../../../config/apis.js')
var request = require('../../../api/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    vType: 0,

    service: '',
  
    page: 1,

    max_page: 0,

    page_size: 7

  },

  videoList: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var vType = options.type

    var service = ''

    this.videoList = this.selectComponent('#small_list')

    if (vType == 2) {

      service = apis.video.userCollectVideoList

      wx.setNavigationBarTitle({

        title: '我的收藏',

      })

      this.setData({

        vType: vType,

        service: service

      })

    } else {

      service = apis.video.userFavoriteVideoList

      wx.setNavigationBarTitle({

        title: '我的喜欢',

        service: service

      })

      this.setData({

        vType: vType,

        service: service

      })

    }

    this.getVideoList(service, 'created_at desc', this.data.page, this.data.page_size)

  },

  getVideoList(service, order, page, pageSize) {

    var that = this

    request(

      service,

      { 
        order: order, 

        page: page,

        page_size: pageSize

      },

      res => {

        if (res.data.ret == 200 && res.data.data.list.length > 0) {

          that.videoList.loadVideo(res.data.data.list)

          that.setData({

            page: res.data.data.page,

            max_page: Math.ceil(res.data.data.total/that.data.page_size)

          })

        }

      }

    )

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
  onReachBottom() {

    if (this.data.page == this.data.max_page) {

      this.videoList.setNoMore();

      return

    }

    this.getVideoList(this.data.service, 'created_at desc', this.data.page + 1, this.data.page_size)
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }

})