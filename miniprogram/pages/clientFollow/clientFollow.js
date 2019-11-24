// miniprogram/pages/clientFollow/clientFollow.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    followedClientList: [],
    searchedClients: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.loadClientFollowPromise(app.globalData.openid).then(() => {
      wx.hideLoading()
      app.logger.info(`[clientFollow] get followed clients success for ${app.globalData.openid}, FollowedCount: ${this.data.followedClientList.length}`)
    }).catch(err => {
      wx.hideLoading()
      app.logger.error(`[clientFollow] get followed clients failed for ${app.globalData.openid}, Error: ${JSON.stringify(err)}`)
    })
    this.setData({
      search: this.search.bind(this)
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  search: function(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const searchedClients = this.data.followedClientList.filter(followedClient => {
          followedClient.name.includes(value)
        }).map(followedClient => {
          return {
            text: followedClient.name,
            value: followedClient.openId
          }
        })
        resolve([{
          text: `搜索:${value}`,
          value: "search-unfollowed-client"
        }, ...searchedClients])
      }, 200)
    })
  },
  selectResult: function(e) {
    if (e.detail.item.value === 'search-unfollowed-client') {
      wx.showLoading({
        title: '搜索中',
      })
      const searchedClientName = e.detail.item.text.split(':')[1]
      this.searchUnFollowedClientsPromise(searchedClientName).then(() => {
        wx.hideLoading()
        app.logger.info(`[clientFollow] Search client ${searchedClientName} success, matched client count: ${this.data.searchedClients.length}`)
      }).catch(err => {
        wx.hideLoading()
        app.logger.error(`[clientFollow] Search client ${searchedClientName} failed, Error: ${JSON.stringify(err)}`)
      })
    }
    console.log('select result', e.detail)
  },

  loadClientFollowPromise: function(openId) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getFollowedClients',
        data: {
          openId: openId
        },
        success: res => {
          this.setData({
            followedClientList: res.result.data || []
          })
          resolve(res.result.data)
        },
        fail: error => {
          reject(error)
        }
      })
    })
  },

  searchUnFollowedClientsPromise: function(name) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getClientInfoByName',
        data: {
          name: name
        },
        success: res => {
          this.setData({
            searchedClients: res.result.data || []
          })
          resolve(res.result.data)
        },
        fail: error => {
          reject(error)
        }
      })
    })
  },
})