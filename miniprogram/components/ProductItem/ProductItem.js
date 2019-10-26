// components/BidderProductItem/BidderProductItem.js
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

  },

  /**
   * Component methods
   */
  methods: {
    previewImg: function() {
      this.triggerEvent('tapProductEvent', {productId: this.data.productId})
    }
  }
})
