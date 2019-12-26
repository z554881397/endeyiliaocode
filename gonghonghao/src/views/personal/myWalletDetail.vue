<template>
  <div class="myWalletDetail">
    <van-tabs v-model="active" 
      sticky
      title-active-color="#199BFF"
      title-inactive-color="#222222"
      color="#199BFF"
      line-width="47"
    >
      <van-tab title="全部">
        <div class="my-wallet-content">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="my-wallet-item" v-for="dataList in list" :key="dataList.id">
              <van-cell :title="dataList.typeName" :label="dataList.createTime">
                <span class="my-wallet-item-value" :style="dataList.type==1?'color:red':''">
                  {{dataList.type==1?'+':'-'}}￥{{dataList.transactionMoney|formatPrice}}
                </span>
              </van-cell>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="收入">
        <div class="my-wallet-content">
          <van-list
            v-model="loading1"
            :finished="finished1"
            finished-text="没有更多了"
            @load="onLoad1"
          >
            <div class="my-wallet-item" v-for="dataList in list1" :key="dataList.id">
              <van-cell :title="dataList.typeName" :label="dataList.createTime">
                <span class="my-wallet-item-value add">
                  +￥{{dataList.transactionMoney|formatPrice}}
                </span>
              </van-cell>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="支出">
        <div class="my-wallet-content">
          <van-list
            v-model="loading2"
            :finished="finished2"
            finished-text="没有更多了"
            @load="onLoad2"
          >
            <div class="my-wallet-item" v-for="dataList in list2" :key="dataList.id">
              <van-cell :title="dataList.typeName" :label="dataList.createTime">
                <span class="my-wallet-item-value">
                  -￥{{dataList.transactionMoney|formatPrice}}
                </span>
              </van-cell>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'myWalletDetail',
  data(){
    return{
      active: 0,

      loading: false,
      finished: false,
      totalPage: 0, // 所有页数
      pageIndex: 1, // 第几页
      pageSize: 10,
      list: "",
      
      loading1: false,
      finished1: false,
      totalPage1: 0, // 所有页数
      pageIndex1: 1, // 第几页
      pageSize1: 10,
      list1: "",
      
      loading2: false,
      finished2: false,
      totalPage2: 0, // 所有页数
      pageIndex2: 1, // 第几页
      pageSize2: 10,
      list2: "",
    }
  },
  created() {},
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
      api.walletMore({
        page: this.pageIndex,
        limit: this.pageSize
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
    onLoad1() {
      // 分页加载
      if (this.finished1) {
        return;
      }
      if (this.pageIndex1 === 1) {
        this.getList1();
      } else if (this.totalPage1 > (this.pageIndex1 - 1) * this.pageSize1) {
        this.getList1();
      }
    },
    getList1() {
      var _this = this;
      api.walletMore({
        page: this.pageIndex1,
        limit: this.pageSize1,
        type:1
      }).then(res => {
        if (res.code === 200) {
          if (res.data.list.length > 0) {
            if (_this.list1) {
              _this.list1 = _this.list1.concat(res.data.list);
            } else {
              _this.list1 = res.data.list;
            }
            _this.totalPage1 = res.data.total;
            // 加载状态结束
            _this.loading1 = false;
            if (_this.totalPage1 <= _this.pageIndex1 * _this.pageSize1) {
              // 数据全部加载完成
              _this.finished1 = true;
            }
            _this.pageIndex1 += 1;
          } else {
            _this.loading1 = false;
            _this.finished1 = true;
          }
        } else {
          _this.$toast(res.msg);
        }
      });
    },
    onLoad2() {
      // 分页加载
      if (this.finished2) {
        return;
      }
      if (this.pageIndex2 === 1) {
        this.getList2();
      } else if (this.totalPage2 > (this.pageIndex2 - 1) * this.pageSize2) {
        this.getList2();
      }
    },
    getList2() {
      var _this = this;
      api.walletMore({
        page: this.pageIndex2,
        limit: this.pageSize2,
        type:2
      }).then(res => {
        if (res.code === 200) {
          if (res.data.list.length > 0) {
            if (_this.list2) {
              _this.list2 = _this.list2.concat(res.data.list);
            } else {
              _this.list2 = res.data.list;
            }
            _this.totalPage2 = res.data.total;
            // 加载状态结束
            _this.loading2 = false;
            if (_this.totalPage2 <= _this.pageIndex2 * _this.pageSize2) {
              // 数据全部加载完成
              _this.finished2 = true;
            }
            _this.pageIndex2 += 1;
          } else {
            _this.loading2 = false;
            _this.finished2 = true;
          }
        } else {
          _this.$toast(res.msg);
        }
      });
    },
    
  }
}
</script>
<style scoped>
.myWalletDetail{
  height: 100%;
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
.my-wallet-item-value.add{
  color: #ED1F1F
}
</style>
