// components/myDate/myDate.js
const dateHelper = require('../../utils/dateHelper.js');
Component({
  lifetimes: {
    attached: function () {
      // 页面被展示
      this.initCalendar()
    },
    detached: function () {
      // 页面被隐藏
      // this.hideModal()
    }
  },
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    dateList: []
  },

  /**
   * Component methods
   */
  methods: {
    initCalendar: function () {
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
      console.log('dateList', this.data.dateList)
      // var selected = dateList[0].year + "-" + dateList[0].newdates + "\t" + ((todayhour >= 10) ? todayhour : ("0" + todayhour)) + ":" + newtodayMinutes;
      // var myEventDetail = {
      //   selected: selected,
      // }
      // this.triggerEvent('bindSelect', myEventDetail);
    },

     /**
     * 获取d当前时间多少天后的日期和对应星期
     * //todate默认参数是当前日期，可以传入对应时间
     */
    getDates: function (days, todate = this.getCurrentMonthFirst()) {
      var dateArry = [];
      for (var i = 0; i < days; i++) {
        var dateObj = dateHelper.dateLater(todate, i);
        dateArry.push(dateObj)
      }
      return dateArry;
    },

    //获取当前时间
    getCurrentMonthFirst: function () {
      var date = new Date();
      var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
      return todate;
    }
  }
})
