var request = require('../../api/request')
var apis = require('../../config/apis')
var utils = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    listQuery: {

      page: 0,

      page_size: 6

    }

  },

  videoList: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.id) {

      console.log(options)

      wx.navigateTo({

        url: '/pages/videos/detail/detail?id=' + options.id,

      })

      return

    }

    this.videoList = this.selectComponent('#video_list')

    this.loadVideos(1, this.data.listQuery.page_size)

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
  onPullDownRefresh() {

    console.log(123)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

    this.loadVideos(this.data.listQuery.page + 1, this.data.listQuery.page_size)

  },

  /**
   * 加载视频列表
   */
  loadVideos(page, pageSize) {

    var that = this

    request(

      apis.video.listVideo,

      {

        page: page,

        page_size: pageSize

      },

      res => {

        if (res.data.ret == 200) {

          if (that.data.listQuery.page == res.data.data.page) {

            that.videoList.setNoMore()

          } else {

            that.videoList.loadVideo(res.data.data.list)

            var listQuery = that.data.listQuery

            listQuery.page = res.data.data.page

            that.setData({

              listQuery: listQuery

            })

          }

        }

      }

    )

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {

    return {

      title: res.target.dataset.title,

      imageUrl: res.target.dataset.image,

      path: '/pages/videos/index?id=' + res.target.dataset.id

    }

  },

  toSearch() {

    wx.navigateTo({

      url: '/pages/videos/search/search',

    })

  }

})