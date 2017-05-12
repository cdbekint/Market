export default {
    name: 'util',
    parseParam: function(param, key, encode){
    if (param==null) return ''

    var paramStr = ''
    var t = typeof (param)
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param)
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += this.parseParam(param[i], k, encode)
      }
    }
    return paramStr
    },
    setCookie: function(name,value) {
      var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
      else
          return null;
    },
    delCookie: function(name)
    {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=this.getCookie(name);
      if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },
    randomString:function (len) {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
    },
    isWeiXin:function (){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
    },
    getQuery:function (hash) {
      if(hash == void 0)return {};

      var queryArr = hash.slice(hash.indexOf("?")+1).split("&");
      var res = {};

      queryArr.forEach(function (item) {
        var temp = item.split("=");
        res[temp[0]] = temp[1];
      });
      return res;
    },
    isNull:function (val) {
      return val === null || val === undefined || val === '';
    },
    escapeToHtml:function (str) {
      var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    }
}
