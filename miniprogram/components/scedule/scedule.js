// components/scedule/scedule.js
const app = getApp()
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
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
  },

  lifetimes: {
    attached: function () {
      // 页面被展示
      this.showModal()
    },
    detached: function () {
      // 页面被隐藏
      // this.hideModal()
    }
  },

  /**
   * Component methods
   */
  methods: {
    // 显示遮罩层
    showModal: function () {
      var that = this;
      that.setData({
        hideModal: false
      })
      var animation = wx.createAnimation({
        duration: 200,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease',//动画的效果 默认值是linear
      })
      this.animation = animation
      setTimeout(function () {
        that.fadeIn();//调用显示动画
      }, 200)
    },

    // 隐藏遮罩层
    hideModal: function () {
      var that = this;
      var animation = wx.createAnimation({
        duration: 200,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease',//动画的效果 默认值是linear
      })
      this.animation = animation
      that.fadeDown();//调用隐藏动画   
      setTimeout(function () {
        that.setData({
          hideModal: true
        })
        that.triggerEvent('tapBackGroundEvent')
      }, 200)//先执行下滑动画，再隐藏模块

    },

    //动画集
    fadeIn: function () {
      this.animation.translateY(0).step()
      this.setData({
        animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
      })
    },
    fadeDown: function () {
      this.animation.translateY(300).step()
      this.setData({
        animationData: this.animation.export(),
      })
    },
  }
})
