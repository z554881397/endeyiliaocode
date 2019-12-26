<template>
  <div class="sku-goods-div">
    <div class="sku-goods-img">
      <van-image fit="contain" :src="selectGoodsDetail.productImage ? selectGoodsDetail.productImage.split(',')[0] :''"></van-image>
    </div>
    <div class="sku-goods-label">
      <div>{{selectGoodsDetail.productName}}</div>
      <div>{{selectGoodsDetail.skuName}}</div>
      <div>
        <div>￥{{selectGoodsDetail.price | formatPrice}}</div>
        <div v-if="selectGoodsDetail.count">x{{selectGoodsDetail.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderGoods",
  props: {
    selectGoodsDetail: {
      type: Object,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
/* goodsOrder start */
.sku-goods-div {
  display: flex;
  align-items: center;
}
.sku-goods-img {
  width: 6.75rem;
  height: 6.8rem;
  margin-right: 1rem;
  background: #f8f8f8;
  flex-shrink: 0;
}
.sku-goods-img .van-image {
  width: 6.75rem;
  height: 6.75rem;
}
.sku-goods-label{
  width: 100%;
}
.sku-goods-label > div:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.sku-goods-label > div:nth-of-type(2) {
  font-size: 0.75rem;
  color: #666;
  padding: 0.6rem 0;
}
.sku-goods-label > div:nth-of-type(3) {
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}
.sku-goods-label > div:nth-of-type(3) > div:nth-of-type(1) {
  color: #ed1f1f;
}

/* goodsOrder end */
</style>