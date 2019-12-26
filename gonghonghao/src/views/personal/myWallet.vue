<template>
  <div class="myWallet">
    <div class="my-wallet">
      <div class="my-wallet-img">
        <van-image fit="contain" :src="`${publicPath}img/my-wallet.png`"/>
      </div>
      <div class="my-wallet-money">{{balance|formatPrice}}</div>
      <div class="my-wallet-label">账户余额(元)</div>
      <div class="my-wallet-btn">
        <van-button type="info" block @click="onWithdraw">提现</van-button>
      </div>
    </div>
    <div class="my-wallet-div">
      <div class="my-wallet-title">
        <van-cell is-link>
          <span slot="title" class="my-wallet-title-title">明细</span>
          <span class="my-wallet-title-value" @click="onDetail">
            查看全部
          </span>
        </van-cell>
      </div>
      <div class="my-wallet-content">
        <div class="my-wallet-item" v-for="dataList in list" :key="dataList.id">
          <van-cell :title="dataList.typeName" :label="dataList.createTime">
            <span class="my-wallet-item-value" :style="dataList.type==1?'color:red':''">
              {{dataList.type==1?'+':'-'}}￥{{dataList.transactionMoney|formatPrice}}
            </span>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
import { Dialog } from 'vant';
export default {
  name: 'aboutUs',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      balance:'0.00',       //账户余额
      list:[],              //账户记录

    }
  },
  created() {
    this.init();
    this.getInfoList();
  },
  activated() {

  },
  methods: {
    init() {
      var that = this
      api.findCurrentUserAccountInfo({}).then(res => {
        if(res.code == 200){
          that.balance = res.data.canWithdrawMoney
        }else{
          that.$toast(res.msg)
        }
      })
    },

    //历史记录
    getInfoList(){
      var that = this
      api.walletMore({page:1,limit:10}).then(res => {
        if(res.code == 200){
          for(var i=0;i<6;i++){
            var lis = res.data.list[i]
            if(lis){
              that.list.push(lis);
            }
          }
        }else{
          that.$toast(res.msg)
        }
      })
    },
    onWithdraw() {
      var that = this
      api.ifPassword({}).then(res => {
        if(res.code == 200){
          if(res.data){     //已设置
              // 提现
              that.$router.push({ path: '/withdraw'})
          }else{            //未设置
              Dialog.confirm({
                title: '提现密码',
                message: '您还未设定提现密码，无法进行提现',
                confirmButtonText:'去设置'
              }).then(() => {
                  that.$router.push({path: '/withdrawPwd'})
              }).catch(() => {

              })
          }
        }else{
          that.$toast(res.msg)
        }
      })
    },
    onDetail() {
      // 明细查看全部
      this.$router.push({
        path: '/myWalletDetail'
      })
    }
  }
}
</script>
<style scoped>
.my-wallet{
  background: #fff;
  text-align: center;
  padding: 3rem;
}
.my-wallet-img{
  width: 3.03rem;
  height: 3.31rem;
  margin: auto;
}
.my-wallet-img .van-image{
  width: 3.03rem;
  height: 3.31rem;
}
.my-wallet-money{
  font-size: 2.25rem;
  font-weight: 500;
  margin-top: 1rem;
}
.my-wallet-label{
  margin-top: 1rem;
}
.my-wallet-btn{
  padding: 2rem;
}
.my-wallet-div{
  margin-top: .63rem;
  background: #fff;
}
.my-wallet-title-title{
  font-weight: 500;
}
.my-wallet-title-value{
  font-size: .75rem;
  color: #666;
}
.my-wallet-item{
  position: relative;
  padding: 3px 0;
  
}
.my-wallet-item:not(:last-child)::before{
  position: absolute;
  bottom: 0;
  right: 0;
  content: '';
  width: 96%;
  background: rgba(221,221,221,.8);
  height: .03rem;
  z-index: 1;
}
.my-wallet-item-value{
  font-size: .81rem;
  color: #222;
  font-weight: 500;
}
.my-wallet-item-value.add{
  color: #ED1F1F
}
</style>
