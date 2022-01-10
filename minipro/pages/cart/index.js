let app = getApp();
Page({
  data: {
    weixin:"",
    imgs: [],
    isSubmit: false,
    warn: "",
    pwd: "",
    isPub: false,
    sex: "男",
    imgs: [],
    placeholder: '请选择',
    array: ['发电机', '充电器', '引擎动力', '其他'],
    objectArray: [
      {
        id: 0,
        name: '发电机'
      },
      {
        id: 1,
        name: '充电器'
      },
      {
        id: 2,
        name: '引擎动力'
      },
      {
        id: 3,
        name: '其他'
      }
    ],
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    region2: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  bindRegionChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindRegionChange2(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region2: e.detail.value
    })
  },
  formSubmit: function (e) {
    this.setData({
      weixin:e.detail.value.weixin,
    })
   
    if (1 != 2) {
      var that = this;
      var imgs = this.data.imgs;
      wx.chooseImage({
        // count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
          console.log("111", res)
          var tempFilePaths = res.tempFilePaths;
          var imgs = that.data.imgs;
          for (var i = 0; i < tempFilePaths.length; i++) {
            if (imgs.length >= 9) {
              that.setData({
                imgs: imgs
              });
              return false;
            } else {
              imgs.push(tempFilePaths[i]);
            }
          };
  e.detail.value.commiter = getApp().globalData.userInfo,
    console.log("global-------", e.detail.value.commiter)
   e.detail.value.sprovince = e.detail.value.suozaidi[0],
   e.detail.value.scity = e.detail.value.suozaidi[1],
   e.detail.value.satrict = e.detail.value.suozaidi[2],
    // e.detail.value.cprovince = e.detail.value.chushengdi[0],
    // e.detail.value.ccity = e.detail.value.chushengdi[1],
    // e.detail.value.catrict = e.detail.value.chushengdi[2],
  //  console.log('222form发生了submit事件，携带数据为：', e.detail.value);
          wx.uploadFile({
            url: "https://yinglingno1.cn/api/my/comment/list2",
            filePath: tempFilePaths[0],
            name: 'test',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: e.detail.value,
            success: function (res) {
              var data = res.data
              console.log("success", res)
              if(res.statusCode==413){
                that.setData({
                  imgs: []
                });
                wx.showModal({
                  title: '提示',
                  content: '照片大小请控制在1M以内',
                  success(res) {
                    if (res.confirm) {
                      // console.log('用户点击确定')
                    } else if (res.cancel) {
                      // console.log('用户点击取消')
                    }
                  },
                  
                })
              }
            }
          })
          // console.log(imgs);
          that.setData({
            imgs: imgs
          });
        }
      });
    }
    this.setData({
      warn: "",
      isSubmit: true,
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
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  showWindows: function () {
    if(this.data.weixin==""){
      wx.showModal({
        title: '提示',
        content: '请输入微信号且上传照片后重新提交',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }else{
    wx.showModal({
      title: '提示',
      content: '恭喜提交成功!',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })}
  },
})
