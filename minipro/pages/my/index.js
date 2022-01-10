let app = getApp();
Page({
  data: {
    region: ['广东省', '广州市', '海珠区'],
    imgs: [],
    isSubmit: false,
    warn: "",
    pwd: "",
    isPub: false,
    sex: "男"
  },
  formSubmit: function (e) {
    e.detail.value.commiter = app.globalData.userInfo,
    console.log('11form发生了submit事件，携带数据为：', e.detail.value);

    wx.request({
      url: app.buildUrl("/food/delete1"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: e.detail.value,
      success: function (res) {
        var resp = res.data;
        if (resp.code != 200) {
          wx.showModal({
            title: '提示',
            content: '请输入您之前提交过的正确信息',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '恭喜删除成功，重进小程序即可看不到',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
    
  },
  formReset: function (e) {
    console.log('form发生了reset事件');
    if (1 != 2) {
      var imgs = this.data.imgs;
      var index = e.currentTarget.dataset.index;
      imgs.splice(0, 1);
      this.setData({
        imgs: []
      });
    }
  },
  
  // 预览图片
  
  showWindows: function () {
    wx.showModal({
      title: '提示',
      content: '恭喜提交成功!',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})