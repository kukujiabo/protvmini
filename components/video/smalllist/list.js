// components/video/smalllist/list.js
var utils = require('../../../utils/util.js')
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

    videos: [


    ],

    nomore: false

  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadVideo(videos) {

      videos.forEach(res => {

        res.showTime = utils.formatDuration(res.duration)

      })

      this.setData({

        videos: this.data.videos.concat(videos)

      })

    },

    toDetail(evt) {

      var id = evt.currentTarget.dataset.id

      wx.navigateTo({

        url: '/pages/videos/detail/detail?id=' + id

      })

    },

    setNoMore() {

      this.setData({

        nomore: true

      })
      
    }

  }

})
