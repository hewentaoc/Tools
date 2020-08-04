

let Utils = function(){
    this.defaultFn = function(){};
}
//缓存池
Utils.prototype.cache = {};

/**
 * 数组或者对象的深度克隆的简单实现
**/
Utils.prototype.easyDeepClone = function (tar = {}) {
    try{
        return JSON.parse(JSON.stringify(tar));
    }catch(error){
        console.log('error',error);
        return {};
    }
}

/**
 * 数组或对象的深度克隆的递归实现
 */
Utils.prototype.deepClone = function(origin,target){
    if(origin === null) {
        return null;
    }
    if(typeof origin == 'object') {//判断是否为数组、对象
        if(origin instanceof Array){//数组
            target = [];
            for(let i = 0; i < origin.length ; i++) {
                target[i] = this.deepClone(origin[i]);
            }
        }else{//对象
            target = {};
            for(let item in origin){
                if(origin.hasOwnProperty(item)){
                    target[item] = this.deepClone(origin[item]);
                }
            }
        }
    }else{
        target = origin;
    }
    return target;
}

/**
 * withHelper函数
 * 在执行某函数之前，先执行before函数
 * 在执行某函数之后，再执行after函数
 */
Utils.prototype.withHelper = function(opt = {}){
    let fn = opt.fn || this.defaultFn;
    let before = opt.before || this.defaultFn;
    let after = opt.after || this.defaultFn;
    return function () {
        let obj = {
            args: [].slice.call(arguments,0) 
        }
        try {
            before.apply(this,obj.args)
            obj.value = fn.apply(this,obj.args)
            after.call(this,obj)
        } catch (error) {
            console.log(error)
        }
        return obj.value;
    }
}　

//数组去重 1
Utils.prototype.uniqueArr1 = function( arr = []){
    if(!Array.isArray(arr)){
        return [];
    }
    let oset = new Set(arr);
    return Array.from(oset);
}

// 数组去重２
Utils.prototype.uniqueArr2 = function (arr = []) {
    if(!Array.isArray(arr)){
        return [];
    }
    let newArr = [];
    for(let i = 0 ; i < arr.length ; i++){
        if(newArr.indexOf(arr[i]) < 0){
            newArr.push(arr[i])
        }
    }
    return newArr;
}

//定义自定义事件
Utils.prototype.$on = function(type,func){
    if(typeof type != "string") {
        throw new Error('first paramer must be a string')
    }
    if(typeof func != 'function'){
        throw new Error('second paramer must be a function')
    }
    let cache = this.cache;
    if(cache[type]){
       cache[type].push(func);
    }else{
       cache[type] = [func];
    }
}

//执行自定义事件
Utils.prototype.$emit = function(type,...arg){
    if(typeof type != "string") {
        throw new Error('first paramer must be a string')
    }
    let cache = this.cache;
    if(!cache[type]){
        return ;
    }
    let cacheFunc = cache[type];
    for(let i = 0 ; i < cacheFunc.length; i++) {
        let func = cacheFunc[i];
        func.apply(null,arg)
    }
}

//延迟执行
Utils.prototype.debounce = function(func,time = 300){
    return function(){
        setTimeout(()=>{
            func.apply(null)
        },time)
    }
}

//求一个对象的长度
Utils.prototype.getObjLen = function(obj){
    if(obj === null) {
        return;
    }
    if(typeof obj != 'object'){
        return;
    }
    return Object.keys(obj).length;
}

//数组扁平化
Utils.prototype.myFlat1 = function(arr = []){
    if( !Array.isArray(arr) || arr.length == 0){
        return [];
    }
    let newArr = [];
    for(let i = 0 ; i < arr.length ;i ++) {
        if(Array.isArray(arr[i])){
            newArr = newArr.concat(this.myFlat1(arr[i]))
        }else{
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

//数组扁平化,Es6方法
Utils.prototype.myFlat2 = function(arr = []){
    if( !Array.isArray(arr) || arr.length == 0){
        return [];
    }
    if(arr.flat){
        return arr.flat(Infinity);
    }
}

//实现继承的方法
/**
 * 继承实现的三种方式
 */
Utils.prototype.inherit = function(){
    let inherit1 = (target,origin)=>{
        target.__proto__ = origin;
    }
    let inheirt2 = (target,origin)=>{
        Object.setPrototypeOf(target,origin)
    }
    let inheirt3 = (target,origin)=>{
        let F = function(){};
        F.prototype = origin.prototype;
        target.prototype = new F(); 
    }
    return {
        inherit1,
        inheirt2,
        inheirt3
    }
}


Utils.prototype.isObject = function(obj){
    let toStr = Object.prototype.toString.call(obj);
    if(toStr == "[object Object]"){
        return true;
    }
    return false;
}

Utils.prototype.proxyObj = {};
/**
 * 进行对象的代理
 */
Utils.prototype.myProxy = function( initObj= {},proxyObj = Utils.prototype.proxyObj , callBack){
    if(!this.isObject(initObj)){
        return false;
    }
    for(let prop in initObj){
        Object.defineProperty(proxyObj,prop,{
            set(val){
                console.log('我被修改了')
                initObj[prop] = val;
                callBack && callBack(prop,val);
            },
            get(){
                console.log('我被调用了')
                return initObj[prop];
            }
        })

        if(this.isObject(initObj[prop])){
            proxyObj[prop] = this.myProxy(initObj[prop],{},callBack)
        }
        return proxyObj;
    }
}



let obj = {
    love:{
        mylove:'sing'
    }
}











let utils = new Utils();
let myTarget = utils.deepClone();
// utils.myProxy(obj, Utils.prototype.proxyObj,function(key,val){
//     console.log(key,val)
// })

utils.$on('test',function(test){
    console.log(test,1);
})
utils.$on('test',function(test){
    console.log(test,2);
})
// utils.$emit('test','demo')
// let oarr = [1,[2,3],[4,[5,9]]];

// let xxarr = utils.myFlat2(oarr);
// console.log(xxarr)
// let oarr =  utils.uniqueArr2([1,2,3,3,2,1,2,9])
// console.log(oarr)

// function demo() {
//  console.log([].slice.call(arguments,0));
//  console.log([...arguments])
//  console.log(Array.prototype.slice.call(arguments,0))
// }

// let newDemo = utils.withHelper({
//     fn: demo,
//     before:function(){
//         console.log('before',arguments);
//     },
//     after:function(){
//         console.log('after',arguments);
//     }
// })

// newDemo(1,2,3);


// function demo(...arg){
//     let arr = [...arguments]
//     console.log(arr,arg,...arg)    
// }

// demo(1,2,3);





