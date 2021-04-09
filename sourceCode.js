/**
* 1. Object.defineProperty
*/

let obj = {
    name:'hwt',
    age:13,
    test:[1,2,3],
    love:{
        sing:'song'
    }
}

function proxyMix(obj){
    let proxyObj = {}
    if(obj instanceof Array){
       proxyObj = [];
       for(let i = 0 ; i < obj.length ; i++){
           proxyObj[i] = proxyObjFunc(obj[i]);
       }
       proxyObj = proxyArrFunc(obj)
    }else if(typeof obj == 'object'){
        proxyObj = proxyObjFunc(obj);
    }
    return proxyObj;
}
function proxyObjFunc(obj){
    let proxyObj = {}
    for (const key in obj) {
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
        if(typeof obj[key] == 'object'){
            proxyObj[key] = proxyMix(obj[key]);
        }
    }
    return proxyObj;
}
let protoArr = Array.prototype;
function proxyArrFunc(arr){
    let prototypeObj = {
        push:function(){},
        pop(){},
        shift(){},
        unshift(){}
    }
    Object.defineProperty(prototypeObj,'push',{
        value:(function(){
            return function(...arg){
                console.log('push','数组监控')
                protoArr['push'].apply(this,arg);
                return this.length;
            }
        }())
    })
    arr.__proto__ = prototypeObj;
    return arr;
}

let proxyObj = proxyMix(obj);

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

 MyPromise.all = function(arr){
    let len = arr.length;
    let store = [];
    return new MyPromise((res,rej)=>{
         let record = after(len,res);   
         for(let i = 0 ; i < arr.length ; i++){
             if(arr[i] instanceof MyPromise){
                arr[i].then((data)=>{
                    store.push(data);
                    record(store)
                })
             }else{
                 rej('error')
             }
         }
    })
 }

function after(len,res){
     let index = 0;
     return function(data){
        index++;
        if(index == len) {
            res(data)
        }
     }
}
MyPromise.race = function(arr){
    return new MyPromise((res,rej)=>{
        for(let i = 0 ; i < arr.length ; i ++){
            arr[i].then(res,rej)
        }
    })
}
//  setTimeout(()=>{
//     console.log(999,'qqq')  
//  })
//  let oq = new MyPromise((reslove)=>{
//     reslove(333)
//  });
//  oq.then((data)=>{
//     console.log(222,'sss',data)
//     return 'mmm'
//  },(error)=>{
//     console.log('error',error)
//  }).then((res)=>{
//     console.log(888,res)
//     return new MyPromise((reslove)=>{
//         reslove('my promise!')
//     })
//  }).then().then((res)=>{
//     console.log('yyyy',res)
//  }).catch((err)=>{
//     console.log(666,err)
//  }).then(()=>{
//     console.log('777')
//  })

//  let op_1 = new MyPromise((res,rej)=>{
//      setTimeout(()=>{
//         rej('op_1')
//      },1000)
//  })
//  let op_2 = new MyPromise((res)=>{
//     setTimeout(()=>{
//        res('op_2')
//     },2000)
// })
//  MyPromise.all([op_1,op_2]).then((data)=>{
//     console.log(data,'9090')
//  })
//  MyPromise.race([op_1,op_2]).then((data)=>{
//     console.log(data,'9090')
//  },function(err){
//     console.log(err,'68')
//  })


/**
 * 6.Set
 */
class MySet {
   constructor(iteratorObj){
     if(typeof iteratorObj[Symbol.iterator] != 'function'){
         throw new Error('iteratorObj不是一个迭代对象')
     }
     this.stores = [];
     for (const iterator of iteratorObj) {
        this.add(iterator)
     }
   }
   add(data){
      if(!this.has(data)){
        this.stores.push(data);
      }
   }
   delete(data){
    　for(let i = 0 ; i < this.stores.length;i++){
            if(this.isEqual(data,this.stores[i])){
                this.stores.splice(i,1);
                return true;
            }
      }
      return false;
   }
   has(data){
     for (const item of this.stores) {
         if(this.isEqual(data,item)){
             return true;
         }
     }
     return false;
   }
   clean(){
       this.stores.length = 0;
   }
   forEach(callback) {
    for (const item of this._datas) {
        callback(item, item, this);
    }
   }
   isEqual(data,item){
     return Object.is(data,item)
   }
   *[Symbol.iterator](){
       for (const iterator of this.stores) {
           yield iterator;
       }
   }
   size() {
    return this._datas.length;
   } 
}




class myMap {
    constructor(arr = []){
        if(typeof arr[Symbol.iterator] != 'function'){
            throw new Error('params must be a iterator　object');
        }
        this.stack = [];
        for (const item of arr) {
            if(typeof item[Symbol.iterator] != 'function'){
                throw new Error('params must be a iterator object')
            }
            const iterator = item[Symbol.iterator]();
            let key = iterator.next.value;
            let value = iterator.next.value;
            this.set(key,value);
        }
    }
    set(key,value){
       let obj = this.getObjByKey(key)
       if(obj) {
            obj.value = value;
            console.log(obj)
       }else{
         this.stack.push({
             key,
             value
         })   
       }
    }
    getObjByKey(key){
        for (const item of this.stack) {
            if(this.isEqual(item.key,key)){
                return item;
            }
        }
    }
    isEqual(key1,key2){
        return Object.is(key1,key2);
    }
    has(key){
        let obj = this.getObjByKey(key);
        return obj ? true : false;      
    }   
    get(key){
        let obj = this.getObjByKey(key);
        if(obj){
            return obj.value;
        }
        return obj;
    }
    size(){
        return this.stack.length;
    }
    delete(key){
      let obj = this.getObjByKey(key);
      if(obj){
         let index = this.stack.indexOf(obj);
         this.stack.splice(index,1);
         return true;
      }  
      return false;
    }

    *[Symbol.iterator]() {
        for (const item of this.stack) {
            yield [item.key, item.value];
        }
    }

    forEach(callback) {
        for (const item of this._datas) {
            callback(item.value, item.key, this);
        }
    }
}



// let demo6 = new MySet([1,2,3,4])
// // console.log(demo6)
// console.log([...demo6])
let test = new Map();
console.log(test.get(1))

const mp1 = new myMap();
mp1.set(1,2)
mp1.set(1,3)
console.log(mp1);
console.log(mp1.get(1))