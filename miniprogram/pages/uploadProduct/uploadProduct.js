// miniprogram/pages/uploadProduct/uploadProduct.js
Page({

  /**
   * Page initial data
   */
  data: {
    newPhotoUrl: '../../images/photo-placeholder.png',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onSelectPhoto: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const filePath = res.tempFilePaths[0]
        this.setData({
          newPhotoUrl: filePath,
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  // 上传图片
  doUpload: function () {
    wx.showLoading({
      title: '上传中',
    })
    const filePath = this.data.newPhotoUrl;
    let timeStamp = Date.parse(new Date());
    // 上传图片
    const cloudPath = 'new-product-' + timeStamp + '-' + app.globalData.openId
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)
        this.savePhotoInfo(app.globalData.openId, res.fileID, filePath)
        wx.hideLoading();
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        });
        wx.hideLoading();
      },
    })
  },

  savePhotoInfo: function (openId, photoId, photoPath) {
    console.log("openId ", openId);
    console.log("photoId ", photoId);
    console.log("photoPath ", photoPath);
    wx.cloud.callFunction({
      name: 'savePhotoInfo',
      data: {
        openId: openId,
        imageId: photoId,
        imagePath: photoPath
      },
      success: res => {
        console.log('Save photo info for user ', openId)
      },
      fail: console.error
    })
  },
})