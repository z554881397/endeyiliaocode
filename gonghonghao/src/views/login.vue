<template>
  <div class="login">
    <div>
      <div class="title">登录</div>
      <div>
        <van-cell-group>
          <van-field type="tel" v-model="phone" placeholder="请输入手机号码" />
          <van-field v-model="code" center clearable placeholder="请输入验证码">
            <van-button slot="button" plain type="info" size="small" @click="onCode">{{codeData}}</van-button>
          </van-field>
        </van-cell-group>
        <div class="btn">
          <van-button type="info" round block @click="onLogin">登录</van-button>
        </div>
      </div>
      <div class="weixin-login">
        <van-divider :style="{ color: '#666666', borderColor: '#DDDDDD', padding: '0 3rem' }">
          使用微信登录
        </van-divider>
        <div class="textCenter">
          <van-image
            width="32"
            height="32"
            :src="`${publicPath}img/weixin.png`"
            @click="onWeixin"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from '../api/index.js';
import commonUtil from '@/assets/js/commonUtil.js';
export default {
  name: "login",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      phone: "",
      code: "",
      flag: false,
      s: 250,
      codeData: "获取验证码",
      wx_code: '',

      openInfo: '', // 授权登录信息
    };
  },
  created() {
    this.init();
  },
  activated() {},
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
      api.getCaptcha({
        telephone: this.phone
      }).then(res => {
        if (res.code === 200) {
          _this.code = res.data;
          _this.$toast("发送成功！");
          // 倒计时
          timer = setInterval(function() {
            _this.s--;
            if (_this.s === 0) {
              _this.codeData = "重新发送验证码";
              clearInterval(timer);
              _this.s = 250;
              _this.flag = false;
            } else {
              _this.codeData = _this.s + "s重新获取";
            }
          }, 1000);
        } else {
          _this.$toast(res.msg);
          _this.s = 250;
          _this.flag = false;
        }
      });
    },
    onLogin() {
      // 登录
      var _this = this;
      if (!this.phone) {
        this.$toast("请输入账号");
        return;
      }
      if (!this.code) {
        this.$toast("请输入密码");
        return;
      }
      api.dologin({
        telephone: this.phone,
        msgCode: this.code
      }).then(res => {
        if (res.code === 200) {
          localStorage.setItem("ende-ecology-toke", res.data.token)
          localStorage.setItem("ende-ecology-userinfo",JSON.stringify(res.data.user))
          localStorage.setItem("ende-ecology-freshTime",new Date().getTime());//获取到token的时间戳
          setTimeout(function() {
            _this.$toast("登录成功");
            _this.$store.commit("onPageList", "");
            var productId = commonUtil.parseUrlParams('productId')
            var shareUserId = commonUtil.parseUrlParams('shareUserId')
            _this.$store.commit("onProductId", productId);
            _this.$store.commit("onShareUserId", shareUserId);
            _this.$router.push({ path: "/" });
            
            
          },600)
        } else {
          _this.$toast(res.msg);
          _this.s = 250;
          _this.flag = false;
        }
      });
    },

    init() {
      let code = commonUtil.parseUrlParams("code");
      this.wx_code = code;
      if(!code) {
        // 使用微信登录,申请微信授权,获取到code,然后判断是不是系统用户,如果不是,关联手机号,如果是,直接登录
        var shareUserId = commonUtil.parseUrlParams('shareUserId')
        var productId = commonUtil.parseUrlParams('productId')

        let redirectUrl = this.$config.myIp + '?shareUserId='+shareUserId+'&productId='+productId+'#/login'
        redirectUrl = encodeURIComponent(redirectUrl);
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.$config.WX_APP_ID +
                '&redirect_uri=' + redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
      }else{
        this.onOpenId()
      }
    },
    onOpenId() {
      var _this = this
      let code = commonUtil.parseUrlParams("code");
      api.getOpenId({
        code: code
      }).then(res => {
        if(res.code == 200){
          localStorage.setItem("ende-ecology-openId", res.data.openid)
          _this.openInfo = res.data;
        }else{
          _this.$toast(res.message)
        }
      })
    },
    /**
     * 初始化判断是否有code参数携带在url中
     */
    onWeixin() {
      let _this = this;
      let code = commonUtil.parseUrlParams("code");
      this.wx_code = code;
      if(code){
        //说明是微信授权页面跳转过来的
        //根据code去获取用户信息
        api.weixinLogin({
          openId: this.openInfo.openid,
          nickName: this.openInfo.nickname,
          sex: this.openInfo.sex,
          province: this.openInfo.province,
          city: this.openInfo.city,
          country: this.openInfo.country,
          headImgUrl: this.openInfo.headimgurl,
          
        }).then(res => {
          if(res.code == 200){
            //用户已经是系统用户了
            //返回用户信息以及token
            localStorage.setItem("ende-ecology-toke", res.data.token)
            localStorage.setItem("ende-ecology-userinfo",JSON.stringify(res.data.user))
            localStorage.setItem("ende-ecology-freshTime",new Date().getTime());//获取到token的时间戳
            setTimeout(function() {
              _this.$toast("登录成功");
              _this.$store.commit("onPageList", "");
              var productId = commonUtil.parseUrlParams('productId')
              var shareUserId = commonUtil.parseUrlParams('shareUserId')
              _this.$store.commit("onProductId", productId);
              _this.$store.commit("onShareUserId", shareUserId);
              _this.$router.push({ path: "/" });
            },600)
          }else if(res.code == 502){
            let openId = res.data.openId;
            //用户未绑定手机号,引导用户去绑定手机号
            _this.$router.push({
              path: '/bindPhone',
              query: {
                openId: openId
              }
            })
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.login {
  height: 100%;
  background: #fff;
}
.login>div{
  padding: 1rem;
}
.title {
  font-size: 1.88rem;
  font-weight: 500;
  padding: 1rem 1rem 2.6rem 1rem;
}
.btn {
  margin: 4rem 1.2rem 0 1.2rem;
}
.btn button{
  box-shadow: 0px 5px 15px 5px rgba(156, 181, 191, 0.42)
}
.weixin-login {
  margin-top: 4rem;
}
.van-divider{
  font-size: .75rem;
  letter-spacing: .1rem;
}
</style>
