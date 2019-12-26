

export default {
    // 登录账号
    dologin: { url:'app/user/login', method: 'post', file: '' },
    // 微信登录
    weixinLogin: { url:'app/user/wxLogin/v2', method: 'post', file: '' },
    // 发送登录短信验证码
    getCaptcha: { url:'system/msmCode/login', method: 'get', file: '' },
    // 查询当前用户信息以及账户信息
    findCurrentUserAccountInfo: { url:'app/user/account/findCurrentUserAccountInfo', method: 'get', file: '' },
    // 用户二维码
    userQrCode: { url:'app/user/userQrCode', method: 'get', file: '' },
    //绑定手机号码
    bindTelephone: { url:'app/user/bindTelephone', method: 'post', file: '' },
    //刷新token
    refreshToken: { url:'app/user/token/refresh', method: 'post', file: '' },

    //产品列表接口
    listProduct: { url:'app/product/listPage', method: 'get', file: ''},
    //根据产品id查询产品详情
    findProductInfo: { url:'app/product/findByProductId', method: 'get', file: ''},

    //用户地址列表接口
    listClientAddress: { url: 'app/user/address/listByClient', method: 'get', file: ''},
    //设置地址为默认地址
    editAddressCommonStatus: { url: 'app/user/address/commonStatus/update', method: 'post', file: ''},
    //添加地址
    addAddress: { url: 'app/user/address/add', method: 'post', file: ''},
    //编辑地址
    editAddress: { url: 'app/user/address/update', method: 'post', file: ''},
    //删除地址
    delAddress: { url: 'app/user/address/delete', method: 'post', file: ''},
    //主键查询地址信息
    findAddressById: { url: 'app/user/address/findById', method: 'get', file: ''},

    //订单接口
    //下单
    createOrder: { url: 'app/order/add', method: 'post', file: 'json'},
    //微信支付
    wxPay: { url: 'app/order/wxPay', method: 'post', file: ''},
    //微信公众号 接口凭证加密
    jsApiTicketSign: { url: 'app/wx/share/jsApiTicketSign', method: 'post', file: ''},
    // 获取openId
    getOpenId: { url: 'app/user/openId', method: 'post', file: ''},

    //查询订单列表
    listOrder:{ url: 'app/order/listPage', method: 'get', file: ''},
    //订单详情
    toOrderInfo:{ url: 'app/order/findByGroupId', method: 'get', file: ''},
    //物流信息
    toLogistics:{ url: 'app/order/findExpressInfo', method: 'get', file: ''},
    //计算价格
    calculationPrice:{ url: 'app/order/calculatePrice', method: 'post', file: 'json'},
    // 假支付
    orderPay:{ url: 'app/order/orderPay', method: 'post', file: ''},
    // 获取随机数
    uuid:{ url: 'system/uuid', method: 'get', file: ''},


    //我的钱包
    walletMore:{ url: 'app/user/account/listCapitalFlow', method: 'get', file: ''},
    //验证用户是否设置了提现密码
    ifPassword:{ url: 'app/user/account/withdraw/password/check', method: 'post', file: ''},
    //发送提现验证码
    msmCode:{ url: 'system/msmCode/withdraw', method: 'get', file: ''},
    //设置提现密码
    setUpPwd:{ url: 'app/user/account/withdraw/password/edit', method: 'post', file: ''},
    //提现申请
    applyWithdraw:{ url: 'app/user/account/withdraw', method: 'post', file: ''},

    //积分明细
    integralInfo:{ url: 'app/user/score/listPage', method: 'get', file: ''},

    //推荐用户
    recommendUser:{ url: 'app/user/listChildUser', method: 'get', file: ''},

    //申请合伙人
    //上传图片
    uploadImg:{ url: 'system/upload', method: 'post', file: 'file'},
    //申请
    applyAdd:{ url: 'app/partner/apply/recode/add', method: 'post', file: ''},

    //绑定上级关系
    bindParent: { url: 'app/user/bindParent', method: 'post', file: ''},

}
