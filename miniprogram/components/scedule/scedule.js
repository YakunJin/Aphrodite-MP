// components/scedule/scedule.js
const app = getApp()
// const weekDays = ['日', '一', '二', '三', '四', '五', '六']
// const dateHelper = require('../../utils/dateHelper.js');
Component({
  /**
   * Component properties
   */
  properties: {},

  /**
   * Component initial data
   */
  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
    reserveDate: '',
    reserveTime: '',
  },

  lifetimes: {
    attached: function() {
      // 页面被展示
      this.showModal()
    },
    detached: function() {
      // 页面被隐藏
      // this.hideModal()
    }
  },

  /**
   * Component methods
   */
  methods: {
    // 显示遮罩层
    showModal: function() {
      var that = this;
      that.setData({
        hideModal: false
      })
      var animation = wx.createAnimation({
        duration: 200, //动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })
      this.animation = animation
      setTimeout(function() {
        that.fadeIn(); //调用显示动画
      }, 200)
    },

    // 隐藏遮罩层
    hideModal: function() {
      var that = this;
      var animation = wx.createAnimation({
        duration: 200, //动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })
      this.animation = animation
      that.fadeDown(); //调用隐藏动画   
      setTimeout(function() {
        that.setData({
          hideModal: true
        })
        that.triggerEvent('tapBackGroundEvent')
      }, 200) //先执行下滑动画，再隐藏模块

    },

    //动画集
    fadeIn: function() {
      this.animation.translateY(0).step()
      this.setData({
        animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
      })
    },
    fadeDown: function() {
      this.animation.translateY(300).step()
      this.setData({
        animationData: this.animation.export(),
      })
    },

    initCalendar: function() {
      let dateList = this.getDates(7);
      const date = new Date()
      const hours = []
      const minutes = ['00', '30']
      var todayMinutes = parseInt(date.getMinutes());
      var todayhour = (todayMinutes >= 30 ? (date.getHours() + 1) : date.getHours());//当前时
      var newtodayMinutes = todayMinutes < 30 ? '30' : '00';//当前分
      for (let i = 1; i <= 23; i++) {
        hours.push(i)
      }
      this.setData({
        dateList: dateList,
        hours: hours,
        minutes: minutes,
        todayhour: todayhour,
        todayminutes: newtodayMinutes
      })
      console.log('dateList', dateList)
      var selected = dateList[0].year + "-" + dateList[0].newdates + "\t" + ((todayhour >= 10) ? todayhour : ("0" + todayhour)) + ":" + newtodayMinutes;
      var myEventDetail = {
        selected: selected,
      }
      this.triggerEvent('bindSelect', myEventDetail);
    },

    onSelectDateChange: function(e) {
      console.log('onSelectDateChange', e)
      this.setData({
        reserveDate: e.detail
      })
    },

    onSelectHourChange: function(e) {
      console.log('onSelectHourChange', e)
      this.setData({
        reserveTime: e.detail
      })
    }

    // getCurrentMonthDays(year, month) {
    //   return new Date(year, month, 0).getDate()
    // },

    // /**
    //  * 获取d当前时间多少天后的日期和对应星期
    //  * //todate默认参数是当前日期，可以传入对应时间
    //  */
    // getDates: function (days, todate = this.getCurrentMonthFirst()) {
    //   var dateArry = [];
    //   for (var i = 0; i < days; i++) {
    //     var dateObj = dateHelper.dateLater(todate, i);
    //     dateArry.push(dateObj)
    //   }
    //   return dateArry;
    // },

    // //获取当前时间
    // getCurrentMonthFirst: function () {
    //   var date = new Date();
    //   var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    //   return todate;
    // }
  }
})