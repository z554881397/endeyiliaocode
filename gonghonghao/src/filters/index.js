let phoneFilter = value => { // 手机号
    if (!value) {
        return
    }
    return value.substring(0,3) + '****' + value.substring(value.length-4, value.length)
}

let formatPrice  = value => { // 价格取两位小数
    // console.log(value)
    if (value === '') {
        return '0.00'
    } else if (value === 0){
        return '0.00'
    }else{
        var num = parseFloat(value)
        if(num/10000>1 || num/10000==1){
            num = num/10000
            num = num.toFixed(2) 
            
            num += '万'
        }else{
            num = num.toFixed(2)
        }
        return num
    }
}

let formatNum  = value => { // 数字格式化
    // console.log(value)
    if (value === '') {
        return '0'
    } else if (value === 0){
        return '0'
    }else{
        var num = parseFloat(value)
        if(num/10000>1 || num/10000==1){
            num = num/10000
            num = num.toFixed(2) 
            
            if(num.split('.')[1] == '00'){
                num = num.split('.')[0]
            }
            num += '万'
        }else{
            num = num.toFixed(2)
            if(num.split('.')[1] == '00'){
                num = num.split('.')[0]
            }
        }
        return num
    }
}

let formatEnd = value => {
    if (value === '') {
        return
    }
    value = Number(value)
    var day = Math.floor(value / (60 * 60 * 24))
    var h = Math.floor((value - day * 60 * 60 * 24) / (60*60))
    var s = Math.floor((value - day *  60 * 60 * 24 - h *  60 * 60) / 60)
    var t = Math.floor(value - day *  60 * 60 * 24 - h *  60 * 60 - s  * 60)
    var f = (day === 0 ? '' : (day < 10 ? ('0' + day + '天') : day + '天')) + (h === 0 ? '00' : (h < 10 ? ('0' + h) : h)) + ':' + (s === 0 ? '00' : (s < 10 ? ('0' + s) : s)) + ':' + (t === 0 ? '00' : (t < 10 ? ('0' + t) : t))

    return f
}

let deName = value => { // 默认用户名，（手机后四位）
    if (!value) {
        return
    }
    return '用户'+value.substring(value.length-4, value.length)
}


export { 
    phoneFilter,
    formatPrice,
    formatNum,
    formatEnd,
    deName 
}