// miniprogram/pages/productDetail/productDetail.js
const app = getApp()
const canvas = wx.createCanvasContext('canvas')
let canvasWidth = wx.getSystemInfoSync().windowWidth
let canvasHeight = wx.getSystemInfoSync().windowHeight
Page({

  /**
   * Page initial data
   */
  data: {
    productInfo: {},
    image: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getProductInfo',
      data: {
        productId: options.productId
      },
      success: res => {
        this.setData({
          productInfo: res.result.data || {}
        })
        wx.hideLoading();
        console.log(res.result.data)
      },
      fail: error => {
        wx.showToast({
          icon: 'none',
          title: '加载失败',
        });
        wx.hideLoading();
        console.error
      }
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
    return {
      title: '来看看我分享给你照片',
      path: `/pages/productDetail/productDetail?productId=${this.data.productInfo._id}`,
      imageUrl: this.data.productInfo.image_id
    }
  },
  generatePost: function(e) {
    const _this = this
    wx.showLoading({
      title: '海报生成中',
    })
    console.log(e.detail.userInfo)
    const userInfo = e.detail.userInfo
    // this.getImageInfo(this.data.productInfo.image_id)
    let getProductImagePromise = this.getImageInfoPromise(this.data.productInfo.image_id)
    let getBackgroundImagePromise = this.getImageInfoPromise('cloud://dev-pehzq.6465-dev-pehzq-1300404245/src/back-ground.jpg')
    let getAvatarUrlPromise = this.getImageInfoPromise(userInfo.avatarUrl)
    let getQRCodePromise = this.getImageInfoPromise('cloud://dev-pehzq.6465-dev-pehzq-1300404245/src/QRCode.jpg')
    // let getAvatarPromise = this.getImageInfoPromise(userInfo.avatarUrl)
    Promise.all([getProductImagePromise, getBackgroundImagePromise, getAvatarUrlPromise, getQRCodePromise]).then(res => {
      console.log('res ===> ', res)
      canvasWidth = res[0].imageWidth
      const avatarHeight = res[0].imageHeight / 8.5
      const avatarWidth = avatarHeight
      const spaceBetween = avatarWidth / 2
      const qrCodeHeight = res[3].imageHeight
      const qrCodeWidth = qrCodeHeight
      canvasHeight = res[0].imageHeight + avatarHeight + qrCodeHeight

      _this.drawImage(res[1].imagePath, 0, 0, canvasWidth, canvasHeight) //background image
      console.log('userInfo ',userInfo)
      _this.drawImage(res[2].imagePath, 0 , 0, avatarWidth, avatarHeight) //avatar image
      const fontSize = avatarHeight / 3
      canvas.setFontSize(fontSize)
      // canvas.font = 'normal 24px #ffffff'
      canvas.setFillStyle('#ffffff')
      canvas.fillText(userInfo.nickName, avatarWidth + spaceBetween, avatarHeight - fontSize)
      _this.drawImage(res[0].imagePath, 0, avatarHeight, canvasWidth, res[0].imageHeight) // product
      canvas.setFontSize(fontSize / 1.1)
      canvas.setFillStyle('#ffffff')
      canvas.fillText(this.data.productInfo.desc, 0, avatarHeight + res[0].imageHeight + qrCodeHeight/3)
      _this.drawImage(res[3].imagePath, canvasWidth - qrCodeWidth, avatarHeight + res[0].imageHeight, qrCodeWidth, qrCodeHeight) /*QRCode*/
      canvas.draw();

      setTimeout(function() {
        _this.output()
      }, 60)
      wx.hideLoading()
    }).catch(error => {
      wx.hideLoading()
    })
  },

  getImageInfoPromise: function(imageUrl) {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: imageUrl,
        success: res => {
          console.log(`get image info ${JSON.stringify(res)} success`)
          resolve({
            imagePath: res.path,
            imageWidth: res.width,
            imageHeight: res.height
          })
        },
        fail: error => {
          reject({
            errMsg: `get image info ${imageUrl} failed`
          })
        }
      })
    })
  },


  // getImageInfo: function(imageUrl){
  //   const _this = this;
  //   wx.getImageInfo({
  //     src: imageUrl,
  //     success: res => {
  //       _this.draw(res.path)
  //     },
  //     fail: error => {
  //       wx.hideLoading()
  //       console.log('generate post failed')
  //     }
  //   })
  // },

  drawImage: function(path, x, y, width, height) {
    const _this = this
    canvas.drawImage(path, 0, 0, width, height, x, y, width, height)
  },

  output: function() {
    let _this = this
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      success: res => {
        wx.hideLoading()

        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })

        wx.showToast({
          title: '生成海报成功',
          icon: 'success',
          duration: 1000
        })
        // wx.hideToast()
      }
    }, this)
  },

  imageLoad: function (e) {
    const _width = e.detail.width
    const _height = e.detail.height
    const ratio = _width / _height
    const viewWidth = app.globalData.systemInfo.windowWidth * 1.6
    const viewHeight = viewWidth / ratio;
    this.setData({
      image: {
        width: viewWidth,
        height: viewHeight
      }
    })
  }
})