<template>
  <div class="paySuccess">
    <div class="pay-success">
      <div class="pay-success-img">
        <van-image fit="contain" :src="`${publicPath}img/pay-success.png`"></van-image>
      </div>
      <div class="pay-success-label">支付成功!</div>
    </div>
    <div class="btn">
      <van-button type="info" block @click="onOrderDetail">查看订单</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paySuccess',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      groupId: ''
    }
  },
  created() {
    this.groupId = this.$route.query.groupId
  },
  activated() {

  },
  methods: {
    onOrderDetail() {
      // 查看订单
      var _this = this
      this.$router.push({
        path: '/orderDetail',
        query:{
          groupId: _this.groupId,
          state:1
        }
      })
    }
  }
}
</script>
<style scoped>
.paySuccess{
  height: 100%;
  background: #fff;
  overflow: hidden;
}
.pay-success{
  margin-top: 5rem;
}
.pay-success-img{
  width: 4.7rem;
  height: 4rem;
  margin: auto;
  background: #f8f8f8;
}
.pay-success-img .van-image{
  width: 4.7rem;
  height: 4rem;
}
.pay-success-label{
  text-align: center;
  font-size: .88rem;
}
.btn{
  padding: 3rem;
}
</style>
