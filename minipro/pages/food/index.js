//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        swiperCurrent: 0,
        categories: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: true,
        searchInput: '',
        p:1,
        processing:false,
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
      customItem: '全部'
    },
  onGotUserInfo: function (e) {
    //  console.log("--------123321",e.detail.userInfo.nickName)
     app.globalData.userInfo = e.detail.userInfo.nickName
    // console.log("123321------", e.detail.userInfo.nickName)
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value,typeof e.detail.value)
    this.catClick(e.detail.value);
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that=this
    e.detail.value.sprovince=e.detail.value.area[0]
    e.detail.value.scity = e.detail.value.area[1]
    e.detail.value.satrict = e.detail.value.area[2]
    
    this.setData({
      area: e.detail.value.scity,
      goods:[]
    });
    console.log("444", e.detail.value)
    wx.request({
      url: app.buildUrl("/food/search2"),
      header: app.getRequestHeader(),
      method: 'POST',
      data: e.detail.value,
      success: function (res) {
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({ "content": resp.msg });
          return;
        }

        var goods = resp.data.list;
        that.setData({
          area: e.detail.value.scity,
          goods: that.data.goods.concat(goods),
          p: that.data.p,
          processing: false
        });

        if (resp.data.has_more == 0) {
          that.setData({
            loadingMoreHidden: false
          });
        }

      }
    })
  },
    onLoad: function () {
        var that = this;
        wx.setNavigationBarTitle({
            title: app.globalData.shopName
        });
    },
    //解决切换不刷新维内托，每次展示都会调用这个方法
    onShow:function(){
        this.getBannerAndCat();
    },
    scroll: function (e) {
        var that = this, scrollTop = that.data.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        });
    },
    //事件处理函数
    swiperchange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    listenerSearchInput:function( e ){
        this.setData({
            searchInput: e.detail.value
        });
    },
    toSearch:function( e ){
        this.setData({
            p:1,
            goods:[],
            loadingMoreHidden:true
        });
        this.getFoodList();
	},
    tapBanner: function (e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/food/info?id=" + e.currentTarget.dataset.id
            });
        }
    },
    toDetailsTap: function (e) {
        wx.navigateTo({
            url: "/pages/food/info?id=" + e.currentTarget.dataset.id
        });
    },
    getBannerAndCat: function () {
        var that = this;
        wx.request({
            url: app.buildUrl("/food/index"),
            header: app.getRequestHeader(),
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }
              console.log("banner", resp.data.banner_list)
                that.setData({
                    // banners: resp.data.banner_list,
                  banners: [{ id: 1, pic_url: "https://yinglingno1.cn/static/upload/20190425/111.jpg" }, { id: 2, pic_url: "https://yinglingno1.cn/static/upload/20190425/222.jpg" }, { id: 3, pic_url: "https://yinglingno1.cn/static/upload/20190425/333.jpg" }],
                    categories: resp.data.cat_list
                });
                that.getFoodList();
            }
        });
    },
    catClick: function (e) {
      console.log("123123123",typeof e);
        this.setData({
            area:e,
            loadingMoreHidden: true,
            p:1,
            goods:[]
        });
        this.getFoodList();
    },
    onReachBottom: function () {
      console.log("bottom")
        var that = this;
        setTimeout(function () {
            that.getFoodList();
        }, 300);
    },
    getFoodList: function () {
        var that = this;
      console.log("area123", that.data.area)
        if( that.data.processing ){
          console.log("processingtruele")
            return;
        }
        if( !that.data.loadingMoreHidden ){
          console.log("loadingMoreHiddenfalele")
            return;
        }
        that.setData({
            processing:false
        });
      console.log("area456", that.data.area)
      console.log("第几页", that.data.p)
        wx.request({
            url: app.buildUrl("/food/search2"),
            header: app.getRequestHeader(),
            data: {
                area:that.data.area,
                cat_id: that.data.activeCategoryId,
                mix_kw: that.data.searchInput,
                p: that.data.p,
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }

                var goods = resp.data.list;
                that.setData({
                    goods: that.data.goods.concat( goods ),
                    p: that.data.p + 1,
                    processing:false
                });

                if( resp.data.has_more == 0 ){
                  console.log("fanhuishi0le")
                    that.setData({
                        loadingMoreHidden: false
                    });
                }

            }
        });
      console.log("area789", that.data.area)
    }
});