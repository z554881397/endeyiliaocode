<template>
  <div class="myTeam">
    <div class="my-team">
      <div class="my-team-img">
        <van-image fit="contain" :src="`${publicPath}img/my-team.png`"/>
      </div>
      <div class="my-team-money">{{detail.currentQuarterPerformance|formatPrice}}</div>
      <div class="my-team-label">团队总计销售额(元)</div>
    </div>

    <div class="my-wallet-div">
      <div class="my-wallet-item">
        <van-cell title="团队总人数">
          <span class="my-wallet-item-value">
            {{detail.teamPartnerUserCount+detail.teamVIPUserCount+detail.teamCommonUserCount}}
          </span>
        </van-cell>
      </div>
      <div class="my-wallet-item">
        <van-cell title="合伙人人数">
          <span class="my-wallet-item-value">
            {{detail.teamPartnerUserCount}}
          </span>
        </van-cell>
      </div>
      <div class="my-wallet-item">
        <van-cell title="会员人数">
          <span class="my-wallet-item-value">
            {{detail.teamVIPUserCount}}
          </span>
        </van-cell>
      </div>
      <div class="my-wallet-item">
        <van-cell :title="detail.performanceRemarks">
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'myTeam',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      detail: '',

    }
  },
  created() {
    this.init()
  },
  activated() {

  },
  methods: {
    init() {
      var _this = this
      api.findCurrentUserAccountInfo({}).then(res => {
        if(res.code == 200){
          _this.detail = res.data
        }else{
          _this.$toast(res.msg)
        }
      })
    },
  }
}
</script>
<style scoped>
.my-team{
  background: #fff;
  text-align: center;
  padding: 3rem;
}
.my-team-img{
  width: 3.2rem;
  height: 3.2rem;
  margin: auto;
}
.my-team-img .van-image{
  width: 3.2rem;
  height: 3.2rem;
}
.my-team-money{
  font-size: 2.25rem;
  font-weight: 500;
  margin-top: 1rem;
}
.my-team-label{
  margin-top: 1rem;
}
.my-wallet-div{
  margin-top: .63rem;
  background: #fff;
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
</style>
