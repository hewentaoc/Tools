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
    function reject(params){
        if(self.status != 'pedding'){
            return;
        }
        self.rejectParams = params;
        self.status = 'reject';
        self.rejectArr.forEach((elem)=>{
            elem();
        })
    }
    try {
      func1(reslove,reject);
    } catch (error) {
      console.log('iii')
      reject(error)
    }
 }
 MyPromise.prototype.handleNextValue = function(nextPromise,returnParams,reslove,reject){
    if(returnParams instanceof MyPromise){
       returnParams.then((params)=>{
          reslove(params)
        },(err)=>{
          reject(err)
        })
    }else{
        reslove(returnParams)
    }
 }
 MyPromise.prototype.then = function(succ,fail){
    if(!succ){
        succ = function(data){
            return data;
        }
    }
    if(!fail){
        fail = function(error){
            throw new Error(error);
        } 
    }
    let self = this;
    var nextPromise = new MyPromise((reslove,reject)=>{
        if(this.status == 'reslove'){
           setTimeout(()=>{
              try {
                let returnParams = succ(self.resloveParams);
                self.handleNextValue(nextPromise,returnParams,reslove,reject)
              } catch (error) {
                console.log(error)
                reject(error)  
              }
           },0)
        }
        if(this.status == 'reject'){
            setTimeout(()=>{
                try {
                   let returnParams = fail(self.rejectParams);
                   self.handleNextValue(nextPromise,returnParams,reslove,reject)
                } catch (error) {
                   reject(error)
                }
            },0)
        }
        if(this.status == 'pedding'){
            if(succ){
                self.resolveArr.push(()=>{
                    setTimeout(()=>{
                        try {
                         let nextValue = succ(self.resloveParams);
                         self.handleNextValue(nextPromise,nextValue,reslove,reject)
                        } catch (error) {
                           console.log(909)
                           reject(error)    
                        }
                    },0)
                })
            }
            if(fail){
                self.rejectArr.push(()=>{
                    setTimeout(()=>{
                       try {
                         let nextValue = fail(self.rejectParams);
                         self.handleNextValue(nextPromise,nextValue,reslove,reject)
                       } catch (error) {
                         console.log(788)
                         reject(error)
                       }
                    },0)
                })
            }
        }
    })
    return nextPromise;
 }
 
 MyPromise.prototype.catch = function(reject){
    return this.then(null,reject)
 }
 
//  setTimeout(()=>{
//     console.log(999,'qqq')  
//  })
 let oq = new MyPromise((reslove)=>{
    reslove(333)
 });
 oq.then((data)=>{
    console.log(222,'sss',data)
    return 'mmm'
 },(error)=>{
    console.log('error',error)
 }).then((res)=>{
    console.log(888,res)
    return new MyPromise((reslove)=>{
        reslove('my promise!')
    })
 }).then().then((res)=>{
    console.log('yyyy',res)
 }).catch((err)=>{
    console.log(666,err)
 }).then(()=>{
    console.log('777')
 })

