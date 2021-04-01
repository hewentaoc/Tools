

let obj = {
    name:'hwt',
    age:23,
    loves:{
        sing:'song'
    }
}
// function proxy(obj){
//     if(typeof obj != 'object'){
//         return obj;
//     }
//     Object.keys(obj).forEach((prop)=>{
//         let value = proxy(obj[prop]);
//         Object.defineProperty(obj,prop,{
//             set(val){
//                 value = val;
//                 console.log(11,'set' + prop + ':',value)
//             },
//             get(){
//                 console.log(22,'get'+ prop + ':',value)
//                 return value;
//             }
//         })

//     })
//     return obj;
// }



/**
 * 监听订阅模式实现vue的计算属性computed
 */
class Dep{
    constructor(){
        this.store = new Set()
    }
    depend(){
        if(activeUpdate){
            this.store.add(activeUpdate)
        }
    }
    notify(){
        this.store.forEach((func)=>{
            func();
        })
    }
}

function observer(obj) {
    if(typeof obj != 'object'){
        return;
    }
    Object.keys(obj).forEach((item)=>{
        let dep = new Dep();
        let value = obj[item];
        observer(obj[item])//递归监听属性
        Object.defineProperty(obj,item,{
            get(){
                console.log('get '+ item + ':',value)
                dep.depend();
                return value;
            },
            set(val){
                observer(val);//对赋值为对象的值进行重新监听
                console.log('set '+ item + ':',value)
                value = val;
                dep.notify();//通知所有用到我的属性全部重新运行
            }
        })
    })
}
observer(obj)

var activeUpdate = null;
function autoRun(func){
    function wrapperFunc(){//用于增强函数的内容,可以对依赖的函数进行再次收集
        activeUpdate = wrapperFunc;
        func();
        activeUpdate = null;
    }
    wrapperFunc()
}

autoRun(()=>{
    console.log(111,obj.name)
})
autoRun(()=>{
    console.log(222,obj.loves)
})
autoRun(()=>{
  if(obj.age % 2 == 0){
      console.log(333,obj.name)
  }
})