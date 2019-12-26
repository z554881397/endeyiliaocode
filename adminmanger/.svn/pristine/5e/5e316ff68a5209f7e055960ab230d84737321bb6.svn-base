// var propererList = [
//     {"name": "颜色", p_enums: ['白色', '黑色']},
//     {"name": "尺寸", p_enums: ['S', 'M']},
//     {"name": "重量", p_enums: ['轻', '重']},
// ];


function testProduct(propererList) {
	console.log(propererList);


    var y = 1;
    for (var i = 0; i < propererList.length; i++) {
        y = y * propererList[i].p_enums.length;
    }


    var array = [];
    for (var i = 0; i < propererList.length; i++) {
        array[i] = new Array(y);
    }


    var copy = y / propererList[0].p_enums.length;
    for (var i = 0; i < propererList.length; i++) {
        var element = propererList[i];

        var pEnums = element.p_enums;

        var yIndex = 0;

        diguiCopy(copy, pEnums, array, yIndex, i, y);


        if (i < propererList.length - 1) {
            copy = copy / propererList[i + 1].p_enums.length;
        }
    }

    // console.log(array);
    return array;

}


function diguiCopy(copy, pEnums, array, yIndex, i, y) {

    for (var j = 0; j < pEnums.length && yIndex < y; j++) {

        //复制copy次
        for (var k = 0; k < copy; k++) {
            array[i][yIndex] = pEnums[j];
            yIndex++;
        }


    }

    //复制完判断是否复制完了
    if (yIndex < y) {
        //接着复制
        diguiCopy(copy, pEnums, array, yIndex, i, y);
    }

}


// testProduct(propererList);
function transferArrayToProperties(arr) {

    //数组长度
    let arrLength = arr.length;

    //获取每一列的枚举值
    //进行组合
    //总共的组合可能情况数量
    let zuheSize = arr[0].length;
    //最终返回的属性数组
    var propertiesArray = [];
    for (var i = 0; i < zuheSize; i++) {
        var enums = "";
        var value = "";
        for (var j = 0; j < arrLength; j++) {

            var arrLengthElementElement = arrLength[j][i];
            if (enums.indexOf(arrLengthElementElement) == -1) {
                enums += arrLengthElementElement + " ";
            }

            value = arrLengthElementElement;

            var properties = {
                "enums": enums,
                "value": value
            };

            propertiesArray.push(properties);

        }
    }

    return propertiesArray;


}

function getPropertys(specificationList){
    var propertys = [];
    for(var j=0;j<specificationList.length;j++){//整合propertys,specificationList从页面得
        var p ={
            name: specificationList[j].name,
            enums: '',
            value: '',
            type: '2'
        }
        for(var k=0;k<specificationList[j].p_enums.length;k++){
            if(k == specificationList[j].p_enums.length-1)
                p.enums += specificationList[j].p_enums[k];
            else
                p.enums += specificationList[j].p_enums[k] + ',';
        }
        propertys.push(p);//得到propertys
    }
    return propertys;
}


