<template>
  <div class="personal">
    <div v-if="loginFlag">
      <div class="personal-top">
        <div class="personal-label">
          <div class="personal-text">
            <div class="personal-img">
              <div class="personal-img-head">
                <van-image fit="contain" :src="detail.headImage"/>
              </div>
              <van-image v-if="memberClass==1" fit="contain" :src="`${publicPath}img/personal-f.png`"/>
              <van-image v-else-if="memberClass==2" fit="contain" :src="`${publicPath}img/personal-s.png`"/>
              <van-image v-else-if="memberClass==3" fit="contain" :src="`${publicPath}img/personal-t.png`"/>
            </div>
            <div>
              <div class="personal-username">{{detail.name}}</div>
              <div class="personal-phone">{{detail.account|phoneFilter}}</div>
            </div>
          </div>
          <div class="personal-code" @click="onPhoto">
            <van-image fit="contain" :src="TUrl+'app/user/userQrCode?id='+id"/>
          </div>
        </div>
        <div class="personal-icon">
          <div :class="'personal-icon-btn '+(memberClass==2?'member':(memberClass==3?'partner':''))">
            {{memberClass==1?'普通用户':(memberClass==2?'会员':(memberClass==3?'合伙人':''))}}
          </div>
        </div>
      </div>

      <!-- 我的钱包 -->
      <div class="personal-div" v-if="memberClass!=1">
        <div class="personal-div-title">
          <van-cell title="我的钱包" :icon="`${publicPath}img/personal-wallet.png`"/>
        </div>
        <div class="personal-div-content">
          <div class="personal-div-wallet">
            <div class="personal-wallet-item">
              <div class="personal-wallet-money">{{detail.grandTotalMoney|formatPrice}}</div>
              <div class="personal-wallet-name">累计收益(元)</div>
              <div class="personal-wallet-btn">
                <van-image fit="contain" :src="`${publicPath}img/personal-wallet-right.png`" @click="onWallet"/>
              </div>
            </div>
            <div class="personal-wallet-item">
              <div class="personal-wallet-money">{{detail.canWithdrawMoney|formatPrice}}</div>
              <div class="personal-wallet-name">提现金额(元)</div>
              <div class="personal-wallet-btn">
                <div class="personal-wallet-icon" @click="onWithdraw">提现</div>
              </div>
            </div>
            <div class="personal-wallet-item" v-if="memberClass==3">
              <div class="personal-wallet-money">{{detail.score}}</div>
              <div class="personal-wallet-name">我的积分</div>
              <div class="personal-wallet-btn">
                <van-image fit="contain" :src="`${publicPath}img/personal-wallet-right.png`" @click="onPointDetail"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="personal-div" v-if="memberClass==3">
        <div class="personal-div-title">
          <van-cell title="我的团队" :icon="`${publicPath}img/personal-team.png`" is-link>
            <span class="personal-team-title-value" @click="onMyTeam">
              更多
            </span>
          </van-cell>
        </div>
        <div>
          <div class="personal-div-content-li" @click="onUser">
            <van-cell title="普通用户" :icon="`${publicPath}img/personal-team-first.png`" is-link>
            <span class="personal-team-item-value">
              {{detail.teamCommonUserCount}}位
            </span>
          </van-cell>
          </div>
          <div class="personal-div-content-li" @click="onMember">
            <van-cell title="会员" :icon="`${publicPath}img/personal-team-second.png`" is-link>
            <span class="personal-team-item-value">
              {{detail.teamVIPUserCount}}位
            </span>
          </van-cell>
          </div>
          <div class="personal-div-content-li" @click="onPartner">
            <van-cell title="合伙人" :icon="`${publicPath}img/personal-team-thrid.png`" is-link>
            <span class="personal-team-item-value">
              {{detail.teamPartnerUserCount}}位
            </span>
          </van-cell>
          </div>
        </div>
      </div>

      <div class="personal-div" v-if="memberClass==2">
        <div class="personal-div-title">
          <van-cell title="我的推荐" :icon="`${publicPath}img/personal-recomend.png`" />
        </div>
        <div>
          <div class="personal-div-content-li" @click="onUser">
            <van-cell title="普通用户" :icon="`${publicPath}img/personal-team-first.png`" is-link>
              <span class="personal-team-item-value">
                {{detail.teamCommonUserCount}}位
              </span>
            </van-cell>
          </div>
          <div class="personal-div-content-li" @click="onMember">
            <van-cell title="会员" :icon="`${publicPath}img/personal-team-second.png`" is-link>
              <span class="personal-team-item-value">
                {{detail.teamVIPUserCount}}位
              </span>
            </van-cell>
          </div>
          <div class="personal-div-content-li" @click="onPartnerApply">
            <van-cell title="申请成为合伙人" :icon="`${publicPath}img/personal-list-first.png`" is-link/>
          </div>
          <div class="personal-div-content-li" @click="onPartnerRule">
            <van-cell title="查看合伙人相关规则" :icon="`${publicPath}img/personal-list-second.png`" is-link/>
          </div>
        </div>
      </div>

      <!-- 积分池 -->
      <div class="personal-div" v-if="memberClass==3">
        <div class="personal-div-title">
          <van-cell title="积分池" :icon="`${publicPath}img/personal-point.png`"/>
        </div>
        <div class="personal-div-content">
          <van-row>
            <van-col span="8" v-for="(item,index) in detail.awardPoolTeamCountList" :key="index">
              <div class="personal-div-icon">
                <div class="personal-div-icon-money">
                  {{item.rangeScoreStart|formatPrice}}
                </div>
                <div class="personal-div-icon-person">
                  <van-image fit="contain" :src="`${publicPath}img/personal-point-person.png`"/>
                  <span>{{item.teamCount}}</span>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <!-- 个人订单 -->
      <div class="personal-div">
        <div class="personal-div-title">
          <van-cell title="个人订单" :icon="`${publicPath}img/personal-order.png`"/>
        </div>
        <div class="personal-div-content">
          <van-row>
            <van-col span="8">
              <div class="personal-div-icon" @click="onStayHandle">
                <div class="personal-div-icon-img">
                  <van-image fit="contain" :src="`${publicPath}img/personal-order-first.png`"/>
                </div>
                <div class="personal-div-icon-text">待处理</div>
              </div>
            </van-col>
            <van-col span="8">
              <div class="personal-div-icon" @click="onDeliverGoods">
                <div class="personal-div-icon-img">
                  <van-image fit="contain" :src="`${publicPath}img/personal-order-second.png`"/>
                </div>
                <div class="personal-div-icon-text">已发货</div>
              </div>
            </van-col>
            <van-col span="8">
              <div class="personal-div-icon" @click="onComplete">
                <div class="personal-div-icon-img">
                  <van-image fit="contain" :src="`${publicPath}img/personal-order-thrid.png`"/>
                </div>
                <div class="personal-div-icon-text">已完成</div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="personal-div" v-if="memberClass==1">
        <div class="personal-div-content-li" @click="onPartnerApply">
          <van-cell title="申请成为合伙人" :icon="`${publicPath}img/personal-list-first.png`" is-link/>
        </div>
        <div class="personal-div-content-li" @click="onPartnerRule">
          <van-cell title="查看合伙人相关规则" :icon="`${publicPath}img/personal-list-second.png`" is-link/>
        </div>
        <div class="personal-div-content-li" @click="onMemberDescription">
          <van-cell title="申请成为会员" :icon="`${publicPath}img/personal-list-thrid.png`" is-link/>
        </div>
        <div class="personal-div-content-li" @click="onMemberDescription">
          <van-cell title="查看会员相关规则" :icon="`${publicPath}img/personal-list-four.png`" is-link/>
        </div>
      </div>

      <div class="btn">
        <van-button type="info" block @click="onLoginOut">退出登录</van-button>
      </div>
    </div>
    <div class="un-div" v-else>
      <div class="un-img">
        <van-image fit="contain" :src="`${publicPath}img/un-login.png`"/>
      </div>
      <div class="un-text">
        <div>登录后才能看到你的个人信息呃</div>
        <div>(⊙ω⊙)</div>
      </div>
      <div class="un-btn">
        <van-button type="info" block @click="onLogin">登录</van-button>
      </div>
    </div>
    
    <van-popup
      v-model="show"
    >
      <div style="position: relative;">
        <div class="popup-img">
          <img :src="TUrl+'app/wx/share/shareImage?currentUserId='+id" height="300px" @click="onShowImg" alt="">
        </div>
        <div class="share-close-view">
          <van-image fit="contain" :src="`${publicPath}img/sure-order-close.png`" @click="onPClose"></van-image>
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
import api from '../../api/index.js'
import config from '../../api/config.js'
import wxapi from '@/assets/js/jweixin.js'
import commonUtil from '@/assets/js/commonUtil.js';
import { Dialog } from 'vant';
export default {
  name: 'personal',
  data(){
    return{
      TUrl: config.url,
      publicPath: process.env.BASE_URL,
      loginFlag: false,
      detail: '',
      memberClass: 1,   // 1普通用户，2会员，3合伙人
      id: '',           // 用户id

      base64: '',
      show: false,
    }
  },
  activated() {
    var userinfo = localStorage.getItem('ende-ecology-userinfo')
    if(userinfo) {
      this.loginFlag = true
      userinfo = JSON.parse(userinfo)
      this.id = userinfo.id
      this.init()
      wxapi.wxRegister(this.wxRegCallback)

    } else {
      // 未登录
      this.loginFlag = false
    }
  },
  methods: {
    init() {
      var that = this
      api.findCurrentUserAccountInfo({}).then(res => {
        if(res.code == 200){
          that.detail = res.data
          that.memberClass = res.data.role
        }else{
          that.$toast(res.msg)
        }
      })
    },
    wxRegCallback () {
      // 用于微信JS-SDK回调
      this.onShare()
    },
    onShare(){
      // 微信自定义分享给朋友
      let option = {
        title: "恩德商城", // 分享标题, 请自行替换
        desc: "恩德商城，正品保证，好物与你分享", // 分享描述, 请自行替换
        link: 'http://shengtai.ende168.com/?shareUserId='+this.id+'#/home', // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'http://shengtai.ende168.com/img/logo.png', // 分享图标, 请自行替换，需要绝对路径
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
    onPhoto() {
      // 保存到相册
      this.show = true
      
    },
    onPClose() {
      //关闭图片
      this.show = false
    },
    onShowImg() {
      var _this = this
      var urls = []
      urls.push(_this.TUrl+'app/wx/share/shareImage?currentUserId='+_this.id)
      wxapi.previewImage({
        current: _this.TUrl+'app/wx/share/shareImage?currentUserId='+_this.id,
        urls: urls
      })
    },
    onWallet() {
      // 我的钱包
      this.$router.push({
        path: '/myWallet'
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
    onPointDetail(){
      // 我的积分
      this.$router.push({
        path: '/pointDetail'
      })
    },
    onMyTeam() {
      // 我的队伍
      this.$router.push({
        path: '/myTeam'
      })
    },
    onUser() {
      // 推荐普通用户
      this.$router.push({
        path: '/userRecommended'
      })
    },
    onMember() {
      // 推荐会员
      this.$router.push({
        path: '/memberRecommended'
      })
    },
    onPartner() {
      // 推荐合伙人
      this.$router.push({
        path: '/partnerRecommended'
      })
    },
    onPartnerApply() {
      // 申请合伙人
      this.$router.push({
        path: '/partnerApply'
      })
    },
    onPartnerRule() {
      // 合伙人规则
      this.$router.push({
        path: '/partnerRule'
      })
    },
    onMemberDescription() {
      // 会员申请和会员规则
      this.$router.push({
        path: '/memberDescription'
      })
    },
    onStayHandle(){
      //待处理订单
      this.$router.push({
        path: '/pendingOrder'
      })
    },
    onDeliverGoods(){
      //已发货订单
      this.$router.push({
        path: '/shopedOrder'
      })
    },
    onComplete(){
      //已完成订单
      this.$router.push({
        path: '/completedOrder'
      })
    },
    onLoginOut() {
      // 退出登录
      var _this = this
      localStorage.setItem("ende-ecology-toke", "")
      localStorage.setItem("ende-ecology-userinfo", "")
      localStorage.setItem("ende-ecology-freshTime", "");
      setTimeout(function() {
        var shareUserId = commonUtil.parseUrlParams('shareUserId')
        var productId = commonUtil.parseUrlParams('productId')
        window.location.href = 'http://shengtai.ende168.com/?shareUserId='+shareUserId+'&productId='+productId+'#/login'
      }, 1000);
    },
    onLogin() {
      // 登录
      var _this = this
      setTimeout(function() {
        var shareUserId = commonUtil.parseUrlParams('shareUserId')
        window.location.href = 'http://shengtai.ende168.com/?shareUserId='+shareUserId+'#/login'
        var productId = commonUtil.parseUrlParams('productId')
        window.location.href = 'http://shengtai.ende168.com/?shareUserId='+shareUserId+'&productId='+productId+'#/login'
      }, 500);

    }
  }
}
</script>
<style scoped>
.personal{
  padding-bottom: 50px;
}

/* 未登录 start */
.un-div{
  text-align: center;
  padding-top: 25%;
}
.un-img{
  height: 10rem;
  margin: 2rem;
}
.un-img .van-image{
  height: 10rem;
}
.un-text{
  color: #666;
}
.un-btn{
  padding: 2rem 3rem;
}
/* 未登录 end */

/* 我的信息 start */
.personal-top{
  background: #fff;
  padding: .75rem;
}
.personal-label{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .75rem;
}
.personal-text{
  display: flex;
  align-items: center;
}
.personal-img{
  width:3.75rem;
  height:3.75rem;
  margin-right: 1rem;
  position: relative;
}
.personal-img-head{
  width:3.75rem;
  height:3.75rem;
  border-radius:50%;
  overflow: hidden;
}
.personal-img .van-image:nth-of-type(1){
  width:3.75rem;
  height:3.75rem;
}
.personal-img .van-image:nth-of-type(2){
  width: 1.22rem;
  height: 1.28rem;
  position: absolute;
  bottom: 0;
  right: 0;
}
.personal-code{
  width: 2.5rem;
  height: 2.5rem;
}
.personal-code .van-image{
  width: 2.5rem;
  height: 2.5rem;
}
.personal-username{
  font-size: 1.06rem;
  font-weight: 500;
  line-height: 2.5rem;
}
.personal-phone{
  color: #666;
}

.personal-icon{
  padding: 0 .75rem .75rem .75rem;
}
.personal-icon-btn{
  width: 4rem;
  height: 1.2rem;
  line-height: 1.2rem;
  background: linear-gradient(0deg,rgba(20,117,255,1) 0%,rgba(47,201,253,1) 100%);
  border-radius: 1rem;
  color: #fff;
  font-size: .8rem;
  text-align: center;
}
.member{
  background:linear-gradient(0deg,rgba(255,236,169,1),rgba(230,195,119,1));
}
.partner{
  background:linear-gradient(0deg,rgba(254,151,60,1) 0%,rgba(255,196,92,1) 100%);
}
/* 我的信息 end */

/* 个人订单 start */
.personal-div{
  border-radius: 0.38rem;
  background: #fff;
  margin: .75rem;
  overflow: hidden;
}
.personal-div-title{
  border-bottom: .03rem solid rgba(221,221,221,.8);
  
}
.personal-div-content-li{
  position: relative;
  padding: 3px 0;
  
}
.personal-div-content-li:not(:last-child):before{
  position: absolute;
  bottom: 0;
  right: 0;
  content: '';
  width: 90%;
  background: rgba(221,221,221,.8);
  height: .03rem;
  z-index: 1;
}
.personal-div-content{
  padding: 1.1rem 0;
  font-size: .75rem;
}
.personal-div-icon{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.personal-div-icon-img{
  width: 2rem;
  height: 2rem;
  margin-bottom: .5rem;
}
.personal-div-content .van-col:nth-of-type(1) .personal-div-icon-img .van-image{
  width: 2rem;
  height: 2rem;
}
.personal-div-content .van-col:nth-of-type(2) .personal-div-icon-img .van-image{
  width: 2.3rem;
  height: 2rem;
}
.personal-div-content .van-col:nth-of-type(3) .personal-div-icon-img .van-image{
  width: 2rem;
  height: 2rem;
}
.btn{
  padding: .5rem 2rem;
}
/* 个人订单 end */

/* 我的钱包 start */
.personal-div-wallet{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.personal-wallet-item{
  text-align: center;
}
.personal-wallet-money{
  font-size: 1.44rem;
  font-weight: 500;
  color: #199BFF;
}
.personal-wallet-name{
  font-size: .75rem;
  margin-top: .4rem;
}
.personal-wallet-btn{
  margin-top: 1rem;
}
.personal-wallet-btn .van-image{
  width: 1.19rem;
  height: 1.19rem;
}
.personal-wallet-icon{
  width: 2.91rem;
  height: 1.19rem;
  border: .03rem solid #199BFF;
  border-radius: 1.19rem;
  color: #199BFF;
  margin: auto;
  line-height: 1.19rem;
}
/* 我的钱包 end */

/* 我的队伍 start */
.personal-team-title-value{
  color: #666;
  font-size: .75rem;
}
.personal-team-item-value{
  color: #222;
  font-size: .94rem;
  font-weight: 500;
}
/* 我的队伍 end */

/* 积分池 start */
.personal-div-icon-money{
  font-size: 1.31rem;
  font-weight: 500;
  line-height: 2rem;
}
.personal-div-icon-person{
  margin-top: .5rem;
  color: #F8BB00;
  display: flex;
  align-items: center;
  font-size: .88rem;
}
.personal-div-icon-person .van-image{
  width: 2rem;
  height: .93rem;
}
/* 积分池 end */

/* 保存到相册 start */
.van-popup{
  background: unset!important;
}
.popup-img{
  border-radius: .5rem;
  overflow: hidden;
}
.share-close-view{
  text-align: center;
  margin-top: 1.5rem;
}
.share-close-view .van-image{
  height: 2rem;
  width: 2rem;
}
/* 保存到相册 end */

.btn{
  padding: 2rem;
}
</style>
