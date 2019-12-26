<template>
  <div class="payFail">
    <div class="pay-success">
      <div class="pay-success-img">
        <van-image fit="contain" :src="`${publicPath}img/pay-fail.png`"></van-image>
      </div>
      <div class="pay-success-label">支付失败!</div>
    </div>
    <div class="btn">
      <van-button type="info" block @click="onAgain">再试一次</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'payFail',
  data(){
    return{
      publicPath: process.env.BASE_URL,

    }
  },
  created() {},
  activated() {

  },
  methods: {
    onAgain() {
      // 再试一次
      this.$router.back(-1)
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
