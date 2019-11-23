//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    clientInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    products: [],
    viewWidth: app.globalData.systemInfo.windowWidth * 0.85,
    showScedule: false
  },

  onLoad: function() {
    wx.showLoading({
      title: '加载中',
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.logger.info(`[index] 用户已授权，获取用户信息 ${JSON.stringify(res.userInfo)}`)
              app.globalData.userInfo = res.userInfo
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    this.onGetOpenid();
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadProducts(app.globalData.openid)
  },

  onGetUserInfo: function(e) {
    console.log(`on get user info ${e}`)
    if (!this.data.logged && e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      wx.redirectTo({
        url: '../uploadProduct/uploadProduct',
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        //this.loadProducts(app.globalData.openid)

        Promise.all([
        this.loadClientInfoPromise(res.result.openid), 
        this.loadProductsPromise(res.result.openid)])
        .then((resList) => {
          wx.hideLoading();
          this.setData({
            clientInfo: resList[0]
          })
          app.globalData.clientInfo = resList[0]
        }).catch(error => {
          app.logger.error(`[index] Get record failed: ${error}`)
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '加载数据失败',
          });
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '登陆失败',
        });
        wx.hideLoading();
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  loadClientInfoPromise: function(openId) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getClientInfo',
        data: {
          openId: openId
        },
        success: res => {
          app.logger.info(`[index] Get ClientInfo success ${JSON.stringify(res.result.data)}`)
          resolve(res.result.data[0])
        },
        fail: error => {
          app.logger.info(`[index] Get ClientInfo failed ${JSON.stringify(error)}`)
          reject(error)
        }
      })
    })
  },

  loadProductsPromise: function(openId) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getProductsInfo',
        data: {
          openId: openId
        },
        success: res => {
          this.setData({
            products: res.result.data || []
          })
          // wx.hideLoading();
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
          resolve(res.result.data)
        },
        fail: error => {
          // wx.hideLoading();
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
          reject(error)
        }
      })
    })
  },
  onTapProduct: function(e) {
    console.log('onTapProduct ', e)
    wx.navigateTo({
      url: `../productDetail/productDetail?productId=${e.detail.productId}`
    })
  },
  onClickScedule: function(e) {
    app.logger.info(`on click scedule ${e}`)
    if (!this.data.logged && e.detail.userInfo && !this.data.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
    this.setData({
      showScedule: !this.data.showScedule
    })
  },
  onCloseDialog: function(e) {
    this.setData({
      showScedule: !this.data.showScedule
    })
  }
})