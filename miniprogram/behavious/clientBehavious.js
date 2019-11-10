const app = getApp()
module.export = Behavior({
  data: {
    clientInfo: {}
  },
  methods: {
    saveClientInfo: function ({openId, phone, oper1_id, oper2_id, oper3_id}) {
      return new Promise((resolve, reject) => {
        let newClientInfo = {
          openId: openId,
          phone: phone,
          oper1_id: oper1_id,
          oper2_id: oper2_id,
          oper3_id: oper3_id,
          client_level: 2
        }
        wx.cloud.callFunction({
          name: 'saveClientInfo',
          data: newClientInfo,
          success: res => {
            app.logger.info(`[clientBehavious] Save client info for user ${openId} phone:${phone}`)
            resolve(res)
          },
          fail: error => {
            app.logger.error(`[clientBehavious] Error save client info for user ${openId} ${error} `)
            reject(res)
          }
        })
      })
    },
  }
})