
/*-------------------------尚未分类-------------------------*/
export function encodeSearch(searchObj){
    let searchStr = '?'
    let searchArray = Object.keys(searchObj).map(key=>`${key}=${encodeURIComponent(searchObj[key])}`)
    searchStr += searchArray.join('&')
    return searchStr
}


export function getAssert(prefix){
    return function(condition, warning){
        if(!condition){
            throw new Error(`[${prefix} error]: ${warning}` )
        }
    }
}
const assert = getAssert('util')
// 解析出url 上 search的参数
export function parseSearch(search){
    var params = {}
    var segments = search.replace(/^\?/, '').split('&').filter((group)=>{
        if(group !== '' && group.indexOf('=')){
            return true
        }
    })
    segments.forEach((group)=>{
        var index = group.indexOf('=')
        var key = group.substring(0, index)
        var val = group.substring(index + 1)
        val = decodeURIComponent(val)
        params[key] = val
    })
    return params
}

export function getType(arg){
    return Object.prototype.toString.call(arg).slice(8,-1)
}

//地理位置字符串转对象
export function areaStrToObj(areaStr){
    var [address,longitude,latitude] = areaStr.split('|');
    var [province,city,county] = address.split(' ');
    return {
        province,
        city,
        county,
        longitude,
        latitude,
    }
}
//地理位置对象转字符串
export function areaObjToStr(areaObj){
    return `${areaObj.province} ${areaObj.city}|${areaObj.longitude}|${areaObj.latitude}`;
}

/*---------------------------数据相关--------------------------*/
//item转为字符串，长度不足length的前补零
export function parseToStr(item, length){
    var str = item.toString();
    return new Array(length - str.length + 1).join('0') + str;
}
//取余——num关于divisor的余数：num为int型整数，divisor为uint型整数
export function divMod(num,divisor) {
    if(num < 0){
        num = divisor - (Math.abs(num) % divisor);
    }
    return num % divisor;
}

/*---------------------------数组相关--------------------------*/
//删除数组指定位置（index从0开始）的项目
export function delArrayItem(arr, index) {
    return arr.slice(0, index).concat(arr.slice(index + 1));
}
//在字符串指定位置插入一段新的字符串
export function insertStr(strBase, position, strInsert){
    var newStr = strBase.substring(0,position) + strInsert + strBase.substring(position);
    return newStr;
}
//初始化一个长度为length，默认值为defaultValue的数组
export function initArray(length, defaultValue=null) {
    var array = [];
    for(var i = 0; i < length; i++){
        array.push(defaultValue);
    }
    return array;
}

/*----------------------------日期相关-----------------------------*/
//日期字符串转日期数组
export function dateStrToArray(tDateStr){
    let [year,month,date,hour,minute,second] = tDateStr.split(/[- T:]/);
    return [year,month,date,hour,minute,second].map(item=> item ? +item : 0)
}
//根据当前年份、月份，计算并返回本月天数
export function getDateNum(year,month){
    var arrDateNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dateNum = arrDateNum[month - 1];
    if(month == 2 && (year%4 == 0 && (year%100 != 0 || year%400 == 0))){
        dateNum = 29;
    }
    return dateNum;
}
//日期字符串转日期格式数据
export function parseToDate(dateStr) {
    var resultDate = new Date(dateStr.replace('T',' '));
    // if(dateStr.indexOf('T') != -1){
    // 	var dateArr = dateStr.split(/[- T:]/);
    // 	resultDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4], dateArr[5]);
    // }
    return resultDate;
}
// 日期格式对象转ISO格式字符串
export function parseDateToStr(date) {
    let dateArr = parseDateToArray(date);
    let dateStr = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}T${dateArr[3]}:${dateArr[4]}`;
    return dateStr;
}
// 日期格式对象转日期数组
export function parseDateToArray(date){
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];
}

// 从日期对象中解析出对象
export function getObjFromDate(date){
    return {
        year: date.getFullYear(),
        month:date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes(),
        second: date.getSeconds()
    }
}

/**
 * 函数节流
 * @param {fn} function test(){}
 * @return {fn} function test(){}
 */
export const throttle = (fn, wait = 100) => function func(...args) {
    console.log(fn);
    if (fn.timer) return
    fn.timer = setTimeout(() => {
        fn.apply(this, args)
        fn.timer = null
    }, wait)
}