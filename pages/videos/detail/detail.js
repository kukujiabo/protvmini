var request = require('../../../api/request')
var apis = require('../../../config/apis')
var utils = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {
      id: '',
      title: '',
      cover: '',
      brief: '',
      album: '',
      category_name: '',
      created_at: '',
      author: '',
      url: '',
      collect: false
    },
    showShare: false
  },

  videoContext: undefined,

  videoList: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.videoContext = wx.createVideoContext('video-player')

    this.loadData(options.id)

    this.videoList = this.selectComponent('#small_list')
  
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
  onShareAppMessage (res) {

    return {

      title: this.data.video.title,

      imageUrl: this.data.video.cover,

      path: '/pages/videos/index?id=' + this.data.video.id

    }

  },

  shareVideo() {

    this.setData({

      showShare: true

    })

  },

  /**
   * 收藏视频
   */
  collectVideo(evt) {

    const that = this
    
    request(

      apis.video.collect,

      { video_id: that.data.video.id },

      res => {

        if (res.data.ret == 200 && res.data.data > 0) {

          var video = that.data.video

          video.collect = true

          that.setData({

            video: video

          })

          wx.showToast({

            title: '收藏成功！',

            icon: 'none'

          })

        } else {

      

          wx.showToast({

            title: '发生错误！',

            icon: 'none'

          })

        }

      }

    )

  },

  /**
   * 取消收藏
   */
  uncollectVideo() {

    const that = this

    request(

      apis.video.uncollect,

      { video_id: that.data.video.id },

      res => {

        if (res.data.ret == 200 && res.data.data > 0) {

          var video = that.data.video

          video.collect = false

          that.setData({

            video: video

          })

          wx.showToast({

            title: '已取消收藏！',

            icon: 'none'

          })

        } else {

          wx.showToast({

            title: '发生错误！',

            icon: 'none'

          })

        }

      }

    )

  },

  /**
   * 标记喜欢视频
   */
  favoriteVideo() {

    const that = this
    
    request(

      apis.video.favorite,

      { video_id: that.data.video.id },

      res => {

        if (res.data.ret == 200 && res.data.data > 0) {

          var video = that.data.video

          video.favorite = true

          that.setData({

            video: video

          })

        } else {


        }

      }

    )

  },

  /**
   * 取消喜欢视频
   */
  cancelFavorite() {

    const that = this
    
    request(

      apis.video.cancelFavorite,

      { video_id: that.data.video.id },

      res => {

        if (res.data.ret == 200 && res.data.data > 0) {

          var video = that.data.video

          video.favorite = false

          that.setData({

            video: video

          })

        } else {

      

        }

      }

    )

  },

  moreVideo() {

    var video = this.data.video

    const that = this

    request(

      apis.video.listVideo,

      { times: 'l|' + video.times },

      res => {

        that.videoList.loadVideo(res.data.data.list)

      }

    )    


  },

  loadData(id) {

    const that = this

    request(

      apis.video.detail,

      { id: id },

      res => {

        if (res.data.ret == 200) {

          var video = {
            id: res.data.data.id,
            title: res.data.data.title,
            cover: res.data.data.cover,
            brief: res.data.data.brief,
            duration: utils.formatDuration(res.data.data.duration),
            album: '',
            category_name: '无',
            created_at: res.data.data.created_at,
            author: '',
            url: res.data.data.url,
            collect: res.data.data.collect,
            favorite: res.data.data.favorite,
            category_name: res.data.data.category_name,
            times: res.data.data.times
          }

          wx.setNavigationBarTitle({

            title: video.title,

          })

          that.setData({

            video: video

          })

          that.moreVideo()

        }

      }

    )

  }

})