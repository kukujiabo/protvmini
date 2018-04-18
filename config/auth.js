var request = require('../api/request')
var apis = require('../config/apis')

module.exports = function (app) {

  wx.login({

    success: res => {

      request(

        apis.member.wxlogin,

        { code: res.code, app_name: 'straw_mini' },

        res => {

          if (res.data.ret == 200) {

            /**
             * 登录成功，保存token
             */

            var auth = res.data.data.auth

            var token = res.data.data.token

            app.storage.setCxToken(token)

            if (!auth.member_name) {

              /**
               * 登录成功后，同步微信用户信息
               */
              wx.getUserInfo({

                withCredentials: true,

                lang: "zh_CN",

                success: res => {

                  app.storage.setUserInfo(res.userInfo)

                  var memberInfo = {

                    member_name: res.userInfo.nickName,

                    portrait: res.userInfo.avatarUrl,

                    sex: res.userInfo.gender,

                    wx_city: res.userInfo.city,

                    wx_province: res.userInfo.province

                  }

                  request(

                    apis.member.editMember,

                    memberInfo,

                    res => {


                    }

                  )

                },

                fail: res => {

                  wx.showModal({

                    title: '您已拒绝用户信息！',

                    content: '如果需要重新操作，可在用户中心点击头像。'

                  })

                }

              })

            } else {

              var memberInfo = {

                nickName: auth.member_name,

                avatarUrl: auth.portrait

              }

              app.storage.setUserInfo(memberInfo)

            }

          } else {


          }

        }

      )

    }

  })

}