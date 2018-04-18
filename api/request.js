const domain = 'http://protvapp.xinxingtianxia.com'

function handleApiResponse(res) {

  /**
   * 请求成功
   */
  if (res.data.ret == 200) {

    return true

  } else {

    switch (res.data.ret) {

      /**
       * 未登录时重新登录
       */
      case 601002:

        this.reAuth();

        break;

      /**
       * session失效时重新登录
       */
      case 210005:

        this.reAuth();

        break;

    }

    return false

  }
  
}

var storage = require('../storage')()

module.exports = (service, data, success, fail, extParam, header) => {

  var userToken = storage.getCxToken() ? storage.getCxToken() : 'client'

  /**
   * 设置请求头部
   */
  var h = header || { 'content-type': 'application/json', 'CX-TOKEN':  userToken };

  var app = this;

  wx.request({

    url: domain + '/?service=' + service,

    data: data,

    header: h,

    success: function (res) {

      if (handleApiResponse(res)) {

        typeof success == 'function' ? success(res, extParam) : 1

      } else {

        typeof fail == 'function' ? fail(res, extParam) : 1

      }

    },

    fail: function (res) {

      typeof fail == 'function' ? fail(res, extParam) : 1

    }

  })

}