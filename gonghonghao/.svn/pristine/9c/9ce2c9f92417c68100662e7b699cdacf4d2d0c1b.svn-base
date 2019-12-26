<template>
  <div class="completedOrder">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="list.length>0"
    >
      <div class="completed-order-item" v-for="dataList in list" :key="dataList.groupId">
        <div class="completed-order-title">
          <div>订单编号：{{dataList.groupId}}</div>
          <div>已完成</div>
        </div>
        <div class="completed-order-content" v-for="selectGoodsDetail in dataList.list" :key="selectGoodsDetail.id" @click="onDetail(dataList.groupId)">
          <orderGoods :selectGoodsDetail="selectGoodsDetail"></orderGoods>
        </div>
        <div class="completed-order-btn">
          <van-button type="info" plain hairline size="small" @click="onLogistics(dataList.groupId)">查看物流</van-button>
        </div>
      </div>
    </van-list>
    <div class="completed-order-empty" v-else>
      <div class="completed-order-image">
        <van-image fit="contain" :src="`${publicPath}img/my-order-empty.png`"/>
      </div>
      <div class="completed-order-text">你还没有订单哦~</div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'completedOrder',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      loading: false,
      finished: false,
      totalPage: 0, // 所有页数
      pageIndex: 1, // 第几页
      pageSize: 10,
      list: "",
    }
  },
  created() {
    this.onLoad();
  },
  activated() {

  },
  methods: {
    onLoad() {
      // 分页加载
      if (this.finished) {
        return;
      }
      if (this.pageIndex === 1) {
        this.getList();
      } else if (this.totalPage > (this.pageIndex - 1) * this.pageSize) {
        this.getList();
      }
    },
    getList() {
      var _this = this;
      api.listOrder({
        page: this.pageIndex,
        limit: this.pageSize,
        orderState:4         // 订单状态 2待处理 3已发货 4已完成
      }).then(res => {
        if (res.code === 200) {
          if (res.data.list.length > 0) {
            if (_this.list) {
              _this.list = _this.list.concat(res.data.list);
            } else {
              _this.list = res.data.list;
            }
            _this.totalPage = res.data.total;
            // 加载状态结束
            _this.loading = false;
            if (_this.totalPage <= _this.pageIndex * _this.pageSize) {
              // 数据全部加载完成
              _this.finished = true;
            }
            _this.pageIndex += 1;
          } else {
            _this.loading = false;
            _this.finished = true;
          }
        } else {
          _this.$toast(res.msg);
        }
      });
    },
    onLogistics(groupId) {
      // 查看物流
      this.$router.push({
        path: '/orderLogistics',
        query:{groupId:groupId}
      })

    },
    onDetail(groupId){
      // 查看订单详情
      this.$router.push({
        path: '/orderDetail',
        query:{groupId:groupId,state:3}
      }) 
    }
  }
}
</script>
<style scope>
.completed-order-item{
  padding: 0 .75rem .75rem .75rem;
  margin: .75rem;
  background: #fff;
  border-radius: .5rem;
}
.completed-order-title{
  display: flex;
  justify-content: space-between;
  height: 3.5rem;
  align-items: center;
}
.completed-order-title>div:nth-of-type(2){
  font-weight: 500;
}
.completed-order-empty{
  margin-top: 20%;
}
.completed-order-image{
  width: 9.44rem;
  height: 8.78rem;
  margin: auto;
}
.completed-order-image .van-image{
  width: 9.44rem;
  height: 8.78rem;
}
.completed-order-text{
  text-align: center;
  color: #666666;
}
.completed-order-content{
  border-bottom: .03rem solid rgba(221,221,221,.8);
  padding-bottom: 1rem;
}
.completed-order-btn{
  padding-top: .75rem;
  text-align: right;
}
</style>