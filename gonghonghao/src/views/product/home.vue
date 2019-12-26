<template>
    <div class="home">
        <div>
            <waterfall v-if="list" :col='col' :width="itemWidth" :gutterWidth="gutterWidth"  :data="list"  @loadmore="onLoad" >
                <template >
                    <div class="goods-div"
                        v-for="(goods, index) in list" 
                        :key="goods.id"
                        @click="onDetail(goods.id)"
                    >
                        <div class="goods-img">
                            <van-image fit="contain" :src="goods.smallPic"></van-image>
                        </div>
                        <div class="good-label">
                            <div class="goods-title">{{goods.name}}</div>
                            <div class="goods-text">
                                <div class="goods-price">
                                    <span>￥</span>
                                    <span>{{goods.priceRange|formatNum}}</span>
                                </div>
                                <div class="goods-sales">
                                    <span>销量：</span>
                                    <span>{{goods.salesVolume|formatNum}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </waterfall>
           

        </div>
    </div>
</template>

<script>
import api from '../../api';
import constConfig from '../../api/config.js';
import commonUtil from '@/assets/js/commonUtil.js';

export default {
    name: "home",
    data() {
        return {
            publicPath: process.env.BASE_URL,
            loading: false,
            finished: false,
            totalPage: 0, // 所有页数
            pageIndex: 1, // 第几页
            pageSize: 10,
            list: "",
            col: 2
        }
    },
    created(){
        this.$store.commit("onPageList", "");
        if(this.$store.state.productId){
            this.$router.push({
                path: '/productDetail',
                query: {
                    id: this.$store.state.productId
                }
            })
        }
    },
    activated() {
        this.onLoad()
    },
    computed:{
        itemWidth(){  
            var width = (document.body.clientWidth- 30) / 2;
            return width
        },
        gutterWidth(){
            return 10
        }
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
            let _this = this;
            _this.loading = true
            api.listProduct({
                page: this.pageIndex,
                limit: this.pageSize
            }).then(res => {
                if (res.code === 200) {
                    if (res.data && res.data.list.length > 0) {
                        let resList = res.data.list;
                        for (let i = 0; i < resList.length; i++) {
                            let good = resList[i];
                            let smallPic = good.smallPic;
                            if (smallPic) {
                                //重新复制产品图片,后台存储的是用逗号隔开的路劲,这里只取第一个
                                good.smallPic = smallPic.split(',')[0];
                            }
                        }
                        if (_this.list) {
                            var list = _this.list.concat(res.data.list);
                            _this.list = list
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
        onDetail(id) {
            this.$router.push({
                path: '/productDetail',
                query: {
                    id: id
                }
            })
        },
    }
};
</script>
<style scoped>
.home>div{
    padding-bottom: 50px;
    padding-top: 10px;
}
/* productlist start */
.home >>> .vue-waterfall-column{
    margin-left: 10px;
}
.goods-div {
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 10px;
}
.goods-img {
  background: #f8f8f8;
  width: 100%;
}
.goods-img .van-image {
  width: 100%;
}
.goods-img >>> .van-image__error{
  height: 10.69rem;
  position: unset;
}
.good-label {
  padding: 0 0.7rem;
}
.goods-title {
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.25rem;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.goods-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.7rem 0;
}
.goods-price {
  width: 50%;
  font-size: 0.88rem;
  font-weight: 400;
  color: #ed1f1f;
}
.goods-price>span:nth-of-type(2){
  font-size: 1rem;
}
.goods-sales {
  width: 50%;
  font-size: 0.75rem;
  font-weight: 500;
  color: #999999;
  text-align: right;
}
/* productlist end */
    
</style>

