// components/phoneBinder.js
Component({
  /**
   * Component properties
   */
  properties: {

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
    onCloseDialog: function() {
      this.triggerEvent('closeDialogEvent')
    },
    onConfirm: function() {
      this.triggerEvent('closeDialogEvent')
    }
  }
})
