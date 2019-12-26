<template>
  <div class="addressAdd">
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
      <van-cell :class="area!='请选择'?'address-area':'address-area-o'" title="所在地区" is-link @click="onArea">
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
    </div>
    
    <van-popup v-model="show" position="bottom">
      <van-area :area-list="areaList" :value="code" @confirm="onConfirm" @cancel="onClose" />
    </van-popup>
  </div>
</template>

<script>
import areaList from "@/assets/js/area.js";
import api from "../../api";
export default {
  name: 'addressAdd',
  data(){
    return{
      areaList: areaList,
      name: '', // 收货人
      phone: '', // 手机号码
      area: '请选择', // 所在地区
      province: '',
      city: '',
      areaName: '',
      code: '', // 所在地区码
      address: '', // 详细地址
      checked: false, // 设为默认
      show: false, // 
    }
  },
  created() {},
  activated() {

  },
  methods: {
    onArea() {
      this.show = true
    },
    onConfirm(e) {
      console.log(e);
      var province = e[0].name;
      var city = e[1].name;
      var area = e[2].name;
      this.province = province
      this.city = city
      this.areaName = area

      this.area = e[0].name + e[1].name + e[2].name;
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
      let _this = this;
      // 保存
      if (!this.name) {
        this.$toast("请输入收货人姓名");
        return;
      }
      if (!this.phone) {
        this.$toast("请输入收货人手机号码");
        return;
      }
      if (!/^1[345789]\d{9}$/.test(this.phone)) {
        this.$toast("手机号码有误，请重填！");
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

      //添加地址
      api.addAddress({
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
          //添加成功之后跳转回地址列表页面
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
.address-area-o .van-cell__value{
  color: #999999;

}
.btn{
  padding: 1rem 3rem;
}
.btn button{
  margin-top: 2rem;
}
</style>
