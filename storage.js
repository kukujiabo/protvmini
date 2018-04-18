module.exports = function() {

  var userInfo = 'user_info'
  var token = 'cx_token'

  return {

    /**
     * 用户信息
     */
    setUserInfo(data) {

      wx.setStorageSync(userInfo, data)

    },
    getUserInfo() {

      return wx.getStorageSync(userInfo)

    },

    setCxToken(data) {

      wx.setStorageSync(token, data)

    },
    getCxToken() {

      return wx.getStorageSync(token)

    }

  }

}