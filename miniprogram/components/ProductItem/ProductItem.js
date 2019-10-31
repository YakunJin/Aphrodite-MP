// components/BidderProductItem/BidderProductItem.js
const app = getApp()
Component({
  /**
   * Component properties
   */
  properties: {
    productId: {
      type: String
    },
    imageUrl: {
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: Number
    },
  },

  /**
   * Component initial data
   */
  data: {
    loadedImage: {},
  },

  /**
   * Component methods
   */
  methods: {
    previewImg: function() {
      this.triggerEvent('tapProductEvent', {
        productId: this.data.productId
      })
    },

    imageLoad: function(e) {
      console.log(e.detail)
      const _width = e.detail.width
      const _height = e.detail.height
      const ratio = _width / _height
      const viewWidth = app.globalData.systemInfo.windowWidth * 1.7
      const viewHeight = viewWidth / ratio;
      this.setData({
        image: {
          width: viewWidth,
          height: viewHeight
        }
      })
    }
  }
})