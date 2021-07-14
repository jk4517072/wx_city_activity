// index.js
// 获取应用实例
import utils from '../../utils/utils'
import {
  commonMessage
} from '../../locale/commonMessageZhCn'
const {
  safeGet,
  getLocationUrl,
  onFail,
} = utils;
const appInstance = getApp()
Page({
  data: {
    background: ['', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    active: 0,
    scroll: {
      //  设置分页信息
      pagination: {
        page: 1,
        totalPage: 10,
        limit: 10,
        length: 100
      },
      // 设置数据为空时的图片
      empty: {
        img: 'http://coolui.coolwl.cn/assets/mescroll-empty.png'
      },
      // 设置下拉刷新
      refresh: {
        type: 'default',
        style: 'black',
        background: "#000"
      },
      // 设置上拉加载
      loadmore: {
        type: 'default',
        icon: 'http://upload-images.jianshu.io/upload_images/5726812-95bd7570a25bd4ee.gif',
        background: '#f2f2f2',
        // backgroundImage: 'http://coolui.coolwl.cn/assets/bg.jpg',
        title: {
          show: true,
          text: '加载中',
          color: "#999",
          shadow: 5
        }
      }
    },
    list: ["aaaa", "bbb", "cccc"],
    menus: [{
        'menuId': 1,
        'menu': '菜单'
      },
      {
        'menuId': 1,
        'menu': '菜单'
      },
      {
        'menuId': 1,
        'menu': '菜单'
      },
      {
        'menuId': 1,
        'menu': '菜单'
      },
      {
        'menuId': 1,
        'menu': '菜单'
      },
      {
        'menuId': 1,
        'menu': '菜单'
      }
    ],
    avatar: "https://myimage-1302132175.cos.ap-shanghai.myqcloud.com/activity/1625821083785.png?imageMogr2/thumbnail/!10p",
    addressinfo: {
      location: '',
      longitude: '',
      latitude: ''
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPageScroll() {},
  change: function (e) {
    console.log(e);
    this.setData({
      active: e.detail.index
    })
  },

  onShow: function () {
    const {
      globalData: {
        defaultCity,
        latitude,
        longitude
      }
    } = appInstance
    // 页面显示
    var span = wx.getSystemInfoSync().windowWidth / this.data.menus.length + 'px';
    this.setData({
      itemWidth: this.data.menus.length <= 5 ? span : '160rpx'
    });
    //启动自动开启定位
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log("权限获取成功");
            },
            fail() {
              this.setData({
                location: "杭州市"
              })
            }
          })
        }
      }
    })
    if (defaultCity === "加载中..") {
      var that = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const {
            latitude,
            longitude
          } = res
          wx.request({
            url: getLocationUrl(latitude, longitude),
            success(res) {
              const {
                city,
                adcode,
                location
              } = safeGet(['data', 'result', 'ad_info'], res);
              that.setData({
                addressinfo: {
                  location: city,
                  longitude: location.lng,
                  latitude: location.lat
                }
              })
              wx.request({
                url: 'http://localhost:8082/app/list',
                data: {
                  city: defaultCity,
                  longitude: location.lng,
                  latitude: location.lat,
                  acttype: '',
                  isShow: '1',
                  currentPage: '0'
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res)
                  // that.setData({
                  //   // list: res.data.page.list,
                  //   // 'scroll.pagination': {
                  //   //     page: res.data.page.currPage,
                  //   //     totalPage: res.data.page.totalPage,
                  //   //     limit: res.data.page.pageSize,
                  //   //     length: res.data.page.totalCount
                  //   // }
                  // }),
                  // that.selectComponent(".demo1").loadEnd()
                }
              })
            }
          })
        },
      })
    } else {
      this.setData({
        addressinfo: {
          location: defaultCity,
          longitude: latitude,
          latitude: longitude
        }
      })
      wx.request({
        url: 'http://localhost:8082/app/list',
        data: {
          city: defaultCity,
          longitude: '',
          latitude: '',
          acttype: '',
          isShow: '1',
          currentPage: '0'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)

        }
      })
    }

  },


  confirmSearch: function (e) {
    console.log(e);


  },

  tabChange: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
  },

  getData: function (type) {
    let that = this;
    // 可走后台接口
    if (type == 'refresh') {
      // 刷新时执行
      // 设置页数1
      let scroll = that.data.scroll
      scroll.pagination.page = 1
    } else {
      // 加载时执行
      // 设置页数+1
      let scroll = that.data.scroll
      scroll.pagination.page = scroll.pagination.page + 1
      // 数据加载完隐藏loadmore
      that.selectComponent(".demo1").loadEnd()
    }
  },
  // 下拉 刷新 页数设置1
  refresh: function (e) {
    this.getData('refresh')
  },
  // 上拉 加载 页数设置+1
  loadMore: function () {
    console.log(111);
    // this.getData('loadMore')
    that.selectComponent(".demo1").loadEnd()
  },
  
})