
var endeAuth = JSON.parse(localStorage.getItem('ende-auth'));


function getAuth(oName,tName,sName){     //oName 一级菜单名  tName二级子菜单名or操作按钮名   sName 操作按钮名	
	var type = false;
	if(endeAuth && endeAuth.length>0){
		for(var i=0;i<endeAuth.length;i++){
			if(endeAuth[i].name==oName){
				var endeAuth2 = endeAuth[i].children;
				if(endeAuth2 && endeAuth2.length>0){
					for(var k=0;k<endeAuth2.length;k++){
						if(tName==endeAuth2[k].name){
							if(!sName){
								type = true;
								break;
							}else{
								var endeAuth3 = endeAuth2[k].children;
								if(endeAuth3 && endeAuth3.length>0){
									for(var s=0;s<endeAuth3.length;s++){
										if(sName==endeAuth3[s].name){
											type = true;
											break;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return type;
}

//取两位小数
function getFormatPrice(value){
	if(!value || value === 0 || value === ''){
		return '0.00'
	}else{
		var num = parseFloat(value)
		num = num.toFixed(2)
		return num
	}
}


