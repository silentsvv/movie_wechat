// pages/search/search.js
const Api = require('../../Api/Api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: Api.getImgUrl(),
    sk: '',
    couponsList: [],  //卡券列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  setSk(val) {
    console.log(val);
    this.setData({
      sk: val.detail.value
    })
  },

  submit() {
    if(!this.data.sk) {
      return false;
    }

    Api.getCouponList({
      a:1,
      sk: this.data.sk
    }).then((res) => {
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
  }

})