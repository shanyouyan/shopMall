import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    goodsList: []
  },
  //请求接口所需要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  //标题的点击事件 从子组件中传递过来
  handleTabsItemChange(e) {
    console.log(e);
    //1. 获取被点击的标题索引
    const { index } = e.detail;
    //2. 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //3.赋值到data中
    this.setData({
      tabs
    });
  },
  //获取商品列表数据
  getGoodsList() {
    request({ url: "/goods/search", data: this.QueryParams })
      .then(result => {
        // 获取总条数
        const total = result.data.message.total;
        //计算总页数
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
        this.setData({
          // goodsList: res.data.message.goods
          //拼接了数组,将旧的数据解构出来,再将请求回来的数据添加进去
          goodsList: [...this.data.goodsList, ...result.data.message.goods]
        })

        //关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口也不会报错
        wx.stopPullDownRefresh();
      })
  },
  //页面上滑 滚动触底事件
  onReachBottom() {
    //判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      //没有下一页数据
      wx.showToast({
        title: '没有下一页数据',
        icon: "error",
        duration: 1500,
      });

    } else {
      //还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新列表
  onPullDownRefresh() {
    //重置数组
    this.setData({
      goodsList: []
    });
    //重置页码
    this.QueryParams.pagenum = 1;
    //重新发送请求
    this.getGoodsList();
  }
})