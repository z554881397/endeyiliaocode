layui.use(['element', 'layer', 'form', 'navbar', 'tab', 'common', 'http'], function () {
    var element = layui.element,
        $ = layui.jquery,
        navbar = layui.navbar(),
        common = layui.common,
        http = layui.http,
        layer = layui.layer;

    var tab = layui.tab({
        elem: '.admin-nav-card', //设置选项卡容器
        contextMenu: true,
        maxSetting: 10
    });
    //iframe自适应
    $(window).on('resize', function () {
        var $content = $('.admin-nav-card .layui-tab-content');
        $content.height($(this).height() - 104);
        $content.find('iframe').each(function () {
            $(this).height($content.height());
        });
    }).resize();
	
	if(localStorage.getItem('ende-menu')){
		navbar.set({
		    //spreadOne: true,
		    elem: '#admin-navbar-side',
		    cached: true,
		    data: JSON.parse(localStorage.getItem('ende-menu'))
		});
		//渲染navbar
		navbar.render();
		//监听点击事件
		navbar.on('click(side)', function (data) {
		    $('#iframe').attr('src', data.field.href);
		});
	}
	
	

    // $.getJSON('../data/menu.json', function (result) {
    //     if (result) {
    //         //设置navbar
    //         navbar.set({
    //             //spreadOne: true,
    //             elem: '#admin-navbar-side',
    //             cached: true,
    //             data: result
    //         });
    //         //渲染navbar
    //         navbar.render();
    //         //监听点击事件
    //         navbar.on('click(side)', function (data) {
    //             $('#iframe').attr('src', data.field.href);
    //         });
    //     }
    // });

    //左侧菜单
    // http.get('admin/selectRoleMenuList', {}, function (res) {
    // 	if (res) {
    // 		//设置navbar
    // 		navbar.set({
    // 			// spreadOne: true,
    // 			elem: '#admin-navbar-side',
    // 			cached: true,
    // 			data: res.data
    // 		});
    // 		//渲染navbar
    // 		navbar.render();
    // 		//监听点击事件
    // 		navbar.on('click(side)', function (data) {
    // 			$('#iframe').attr('src', data.field.href);
    // 		});
    // 	}
    // });


});