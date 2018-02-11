// pages/detail/detail.js
const Api = require('../../Api/Api');
const StaticData = require('../../data/data');
const WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: {},
    ImgUrl: Api.getImgUrl(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getCouponDetails(id);
    console.log(StaticData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  getCouponDetails(id) {
    Api.getCouponDetails(id).then((res) => {
      console.log(res);
      if(res.data.q.s == 0) {
        let coupon = res.data.q.coupon;

        if(coupon.price != undefined) {
          coupon.price = parseFloat(coupon.price);
        }

        if(coupon.marketPrice != undefined) {
          coupon.marketPrice = parseFloat(coupon.marketPrice);
        }

        this.industryText(coupon);
        this.levelText(coupon);

        WxParse.wxParse('article', 'html', coupon.content, this, 5);

        this.setData({
          coupon
        })
      }
    })
  },

  //转换行业字符串
  industryText(coupon) {
    let result = '';
    if(coupon.industryId && coupon.industryId == '0') {
      coupon.industryText = '全部';
      return '全部';
    }
    if(coupon.industryId) {
      let data = industryType.find((item) => {
        return item.key == coupon.industryId
      })
      
      result = data.value;
    }
    coupon.industryText = result;
    return result;
  },

  //转换等级字符串
  levelText(coupon) {
    let levels = coupon.levels;
    let str = [];
    if(levels) {
      if(levels.length == 0) {
        return '不限';
      }else {
        for(let i in levels) {
          if(levels[i] == '1') {
            str.push('大众会员')
          }else if(levels[i] == '2') {
            str.push('黄金会员') 
          }else if(levels[i] == '3') {
            str.push('铂金会员') 
          }else if(levels[i] == '4') {
            str.push('钻石会员') 
          }else if(levels[i] == '5') {
            str.push('至尊会员') 
          }
        }
        
        coupon.levelText = str.join('、');
        return str.join('、');
      } 
    }
  },

  openMap(event) {
    let latitude = event.currentTarget.dataset.latitude;
    let longitude = event.currentTarget.dataset.longitude;
    let name = event.currentTarget.dataset.name;

    wx.openLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      scale: 28,
      address: name
    })
  },

  callPhone(event) {
    let phone = event.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },

  linkToMerchant() {
    wx.setStorageSync('shops', this.data.coupon.shops);
    wx.navigateTo({
      url: '/pages/merchant/merchant'
    })
  }
})