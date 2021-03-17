


function myProxy(vm,obj){
    let proxyObj = {}
    if(obj instanceof Array){
        proxyObj = [];
        for(let i = 0 ;i < obj.length ;i++){
           proxyObj[i] = proxyObject(vm,obj[i]);
        }
        proxyObj = proxyArray(vm,obj);
    }else if(obj instanceof Object){
      proxyObj = proxyObject(vm,obj)
    }
    return proxyObj;
}
let prototype = Array.prototype;
function proxyArray(vm,arr){
    let obj = {
        unshift:function(){},
        push:function(){}
    }
    Object.defineProperty(obj,'push',{
        value:function(){
            console.log('push');
            let result = prototype['push'].apply(this,arguments);
            return result;
        }
    })
    arr.__proto__ = obj;
    return arr;
}

function proxyObject(vm,obj){
    let proxyObj = {}
    for (const key in obj) {
        Object.defineProperty(proxyObj,key,{
            set(value){
                console.log('set',value)
                obj[key] = value;
            },
            get(){
                console.log('get');
                return obj[key];
            }
        })
        if(typeof obj[key] == 'object'){
            proxyObj[key] = myProxy(vm,obj[key]);
        }
    }
    return proxyObj;
}

let obj = {
    name:'hwt',
    age:13,
    test:[1],
    love:{
        sing:'song'
    }
}
let proxyObj = myProxy(window,obj);