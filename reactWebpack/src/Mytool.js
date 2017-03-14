/**
 * Created by johnsontx on 2017/1/19.
 */
let Tools={},target="https://cnodejs.org/api/v1/";
Tools.ajax = (sendData)=>{
    let setData ={
      url:window.location.pathname,
      type:'GET',
      async:true,
      data:{},
      dataType:'json',
      success:(text)=>{},
      error:()=>{}
    };
    for(let i in sendData){
       setData[i] = sendData[i]
    }
    let sData=[],cData = '';
     for(let i in setData.data){
       sData.push(i + "=" + setData.data[i])
     }
    cData = sData.join('&');
    setData.type = setData.type.toUpperCase();
    let xhr = new  XMLHttpRequest();
  try{
    if(setData.type == 'GET'){
      let gurl = setData.url + "?" + cData;
     xhr.open(setData.type,gurl + "&" + new Date().getTime(),setData.async);
      xhr.send()
    }else{
      xhr.open(setData.type,setData.url,setData.async);
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      xhr.send(cData)
    }
  }catch (e){
    return httpEnd();
  }

  if(setData.async){
    xhr.addEventListener('readystatechange',httpEnd,false)
  }

  function httpEnd() {
    let head = xhr.getAllResponseHeaders(),response = xhr.responseText;
    if (xhr.readyState == 4) {
      if (/application\/json/.test(head) || setData.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
        response = JSON.parse(response);
      }
    }
    if (xhr.status == 200) {
      setData.success(response, setData, xhr);
    } else {
      setData.error(setData, xhr);
    }
  }

  xhr.end = () => {
    xhr.removeEventListener('readystatechange',httpEnd,false)
  };

  return xhr;
};

Tools.get = (pathname,data,success,error)=>{
     let sendData = {
       url:target + pathname,
       type:'GET',
       data:data,
       success:success || function(){},
       error:error || function(){}
     };
  return Tools.ajax(sendData)
};
Tools.post = (pathname,data,success,error)=>{
      let sendData = {
        url:target + pathname,
        data:data,
        type:"POST",
        success:success || function(){},
        error:error || function(){}
      } ;
  return Tools.ajax(sendData)
};

/**
 * 格式化时间
 *
 * @param {any} t
 * @returns
 */
Tools.formatDate = function (str) {
  var date = new Date(str);
  var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return '';
  } else if (time / 1000 < 60) {
    return '刚刚';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
};
/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tools.localItem = function (key, value) {
  if (arguments.length == 1) {
    return localStorage.getItem(key);
  } else {
    return localStorage.setItem(key, value);
  }
}

/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tools.removeLocalItem = function (key) {
  if (key) {
    return localStorage.removeItem(key);
  }
  return localStorage.removeItem();
}

export {Tools};
