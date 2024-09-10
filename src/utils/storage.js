// 储存用户信息
const userInfo = 'laike_store_uaerInfo'
// 储存来源
const source = 'laike_source'

export function setStorage(name, value) {
    localStorage.setItem(name,JSON.stringify(value));
}

export function getStorage(name){
    return JSON.parse(localStorage.getItem(name));
}

export function removeStorage(name){
    localStorage.removeItem(name);
}

export function getCookie(name){
    var cookies = document.cookie;
    var list = cookies.split("; ");     // 解析出名/值对列表
    for(var i = 0; i < list.length; i++) {
      var arr = list[i].split("=");   // 解析出名和值
      if(arr[0] == name)
      return decodeURIComponent(arr[1]);   // 对cookie值解码
    } 
    return "";
}