layui.define(function (exports) {
	"use strict";
	var validator = {
		//验证字符串非空  
		IsNotEmpty: function (input) {
			if (input != '') {
				return true;
			} else {
				return false;
			}
		},
		//验证数字(double类型) [可以包含负号和小数点]  
		IsNumber: function (input) {
			var regex = /^-?\d+$|^(-?\d+)(\.\d+)?$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证整数  
		IsInteger: function (input) {
			var regex = /^-?\d+$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证非负整数  
		IsIntegerNotNagtive: function (input) {
			var regex = /^\d+$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证正整数  
		IsIntegerPositive: function (input) {
			var regex = /^[0-9]*[1-9][0-9]*$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证小数  
		IsDecimal: function (input) {
			var regex = /^([-+]?[1-9]\d*\.\d+|-?0\.\d*[1-9]\d*)$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证只包含英文字母  
		IsEnglishCharacter: function (input) {
			var regex = /^[A-Za-z]+$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证只包含数字和英文字母  
		IsIntegerAndEnglishCharacter: function (input) {
			var regex = /^[0-9A-Za-z]+$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证只包含汉字  
		IsChineseCharacter: function (input) {
			var regex = /^[\u4e00-\u9fa5]+$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证数字长度范围（数字前端的0计长度）[若要验证固定长度，可传入相同的两个长度数值]  
		IsIntegerLength: function (input, lengthBegin, lengthEnd) {
			var pattern = '^\\d{' + lengthBegin + ',' + lengthEnd + '}$';
			var regex = new RegExp(pattern);
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证字符串包含内容  
		IsStringInclude: function (input, withEnglishCharacter, withNumber, withChineseCharacter) {
			if (!Boolean(withEnglishCharacter) && !Boolean(withNumber) && !Boolean(withChineseCharacter)) {
				return false; //如果英文字母、数字和汉字都没有，则返回false  
			}
			var pattern = '^[';
			if (Boolean(withEnglishCharacter)) {
				pattern += 'a-zA-Z';
			}
			if (Boolean(withNumber)) {
				pattern += '0-9';
			}
			if (Boolean(withChineseCharacter)) {
				pattern += '\\u4E00-\\u9FA5';
			}
			pattern += ']+$';
			var regex = new RegExp(pattern);
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证字符串长度范围 [若要验证固定长度，可传入相同的两个长度数值]  
		IsStringLength: function (input, LengthBegin, LengthEnd) {
			var pattern = '^.{' + lengthBegin + ',' + lengthEnd + '}$';
			var regex = new RegExp(pattern);
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证字符串长度范围（字符串内只包含数字和/或英文字母）[若要验证固定长度，可传入相同的两个长度数值]  
		IsStringLengthOnlyNumberAndEnglishCharacter: function (input, LengthBegin, LengthEnd) {
			var pattern = '^[0-9a-zA-z]{' + lengthBegin + ',' + lengthEnd + '}$';
			var regex = new RegExp(pattern);
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证字符串长度范围 [若要验证固定长度，可传入相同的两个长度数值]  
		IsStringLengthByInclude: function (input, withEnglishCharacter, withNumber, withChineseCharacter, lengthBegin, lengthEnd) {
			if (!withEnglishCharacter && !withNumber && !withChineseCharacter) {
				return false; //如果英文字母、数字和汉字都没有，则返回false  
			}
			var pattern = '^[';
			if (Boolean(withEnglishCharacter))
				pattern += 'a-zA-Z';
			if (Boolean(withNumber))
				pattern += '0-9';
			if (Boolean(withChineseCharacter))
				pattern += '\\u4E00-\\u9FA5';
			pattern += ']{' + lengthBegin + ',' + lengthEnd + '}$';
			var regex = new RegExp(pattern);
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证字符串字节数长度范围 [若要验证固定长度，可传入相同的两个长度数值；每个汉字为两个字节长度]  
		IsStringByteLength: function (input, lengthBegin, lengthEnd) {
			var regex = /[^\x00-\xff]/g;
			var byteLength = input.replace(regex, 'ok').length;
			if (byteLength >= lengthBegin && byteLength <= lengthEnd) {
				return true;
			} else {
				return false;
			}
		},
		//验证日期 [只能验证日期，不能验证时间]  
		IsDateTime: function (input) {
			var regex = /((19|20)[0-9]{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
			if (regex.test(input)) {
				var ymd = input.match(/(\d{4})-(\d+)-(\d+).*/);
				var year = parseInt(ymd[1]);
				var month = parseInt(ymd[2]);
				var day = parseInt(ymd[3]);
				if (day > 28) {
					//获取当月的最后一天
					var lastDay = new Date(year, month, 0).getDate();
					return (lastDay >= day);
				}
				return true;
			} else {
				return false;
			}
		},
		//验证固定电话号码 [3位或4位区号；区号可以用小括号括起来；区号可以省略；区号与本地号间可以用减号或空格隔开；可以有3位数的分机号，分机号前要加减号]  
		IsTelePhoneNumber: function (input) {
			var regex = /^(((0\d2|0\d{2})[- ]?)?\d{8}|((0\d3|0\d{3})[- ]?)?\d{7})(-\d{3})?$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证手机号码 [可匹配"(+86)013325656352"，括号可以省略，+号可以省略，(+86)可以省略，11位手机号前的0可以省略；11位手机号第二位数可以是3、4、5、7、8、9中的任意一个]  
		IsMobilePhoneNumber: function (input) {
			var regex = /^((\+)?86|((\+)?86)?)0?1[345789]\d{8,9}$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证电话号码（可以是固定电话号码或手机号码）  
		IsPhoneNumber: function (input) {
			var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$|^(((0\d2|0\d{2})[- ]?)?\d{8}|((0\d3|0\d{3})[- ]?)?\d{7})(-\d{3})?$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证邮政编码  
		IsZipCode: function (input) {
			var regex = /^\d{6}$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证电子邮箱 [@字符前可以包含字母、数字、下划线和点号；@字符后可以包含字母、数字、下划线和点号；@字符后至少包含一个点号且点号不能是最后一个字符；最后一个点号后只能是字母或数字]  
		IsEmail: function (input) {
			//邮箱名以数字或字母开头；邮箱名可由字母、数字、点号、减号、下划线组成；邮箱名（@前的字符）长度为3～18个字符；邮箱名不能以点号、减号或下划线结尾；不能出现连续两个或两个以上的点号、减号。  
			//var regex = /^[a-zA-Z0-9]((?<!(\.\.|--))[a-zA-Z0-9\._-]){1,16}[a-zA-Z0-9]@([0-9a-zA-Z][0-9a-zA-Z-]{0,62}\.)+([0-9a-zA-Z][0-9a-zA-Z-]{0,62})\.?|((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;  
			var regex = /^([\w-\.]+)@([\w-\.]+)(\.[a-zA-Z0-9]+)$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证网址（可以匹配IPv4地址但没对IPv4地址进行格式验证；IPv6暂时没做匹配）[允许省略"://"；可以添加端口号；允许层级；允许传参；域名中至少一个点号且此点号前要有内容]  
		IsURL: function (input) {
			//每级域名由字母、数字和减号构成（第一个字母不能是减号），不区分大小写，单个域长度不超过63，完整的域名全长不超过256个字符。在DNS系统中，全名是以一个点“.”来结束的，例如“www.nit.edu.cn.”。没有最后的那个点则表示一个相对地址。   
			//没有例如"http://"的前缀，没有传参的匹配  
			//var regex = /^([0-9a-zA-Z][0-9a-zA-Z-]{0,62}\.)+([0-9a-zA-Z][0-9a-zA-Z-]{0,62})\.?$/;  

			//var regex = /^(((file|gopher|news|nntp|telnet|http|ftp|https|ftps|sftp)://)|(www\.))+(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(/[a-zA-Z0-9\&%_\./-~-]*)?$/;  
			var regex = /^([a-zA-Z]+:\/\/)?([\w-\.]+)(\.[a-zA-Z0-9]+)(:\d{0,5})?\/?([\w-\/]*)\.?([a-zA-Z]*)\??(([\w-]*=[\w%]*&?)*)$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证IPv4地址 [第一位和最后一位数字不能是0或255；允许用0补位]  
		IsIPv4: function (input) {
			var regex = /^(25[0-4]|2[0-4]\d]|[01]?\d{2}|[1-9])\.(25[0-5]|2[0-4]\d]|[01]?\d?\d)\.(25[0-5]|2[0-4]\d]|[01]?\d?\d)\.(25[0-4]|2[0-4]\d]|[01]?\d{2}|[1-9])$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证IPv6地址 [可用于匹配任何一个合法的IPv6地址]  
		IsIPv6: function (input) {
			var regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证密码是否是8~16位数字与英文字母的组合
		IsPwd: function (input) {
			var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证经度  
		IsLongitude: function (input) {
			var regex = /^[-\+]?((1[0-7]\d{1}|0?\d{1,2})\.\d{1,5}|180\.0{1,5})$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证纬度  
		IsLatitude: function (input) {
			var regex = /^[-\+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		},
		//验证账号是否是有4-11位数字、字母、数字和字母
		IsAccountType: function (input) {
			var regex = /^[A-Za-z0-9]{4,11}$/;
			if (input.match(regex)) {
				return true;
			} else {
				return false;
			}
		}
	};

	exports('validator', validator);
});