import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageList: '',
    receiveAddressId: '',//存储下单时的收货地址id

    productId: '', // 未登录分享产品id
    shareUserId: 0, // 分享人id
  },
  mutations: {
    /**
     * 下单是选中的地址
     * @param value
     */
    saveReceiveAddressId(state,value){
      state.receiveAddressId = value;
    },
    onPageList (state, value) {
      state.pageList = value
    },
    onProductId (state, value) {
      state.productId = value
    },
    onShareUserId (state, value) {
      state.shareUserId = value
    },
  },
  actions: {
  },
  modules: {
  }
})
