// components/video/list/list.js
var utils = require('../../../utils/util')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    breakWords: [],
    videoPlayed: [],
    listVideo: [],
    videoContexts: [],
    nomore: false,
    showShare: false,
    querySelector: undefined,
    extendBtns: [],
    matchWords: false
  },

  /**
   * 视频控件实例
   */
  videoContexts: [],

  /**
   * 列表查询条件
   */
  queryOptions: {
    status: 1,
    page: 1,
    page_size: 8,
    max_page: 1
  },


  /**
   * 组件的方法列表
   */
  methods: {

    setMetchWords(matched) {

      this.setData({

        matchWords: matched

      })

    },

    setExtendBtns(btns) {

      this.setData({

        extendBtns: btns

      })

    },

    loadVideo(videos) {

      if (!Array.isArray(videos)) {

        return

      }

      var that = this

      var videoList = this.data.listVideo

      var loadedVideo = []

      var tmpWordBreak = this.data.breakWords

      videoList.forEach(v => {

        loadedVideo.push(v.id)
        
      })

      /**
       * 生成视频播放控件列表，记录列表视频简介显示状态
       */
      videos.forEach((video, index) => {

        if (utils.inArray(video.id, loadedVideo) >= 0) {

          return

        }

        tmpWordBreak.push(true)

        video.duration = utils.formatDuration(video.duration)

        videoList.push(video)

      })

      that.setData({

        listVideo: videoList,

        breakWords: tmpWordBreak

      })

    },

    /**
     * 展开简介
     */
    extendWord(evt) {

      var index = evt.currentTarget.dataset.index

      var tmpWordBreak = this.data.breakWords

      tmpWordBreak[index] = false

      this.setData({

        breakWords: tmpWordBreak

      })

    },

    /**
     * 折叠简介
     */
    breakWord(evt) {

      var index = evt.currentTarget.dataset.index

      var tmpWordBreak = this.data.breakWords

      tmpWordBreak[index] = 'text-break'

      this.setData({

        breakWords: tmpWordBreak

      })

    },

    /**
     * 跳转详情
     */
    toDetail(evt) {

      var index = evt.currentTarget.dataset.index

      var video = this.data.listVideo[index]

      wx.navigateTo({

        url: '/pages/videos/detail/detail?id=' + video.id,

      })

    },

    /**
     * 分享视频
     */
    shareVideo() {

      // this.setData({

      //   showShare: true

      // })

    },

    onCancelShare() {

      this.setData({

        showShare: false

      })

    },

    setNoMore() {

      this.setData({

        nomore: true

      })

    },

    clearVideos() {

      this.setData({

        listVideo: []

      })

    }

  }

})
