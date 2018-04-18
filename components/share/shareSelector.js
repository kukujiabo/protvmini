// components/share/shareSelector.js
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
    selectItems: [
      { id: 1, src: '/static/send.png', title: '发送给朋友', openType: 'share' }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    cancelShare() {

      this.triggerEvent('cancelShare')

    }
    
  }
})
