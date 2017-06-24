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
  getURLParam:function(paramName)
  {
    this.paramValue = "";
    this.isFound = false;
    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
      this.arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&");
      this.i = 0;
      while (this.i < this.arrSource.length && !this.isFound) {
        if (this.arrSource[this.i].indexOf("=") > 0) {
          if (this.arrSource[this.i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
            this.paramValue = this.arrSource[this.i].split("=")[1];
            this.isFound = true;
          }
        }
        this.i++;
      }
    }
    return this.paramValue;
  },
  getStringParam: function(strParamName, strParamString)
  {
    var strReturn = "";
    var strHref = strParamString.toUpperCase();
    var bFound = false;

    var cmpstring = strParamName.toUpperCase() + "=";
    var cmplen = cmpstring.length;

    var strQueryString = strHref;
    var aQueryString = strQueryString.split("&");
    for (var iParam = 0; iParam < aQueryString.length; iParam++)
    {
      if (aQueryString[iParam].substr(0, cmplen) == cmpstring)
      {
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        bFound = true;
        break;
      }

    }
    if (bFound == false) return null;
    return strReturn;
  },
  sliceStr:function(target,len,text){
    if(target == '' || target == void 0)return;
    len = len == void 0?5:len;
    text = text == void 0?"..":text;
    return target.length > len?
    target.slice(0,len+1)+text : String(target)+text;
  }
}
