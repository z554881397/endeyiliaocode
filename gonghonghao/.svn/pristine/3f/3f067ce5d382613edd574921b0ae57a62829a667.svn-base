import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import BindPhone from '../views/bindPhone.vue'

import Home from '../views/product/home.vue'
import ProductDetail from '../views/product/productDetail.vue'
import SureOrder from '../views/product/sureOrder.vue'
import PaySuccess from '../views/product/paySuccess.vue'
import PayFail from '../views/product/payFail.vue'
import AddressList from '../views/product/addressList.vue'
import AddressAdd from '../views/product/addressAdd.vue'
import AddressModify from '../views/product/addressModify.vue'
import MemberDescription from '../views/product/memberDescription.vue'

import Personal from '../views/personal/personal.vue'
import MyWallet from '../views/personal/myWallet.vue'
import Withdraw from '../views/personal/withdraw.vue'
import WithdrawPwd from '../views/personal/withdrawPwd.vue'
import MyWalletDetail from '../views/personal/myWalletDetail.vue'
import MemberRecommended from '../views/personal/memberRecommended.vue'
import PartnerRecommended from '../views/personal/partnerRecommended.vue'
import UserRecommended from '../views/personal/userRecommended.vue'
import PartnerApply from '../views/personal/partnerApply.vue'
import PartnerRule from '../views/personal/partnerRule.vue'
import PendingOrder from '../views/personal/pendingOrder.vue'
import ShopedOrder from '../views/personal/shopedOrder.vue'
import CompletedOrder from '../views/personal/completedOrder.vue'
import OrderDetail from '../views/personal/orderDetail.vue'
import OrderLogistics from '../views/personal/orderLogistics.vue'
import PointDetail from '../views/personal/pointDetail.vue'
import MyTeam from '../views/personal/myTeam.vue'

import AboutUs from '../views/aboutus/aboutUs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '恩德商城',
          keepAlive: true //此组件需要被缓存
        }
      },
      {
        path: '/personal',
        name: 'personal',
        component: Personal,
        meta: {
          title: '个人中心',
          keepAlive: true //此组件需要被缓存
        }
      },
      {
        path: '/aboutUs',
        name: 'aboutUs',
        component: AboutUs,
        meta: {
          title: '关于我们',
          keepAlive: true //此组件需要被缓存
        }
      }

    ]
  },{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    }
  },{
    path: '/bindPhone',
    name: 'bindPhone',
    component: BindPhone,
    meta: {
      title: '绑定手机号',
    }
  },{
    path: '/productDetail',
    name: 'productDetail',
    component: ProductDetail,
    meta: {
      title: '详情',
    }
  },{
    path: '/sureOrder',
    name: 'sureOrder',
    component: SureOrder,
    meta: {
      title: '确认订单',
    }
  },{
    path: '/paySuccess',
    name: 'paySuccess',
    component: PaySuccess,
    meta: {
      title: '支付成功',
    }
  },{
    path: '/payFail',
    name: 'payFail',
    component: PayFail,
    meta: {
      title: '支付失败',
    }
  },{
    path: '/addressList',
    name: 'addressList',
    component: AddressList,
    meta: {
      title: '收货地址',
    }
  },{
    path: '/addressAdd',
    name: 'addressAdd',
    component: AddressAdd,
    meta: {
      title: '添加收货地址',
    }
  },{
    path: '/addressModify',
    name: 'addressModify',
    component: AddressModify,
    meta: {
      title: '编辑收货地址',
    }
  },{
    path: '/memberDescription',
    name: 'memberDescription',
    component: MemberDescription,
    meta: {
      title: '会员说明',
    }
  },{
    path: '/myWallet',
    name: 'myWallet',
    component: MyWallet,
    meta: {
      title: '我的钱包',
    }
  },{
    path: '/withdraw',
    name: 'withdraw',
    component: Withdraw,
    meta: {
      title: '提现',
    }
  },{
    path: '/withdrawPwd',
    name: 'withdrawPwd',
    component: WithdrawPwd,
    meta: {
      title: '设置提现密码',
    }
  },{
    path: '/myWalletDetail',
    name: 'myWalletDetail',
    component: MyWalletDetail,
    meta: {
      title: '余额明细',
    }
  },{
    path: '/memberRecommended',
    name: 'memberRecommended',
    component: MemberRecommended,
    meta: {
      title: '推荐会员',
    }
  },{
    path: '/partnerRecommended',
    name: 'partnerRecommended',
    component: PartnerRecommended,
    meta: {
      title: '推荐合伙人',
    }
  },{
    path: '/userRecommended',
    name: 'userRecommended',
    component: UserRecommended,
    meta: {
      title: '推荐普通用户',
    }
  },{
    path: '/partnerApply',
    name: 'partnerApply',
    component: PartnerApply,
    meta: {
      title: '申请合伙人',
    }
  },{
    path: '/partnerRule',
    name: 'partnerRule',
    component: PartnerRule,
    meta: {
      title: '合伙人规则',
    }
  },{
    path: '/pendingOrder',
    name: 'pendingOrder',
    component: PendingOrder,
    meta: {
      title: '待处理订单',
    }
  },{
    path: '/shopedOrder',
    name: 'shopedOrder',
    component: ShopedOrder,
    meta: {
      title: '已发货订单',
    }
  },{
    path: '/completedOrder',
    name: 'completedOrder',
    component: CompletedOrder,
    meta: {
      title: '已完成订单',
    }
  },{
    path: '/orderDetail',
    name: 'orderDetail',
    component: OrderDetail,
    meta: {
      title: '订单详情',
    }
  },{
    path: '/orderLogistics',
    name: 'orderLogistics',
    component: OrderLogistics,
    meta: {
      title: '物流信息',
    }
  },{
    path: '/pointDetail',
    name: 'pointDetail',
    component: PointDetail,
    meta: {
      title: '积分明细',
    }
  },{
    path: '/myTeam',
    name: 'myTeam',
    component: MyTeam,
    meta: {
      title: '我的团队',
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default router
