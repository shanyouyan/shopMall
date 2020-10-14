import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  //商品对象
  goodsInfo: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品详情数据
  getGoodsDetail(goods_id){
    request({url: "/goods/detail",data: {goods_id}})
    .then(result => {
      console.log(result);
      this.setData({
        goodsObj:result.data.message
      });
      this.goodsInfo = result.data.message;
    })
  },
  //轮播图放大预览
  handlePrevewImage(e){
    console.log(e);
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      urls: urls
    });
  },
  //加入购物车
  handleCartAdd(){
    //获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart")||[];
    //判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id === this.goodsInfo.goods_id);
    if(index === -1){
      //不存在
      this.goodsInfo.num = 1;
      cart.push(this.goodsInfo);
    }else{
      //存在
      cart[index].num++;
    }
    //将购物车重新添加回缓存中
    wx.setStorageSync("cart",cart);
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  }
})