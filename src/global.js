import axios from 'axios'

//上传文件并显示上传进度
function uploadFile (url,payload,cancelToken,callback1) {
    return new Promise(function(resolve,reject){
        axios({
            url:url,
            method:'post',
            data:payload,
            onUploadProgress:function(progressEvent){
                if(progressEvent.lengthComputable){ callback1(progressEvent); }
            },
            cancelToken: cancelToken
        }).then(res =>{
            resolve(res);
            })
            .catch(thrown => { 
                if (axios.isCancel(thrown)) {
                    reject('-2')

              } else {
                reject(thrown)
              }
            })
    })
  
}

//获取所有的分类
function getAllCategory(){
    return new Promise(function(resolve, reject){
        axios({
            url:'/emro_boss/category/getCategoryList',
            method:'get'
        }).then((res)=>{
            resolve(res)
        }).catch((thrown)=>{
            reject(thrown)
        })
    })
}

//加减乘除

//加    
function add(arg1,arg2){    
     var r1,r2,m;    
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
     m=Math.pow(10,Math.max(r1,r2));    
     return (arg1*m+arg2*m)/m;    
}    
      
//减    
function sub(arg1,arg2){    
    var r1,r2,m,n;    
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
    m=Math.pow(10,Math.max(r1,r2));    
    //动态控制精度长度    
    n=(r1>=r2)?r1:r2;    
    return ((arg1*m-arg2*m)/m).toFixed(n);    
}    
       
//乘    
function mul(arg1,arg2)   {     
    var m=0,s1=arg1.toString(),s2=arg2.toString();     
    try{m+=s1.split(".")[1].length}catch(e){m=0}     
    try{m+=s2.split(".")[1].length}catch(e){m=0}     
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);     
}

//除   
function div(arg1,arg2){     
      var t1=0,t2=0,r1,r2;     
      try{t1=arg1.toString().split(".")[1].length}catch(e){t1=0}     
      try{t2=arg2.toString().split(".")[1].length}catch(e){t2=0}     
        
      r1=Number(arg1.toString().replace(".",""));  
   
      r2=Number(arg2.toString().replace(".",""));     
      return (r1/r2)*Math.pow(10,t2-t1);     
}  

export default{
    install: function(Vue){
        Vue.prototype.uploadFile = (url,payload,cancelToken,callback1) => uploadFile (url,payload,cancelToken,callback1);
        Vue.prototype.getAllCategory = () => getAllCategory ();
        Vue.prototype.add = (a,b) => add (a,b);
        Vue.prototype.mul = (a,b) => mul (a,b);
        Vue.prototype.sub = (a,b) => sub (a,b);
        Vue.prototype.div = (a,b) => div (a,b);
    }
};
