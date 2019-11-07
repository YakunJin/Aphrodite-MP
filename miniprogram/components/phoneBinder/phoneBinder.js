// components/phoneBinder.js
const app = getApp()
Component({
  lifetimes: {
    attached: function() {

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
      this.triggerEvent('closeDialogEvent')
    },
    onConfirm: function() {
      if(!this.data.clientInfo)
      {
        this.saveClientInfo(app.globalData.openid, this.data.inputPhoneNumber)
      }
      else{

      }
    },

    onInputPhoneNumber: function(e) {
      this.setData({
        inputPhoneNumber: e.detail.value
      })
    },

    saveClientInfo: function (openId, phone, oper1_id, oper2_id, oper3_id) {
      wx.showLoading({
        title: '保存中',
      })
      wx.cloud.callFunction({
        name: 'saveClientInfo',
        data: {
          openId: openId,
          phone: phone,
          oper1_id: oper1_id,
          oper2_id: oper2_id,
          oper3_id: oper3_id,
          client_level: 2
        },
        success: res => {
          app.logger.info(`[phoneBinder] Save client info for user ${openId} phone:${phone}`)
          wx.hideLoading()
          this.triggerEvent("closeDialogEvent")
        },
        fail: error => {
          wx.hideLoading()
          app.logger.error(`[phoneBinder] Error save client info for user ${openId} ${error} `)
        }
      })
    },
  }
})