// const BaseUrl = 'http://yaheng.d.aiitec.org';
const ApiUrl = 'http://api.yyh517.com';
const ImgUrl = 'http://api.yyh517.com/uploadfiles/';
var sessionId;

function getSessionId() {
  let app = getApp();
  //sessionId = app.globalData.sessionId;
  sessionId = wx.getStorageSync('sessionId');
  return sessionId;
}


/**
 * 封装请求函数
 * 
 * @param {url} 请求地址
 * @param {data} 请求数据
 * @param {method} 请求方法
 * @param {completeFn} 调用完成执行函数
 * @returns  返回promise函数，使用then获取数据，catch获取error
 */
function request({url,data,method='POST',completeFn, header, isShowLoading=false}) {
  return new Promise((resolve, reject) => {
    //显示loading效果
    if(isShowLoading) {
      wx.showLoading({
        title: '加载中'
      })
    }
    
    wx.request({
      url,
      data,
      method,
      header,
      success: function(res){
        resolve(res)
      },
      fail: function(err) {
        reject(err);
        console.log('request出错了');
        console.log('--------');
        console.log(err);
        console.log('--------');
      },
      complete: function() {
        if(isShowLoading) {
          wx.hideLoading();
        }
        completeFn
      }
    })
  })
}

const Api = {

  /**
   * 4	公共，分类列表CategoryList（H5、APP）
   * 
   * @returns 
   */
  getCategoryList() {
    return request({
      url: ApiUrl,
      data: {
        n: 'CategoryList',
        q: {
          a: 1
        }
      }
    })
  },

  /**
   * 7 公共，广告列表 AdList（H5、 APP）
   * 
   * @param {action} 1 影讯； 2 卡券
   * @returns 
   */
  getAdList() {
    return request({
      url: ApiUrl,
      data: {
        n: 'AdList',
        q: {
          a: 2
        }
      }
    })
  },

  /**
   * 8 公共，最新动态（公告栏） News（H5、 APP）
   * 
   * @returns 
   */
  getNews() {
    return request({
      url: ApiUrl,
      data: {
        n: 'News',
        q: {
          a: 1
        }
      }
    })
  },

  /**
   * 41业务，卡券列表 CouponList（H5、 APP）
   * 
   * @param {a} 1 积分商城；2 积分商城（不含 type4：积分+现金券）3 我的关注；
   * @param {categoryId}  Action=1|2，分类 id； 0 为全部
   * @param {isRecommend}  Action=1|2，分类 id； 0 为全部
   * @param {searchKey} sk，商品名称
   * @returns 
   */
  getCouponList({a, pa, li, categoryId, isRecommend, sk}) {
    return request({
      url: ApiUrl,
      data: {
        n: 'CouponList',
        q: {
          a,
          pa,
          li,
          categoryId,
          isRecommend,
          sk
        }
      }
    })
  },
  

  /**
   * 42业务，卡券详情 CouponDetails（H5、 APP）
   * 
   * @param {id}  卡券id
   * @returns 
   */
  getCouponDetails(id) {
    return request({
      url: ApiUrl,
      data: {
        n: 'CouponDetails',
        q: {
          id
        }
      }
    })
  },



  getBaseUrl: () => {
    return BaseUrl;
  },

  getImgUrl() {
    return ImgUrl;
  }

}

module.exports = Api;