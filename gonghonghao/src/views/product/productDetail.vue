<template>
  <div class="productDetail">
    <div class="product-detail-content">
      <div>
        <van-swipe 
          :autoplay="3000" 
          indicator-color="#199BFF"
          :height="320"
        >
          <van-swipe-item v-for="(pic,picIndex) in detail.smallPic" :key="picIndex">
            <van-image fit="contain" :src="pic"></van-image>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-detail-text">
        <div>
          <div class="product-detail-title">
            <div class="product-detail-name">{{detail.name}}</div>
            <!-- <div class="product-detail-share" @click="onShare">
              <van-image fit="contain" :src="`${publicPath}img/product-detail-share.png`"></van-image>
              <div>分享</div>
            </div> -->
          </div>
          <div class="product-detail-price">
            <div>
              <div class="product-detail-p">
                <span>￥</span>
                <span>{{detail.price}}</span>
              </div>
              <div class="product-detail-del">￥{{detail.marketPrice|formatPrice}}</div>
            </div>
            <div class="product-detail-total">
              <span>销量：</span>
              <span>{{detail.total}}</span>
            </div>
          </div>
        </div>
        <div class="product-detail-serve">
          <div>
            <div>服务：</div>
            <div>
              <van-image fit="contain" :src="`${publicPath}img/product-detail-serve.png`"></van-image>
              <span>7天无理由退换</span>
            </div>
          </div>
        </div>
        <div class="product-detail-sku">
          <div>
            <div>规格：</div>
            <div>
              {{selectGoodsDetail.property ? selectGoodsDetail.property:'点击选择商品规格'}}
            </div>
          </div>
          <div @click="onPShow">
            <van-image fit="contain" :src="`${publicPath}img/product-detail-more.png`"></van-image>
          </div>
        </div>
      </div>
      <div class="product-detail-detail">
        <div class="product-detail-detail-title">商品详情</div>
        <div class="product-detail-detail-content" v-html="detail.content">

        </div>
      </div>

    </div>

    <van-popup v-model="show" position="bottom" :duration=".3" :style="{ height: '490px' }">
      <div class="sku-goods">
        <div class="sku-goods-div">
          <div class="sku-goods-img">
            <van-image fit="contain" :src="detail.smallPic[0]"></van-image>
          </div>
          <div class="sku-goods-label">
            <div>{{selectGoodsDetail.name}}</div>
            <div v-if="selectGoodsDetail.price">￥{{selectGoodsDetail.price}}</div>
            <div v-else>￥{{detail.price}}</div>
          </div>
        </div>
        <div class="sku-goods-sku">
          <div>规格</div>
          <div>
            <ul>
              <li
                :class="pIndex === indexl ? 'active':''"
                v-for="(goodsl,indexl) in goodsList"
                :key="goodsl.id"
                @click="onPSelect(indexl)"
              >
                <span v-for="(pgoods,pindex) in goodsl.propertyGoods">
                  {{pgoods.value}}
                  <span v-if="pindex<goodsl.propertyGoods.length-1">/</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="sku-good-num">
          <div>数量</div>
          <div>
            <van-stepper v-model="selectGoodsDetail.count" @change="onCount" />
          </div>
        </div>
        <div class="sku-goods-btn">
          <van-button type="info" block @click="onPBuy" v-if="loginFlag">立即购买</van-button>
          <van-button type="info" block @click="onLogin" v-else>登录</van-button>
        </div>
      </div>
    </van-popup>

    <div class="fixed-btn">
      <div class="btn">
          <van-button type="info" block @click="onBuy" v-if="loginFlag">立即购买</van-button>
          <van-button type="info" block @click="onLogin" v-else>登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import api from '../../api';
import wxapi from '@/assets/js/jweixin.js'
import config from '../../api/config.js'
import commonUtil from '@/assets/js/commonUtil.js';
export default {
  name: "productDetail",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loginFlag: true,

      id: "", // 产品id
      detail: {
        id: '',
        name: '',
        price: '',
        marketPrice: '',
        total: '',
        smallPic: '',
        content: ''

      }, // 产品详情
      
      goodsList: [{
        id: '',
        price: '',
        propertyGoods:[{
          value: ''
        },{
          value: ''
        }]
      }], // 商品列表
      pIndex: "", // 选中第几个规格
      selectGoodsDetail: {
        goodsId: '',
        name: "",
        pic: process.env.BASE_URL+"img/productImg.png",
        property: "",
        price: "",
        count: "",
        freight: ""
      }, // 选择的商品详情

      show: false, // 规格弹出层
      shareUserId: '', // 分享人id
    };
  },
  created() {
    var token = localStorage.getItem('ende-ecology-toke')
    if(!token){
      this.loginFlag = false
    }else{
      this.shareUserId = commonUtil.parseUrlParams('shareUserId')
      if(this.$store.state.shareUserId == 0){
        this.onBind()
        
      }
    }
    this.$store.commit("onProductId", '');
    this.id = this.$route.query.id;
    //获取产品详情,进行渲染
    this.findProductInfo(this.id);
  },
  mounted() {

  },
  methods: {
    onBind() {//绑定上级关系
      var _this = this
      api.bindParent({
        parentUserId: this.shareUserId
      }).then(res => {
        if(res.code == 200){
          // console.log('绑定上级成功')
          _this.$store.commit("onShareUserId", _this.$store.state.shareUserId++);
        }else {
          this.$toast(res.msg)
        }
      })
    },
    onPShow() {
      // 弹出选择规格
      this.show = true;
    },
    onPClose() {
      // 关闭选择规格
      this.show = false;
    },
    onPSelect(num) {
      // 选择规格
      var list = this.goodsList;
      this.pIndex = num;
      this.selectGoodsDetail.property = $(".sku-goods-sku li")
        .eq(this.pIndex)
        .text();
      this.selectGoodsDetail.goodsId = list[this.pIndex].id;
      this.selectGoodsDetail.price = list[this.pIndex].price;
      this.selectGoodsDetail.pic = this.detail.smallPic[0];
    },
    onCount(value) {
      // 数量发生改变
      this.selectGoodsDetail.count = value;
    },
    onBuy() {
      // 立即购买
      this.onPShow()
    },
    onPBuy() {
      if(this.selectGoodsDetail.property){
        this.selectGoodsDetail.productId = this.id
        this.$router.push({
          path: '/sureOrder',
          query: this.selectGoodsDetail
        })
      }else{
        this.$toast('请选择规格')
      }
    },
    findProductInfo(productId) {
      //查询商品详情
      
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      })
      api.findProductInfo({
        productId: productId
      }).then(res => {
        if(res.code == 200){
          //商品详情
          let productInfo = res.data;
          this.detail.id = productInfo.id;//产品id
          this.id = productInfo.id;//产品id
          this.selectGoodsDetail.name = productInfo.name
          this.detail.name = productInfo.name;//产品名称
          this.detail.price = productInfo.priceRange;//产品价格区间
          this.detail.marketPrice = productInfo.marketPriceRange;//产品市场价格区间
          this.detail.total = productInfo.salesVolume;//产品销量
          this.detail.content = productInfo.content;//商品详情
          //轮播图片,后台是以逗号分隔进行保存
          let smallPic = productInfo.smallPic;
          if(smallPic){
            this.detail.smallPic = smallPic.split(',');
          }
          this.$toast.clear()
          wxapi.wxRegister(this.wxRegCallback)

          //开始处理商品信息,将后台返回的商品good数组转化为需要的数据
          let goodVoList = productInfo.goodVoList;
          if(goodVoList){
            let goodsList = goodVoList.map(item => {
              //商品的规格信息
              let goodSpecVoList = item.goodSpecVoList;
              //将规格转化
              let propertyGoods = goodSpecVoList.map(goodSpecItem => {
                return {
                  value: goodSpecItem.specValue
                }
              });
              return {
                id: item.id,
                price: item.price,
                propertyGoods: propertyGoods
              }
            });
            this.goodsList = goodsList;

            if(this.goodsList.length == 1){
              this.pIndex = 0;
              var property = ''
              for(var i = 0;i<this.goodsList[0].propertyGoods.length;i++){
                property += this.goodsList[0].propertyGoods[i].value
                if(i != this.goodsList[0].propertyGoods.length-1){
                  property += '/'
                }
              }
              this.selectGoodsDetail.property = property
              this.selectGoodsDetail.goodsId = this.goodsList[this.pIndex].id;
              this.selectGoodsDetail.price = this.goodsList[this.pIndex].price;
              this.selectGoodsDetail.pic = this.detail.smallPic[0];
            }
          }

        }
      });
    },
    wxRegCallback () {
      // 用于微信JS-SDK回调
      this.onShare()
    },
    onShare(){
      // 微信自定义分享给朋友
      var userInfo = localStorage.getItem('ende-ecology-userinfo')
      userInfo = JSON.parse(userInfo)
      var shareUserId = userInfo.id
      let option = {
        title: this.detail.name, // 分享标题, 请自行替换
        desc: "售价：¥"+this.detail.price+"。恩德商城，正品保证，好物与你分享", // 分享描述, 请自行替换
        link: this.$config.myIp + '?shareUserId='+shareUserId+'#/productDetail?id='+this.id, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.detail.smallPic[0], // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    },
    onLogin() {
      //登录
      var shareUserId = commonUtil.parseUrlParams('shareUserId')
      window.location.href = this.$config.myIp + '?shareUserId='+shareUserId+'&productId='+this.id+'#/login'
    }
  }
};
</script>
<style scoped>
.van-swipe,.product-detail-text {
  background: #fff;
}
.van-swipe{
  background: #f8f8f8
}
.van-swipe .van-image {
  height: 320px;
}

.product-detail-text>div{
  margin-left: 1rem;
  border-bottom: .03rem solid rgba(221,221,221,.6);
}
.product-detail-title{
  display: flex;
  justify-content: space-between;
  padding: .5rem 0;
}
.product-detail-name{
  font-size: .88rem;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.product-detail-share{
  display: flex;
  flex-direction: column;
  font-size: .69rem;
  color: #199BFF;
  width: 3rem;
  flex-shrink: 0;
  align-content: center;
  align-items: center;
}
.product-detail-share .van-image{
  width: 1.09rem;
  height: 1.09rem;
  padding: .2rem 0;
}

.product-detail-price{
  display: flex;
  justify-content: space-between;
  padding: 0 .8rem .8rem 0;
  align-items: baseline;
}
.product-detail-price>div{
  display: flex;
  align-items: baseline;
}
.product-detail-p{
  color: #ED1F1F;
  margin-right: .6rem;
  font-weight: 500;
}
.product-detail-p>span:nth-of-type(1){
  font-size:0.75rem;
}
.product-detail-p>span:nth-of-type(2){
  font-size:0.81rem;
}
.product-detail-del{
  color: #666666;
  font-size:0.75rem;
  text-decoration: line-through;
}
.product-detail-total{
  font-size: .75rem;
  color: #999;
}
.product-detail-serve,.product-detail-sku{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem .8rem 1rem 0;
  font-size: .81rem;
}
.product-detail-serve>div,.product-detail-sku>div{
  display: flex;
  align-items: center;
}
.product-detail-serve>div .van-image{
  width: .88rem;
  height: .88rem;
  padding: 0 .3rem;
}
.product-detail-serve>div>div:nth-of-type(2){
  display: flex;
  align-items: center;
}
.product-detail-sku>div .van-image{
  width: 1.69rem;
  height: .44rem;
}
.product-detail-sku>div>div:nth-of-type(2){
  color: #666666;
}

.product-detail-detail{
  margin-top: .63rem;
}
.product-detail-detail-title{
  padding: 1rem;
  text-align: center;
  font-size: 0.81rem;
  font-weight:500;
  background: #fff;
}

/* 规格 start */
.sku-goods {
  padding: 16px;
  background: #fff;
  position: relative;
}
.sku-goods-div {
  display: flex;
  align-items: center;
}
.sku-goods-img {
  width: 98.88px;
  height: 98.88px;
  margin-right: 1rem;
  background: #f8f8f8;
  flex-shrink: 0;
}
.sku-goods-img .van-image {
  width: 98.88px;
  height: 98.88px;
}
.sku-goods-label > div:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 1rem;
}
.sku-goods-label > div:nth-of-type(2) {
  color: #ED1F1F;
  font-size: 1rem;
}
.sku-goods-sku {
  margin-top: 16px;
  overflow: auto;
  height: 240px;
}
.sku-goods-sku > div:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.sku-goods-sku > div:nth-of-type(2) {
  overflow: hidden;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.sku-goods-sku > div:nth-of-type(2) li {
  float: left;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 0 0.5rem;
  height: 1.75rem;
  border: 1px solid #999999;
  border-radius: 0.3rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #666666;
  text-align: center;
  line-height: 2rem;
}
.sku-goods-sku > div:nth-of-type(2) li.active {
  background:rgba(25,155,255,0.12);
  border-color: #199BFF;
  color: #199BFF;
}
.sku-good-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sku-good-num > div:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.sku-good-num > div:nth-of-type(2) {
  overflow: hidden;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.sku-goods-btn {
  padding: 16px 16px 0 16px;
}
/* 规格 end */
.product-detail-detail-content{
  overflow: hidden;
  margin-bottom: 5rem;
}
.product-detail-detail-content >>> img{
  width: 100%;
  display: block;
}
.fixed-btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
}
.btn{
  padding: .5rem 2rem;
}
</style>
