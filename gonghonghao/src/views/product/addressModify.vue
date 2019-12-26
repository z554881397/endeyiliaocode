<template>
  <div class="addressModify">
    <van-cell-group>
      <van-field
        v-model="name"
        clearable
        label="收货人"
        placeholder="请输入收货人姓名"
      />
      <van-field
        v-model="phone"
        type="tel"
        label="手机号码"
        placeholder="请输入收货人手机号码"
      />
      <van-cell class="address-area" title="所在地区" is-link @click="onArea">
        <span>{{area}}</span>
      </van-cell>
      <van-field
        v-model="address"
        rows="2"
        autosize
        label="详细地址"
        type="textarea"
        maxlength="50"
        placeholder="请输入收货的详情地址(街道)"
        show-word-limit
      />
      <van-cell title="设为默认">
        <span>
          <van-switch
            :value="checked"
            active-color="#35AE3E"
            size="20px"
            @input="onInput"
          />
        </span>
      </van-cell>
    </van-cell-group>
    
    <div class="btn">
      <van-button type="info" block @click="onSave">保存</van-button>
      <van-button plain hairline block type="danger" @click="onDel">删除</van-button>
    </div>
    
    <van-popup v-model="show" position="bottom">
      <van-area :area-list="areaList" :value="code" @confirm="onConfirm" @cancel="onClose" />
    </van-popup>
  </div>
</template>

<script>
import api from '../../api';
import areaList from "@/assets/js/area.js";
export default {
  name: 'addressModify',
  data(){
    return{
      id: '', // 地址id
      areaList: areaList,
      name: '', // 收货人
      phone: '', // 手机号码
      province: '',
      city: '',
      areaName: '',
      area: '请选择', // 所在地区
      code: '', // 所在地区码
      address: '', // 详细地址
      checked: false, // 设为默认
      show: false, // 
    }
  },
  created() {
    //解析从列表页面传递过来的地址详情
    let addressInfo = this.$route.query;
    this.id = addressInfo.id;
    this.name = addressInfo.receiverName;
    this.phone = addressInfo.receiverTelephone;
    //转化收货地址
    this.province = addressInfo.province
    this.city = addressInfo.city
    this.areaName = addressInfo.area
    this.area = addressInfo.province + addressInfo.city + addressInfo.area;
    this.code = addressInfo.addressCode;
    this.address = addressInfo.detailAddress;
    this.checked = addressInfo.isCommonAddress == 1 ? true : false;
  },
  activated() {

  },
  methods: {
    onArea() {
      this.show = true
    },
    onConfirm(e) {
      var province = e[0].name;
      var city = e[1].name;
      var area = e[2].name;
      this.province = province
      this.city = city
      this.areaName = area

      this.area = e[0].name + "/" + e[1].name + "/" + e[2].name;
      this.code = e[2].code;
      this.show = false;
    },
    onClose() {
      this.show = false
    },
    onInput() {
      this.checked = !this.checked
    },
    onSave() {
      // 保存
      let _this = this;
      if (!this.name) {
        this.$toast("请输入收货人姓名");
        return;
      }
      if (!this.phone) {
        this.$toast("请输入收货人手机号码");
        return;
      }
      if (!/^1[345789]\d{9}$/.test(this.phone)) {
        Toast("手机号码有误，请重填！");
        return;
      }
      if (!this.area) {
        this.$toast("请选择所在地区");
        return;
      }
      if (!this.address) {
        this.$toast("请输入收货的详情地址(街道)");
        return;
      }

      //编辑地址
      api.editAddress({
        id: this.id,
        receiverName: this.name,
        receiverTelephone: this.phone,
        province: this.province,
        city: this.city,
        area: this.areaName,
        addressCode: this.code,
        detailAddress: this.address,
        isCommonAddress: this.checked ? 1 : 0,
      }).then(res => {
        if(res.code == 200){
          //操作成功之后跳转回地址列表页面
          _this.$toast({
            message: res.msg,
            duration: 800,
            onClose: function () {
              _this.$router.back();
            }
          });

        }else{
          _this.$toast(res.msg);
        }
      });
    },
    onDel() {
      let _this = this;
      // 删除
      api.delAddress({
        id: this.id
      }).then(res => {
        if(res.code == 200){
          //操作成功之后跳转回地址列表页面
          _this.$toast({
            message: res.msg,
            duration: 800,
            onClose: function () {
              _this.$router.push({
                path: '/addressList'
              })
            }
          });

        }else{
          _this.$toast(res.msg);
        }
      });
    }
  }
}
</script>
<style scoped>
.van-cell {
  color: #666;
}
.van-field__control,.van-cell__value{
  color: #222;
}
.address-area .van-cell__title{
  flex: unset;
  width: 90px;
}
.address-area .van-cell__value{
  text-align: left;
}
.btn{
  padding: 1rem 3rem;
}
.btn button{
  margin-top: 2rem;
}
.van-button--plain{
  background: unset!important;
}
</style>
