<template>
  <div class="partnerRecommended">
    <div class="partner-recommended">
      <div class="partner-recommended-div">
        <div>{{today}}</div>
        <div>今日新增(人)</div>
      </div>
      <div class="partner-recommended-div">
        <div>{{totalPage}}</div>
        <div>我推荐的合伙人(人)</div>
      </div>
    </div>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
      <div class="user-recommended-content" v-for="dataList in list" :key="dataList.id">
        <div class="user-recommended-item">
          <van-cell :title="dataList.name ? dataList.name:dataList.account|deName">
            <span slot="label" class="user-recommended-item-label">
              {{dataList.account|phoneFilter}}
            </span>
            <span class="user-recommended-item-value">
              {{dataList.bindTime}}
            </span>
          </van-cell>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'partnerRecommended',
  data(){
    return{
      id: '',           // 用户id
      today:'0',        // 今日推荐

      loading: false,
      finished: false,
      totalPage: 0,     // 所有页数
      pageIndex: 1,     // 第几页
      pageSize: 10,
      list: "",

    }
  },
  created() {
    var id = localStorage.getItem('ende-ecology-userinfo')
    id = JSON.parse(id)
    this.id = id.id

    this.init()
  },
  activated() {

  },
  methods: {
    //今日推荐
    init(){
      var that = this
      api.recommendUser({page:1,limit:10,parentUserId:this.id,childRole:3,nowadaysAdd:1}).then(res => {
        if(res.code == 200){
          that.today = res.data.total
        }else{
          that.$toast(res.message)
        }
      })
    },
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
        let _this = this;
        api.recommendUser({
            parentUserId:this.id,
            childRole:3,
            page: this.pageIndex,
            limit: this.pageSize
        }).then(res => {
            if (res.code === 200) {
                if (res.data && res.data.list.length > 0) {
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
  }
}
</script>
<style scoped>
.partnerRecommended{
  height: 100%;
  background: #fff;
}
.partner-recommended{
  background: linear-gradient(72deg,rgba(25,144,255,1) 0%,rgba(25,187,255,1) 100%);
  border-radius: .5rem;
  margin: .75rem;
  padding: 2rem;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.partner-recommended-div{
  text-align: center;
}
.partner-recommended-div>div:nth-of-type(1){
  font-size: 1.88rem;

}
.partner-recommended-div>div:nth-of-type(2){
  font-size: .81rem;
  margin-top: 1rem;
}
.partner-recommended-item{
  position: relative;
  padding: 3px 0;
  
}
.partner-recommended-item:not(:last-child)::before{
  position: absolute;
  bottom: 0;
  right: 0;
  content: '';
  width: 96%;
  background: rgba(221,221,221,.8);
  height: .03rem;
  z-index: 1;
}
.partner-recommended-item-value{
  font-size: .81rem;
  color: #ED1F1F;
  font-weight: 500;
}
.partner-recommended-item-title{
  display: flex;
  flex-direction: column;
}
.partner-recommended-item-title>div:nth-of-type(1){
  color: #222;
}
.partner-recommended-item-title>div:nth-of-type(2){
  font-size: .88rem;
  color: #222;
}
.user-recommended-item{
  position: relative;
  padding: 3px 0;
  
}
.user-recommended-item:not(:last-child)::before{
  position: absolute;
  bottom: 0;
  right: 0;
  content: '';
  width: 96%;
  background: rgba(221,221,221,.8);
  height: .03rem;
  z-index: 1;
}
.user-recommended-item-label{
  font-size: 0.81rem;
  color: #222;
}
.user-recommended-item-value{
  font-size: .75rem;
  color: #999999;
}

</style>
