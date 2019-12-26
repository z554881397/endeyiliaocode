<template>
    <div class='addressList'>
        <div class="address-list">
            <div v-if='list && list.length>0'>
                <div class='address-list-div' v-for='(item,index) in list' :key='item.id'>
                    <div class='my-address'>
                        <div class='my-address-img'>
                            <van-image fit='contain' :src='`${publicPath}img/address-list-address.png`'></van-image>
                        </div>
                        <div class='my-address-content' @click="checkAddress(item.id)">
                            <div class='my-address-person'>
                                <span>{{item.receiverName}}</span>
                                <span>{{item.receiverTelephone}}</span>
                            </div>
                            <div class='my-address-address'>
                                {{item.province}}{{item.city}}{{item.area}}{{item.detailAddress}}
                            </div>
                        </div>
                    </div>
                    <div class='address-list-option'>
                        <div class='address-list-default'>
                            <div>设为默认地址</div>
                            <div>
                                <van-switch
                                        :value='item.isCommonAddress == 1'
                                        active-color='#07c160'
                                        size='18px'
                                        @input='onInput($event,index)'
                                />
                            </div>
                        </div>
                        <div class='address-list-btn'>
                            <div class='address-list-modify' @click='onModify(item)'>
                                <div>
                                    <van-image fit='contain'
                                               :src='`${publicPath}img/address-list-modify.png`'></van-image>
                                </div>
                                <div>编辑</div>
                            </div>
                            <div class='address-list-del' @click='onDel(item.id)'>
                                <div>
                                    <van-image fit='contain' :src='`${publicPath}img/address-list-del.png`'></van-image>
                                </div>
                                <div>删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class='address-list-empty'>
                <div class='address-list-empty-img'>
                    <van-image fit='contain' :src='`${publicPath}img/address-list-bg.png`'></van-image>
                </div>
                <div class='address-list-empty-text'>您还没有收货地址！</div>
            </div>
        </div>

        <div class='fixed-btn'>
            <div class='btn'>
                <van-button type='info' block @click='onAddressAdd'>+添加新地址</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../api";

export default {
  name: "addressList",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      list: ""[
        {
          id: "",
          clientId: "",
          receiverName: "",
          receiveSex: "",
          receiverTelephone: "",
          province: "",
          city: "",
          area: "",
          addressCode: "",
          detailAddress: "",
          isCommonAddress: "",
          updateTime: "",
          isDelete: ""
        }
      ] // 地址列表
    };
  },
  created() {
    //获取用户地址列表
    this.addressList();
  },
  activated() {},
  methods: {
    onInput(checked, index) {
      // 设为默认地址
      var text = checked
        ? "是否设该地址为默认地址？"
        : "是否取消该地址为默认地址？";
      this.$dialog
        .confirm({
          title: "提示",
          message: text
        })
        .then(() => {
          this.list[index].isCommonAddress = checked ? 1 : 0;
          //修改地址是否默认地址的状态
          api
            .editAddressCommonStatus({
              id: this.list[index].id,
              state: checked ? 1 : 0
            })
            .then(res => {
              //请求成功之后刷新列表
              if (res.code == 200) {
                //获取用户地址列表
                this.addressList();
              }
            });
        })
        .catch(() => {});
    },
    onModify(addressInfo) {
      // 编辑,跳转到编辑页面,传递参数id
      this.$router.push({
        path: "/addressModify",
        query: addressInfo
      });
    },
    onDel(id) {
      let _this = this;
      // 删除
      api
        .delAddress({
          id: id
        })
        .then(res => {
          if (res.code == 200) {
            //操作成功刷新页面
            _this.addressList();
            _this.$toast({
              message: res.msg,
              duration: 800,
              onClose: function() {
                _this.addressList();
              }
            });
          } else {
            _this.$toast(res.msg);
          }
        });
    },
    onAddressAdd() {
      // 添加新地址
      this.$router.push({
        path: "/addressAdd"
      });
    },
    /**
     * 获取当前用户地址列表
     */
    addressList() {
      api.listClientAddress().then(res => {
        if (res.code == 200) {
          let addressList = res.data;
          //转换为
          this.list = addressList;
        }
      });
    },
    /**
     * 点击地址,将地址的id存到store中,然后回退页面,取出地址id,进行收货地址的渲染
     * @param id
     */
    checkAddress(id) {
      //存储在state中
      this.$store.commit("saveReceiveAddressId", id);
      //然后跳转回下单页面
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.address-list {
  margin-bottom: 5rem;
}
.address-list-div {
  margin: 0.75rem;
  background: #fff;
  border-radius: 0.5rem;
}

/* 地址 start */
.my-address {
  display: flex;
  align-items: center;
  border-bottom: 0.05rem solid #dddddd;
  padding: 0.75rem;
}

.my-address-img {
  width: 1.88rem;
  height: 1.88rem;
  margin-right: 1rem;
  flex-shrink: 0;
  background: #f8f8f8;
}

.my-address-img .van-image {
  width: 1.88rem;
  height: 1.88rem;
}

.my-address-person {
  line-height: 2rem;
}

.my-address-person > span:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  margin-right: 2rem;
}

.my-address-person > span:nth-of-type(2) {
  color: #666;
}

.my-address-address {
  line-height: 1.19rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding: 0.5rem 0 0 0;
}

/* 地址 end */
.address-list-option {
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.address-list-default,
.address-list-btn {
  display: flex;
  align-items: center;
  color: #666666;
  font-size: 0.75rem;
}

.address-list-default > div:nth-of-type(1) {
  margin-right: 0.75rem;
}

.address-list-modify,
.address-list-del {
  display: flex;
  align-items: center;
  margin-left: 1.2rem;
}

.address-list-modify > div:nth-of-type(1),
.address-list-del > div:nth-of-type(1) {
  width: 0.94rem;
  height: 0.94rem;
  margin-right: 0.5rem;
  background: #f8f8f8;
}

.address-list-modify .van-image,
.address-list-del .van-image {
  width: 0.94rem;
  height: 0.94rem;
}

.address-list-empty {
  margin-top: 35%;
}

.address-list-empty-img {
  height: 6rem;
  width: 18rem;
  margin: auto;
  background: #f8f8f8;
}

.address-list-empty-img .van-image {
  height: 6rem;
  width: 18rem;
}

.address-list-empty-text {
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
}

.fixed-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 2;
}

.btn {
  padding: 0.5rem 2rem;
}
</style>
