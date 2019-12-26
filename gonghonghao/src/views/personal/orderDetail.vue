<template>
  <div class="orderDetail">
    <div class="order-detail-top">
      <div class="order-detail-state" v-if="state==1">
        <div class="order-detail-state-img"><van-image fit="contain" :src="`${publicPath}img/pending-order.png`"/></div>
        <div class="order-detail-state-text">待处理</div>
      </div>
      <div class="order-detail-state" v-if="state==2">
        <div class="order-detail-state-img"><van-image fit="contain" :src="`${publicPath}img/personal-order-second.png`"/></div>
        <div class="order-detail-state-text">已发货</div>
      </div>
      <div class="order-detail-state" v-if="state==3">
        <div class="order-detail-state-img"><van-image fit="contain" :src="`${publicPath}img/completed-order.png`"/></div>
        <div class="order-detail-state-text">已完成</div>
      </div>
      <div class="my-address">
        <div class="my-address-img">
          <van-image fit="contain" src="img/sure-order-local.png"></van-image>
        </div>
        <div class="my-address-content">
          <div class="my-address-person">
            <span>{{detail.recUserName}}</span>
            <span>{{detail.recTelephone}}</span>
          </div>
          <div class="my-address-address">
            {{detail.recAddress}}
          </div>
        </div>
      </div>
    </div>
    <div class="order-detail-center" v-if="detail">
      <div class="order-detail-center-goods">
        <orderGoods :selectGoodsDetail="detail.list[0]"></orderGoods>
      </div>
      <div class="order-detail-center-coupon">
        <div>重复购买折扣优惠</div>
        <div>-￥{{detail.repeatBuyDiscountMoney?detail.repeatBuyDiscountMoney.toFixed(2):'0.00'}}</div>
      </div>
      <div class="order-detail-center-remark">
        <div>订单备注</div>
        <div>{{detail.list[0].remarks?detail.list[0].remarks:'无'}}</div>
      </div>
      <div class="order-detail-center-price">
        <span>共{{detail.list[0].count}}件</span>
        <span>
          <span>实付金额：</span>
          <span>￥{{detail.payable | formatPrice}}</span>
        </span>
      </div>
    </div>
    <div class="order-detail-bottom" v-if="detail">
      <div>订单编号：{{detail.groupId}}</div>
      <div>下单时间：{{detail.createTime}}</div>
      <div v-if="state==2||state==3">发货时间：{{detail.list[0].sendTime?detail.list[0].sendTime:''}}</div>
      <!-- <div v-if="state==3">完成时间：{{detail.list[0].receiveTime?detail.list[0].receiveTime:''}}</div> -->
    </div>

    <div class="fixed-btn" v-if="state != 1">
      <div class="btn">
        <van-button plain hairline size="small" type="info" @click="onLogistics">查看物流</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'orderDetail',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      groupId:'',
      detail:'',
      state: '', // 1待处理，2已发货，3已完成
    }
  },
  created() {
    this.groupId=this.$route.query.groupId;     
    this.state=this.$route.query.state;      
    this.orderInfo();
  },
  activated() {

  },
  methods: {
    orderInfo() {
      var that = this
      api.toOrderInfo({groupId:this.groupId}).then(res => {
        if(res.code == 200){
          that.detail = res.data
        }else{
          that.$toast(res.msg)
        }
      })
    },
    onLogistics() {
      // 查看物流
      this.$router.push({
        path: '/orderLogistics',
        query:{groupId:this.groupId}
      })

    }
  }
}
</script>
<style scoped>
.order-detail-top,.order-detail-center,.order-detail-bottom{
  background: #fff;
  border-radius: .5rem;
  margin: .75rem;
}
.order-detail-state{
  text-align: center;
  padding: 1.25rem 0;
  color: #199BFF;
  font-size: .94rem;
  border-bottom: .03rem solid rgba(221,221,221,.8);
}
.order-detail-state-img{
  width: 3rem;
  height: 3rem;
  margin: auto;
}
.order-detail-state-img .van-image{
  width: 3rem;
  height: 3rem;
}
/* 地址 start */
.my-address{
  display: flex;
  align-items: center;
  padding: .5rem .75rem;
}
.my-address-img{
  width: 1.13rem;
  height: 1.34rem;
  margin-right: 1rem;
  flex-shrink: 0;
}
.my-address-img .van-image{
  width: 1.13rem;
  height: 1.34rem;
}
.my-address-person{
  line-height: 2.5rem;
}
.my-address-person>span:nth-of-type(1){
  font-size: .88rem;
  font-weight: 500;
  margin-right: 2rem;
}
.my-address-person>span:nth-of-type(2){
  color: #666;
}
.my-address-address{
  line-height: 1.19rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding: .5rem 0;
}
/* 地址 end */
.order-detail-center-goods{
  padding: .75rem;
}

.order-detail-center-coupon{
  display: flex;
  justify-content: space-between;
  border-bottom: .03rem solid rgba(221,221,221,.8);
  padding: .75rem;
}
.order-detail-center-coupon>div:nth-of-type(1){
  font-weight: 500;
}

.order-detail-center-remark{
  border-bottom: .03rem solid rgba(221,221,221,.8);
  padding: .75rem;
}
.order-detail-center-remark>div:nth-of-type(1){
  font-weight: 500;
  margin-bottom: .75rem;
}

.order-detail-center-price{
  padding: 1rem .75rem;
  text-align: right;
}
.order-detail-center-price>span:nth-of-type(1){
  color: #666;
  font-size: .75rem;
  margin-right: 1rem;
}
.order-detail-center-price>span:nth-of-type(2)>span:nth-of-type(2){
  color: #ED1F1F;
  font-size: 1rem;
}

.order-detail-bottom>div{
  height: 2rem;
  line-height: 2rem;
  padding: .75rem;
}
.order-detail-bottom>div:not(:last-child){
  padding-bottom: 0;
}

.fixed-btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
}
.btn{
  text-align: right;
  padding: .5rem 1rem;
}
</style>
