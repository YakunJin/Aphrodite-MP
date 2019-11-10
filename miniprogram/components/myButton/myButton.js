// components/myButton/myButton.js
Component({
  /**
   * Component properties
   */
  properties: {
    iconUrl: {
      type: String
    },
    disabledIconUrl: {
      type: String
    },
    needGetUserInfo: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
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
    onClick(e) {
      this.triggerEvent('onClick', e.detail)
    }
  }
})
