var request = require('../../../api/request')
var apis = require('../../../config/apis')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    searchHistory: [],

    searching: false,

    noResult: false

  },

  listQuery: {
    keyword: '',
    page: 1,
    pageSize: 12
  },

  videoList: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.videoList = this.selectComponent('#video_list')
  
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
  
  },

  queryList(data) {

    const that = this

    that.setData({

      searching: true

    })

    request(

      apis.video.listVideo,

      data,

      res => {

        if (res.data.ret == 200) {

          var videos = res.data.data.list

          if (Array.isArray(videos) && videos.length > 0) {

            that.videoList.loadVideo(res.data.data.list)

            that.setData({

              noResult: false

            })

          } else {

            that.videoList.clearVideos()

            that.setData({

              noResult: true

            })

          }

        }

      }

    )

  },

  doSearch(evt) {

    this.listQuery.keyword = evt.detail.value

    this.queryList(this.listQuery)

  },

  cancelSearch() {

    wx.navigateBack()

  },

  showSearchHistory() {

    const that = this

    request(

      apis.video.searchHistoryList,

      {},

      res => {

        that.setData({

          searchHistory: res.data.data,

          searching: false

        })

      }

    )

  },

  searchKeywords(evt) {

    this.listQuery.keyword = evt.currentTarget.dataset.keyword

    this.queryList(this.listQuery)

  },

  clearHistory() {

    const that = this

    request(

      apis.video.clearSearchHistory,

      {},

      res => {

        that.setData({

          searchHistory: []

        })

      }

    )

  }

})