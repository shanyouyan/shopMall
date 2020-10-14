import regeneratorRuntime from '../../lib/runtime/runtime';
//0 引入用来发送请求的方法，一定要把路径补全
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /* 左侧列表数据 */
    leftMenuList: [],
    /* 右侧商品数据 */
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    //右侧商品区域滚动条距离顶部的距离
    scrollTop: 0
  },

  /* 接口的返回数据 */
  cateList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    1.先判断一下本地缓存中有没有旧的数据
    2.没有旧数据 直接发送新请求
    3.有旧数据 同时 旧的数据也没有过期的话就使用本地缓存中的旧数据即可
     */

    /* 1.获取本地存储中的数据(小程序中也是有本地存储技术的) */
    const Cates = wx.getStorageSync("cates");
    /* 2.判断*/
    if (!Cates) {
      //不存在就发送新的请求
      this.getAllCate();
    } else {
      //有旧数据 定义过期时间 
      if (Date.now() - Cates.time > 1000 * 10 * 60 * 60) {
        //重新发送请求
        this.getAllCate();
      } else {
        //可以使用旧的数据
        this.cateList = Cates.data;
        let leftMenuList = this.cateList.map(v => v.cat_name);
        let rightContent = this.cateList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数组
  getAllCate() {
    request({ url: "/categories" })
      .then(result => {
        this.cateList = result.data.message
        //把接口的数据存入到本地存储中
        wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });
        //构造左侧的大菜单数据
        let leftMenuList = this.cateList.map(v => v.cat_name);
        //构造右侧的商品数据
        let rightContent = this.cateList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },
  //左侧菜单栏的点击事件
  handleItemTap(e) {
    /* 
    1.获取被点击的标题身上的索引
    2.给data中的currentIndex赋值
    3.根据不同的索引来渲染不同的右侧商品内容
    */
    const { index } = e.currentTarget.dataset;

    let rightContent = this.cateList[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置右侧滚动条距离顶部的距离
      scrollTop: 0
    })
  }
})