<template>
  <div class="orderLogistics">
    <div class="app-content">
      <div class="logistics-card">
        <div class="logistics-card-img">
          <van-image fit="contain" :src="goods.productImage ? goods.productImage.split(',')[0] :''"></van-image>
        </div>
        <div class="logistics-card-text">
          <div>
            <span>快递名称：</span>
            <span>{{goods.expressName}}</span>
          </div>
          <div>
            <span>快递单号：</span>
            <span>{{goods.expressNo}}</span>
          </div>
          <div>
            <span>联系电话：</span>
            <span>{{telephone?telephone:''}}</span>
          </div>
        </div>
      </div>
      <div class="mine-list"></div>
      <div v-if="detail && detail.length>0">
        <van-steps direction="vertical" active-color="#199BFF" :active="active">
          <van-step v-for="item in detail" :key="item.id">
            <div>{{item.AcceptStation}}</div>
            <div class="step-label">{{item.AcceptTime}}</div>
          </van-step>
        </van-steps>
      </div>
      <div v-else class="logistics-empty">暂无物流信息~</div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index.js";
export default {
  name: "orderLogistics",
  data() {
    return {
      groupId: "",
      active: 0,
      listli:'',   // 订单详情
      goods: "",   // 产品详情
      detail: "",  // 物流详情
      telephone:'' //快递员手机号
    };
  },
  created() {
    this.groupId = this.$route.query.groupId;
    this.getDetail();
  },
  methods: {
    getDetail() {
      // 详情
      var _this = this;
      api.toOrderInfo({
          groupId: this.groupId
        })
        .then(res => {
          if (res.code == 200) {
            _this.listli = res.data;
            _this.goods = res.data.list[0];
            _this.getLogic(_this.goods.shoppingOrderNo);
          } else {
            _this.$toast(res.msg);
          }
        });
    },
    getLogic(shoppingOrderNo) {
      var _this = this;
      api.toLogistics({
          orderNo: shoppingOrderNo
        })
        .then(res => {
          if (res.code == 200) {
            _this.telephone = res.data.telephone;
            _this.detail = res.data.tracesList;
          } else {
            _this.$toast(res.msg);
          }
        });
    }
  }
};
</script>

<style scoped>
.logistics-card {
  display: flex;
  align-items: center;
  background: linear-gradient(72deg,rgba(25,144,255,1) 0%,rgba(25,187,255,1) 100%);
  border-radius: .5rem;
  margin: .75rem;
  padding: 1.5rem 1rem;
  color: #fff;
}
.logistics-card-img {
  width: 5.63rem;
  height: 5.63rem;
  border-radius: 0.3rem;
  margin-right: 2rem;
  background: #f8f8f8;
}
.logistics-card-img .van-image {
  width: 5.63rem;
  height: 5.63rem;
}
.logistics-card-text {
  line-height: 2rem;
}
.step-label {
  color: #999;
  font-size: 0.75rem;
}
.logistics-empty {
  margin-top: 1rem;
  text-align: center;
}
</style>
