Page({
  data: {
    canIUseGetUserProfile: false
  },
  onload(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  handleGetUserInfo(e) {
    console.log(e);
    const { userInfo } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res)
        wx.setStorageSync("userinfo", userInfo);
        wx.navigateBack({
          delta: 1
        });
      }
    })
  }
})