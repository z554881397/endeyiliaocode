import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageList: '',
    receiveAddressId: '',//存储下单时的收货地址id

    productId: '',
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
  },
  actions: {
  },
  modules: {
  }
})
