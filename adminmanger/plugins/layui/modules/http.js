

/* 陈 */
// var TUrl = 'http://192.168.1.134:8087/ende/';
// var ImgUrl = 'http://192.168.1.134:8087/ende/';

/* 客户 */
var TUrl = 'http://118.25.45.95:8087/ende/';
var ImgUrl = 'http://118.25.45.95:8087/ende/';



layui.define(['laypage', 'table'], function (exports) {
    var table = layui.table,
        laypage = layui.laypage,
        $ = layui.jquery;

    var http = {
        post: function (url, param, callback) {
			ifOverdue(); //验证是否过期
			var load = layer.load(2);
			var token = localStorage.getItem('ende-token');
            $.ajax({
                type: "POST",
                url: TUrl + url,
                cache: false, // 禁用缓存
                data: param, // 传入组装的参数
                dataType: "json",
                headers:{"authentication":token},
                success: function (data) {
                    setTimeout(function () {
                        layer.close(load);
                    }, 200);
                    if (data.code == 402) {
                        top.window.location.href = "../page/login.html";
                    } else {
                        callback(data);
                    }

                },
                error: function () {
                    layer.msg("请求异常");
                    setTimeout(function () {
                        layer.close(load);
                    }, 200);
                }
            });
        },
		// 不传headers
        post1: function (url, param, callback) {
			var load = layer.load(2);
            $.ajax({
                type: "POST",
                url: TUrl + url,
                cache: false, // 禁用缓存
                data: param, // 传入组装的参数
                dataType: "json",
                crossDomain: true,
                success: function (data) {
                    setTimeout(function () {
                        layer.close(load);
                    }, 200);
                    callback(data);
                },
                error: function () {
                    layer.msg("请求异常");
                    setTimeout(function () {
                        layer.close(load);
                    }, 200);
                }
            });
        },
        postJSON: function (url, param, callback) {
			ifOverdue(); //验证是否过期
			var load = layer.load(2);
			var token = localStorage.getItem('ende-token');
            $.ajax({
                type: "POST",
                url: TUrl + url,
                cache: false, // 禁用缓存
                data: param, // 传入组装的参数
                dataType: "json",
                contentType: "application/json",
                headers:{"authentication":token},
                success: function (data) {
                    if (data.code == 402) {
                        top.window.location.href = "../page/login.html";
                    } else {
                        callback(data);
                    }
                },
                error: function () {
                    layer.msg("请求异常");
                },
                complete: function () {
                    layer.close(load);
                }
            });
        },
        get: function (url, param, callback) {
			ifOverdue(); //验证是否过期
            var load = layer.load(2);
            var token = localStorage.getItem('ende-token');
            $.ajax({
                type: "GET",
                url: TUrl + url,
                cache: false, // 禁用缓存
                data: param, // 传入组装的参数
                dataType: "json",
                headers:{"authentication":token},
                success: function (data) {
                    setTimeout(function () {
                        layer.close(load);
                    }, 200);
                    if (data.code == 402) {
                        top.window.location.href = "../page/login.html";
                    } else if (data.code == 200) {
                        callback(data);
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function () {
                    layer.msg("请求异常");
                    setTimeout(function () {
                        layer.close(load);
                    }, 200);
                }
            });
        },
		upLoadPost: function (url, param, callback) { //上传文件
			var token = localStorage.getItem('ende-token');
			var load = layer.load(1, {
				shade: 0.3
			});
			$.ajax({
				type: "POST",
				url: TUrl + url,
				cache: false, // 禁用缓存
				data: param, // 传入组装的参数
				headers:{"authentication":token},
				contentType: false,
				processData: false,
				dataType: "json",
				success: function (data) {
					console.log(data)
					if (data.code == 402) {
						top.window.location.href = "../page/login.html";
					} else {
						callback(data);
					}
				},
				error: function () {
					layer.msg("请求异常");
				},
				complete: function () {
					layer.close(load);
				}
			});
		},
        getCookie: function (name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]);
            return null;
        },
		//分页，高度固定默认值
        table: function (options) {
			ifOverdue(); //验证是否过期
            var token = localStorage.getItem('ende-token');
            var tableIns = table.render({
                elem: options.elem,
                id: options.id,
                // width: options.width,
                title: options.title || "表格数据",
                url: TUrl + options.url,
                method: options.type || 'get',
                cols: options.cols,
                cellMinWidth: options.cellMinWidth || 100,
                done: function (res, curr, count) {
                    if (res.code == '402') {
                        top.window.location.href = "../page/login.html";
                    }
                    if (!options.done)
                        return;
                    options.done(res, curr, count);
                },
                headers: {
                    'authentication': token
                },
                contentType: options.contentType,
                page: options.page || true,
                limits: options.limits || [10, 20, 30, 40],
                where: options.where || {},
                height: options.height || 472,
                even: options.even || false,
                response: {
                    statusCode: 200, //状态字段成功值
                },
				parseData: function (res) {
					if (res.code == '402') {
					    top.window.location.href = "../page/login.html";
					}
					return {
						"code": res.code, //状态字段名称
						"message": res.msg, //消息字段
						"count": res.data.total, //总数字段
						"data": res.data.list //数据字段
					};
				},
                toolbar: options.toolbar || false,
                defaultToolbar: options.defaultToolbar || false
            });
            return tableIns;
        },
		//不分页，高度自适应
		table2: function (options) {
			ifOverdue(); //验证是否过期
		    var token = localStorage.getItem('ende-token');
		    var tableIns = table.render({
		        elem: options.elem,
		        id: options.id,
		        title: options.title || "表格数据",
		        url: TUrl + options.url,
		        method: options.type || 'get',
		        cols: options.cols,
		        cellMinWidth: options.cellMinWidth || 100,
		        done: function (res, curr, count) {
		            if (res.code == '402') {
		                top.window.location.href = "../page/login.html";
		            }
		            if (!options.done)
		                return;
		            options.done(res, curr, count);
		        },
		        headers: {
		            'authentication': token
		        },
		        contentType: options.contentType,
		        where: options.where || {},
		        even: options.even || false,
		        response: {
		            statusCode: 200, //状态字段成功值
		        },
				parseData: function (res) {
					if (res.code == '402') {
					    top.window.location.href = "../page/login.html";
					}
					return {
						"code": res.code, //状态字段名称
						"message": res.msg, //消息字段
						"count": res.data.total, //总数字段
						"data": res.data //数据字段
					};
				},
		        toolbar: options.toolbar || false,
		        defaultToolbar: options.defaultToolbar || false
		    });
		    return tableIns;
		},
        table1: function (options) {
			ifOverdue(); //验证是否过期
            var token = this.getCookie("ende-token");
            var tableIns = table.render({
                elem: options.elem,
                id: options.id,
                cols: options.cols,
                move: true,
                headers: {
                    'token': token
                },
                toolbar: options.toolbar,
                defaultToolbar: [],
                page: options.page && {
                    layout: ['prev', 'page', 'next', 'skip', 'count'],
                    prev: '<em><</em>',
                    next: '<em>></em>'
                },
                limits: options.limits || [10, 20, 30, 40],
                where: options.where || {},
                cellMinWidth: options.cellMinWidth || 100,
                data: options.data
            });
            return tableIns;
        },
        location: function (href) {
            location.href = href;
        },
        myOpen: function (options) {
            return layer.open({
                type: 1,
                title: options.title, //标题栏
                closeBtn: 1, //关闭按钮
                shade: options.shade, //遮罩 透明度
                area: options.area,
                skin: 'layui-layer-molv', //自定义样式
                id: options.id, //设定一个id，防止重复弹出
                btn: options.btn, //按钮
                scrollbar: false, //禁止浏览器滚动条
                btnAlign: 'r', //
                move: true, //禁止拖
                resize: false, //是否允许拉伸
                content: options.content,
                btn1: function (index, layero) {
                    if (options.btn1) {
                        options.btn1(index, layero);
                    }
                },
                btn2: function (index, layero) {
                    if (options.btn2) {
                        options.btn2(index, layero);
                    }
                    // options.content.hide();
                    layer.close(index);
                },
                cancel: function (index, layero) {
                    // options.content.hide();
                    layer.close(index);
                }
            });

        },
        confirm: function (text, callback) {
            layer.confirm(text, {
                id: 'CE_deletepro',
                icon: 3,
                title: '温馨提示',
                skin: 'layui-layer-molv',
                resize: false,
                anim: Math.ceil(Math.random() * 6)
            }, callback || function () {

            });
        },
        page: function (pageId, total, pageSize, pageIndex, opentions) {
            laypage.render({
                elem: pageId,
                count: total //总数
                ,
                limit: pageSize //每页显示几条
                ,
                curr: pageIndex //当前页
                ,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                jump: function (obj, first) {
                    if (!first) {
                        opentions(obj.curr);
                    }

                }
            });
        },
        IsMobilePhoneNumber: function (input) {
            var regex = /^((\+)?86|((\+)?86)?)0?1[34578]\d{9}$/;
            if (input.match(regex)) {
                return true;
            } else {
                return false;
            }
        },
        getPid: function (name) {
            var search = document.location.href;
            var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
            var matcher = pattern.exec(search);
            var _pid = null;
            if (null != matcher) {
                try {
                    _pid = decodeURIComponent(decodeURIComponent(matcher[1]));
                } catch (e) {
                    try {
                        _pid = decodeURIComponent(matcher[1]);
                    } catch (e) {
                        _pid = matcher[1];
                    }
                }
            }
            return _pid;
        },
        getUUID: function guid2() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        //获取URL参数
        getParam: function (name) {
            var search = decodeURI(window.location.search);
            if (search) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = search.substr(1).match(reg);
                if (r != null && r != "") {
                    return decodeURIComponent(r[2]);
                }
            }
            return null;
        }
		
    };
	
	//验证过期
	function ifOverdue(){
		let eTime = localStorage.getItem("ende-time");
		if (0.5 * 24 * 60 * 60 * 1000 < (new Date().getTime() - eTime) && (new Date().getTime() - eTime) < 1 * 24 * 60 * 60 * 1000) {
			var token = localStorage.getItem('ende-token');
			$.ajax({
			    type: "POST",
			    url: TUrl + 'admin/admin/token/refresh',
			    cache: false, // 禁用缓存
			    data: {}, // 传入组装的参数
			    dataType: "json",
			    headers:{"authentication":token},
			    success: function (res) {
					if (res.code == 200) {
					   localStorage.setItem('ende-token', res.data);
					   localStorage.setItem('ende-time', new Date().getTime()); //刷新时间
					}
				},
			    error: function () {}
			});
		}
	}

    exports('http', http);
});