// components/phoneBinder.js
const app = getApp()
Component({
  lifetimes: {
    attached: function() {
      app.logger.info(`[phoneBinder] get client info ${JSON.stringify(this.data.clientInfo)}`)
    },
    detached: function() {
      // 页面被隐藏
      // this.hideModal()
    }
  },
  /**
   * Component properties
   */
  properties: {
    clientInfo: {
      type: Object,
    }
  },

  /**
   * Component initial data
   */
  data: {
    inputPhoneNumber: ''
  },

  /**
   * Component methods
   */
  methods: {
    onCloseDialog: function() {
      this.triggerEvent('closeDialogEvent', null)
    },
    onConfirm: function() {
      if (!this.data.clientInfo) {
        this.saveClientInfo({
          openId: app.globalData.openid,
          phone: this.data.inputPhoneNumber,
          name: app.globalData.userInfo.nickName,
          avatar: app.globalData.userInfo.avatarUrl
        })
      } else {
        //todo update client Info
      }
    },

    onInputPhoneNumber: function(e) {
      this.setData({
        inputPhoneNumber: e.detail.value
      })
    },

    saveClientInfo: function({
      openId,
      phone,
      oper1_id,
      oper2_id,
      oper3_id,
      name,
      avatar
    }) {
      let newClientInfo = {
        openId: openId,
        phone: phone,
        name: name,
        avatarUrl: avatar,
        oper1_id: oper1_id,
        oper2_id: oper2_id,
        oper3_id: oper3_id,
        client_level: 2
      }
      wx.showLoading({
        title: '保存中',
      })
      wx.cloud.callFunction({
        name: 'saveClientInfo',
        data: newClientInfo,
        success: res => {
          app.logger.info(`[phoneBinder] Save client info for user ${openId} phone:${phone}`)
          wx.hideLoading()
          this.triggerEvent("closeDialogEvent", newClientInfo)
        },
        fail: error => {
          wx.hideLoading()
          app.logger.error(`[phoneBinder] Error save client info for user ${openId} ${error} `)
        }
      })
    },
  }
})