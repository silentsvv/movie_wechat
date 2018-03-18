//index.js
//获取应用实例
const app = getApp()
const Api = require('../../Api/Api');

Page({
  data: {
    ImgUrl: Api.getImgUrl(),
    categoryActive: 0,
    categoryList: [],
    couponsList: [],  //卡券列表
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    newsList: [],
    backgroundImg: '',
    isOpen: '',
    srcLink: ''
  },

  onLoad: function () {
    this.getCategoryList();
    this.getAdList();
    this.getNews();
  },

  //获取分类列表
  getCategoryList() {
    Api.getCategoryList().then((res) => {
      console.log(res)
      if(res.data.q.s == 0) {
        this.setData({
          categoryList: res.data.q.categorys
        })
        if(res.data.q.categorys[0]) {
          let id = res.data.q.categorys[0].id;
          this.getCouponList(id);
        }
      }
    })
  },

  //点击切换分类
  changeCategory(event) {
    let index = event.currentTarget.dataset.idx;
    let id = event.currentTarget.dataset.id;
    this.getCouponList(id);
    this.setData({
      categoryActive: index
    })
  },

  //获取卡券列表
  getCouponList(categoryId) {
    Api.getCouponList({a:1, categoryId}).then((res) => {
      console.log(res);
      if(res.data.q.s == 0) {
        let coupons = res.data.q.coupons;
        for(let i = 0, len = coupons.length; i < len; i++) {
          coupons[i].integral = parseFloat(coupons[i].integral);
          coupons[i].price = parseFloat(coupons[i].price);
          coupons[i].marketPrice = parseFloat(coupons[i].marketPrice);
        }
        this.setData({
          couponsList: coupons
        })
      }
    })
  },

  //获取轮播图
  getAdList() {
    Api.getAdList().then((res) => {
      console.log(res);
      if(res.data.q.s == 0) {
        this.setData({
          imgUrls: res.data.q.ads
        })
      }
    })
  },

  //获取广播
  getNews() {
    Api.getNews().then((res) => {
      console.log(res);
      if(res.data.q.s == 0) {
        let lists = res.data.q.news.lists;
        let backgroundImg = res.data.q.news.imagePath;
        let isOpen = res.data.q.news.isOpen;
        let newList = [];
        let len = Math.round(lists.length / 2);
        for(let i = 0; i < len; i++) {
          newList[i] = [];
          newList[i].push(lists[i * 2]);
          if(lists[i * 2 + 1]) {
            newList[i].push(lists[i * 2 + 1]);
          }else {
            newList[i].push({});
          }
        }
        this.setData({
          newsList: newList,
          backgroundImg,
          isOpen
        })
      }
    })
  },

  linkToWeb(event) {
    let url = event.currentTarget.dataset.url;
    console.log(url);
    this.setData({
      srcLink: url
    })
  },

  linkToCoupon(event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/detail/detail?id=' + id
    })
  },

  linkToSearch() {
    wx.navigateTo({
      url:'/pages/search/search'
    })
  }
})
