//同时发送异步请求的次数
let ajaxTimes = 0;
export const request = (params) => {
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header = { ...params.header };
    if (params.url.includes("/my/")) {
        // 拼接header 带上token
        header["Authorization"] = wx.getStorageSync("token");
    }
    ajaxTimes++;
    //显示加载中的图标
    wx.showLoading({
        title: "加载中",
        mask: true,//背景遮罩
    });
    //定义公共的接口访问路径
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,//解构出来
            header: header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();//关闭正在加载的图标
                }
            }
        })
    })
}