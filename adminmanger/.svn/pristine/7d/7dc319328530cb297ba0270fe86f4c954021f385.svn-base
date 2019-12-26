var common;
layui.config({
    base: 'layui/modules/',
    version: '2.4.5'
}).use(['layer','common'], function () {
    var layer = layui.layer, device = layui.device();//设备信息
    common = layui.common;
    //阻止IE9以下访问
    if (device.ie && device.ie < 9) {
        layer.alert('最低支持ie9，您当前使用的是 IE' + device.ie + '！');
        throw new Error('最低支持ie9，您当前使用的是 IE' + device.ie + '！');
        return;
    }

});

