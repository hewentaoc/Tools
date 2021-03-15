
/**
 * 1.JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出。

 */
//方法一
// class Scheduler {
//   constructor(){
//       this.promissStore = [];
//       this.count = 0;
//   }
//   run(){
//     let promissStore  = this.promissStore;
//     let count = this.count;
//     if(promissStore.length && count < 2){
//         this.count++;
//         let [resolve,promiseCreator] =  promissStore.shift();
//         Promise.resolve(promiseCreator()).then(()=>{
//             resolve();
//             this.count --;
//             this.run();
//         })
//     }
//   }
//   add(promiseCreator) {
//     return new Promise((reslove,resject)=>{
//         this.promissStore.push([reslove,promiseCreator]);
//         this.run(); 
//     })
//   }
// }
//   const timeout = (time) => new Promise(resolve => {
//     setTimeout(resolve, time)
//   })
//   const scheduler = new Scheduler();
//   const addTask = (time, order) => {
//   scheduler.add(() => timeout(time))
//    .then(() => console.log(time, 'time, order', order))
//   }

// addTask(1000, '1')
// addTask(500,  '2')
// addTask(300,  '3')
// addTask(400,  '4')
// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4

//方法二
class Scheduler {
    constructor() {
        this.promissStore = [];
        this.count = 0;
    }
    async add(promiseCreator) {
        return new Promise((res)=>{
            this.promissStore.push([promiseCreator,res]);
            this.count++;
            this.next();
        })
    }
    next(){
        if(this.promissStore.length && this.count <= 2){
           let [promiseCreator,res] = this.promissStore.shift();
            promiseCreator().then(()=>{
                this.count --;
                res();
                this.next();
            })
        }
    }
}
const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})
const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
        .then(() => console.log(time, 'time, order', order))
}
// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')





// function O() {
//     this.x = 1;
//     this.print = function () {
//         console.log(this.x)
//     }
// }
// var o = new O()
 
// var print = o.print
// print()
 
// var n = {x: 2, print: print}
// n.print()






/**
 * 2.
 * 两个36进制的数相加的结果
 * 123 3f
 * 456 9l
 */

 function getBinaryAdd(binary,num1,num2){
    num1 = parseInt(num1,binary);//目标进制转化为十进制
    num2 = parseInt(num2,binary);
    let add = Number(num1) + Number(num2) + '';
    add = add.toString(binary)
    return add;
 }

//  console.log(getBinaryAdd(36,'3f','9l'))

/**
 * 3.正则模式
 * 
 * (1)将匹配到aabb都转变为bbaa
 * (2)将下划线字符串转成驼峰字符串
 * (3)正则去重
 */
 
 let str3_1 = 'aabbccdd';

 str3_1_result = str3_1.replace(/(\w)\1(\w)\2/g,function($,$1,$2){
    return $2 + $2 + $1 + $1
 })


 let str3_2 = 'how_are_you';

 str3_2_result = str3_2.replace(/_(\w)/g,function($,$1,$2){
    return $1.toUpperCase();
 })
//  console.log(str3_2_result)

let str3_3 = "144555568";

str3_3_result = str3_3.replace(/(\w)\1+/g,function($,$1,$2){
    return $1;
})
// console.log(str3_3_result)

/**
 * 4.数组里面找重复数字。[1,2,3,2,1,1,1,1]，输出[1,2]
 * 给Arr和target，在Arr里找两个数字相加等于target
 * 给定一个无重复数字的数组，求其全排列
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）
* @param {any} obj 注意输入可能是任何类型
* @returns {Object}
* @example
* {
*   user_name: 'tom',
*   current_position: 'mid',
*   child_node: {
*     curr_age: 10,
*   },
* };
* 转换后
* {
*   userName: 'tom',
*   currentPosition: 'mid',
*   childNode: {
*     currAge: 10,
*   },
* };
 */