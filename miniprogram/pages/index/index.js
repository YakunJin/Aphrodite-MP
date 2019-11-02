//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    products: [],
    viewWidth: app.globalData.systemInfo.windowWidth * 0.85
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

  onPullDownRefresh: function(){
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
        this.loadProducts(app.globalData.openid)
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

  loadProducts: function(openId) {
    wx.cloud.callFunction({
      name: 'getProductsInfo',
      data: {
        openId: openId
      },
      success: res => {
        this.setData({
          products: res.result.data || []
        })
        wx.hideLoading();
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        console.log(res.result.data)
      },
      fail: error => {
        wx.showToast({
          icon: 'none',
          title: '加载图片失败',
        });
        wx.hideLoading();
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        console.error
      }
    })
  },
  onTapProduct: function(e){
    console.log('onTapProduct ',e)
    wx.navigateTo({
      url: `../productDetail/productDetail?productId=${e.detail.productId}`
    })
  },
})