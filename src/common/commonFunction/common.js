import {setStorage, getStorage} from "@/utils/storage";
import store from "@/store/index";
import {isEmpty} from "element-ui/src/utils/util";

const data = {
  install(Vue) {
    Vue.prototype.fn1 = function (value) {
      console.log(value);
    }

    Vue.prototype.fn2 = function () {
      console.log(456);
    }

    //获取来源
    Vue.prototype.getSource = function () {
      let obj = getStorage("laike_source");
      if (isEmpty(obj)) {
        store.dispatch("source/getSource").then(r => obj = getStorage("laike_source"));
      }
      let map = new Map();
      for (let i = 0, l = obj.length; i < l; i++) {
        let source = obj[i];
        map.set(source.value, source.label);
      }
      return map;
    }

    // 设置只能输入整数
    Vue.prototype.oninput2 = function (num) {
      var str = num
      str = str.replace(/[^\.\d]/g,'');
      str = str.replace('.','');

      return str
    }

    // 设置只能输入整数和小数
    Vue.prototype.oninput = function (num, limit) {
      var str = num
      var len1 = str.substr(0, 1)
      var len2 = str.substr(1, 1)
      //如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 == 0 && len2 != ".") {
        str = str.substr(1, 1)
      }
      //第一位不能是.
      if (len1 == ".") {
        str = ""
      }
      //限制只能输入一个小数点
      if (str.indexOf(".") != -1) {
        var str_ = str.substr(str.indexOf(".") + 1)
        if (str_.indexOf(".") != -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
        }
      }
      //正则替换
      str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
      if (limit / 1 === 1) {
        str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/,'$1') // 小数点后只能输 1 位
      } else {
        str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1') // 小数点后只能输 2 位
      }
      
      return str
    }

    // 设置不能输入特殊字符
    Vue.prototype.oninput3 = function (num) {
      var str = num
      str = str.replace(/[^\w]/g, '')
      // str = str.replace('.','');

      return str
    }

    // 设置不能输入汉字
    Vue.prototype.oninput4 = function (num) {
      var str = num
      str = str.replace(/[\u4E00-\u9FA5]/g, '')
      // str = str.replace('.','');

      return str
    }
    //判断数组中是否包含某个值（检测按钮权限用）
    Vue.prototype.detectionBtn = function(arr,value) {
      let myobj = arr.filter(item => item.text === value)
      console.log(myobj)
      if(myobj){
        return myobj[0]? myobj[0]?.checked:true
      }else{
        return true
      }
    }
  }
}

export default data;
