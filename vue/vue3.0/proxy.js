

let obj = {
    name:'hwt',
    age:23,
    loves:{
        sing:'song'
    }
}
// let map = new Map();
// function proxy(obj){
//     if(typeof obj != 'object'){
//         return obj;
//     }
//     var result = map.get(obj);
//     if(result){//做个缓存，提升性能
//         return result;
//     }
//     result = new Proxy(obj,{
//         set(target,key,value){
//             console.log('set',key)
//             target[key] = proxy(value);
//         },
//         get(target,key){
//             console.log('get',key)
//             let value = proxy(target[key]);
//             return value;
//         }
//     })
//     map.set(obj,result);
//     return result;
// }

// let result = proxy(obj);
// console.log(333,result)
// result.age;
// console.log('----')
// result.loves.sing;



// obj = {
//     name:'hwt',
//     age:23,
//     loves:{
//         sing:'song'
//     }
// }

//obj,name
//map
//obj,Map([name])
//obj,Map([name,Set(func,func))
function observer(obj){
    if(typeof obj != 'object'){
        return obj;
    }
    
    let result = new Proxy(obj,{
        set(target,key,value){
            console.log('set',key)
            observer(value)
            Reflect.set(target,key,value);
            trigger(target,key)
        },
        get(target,key){
          console.log('get',key)
          track(target,key)
          let value = observer(Reflect.get(target,key));
          return value;
        }
    })
    return result;
}

let res = observer(obj)
// res.name;
// res.age;
// res.name = 'wthe';
// res.age = 24;
// res.loves;
// res.loves.sing;

var activeUpdate = null;
function effect(func){
    function wrapperFunc(){
        activeUpdate = wrapperFunc;
        func();
        activeUpdate = null;
    }
    wrapperFunc();
}

let depsMap = new Map();
function track(target,key){
    if(activeUpdate){
        let targetDeps= depsMap.get(target);
        if(!targetDeps){
            targetDeps = new Map();
            depsMap.set(target,targetDeps);
        }
        let deps = targetDeps.get(key);
        if(!deps){
            deps = new Set();
            targetDeps.set(key,deps);
        }
        deps.add(activeUpdate);
    }
}

function trigger(target,key){
    let triggerDeps = depsMap.get(target);
    if(!triggerDeps){
        return;
    }
    let deps = triggerDeps.get(key);
    if(!deps){
        return;
    }
    Array.from(deps).forEach((func)=>{
        func();
    })
}
effect(()=>{
    console.log(111,res.name,res.age)
})
effect(()=>{
    console.log(222,res.name)
})
effect(()=>{
    console.log(333,res.age)
})
effect(()=>{
    console.log(444,res.loves)
})