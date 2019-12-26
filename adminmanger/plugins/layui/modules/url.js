var u = {
    TUrl : 'http://192.168.1.215:9094/cherrytea-admin/',
    ImgUrl : 'http://192.168.1.215:9094/cherrytea-admin/',
    orderUrl : 'http://192.168.1.134:8080/mall/',
    ototal:'http://www.hellooop.com:8080/',
    exaURL: function() {
        var property = decodeURI(window.location.href).split("?")[1];
        var val = property.split("=")[1];
        return val;
    },formVerify: function(elem) { /* 表单验证 */
        var value = [];
        var titls = [];
        var numty = [];
        var phty = [];
        var pwdIfy = [];
        var files = [];
        var fileVal = [];
        var zheng = [];
        $("#" + elem).find(".layui-input-inline>.layui-input,.layui-input-inline>.layui-select,textarea").each(function() {
            var title = $(this).attr("placeholder");
            var num = $(this).attr("numbers");
            var num0 = $(this).attr("numbersz");
            var phone = $(this).attr("phone");
            var pwd = $(this).attr("pwd");
            var filez = $(this).attr("files");
            var imgVal = $(this).attr("imgVal");
            if(title != "请选择" && title) {
                if(title.indexOf("请输入") != -1) {
                    title = title.substring(title.indexOf() + 4)
                }
                value.push($.trim(this.value))
                numty.push(num)
                phty.push(phone)
                pwdIfy.push(pwd)
                titls.push(title)
                files.push(filez)
                fileVal.push(imgVal)
                zheng.push(num0)
            }
        })
        for(var i = 0; i < value.length; i++) {
            if(files[i] != "file") {
                if(titls[i] != "请选择") {
                    if(!value[i]) {
                        layer.msg("请先填选" + titls[i])
                        return false;
                    }
                }
            }
            if(phty[i] == "phone") {
                if(!this.isverify.phones(value[i]) && !this.isverify.mobile(value[i])) {
                    layer.msg(titls[i] + "不正确")
                    return false;
                }
            }
            if(numty[i] == "number") {
                if(!this.isverify.numbers(value[i])) {
                    layer.msg(titls[i] + "只能是数字")
                    return false;
                }
            }
            if(zheng[i] == "numbers") {
                if(!this.isverify.number0(value[i])) {
                    layer.msg(titls[i] + "只能是正整数")
                    return false;
                }
            }
            if(pwdIfy[i] == "pwd") {
                if(!this.isverify.pwd(value[i])) {
                    layer.msg(titls[i] + "只能是8~16位数字与英文字母的组合")
                    return false;
                }
            }
            if(files[i] == "file") {
                if(!fileVal[i]) {
                    layer.msg("请先上传" + titls[i])
                    return false;
                }
            }
        }
        return true;
    },go: function(url) {
        window.location.href = url;
    },
        //
}