/**
 * 从当前url中获取到对应参数的值
 * @param name 参数的名称
 * @returns {string}
 */
function parseUrlParams(name) {
    let search = decodeURI(window.location.search);
    if (search) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = search.substr(1).match(reg);
        if (r != null && r != "") {
            return decodeURIComponent(r[2]);
        }
    }
    return "";
}


export default {
    parseUrlParams
}
