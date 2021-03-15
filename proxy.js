

    /* 
        检测数据的变化
        从而实现页面的实施更新
    */
    /* 
     代理对象的函数
     vm ---> 对象的实例
     obj ---> data数据
     namescpace ---> 记录此时调用对象的命名空间 */
    function constructorObject(vm , obj , namespace) {
        // console.log(obj)
        let proxyObj = {}
        for(let prop in obj){
            /* 将值代理在vm._data上 */
            Object.defineProperty(proxyObj,prop,{
                configurable:true,
                get () {/* 检测调用对象的值 */
                    console.log('get')
                    return obj[prop];
                },
                set (val) {/* 检测修改对象的值 */
                    console.log('set',val)
                    obj[prop] = val;
                    /* 
                      应该是数值被更改后
                      再调用更新的函数 */
                    // let template = getNameSpace(namespace,prop)
                    // updateNode(vm , template)
                }
            })
            /* 
             用于处理对象的嵌套问题 */
            if(obj[prop] instanceof Object ){
                proxyObj[prop] = constructorData(vm ,obj[prop] , '');
            }
        }
        return proxyObj;
    }


    let arrayprop = Array.prototype;
    /* 
     进行数组方法的代理 */
    function proxyArray(vm,obj,type,namespace){
        /* 
         type 代表代理对象obj中的某个方法
         例如push 、 pop 、 shift 、unshift等方法
              */
        /* 
           通过在obj对象中重新数组方法
           从而对数组方法进行代理
           可以达到检测数组方法调用的效果

           然后使对应数组的原型指向obj对象
           这样数组arr在调用push等方法的时候
           先会从自己的原型上查找
           就会优先使用原型obj上的push方法
           以此达到检测数组方法调用的效果
           从而形成数据的双向绑定
         */
        Object.defineProperty(obj,type,{
            enumerable:true,
            configurable:true,
            value:(function(){
                return function (...arg){
                    /* 该处的this代表引用该方法的数组 
                       某个数组执行push方法
                       此时push方法内的this就为该数组
                           ===
                       通过改变this指向
                       同样可以使push函数内部的this为对应的数组
                       */
                    let result = arrayprop[type].apply(this,arg);
                    return result;
                }
            }())
        })
    }

    /* 检测数组的方法调用 */
    function constructorArray(vm , arr , namespace) {
        var obj = {
            eleName:"Array",
            push:function(){

            },
            pop(){},
            shift(){},
            unshift(){},
        }
        /* 
         该处的this指向可以填this
         对后面的this没影响 */
        proxyArray.call(vm, vm ,obj,'push',namespace);
        proxyArray.call(vm, vm ,obj,'pop',namespace);
        proxyArray.call(vm, vm ,obj,'shift',namespace);
        proxyArray.call(vm, vm ,obj,'shift',namespace);
        arr.__proto__ = obj;
        return arr;
    }
    /* 
      用来处理数据  */
    function constructorData(vm , obj , namespace){
        let proxyObj = null;
       
        if(obj instanceof Array){ /*  判断数据是否为数组 */
            proxyObj = new Array(obj.length);
            for(var i = 0 ; i < obj.length; i++){
                proxyObj[i] =  constructorObject(vm , obj[i] , namespace);
            }
            proxyObj = constructorArray(vm , obj , namespace);
        }else if(obj instanceof Object){   /* 判断数据是否为对象 */

            proxyObj = constructorObject(vm , obj , namespace);

        }else{/* 不是对象就抛出错误 */
            throw new Error('not the type');
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
let proxyObj = constructorData(window , obj , '')