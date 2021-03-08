/**
* 1. Object.defineProperty
*/

let obj = {
    name:'hwt',
    age:13,
    test:[1],
    love:{
        sing:'song'
    }
}

let proxyObj = {}
function proxyMix(obj){
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            if(element instanceof Array){
                Object.defineProperty(proxyObj,key,{
                    set(val){
                        console.log('set')
                        obj[key] = val;
                    },
                    get(){
                        console.log('get');
                        return obj[key];
                    }
                })
                let prototypeObj = {
                    push:function(){},
                    pop(){},
                    shift(){},
                    unshift(){}
                }
                element.__proto__ = prototypeObj;
                proxyArrFunc(prototypeObj,'push');
                proxyArrFunc(prototypeObj,'pop');
            }else{
                proxyObjFunc(key,obj,element);
            }
        }
    }
}
let protoArr = Array.prototype;
function proxyArrFunc(prototypeObj,prop){
    Object.defineProperty(prototypeObj,prop,{
        value:(function(){
            return function(...arg){
                console.log(prop,'数组监控')
                protoArr[prop].apply(this,arg);
                return this.length;
            }
        }())
    })
}
function proxyObjFunc(key,obj,element){
    Object.defineProperty(proxyObj,key,{
        set(val){
            console.log('set')
            obj[key] = val;
        },
        get(){
            console.log('get');
            return obj[key];
        }
    })
    if(typeof element == 'object'){
       proxyMix(element);
    }
}

proxyMix(obj);

function addNewKey(key,value){
    
}
// console.log(proxyObj.name)










/**
 * 2.proxy
 */

let proxyMixObj = new Proxy(obj,{
    set(target,key,value,proxyObj){
        console.log('proxy set')
        Reflect.set(target,key,value)
    },
    get(target,key,proxyObj){
        console.log('proxy get')
        return Reflect.get(target,key)
    }
})




/**
 * 3.迭代器
 * 
 * 1. 是个对象
 * 2. 具有next方法
 * 3. 返回{value,done}
 */

//迭代器
let iterator = {
    a:1,
    next(){
        return {
            value:this.a++,
            done: this.a > 4
        }
    }
}

//迭代器创建函数
function createIterator(arr){
    let i = 0;
    return {
        next(){
            return {
                value:arr[i++],
                done: i > arr.length
            }
        }
    }
}

let iterators = createIterator([3,44,99,2,1]);
// let arrs = [3,44,99,2,1]
// let iter = arrs[Symbol.iterator]();
// for(let i = 0 ; i < arrs.length ;i++){
//     console.log(iter.next())
// }

//Symbol.iterator 可迭代协议


/**
 * 4. 生成器
 */

 //生成器创建函数

 function* createGenerator(){

 }
 //迭代器和可迭代对象
 let generator = createGenerator();
//  generator.next == generator[Symbol.iterator]().next


function asyncFunc(){
  return new Promise((reslove)=>{
    setTimeout(()=>{
        reslove('tao ge')
    },2000)
})   
}

 
function* createGenerator2() {
   let val = yield asyncFunc();
   console.log(1111,val);
}
let generator2 = createGenerator2();

function getData(generator){
    let next = function(val){
        let {value,done} = generator.next(val);
        if(done){
            return
        }else{
           if(value instanceof Promise){
                value.then((data)=>{
                  next(data)
                })
           }else{
               next(value)
           }
        }
    }
    next();
}
// getData(generator2)



/**
 * 5. Promise
 */

 let op = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve('azz','1')
    })
 })
//  let opt = op.then((a,b)=>{
//     console.log(a,b)
//  });
//  console.log(opt,op,)
//  console.log(opt == op)

 function MyPromise(func1){
    if(typeof func1 != 'function'){
        throw new Error('func muse be a function!')
    }
    this.resolveArr = [];
    this.rejectArr = [];
    this.status = 'pedding';
    this.resloveParams = '';
    this.rejectParams = '';
    let self = this;
    function reslove(params){
        if(self.status != 'pedding'){
            return;
        }
        self.resloveParams = params;
        self.status = 'reslove';
        self.resolveArr.forEach((elem)=>{
            elem();
        })
    }
    function reject(){
        if(self.status != 'pedding'){
            return;
        }
        self.reject = 'reject';
    }
    func1(reslove,reject);
 }
 MyPromise.prototype.then = function(succ,fail){
    if(typeof succ != 'function'){
        return;
    }
    let self = this;
    var nextPromise = new Promise((reslove,reject)=>{
        if(this.status == 'reslove'){
           let returnParams = succ(this.params);
           //this.status = 'pedding';
           reslove(returnParams)
        }
        if(this.status == 'fail'){
            let returnParams = fail(this.params);
            // this.status = 'pedding'; 
            reject(returnParams)
        }
        if(this.status == 'pedding'){
            if(succ){
                self.resolveArr.push(()=>{
                    setTimeout(()=>{
                        try {
                         let nextValue = succ(self.resloveParams);
                         reslove(nextValue)
                        } catch (error) {
                         reject(error)    
                        }
                    })
                })
            }
            if(fail){
                self.resolveArr.push(()=>{
                    succ(self.rejectParams);
                })
            }
        }
    })
    return nextPromise;
 }  
 
 setTimeout(()=>{
    console.log(999,'qqq')  
 })
 let oq = new MyPromise((reslove)=>{
    console.log(111,'ooo')
    reslove(333)
 });
 oq.then((data)=>{
    console.log(222,'sss',data)
    return 'sss'
 }).then((res)=>{
    console.log(888,res)
 })