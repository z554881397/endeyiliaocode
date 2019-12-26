layui.define([ 'layer','laypage','laydate','http' ], function(exports) {
	"use strict";
	var $ = layui.jquery,start,end,
		laydate = layui.laydate;

	var common = {
		/**
		 * 抛出一个异常错误信息
		 * 
		 * @param {String}
		 *            msg
		 */
		throwError : function(msg) {
			throw new Error(msg);
			return;
		},
		/**
		 * 弹出一个错误提示
		 * 
		 * @param {String}
		 *            msg
		 */
		msgError : function(msg) {
			layer.msg(msg, {
				icon : 5
			});
			return;
		},
		//弹框
		layerOpen : function(obj,callback) {
			if (!obj) obj = {};
			layer.open({
				type: obj.type || 1,
				id: 'LAY_layuipro', //设定一个id，防止重复弹出
				title: obj.title || '',
				content: obj.content || '',
				skin: obj.skin || 'layui-layer-molv', //自定义样式
				area: obj.area || ['400px', '500px'],
				maxmin: false || obj.maxmin,
				resize: false,
				btn: obj.btn || [],
				btnAlign: obj.btnAlign || 'r',
				success: obj.success || function() {
					
				},
				yes: callback || function(index, layero){
				    layer.close(index); //如果设定了yes回调，需进行手工关闭
				}
			});
		},
		//确认提示
		layerConfirm : function(text, callback) {
			layer.confirm(text, {
				id : 'CE_deletepro',
				icon : 3,
				title : '温馨提示',
				skin : 'layui-layer-molv',
				resize: false,
				anim : Math.ceil(Math.random() * 6)	
			}, callback || function() {

			});
		},
		// 成功提示
		alertSuccess : function(text, title, callback) {
			layer.alert(text, {
				id : 'CE_successpro', //加ID防止重复弹出
				title : title,
				icon : 1,
				time : 5000,
				skin : 'layui-layer-molv',
				resize: false,
				anim : Math.ceil(Math.random() * 6),
				cancel: callback || function(index, layero) {
					layer.close(index);
				}
			}, callback || function(index) {
				layer.close(index);
			});
		},
		// 错误提示
		alertError : function(text, title) {
			layer.alert(text, {
				id : 'CE_errorpro',
				title : title,
				icon : 2,
				time : 5000,
				skin : 'layui-layer-debug',
				resize: false,
				anim : Math.ceil(Math.random() * 6)
			});
		},
		// 信息提示
		alertInfo : function(text) {
			layer.alert(text, {
				id : 'CE_infopro',
				time : 5000,
				icon : 0,
				skin : 'layui-layer-lan',
				resize: false,
				anim : Math.ceil(Math.random() * 6)
			});
			return;
		},
		Info : function(text,callback) {
			layer.alert(text, {
				id : 'CE_infopro',
				icon : 0,
				closeBtn: 0,
				skin : 'layui-layer-lan',
				resize: false,
				anim : Math.ceil(Math.random() * 6),
				cancel: callback || function(index, layero) {
					layer.close(index);
				}
			}, callback || function(index) {
				layer.close(index);
			});
			return;
		},
		//开始时间
		startDate: function(id) {
			start = laydate.render({
		        elem: id || '#start_time',
		        theme: '#393D49',
		        btns: ['clear', 'confirm'],
		        done: function(value, date){
		            end.config.min = date;
		            end.config.min.month = date.month -1;
		        }
		    });
		},
		//结束时间
		endDate: function(id) {
			end = laydate.render({
		        elem: id || '#end_time',
		        theme: '#393D49',
		        done: function(value, date){
		            start.config.max = date;
		            start.config.max.month = date.month -1;
		        }
		    });
		},
	};
	
	
	// jquery表单加载json对象数据
	$.fn.extend({
		setForm : function(jsonValue) {
			var obj = this;
			$.each(jsonValue, function(name, ival) {
				var $oinput = obj.find("input[name=" + name + "]");
				if ($oinput.attr("type") == "checkbox") {
					if (ival != null) {
						var checkboxObj = $("[name=" + name + "]");

						var checkArray = ival.split(";");
						for (var i = 0; i < checkboxObj.length; i++) {
							for (var j = 0; j < checkArray.length; j++) {
								if (checkboxObj[i].value == checkArray[j]) {
									checkboxObj[i].click();
								}
							}
						}
					}
				} else if ($oinput.attr("type") == "radio") {
					$oinput.each(function() {
						var radioObj = $("[name=" + name + "]");
						for (var i = 0; i < radioObj.length; i++) {
							if (radioObj[i].value == ival) {
								radioObj[i].click();
							}
						}
					});
				} else if ($oinput.attr("type") == "textarea") {
					obj.find("[name=" + name + "]").html(ival);
				} else {
					obj.find("[name=" + name + "]").val(ival);

				}
			});

		}
	});

	exports('common', common);
});