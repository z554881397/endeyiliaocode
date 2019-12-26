<template>
  <div class="withdraw">
    <div class="withdraw-div">
      <div class="withdraw-div-weixin">
        <div class="withdraw-div-name">提现到微信</div>
        <div class="withdraw-div-weixin-img">
          <van-image fit="contain" :src="`${publicPath}img/weixin.png`"/>
        </div>
      </div>
      <div class="withdraw-div-accountUser">
        <div class="withdraw-div-account">提现账户</div>
        <div class="withdraw-div-input-account">
          <input type="text"  v-model="withdrawAccount" placeholder="请输入提现微信账户">
        </div>
      </div>
      <div class="withdraw-div-input">
        <div class="withdraw-div-name">提现金额</div>
        <div class="withdraw-div-input-div">
          <div>￥</div>
          <input type="text" @keyup="format_input_num" v-model="money">
        </div>
      </div>
      <div class="withdraw-div-money">
        <span>可提现金额￥{{allMoney|formatPrice}}</span>
        <span @click="onAll">全部提现</span>
      </div>
      <div class="withdraw-btn">
        <van-button type="info" block @click="onWithdraw">确认转出</van-button>
      </div>
      <div class="tipsStyle">
          <h4>温馨提示：</h4>
          <div>
            1.只有每周二方能发起提现<br /> 
            2.请正确填入微信号，因微信号填写错误造成损失平台概不负责！<br /> 
            3.为了保险起见，目前采用提现方式是微信转账，工作人员在2个工作日内添加你的微信，通过微信转账，请注意确认通过。<br /> 
            4.请保持电话畅通，方便工作人员联系
          </div>
      </div>
    </div>


    <van-popup v-model="show"
      :style="{ width: '90%'}"
      :round="round"
    >
      <div class="popup-div">
        <div class="popup-div-title">提现密码</div>
        <div class="popup-div-content">
          <div class="popup-div-info">请输入6位提现密码</div>
          <div class="popup-div-input">
            <!-- 密码输入框 -->
            <van-password-input
              :value="value"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
            />
          </div>
          <div class="popup-div-forgot" @click="forgetPwd">忘记密码？</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="show" position="bottom" :style="{ height: '216px' }" :overlay="overlay" >
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-popup>


  </div>
</template>

<script>
import $ from 'jquery'
import api from '../../api/index.js'
export default {
  name: 'withdraw',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      allMoney: 0.00,
      withdrawAccount:'',    //提现账户
      money: '',             //提现金额

      show: false,
      round: true,
      overlay: false,
      value: '',
      showKeyboard: true
    }
  },
  created() {
    this.getMoney();  //获取账户余额
  },
  mounted() {
  },
  methods: {
    // 格式化限制数字文本框输入，只能数字或者两位小数
    format_input_num(){
      // 清除"数字"和"."以外的字符
      this.money = this.money.replace(/[^\d.]/g,"");
      // 验证第一个字符是数字
      this.money = this.money.replace(/^\./g,"");
      // 只保留第一个, 清除多余的
      this.money = this.money.replace(/\.{2,}/g,".");
      this.money = this.money.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      // 只能输入两个小数
      this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    },
    onAll() {
      // 全部提现
      this.money = this.allMoney
    },
    getMoney(){
      var that = this
      api.findCurrentUserAccountInfo({}).then(res => {
        if(res.code == 200){
          that.allMoney = res.data.canWithdrawMoney
        }else{
          that.$toast(res.msg)
        }
      })
    },
    onWithdraw() {
      // 确认转出
      if(!this.withdrawAccount){
        this.$toast('请输入提现微信账户')
        return;
      }
      if(!this.money){
        this.$toast('请输入提现金额')
        return;
      }
      if(this.money==0){
        this.$toast('提现金额不能为0')
        return;
      }
      if(this.money>this.allMoney){
        this.$toast('输入金额超出可提现金额')
        return;
      }
      this.show = true;
      this.showKeyboard = true
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if(this.value.length>5){
        // 6位密码输入完
        
        var that = this
        api.applyWithdraw({
          money:this.money,
          password:this.value,
          withdrawAccount:this.withdrawAccount
        }).then(res => {
          if(res.code == 200){
            that.$toast({
              message: '提现成功',
              icon: "passed",
              duration: 800,
              onClose: function () {
                that.$router.back();
              }
            });
          }else{
            that.$toast(res.msg)
          }
        })
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    forgetPwd(){
      this.$router.push({path: '/withdrawPwd'})
    }
  }
}
</script>
<style scoped>
.withdraw{
  height: 100%;
  background: #fff;
}
.withdraw-div{
  padding: 1.5rem;
  background: #fff!important; 
}
.withdraw-div-weixin{
  display: flex;
  align-items: center;
  height: 4rem;
}
.withdraw-div-name{
  font-size: .88rem;
  line-height: 2rem;
}
.withdraw-div-weixin-img{
  width: 1.94rem;
  height: 1.94rem;
  margin-left: 1rem;
  background: #f8f8f8;
}
.withdraw-div-weixin-img .van-image{
  width: 1.94rem;
  height: 1.94rem;
}
.withdraw-div-input-account{
  display: flex;
  width: 80%;
}
.withdraw-div-accountUser{
  display: flex;
  align-items: center;
}
.withdraw-div-input-account>div{
  font-size: 2.06rem;
  line-height: 4rem;
}
.withdraw-div-input-account input{
  border: unset;
  width: 100%;
  height: 4rem;
  margin-left: 1rem;
}
.withdraw-div-input-div{
  display: flex;
  height: 4rem;
  border-bottom: .05rem solid rgba(221,221,221,.8);
}
.withdraw-div-input-div>div{
  font-size: 2.06rem;
  line-height: 4rem;
}
.withdraw-div-input-div input{
  border: unset;
  width: 80%;
  font-size: 2rem;
}
.withdraw-div-money{
  line-height: 3rem;
  color: #999999;
  font-size: .75rem;
}
.withdraw-div-money>span:nth-of-type(2){
  margin-left: 1rem;
  color: #199BFF;
}
.withdraw-btn{
  padding: 3rem 1rem;
}

/* 提现密码 start */
.van-popup--center{
  top: 40%;
}
.withdraw .van-popup--center.van-popup--round{
  border-radius: 10px;
}
.popup-div-title{
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
}
.popup-div-info{
  color: #666;
  font-size: .75rem;
  line-height: 2rem;
  margin-left: 16px;
  margin-bottom: .5rem;
}
.popup-div-forgot{
  color: #199BFF;
  font-size: .75rem;
  line-height: 2rem;
  margin-left: 16px;
  margin-top: .5rem;
}
/* 提现密码 end */
.tipsStyle{
  margin:auto;
  font-size: 13px;
}
.tipsStyle div{
  color:#666666;
  line-height:22px
}
.tipsStyle h4{
  color:#222222;
}
</style>
