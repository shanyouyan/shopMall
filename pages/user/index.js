// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];

    this.setData({ userinfo, collectNums: collect.length });

  },
  //退出登录
  logOut(e) {
    wx.showModal({
      title: '提示',
      content: '您确认要退出登录吗',
      success: function (res) {
        if (res.confirm) {
          //用户点击确定之后
          wx.clearStorage();
        } else {
          //用户点击取消之后
          console.log('用户点击取消')
        }
      }
    })
  }
})