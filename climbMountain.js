
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