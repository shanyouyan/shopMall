// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'XI3BZ-64LEI-IFWG6-5W2TG-7FBNT-L7BRT' // 必填 
});
Page({
  data: {
  },

  getUserLocation(){
    // 地理位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // 调用接口转换成具体位置
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log(res.result);
          },
          fail: function (res) {
            console.log(res);
          },
        })
      }
    })
  }
});
