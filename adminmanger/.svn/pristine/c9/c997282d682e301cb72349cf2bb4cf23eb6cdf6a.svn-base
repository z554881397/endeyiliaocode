layui.define(["form","jquery"],function(exports){
    var form = layui.form,
        $ = layui.jquery,
        Address = function(divid){};
    var list

    Address.prototype.provinces = function() {
        //加载省数据
        var proHtml = '<option value="">请选择</option>',that = this;
        $.get("../../plugins/layui/modules/saddress.json", function (data) {
            list = data.data
            for (var i = 0; i < data.data.length; i++) {
                if(data.data[i].leveltype==1){
                    proHtml += '<option value="' + data.data[i].id + '">' + data.data[i].rname + '</option>';
                }
            }
            //初始化省数据
            var select = $("select[name=province]");
            select.append(proHtml);
            form.render();
            select.each( function( i , item ){
                var div = $(item).closest(".layui-form-item");
                form.on('select('+item.getAttribute("lay-filter")+')', function (proData) {
                    div.find("select[name=area]").html('<option value="">请选择县/区</option>');
                    var value = proData.value;
                    if (value !=null&&value!="") {
                        var arr = []
                        for (var i = 0; i < data.data.length; i++) {
                            if(data.data[i].pid==proData.value && data.data[i].leveltype==2){
                                arr.push(data.data[i])
                            }
                        }
                        that.citys(div , arr);
                    }else{
                        var others = div.find("select[name=city],select[name=area]");
                        others.attr("disabled", "disabled");
                        others.val("");
                        form.render();
                    }
                });
            })
        })
    }

    //加载市数据
    Address.prototype.citys = function(div , citys) {
        var cityHtml = '<option value="">请选择市</option>',that = this;
        for (var i = 0; i < citys.length; i++) {
            cityHtml += '<option value="' + citys[i].id + '">' + citys[i].rname + '</option>';
        }
        var select = div.find("select[name=city]");
        select.html(cityHtml).removeAttr("disabled");
        form.render();
        form.on('select('+select.attr("lay-filter")+')', function (cityData) {
            var value = cityData.value;
            if (value !=null&&value!="") {
                var arr = []
                for (var i = 0; i < list.length; i++) {
                    if(list[i].pid == value && list[i].leveltype==3){
                        arr.push(list[i])
                    }
                }
                that.areas(div , arr);
            }else{
                var others = div.find("select[name=area]");
                others.attr("disabled", "disabled");
                others.val("");
                form.render();
            }
        });
    }
    //
    // //加载县/区数据
    Address.prototype.areas = function(div , areas) {
        console.log(areas)
        var areaHtml = '<option value="">请选择县/区</option>';
        for (var i = 0; i < areas.length; i++) {
            areaHtml += '<option value="' + areas[i].rname + '">' + areas[i].rname + '</option>';
        }
        div.find("select[name=area]").html(areaHtml).removeAttr("disabled");
        form.render();
    }
    
    //设置省市区的值
    Address.prototype.setAddress = function( div , data ){
        div = $(div);
        if( "province" in data ){
            this.setAddressSelectVal( div.find("select[name=province]") , data.province , true );
            if( "city" in data ){
                this.setAddressSelectVal( div.find("select[name=city]") , data.city  , true );
                if( "area" in data ){
                    this.setAddressSelectVal( div.find("select[name=area]") , data.area );
                }
            }
        }
        form.render();
    }
    
    Address.prototype.setAddressSelectVal = function( select , value , trigger ){
        select.val( value );
        if( trigger ){
            var layFilter = select.attr("lay-filter");
            layui.event.call(select[0],'form','select('+layFilter+')',{
                value : value
            });
        }
    }
    
    exports("address2",function(){
        var address = new Address();
        address.provinces();//默认渲染
        return address;
    });
})