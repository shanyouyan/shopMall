Page({

  data: {
    address: {}
  },
  //点击获取收货地址的点击事件
  //1. 获取用户对小程序 所授予 获取地址的权限状态 scope
  /*假设用户点击获取收货地址的提示框，确定，authSetting scope.address  scope值为true 直接调用获取收货地址
  假设用户从来没有调用过收货地址的api scope值为undefined  直接调用获取收货地址
  假设用户点击获取收货地址的提示框，取消， scope值为false
  诱导用户 自己 打开授权设置页面，当用户重新给与获取收货地址的权限的时候
  获取收货地址
  */
  handleChooseAdress(e){
    //1. 获取 权限状态
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress===false){
          //2. 诱导用户重新授权
          wx.openSetting({
            success: (result1) => {
              //4.可以调用获取收货地址api
              wx.chooseAddress({
                success:(result2) => {
                  wx.setStorageSync("address", result2); 
                }
              });
            }
          });
        }else{
          //2. 直接调用获取收货地址
           wx.chooseAddress({
            success:(result3) => {
              wx.setStorageSync("address", result3);
            }
          });
        }
      },
    });
      
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow(){
    //1. 获取本地缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })
  }
})