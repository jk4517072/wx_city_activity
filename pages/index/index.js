// index.js
// 获取应用实例
const app = getApp()
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
    list: ["aaaa","bbb","cccc"],
    menus: [
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
      },
      {
        'menuId': 1,
        'menu': '菜单'
      }
    ],
    avatar: "https://myimage-1302132175.cos.ap-shanghai.myqcloud.com/activity/1625821083785.png?imageMogr2/thumbnail/!10p"
  },
  
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPageScroll() {
  },
  change: function (e) {
    console.log(e);
    this.setData({
      active: e.detail.index
    })
  },
  onShow: function () {
    // 页面显示
    var span = wx.getSystemInfoSync().windowWidth / this.data.menus.length + 'px';
    this.setData({
      itemWidth: this.data.menus.length <= 5 ? span : '160rpx'
    });
  },

  tabChange: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
  }
  // getUserProfile(e) {
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})