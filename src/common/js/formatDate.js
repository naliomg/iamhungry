export function formatDate(date, fms) {
    if (/(y+)/.test(fms)) {
        fms = fms.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (var key in o) {
        if (new RegExp('('+key+')').test(fms)) {
            var str = o[key] + '';
            fms = fms.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : addLeftZero(str));
        }
    }
    return fms;
}

function addLeftZero(str) {
    return ('00' + str).substr(str.length);
}
