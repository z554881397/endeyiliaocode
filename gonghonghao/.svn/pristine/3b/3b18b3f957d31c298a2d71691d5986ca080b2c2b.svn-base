<template>
  <div class="withdrawPwd">
    <div class="withdraw-pwd-input">
      <van-field v-model="phone" placeholder="请输入手机号码" />
      <van-field v-model="code" center clearable placeholder="请输入验证码">
        <van-button slot="button" plain type="info" size="small" @click="onCode">{{codeData}}</van-button>
      </van-field>
      <van-field type="password" v-model="pwd" placeholder="请输入提现密码" />
      <van-field type="password" v-model="pwd1" placeholder="请再次输入提现密码" :border="true" />
    </div>
    <div class="btn">
      <van-button type="info" round block @click="onSure">确认</van-button>
    </div>

  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'withdrawPwd',
  data(){
    return{
      phone: "",
      code: "",
      flag: false,
      s: 60,
      codeData: "获取验证码",
      pwd: '',
      pwd1: '',

    }
  },
  created() {},
  activated() {

  },
  methods: {
    onCode() {
    // 获取验证码
    var _this = this;
    if (this.flag) {
      return;
    }
    if (!this.phone) {
      this.$toast("请输入手机号");
      return;
    }
    if (!/^1[345789]\d{9}$/.test(this.phone)) {
      this.$toast("手机号码有误，请重填");
      return;
    }
    _this.flag = true;
    var timer;
    api.msmCode({
        telephone: this.phone
      })
      .then(res => {
        if (res.code === 200) {
          _this.code = res.data;
          _this.$toast("发送成功！");
          // 倒计时
          timer = setInterval(function() {
            _this.s--;
            if (_this.s === 0) {
              _this.codeData = "重新发送验证码";
              clearInterval(timer);
              _this.s = 60;
              _this.flag = false;
            } else {
              _this.codeData = _this.s + "s重新获取";
            }
          }, 1000);
        } else {
          _this.$toast(res.msg);
          _this.s = 60;
          _this.flag = false;
        }
      });
    },
    onSure() {
      // 确认
      var _this = this
      if (!this.phone) {
        this.$toast("请输入手机号");
        return;
      }
      if (!this.code) {
        this.$toast("请输入验证码");
        return;
      }
      if (!/^1[345789]\d{9}$/.test(this.phone)) {
        this.$toast("手机号码有误，请重填");
        return;
      }
      if (this.pwd.length != 6) {
        this.$toast("请输入6位数字的密码");
        return;
      }
      if (!/^[0-9]*$/.test(this.pwd)) {
        this.$toast("密码只能为数字");
        return;
      }
      if (!this.pwd1) {
        this.$toast("请输入确认密码");
        return;
      }
      if (this.pwd != this.pwd1) {
        this.$toast("两次密码不一致");
        return;
      }

      var that = this
      api.setUpPwd({
        msgCode:this.code,
        password:this.pwd
      }).then(res => {
        if(res.code == 200){
          that.$toast({
            message: "设置成功",
            icon: "passed",
            duration: 800
          });
          setTimeout(function(){
            that.$router.back()
          },800)
        }else{
          that.$toast(res.msg)
        }
      })
    },
  }
}
</script>
<style scoped>
.withdrawPwd {
  height: 100%;
  background: #fff;
  overflow: hidden;
}
.withdraw-pwd-input{
  margin-top: 1rem;
}
.btn {
  margin: 3.6rem 2.5rem 0 2.5rem;
}
.withdrawPwd .van-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
</style>
