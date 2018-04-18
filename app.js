//app.js
var auth = require('config/auth')
var storage = require('storage')

App({

  storage: storage(),

  onLaunch: function () {

    auth(this)

  },

  globalData: {
    userInfo: null
  }

})