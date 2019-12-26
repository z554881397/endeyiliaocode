import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import MyComponents from './components' // 导入组件

import * as custom from './filters'

// 引入 MUI （@表示 src 文件夹）
import mui from '@/assets/js/mui.js'
// 挂载到VUE实例上
Vue.prototype.$mui = mui

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

Vue.use(Vant)
Vue.use(MyComponents)

Vue.config.productionTip = false

// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  // console.log(key)
  Vue.filter(key, custom[key])
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path == '/login') {
    var arr = "home,personal,aboutUs";
    store.commit("onPageList", arr);
  }
  next()
})

var myapp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default myapp
