/**
 * 1. 二分法查数组的索引
    // 二分法需要排好队
 */
var arr1 = [1, 3, 4, 5, 6, 7, 8, 10, 21];

function erFen(arr,target){
    if(!Array.isArray(arr)){
        return -1;
    }
    let low = 0;
    let hight = arr.length -1;
    while(low <= hight){
      let mid = parseInt((low + hight) /2);
      if(arr[mid] == target){
          return mid;
      }else if(arr[mid] > target){
          hight --;
      }else{
          low++;
      }
    }
    return -1;
}
// console.log(erFen(arr1,8))


// 2 判断回文字符串
//   二分法
//  [a,b,c,b,a]  [a,b,c,c,b,a];

let arr2 = ['a','b','c','b','a'];
function isHuiWen(arr){
    if(!Array.isArray(arr)){
        return false;
    }
    let low = 0;
    let hight = arr.length -1 ;
    while(low <= hight){
        if(arr[low] == arr[hight]){
            low++;
            hight--;
        }else{
            return false
        }
    }
    return true;
}

// console.log(isHuiWen(arr2));





function NodeTree2(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

let a5 = new NodeTree2('a');
let b5=  new NodeTree2('b');
let c5 = new NodeTree2('c');
let d5 = new NodeTree2('d');
let e5 = new NodeTree2('e');
let f5 = new NodeTree2('f');
a5.left = b5;
a5.right = c5;
c5.left = d5;
c5.right = e5;


function prevTree(root){
    if(!root){
        return null;
    }
    console.log(root.value);
    root.left && prevTree(root.left);
    root.right && prevTree(root.right);
}
// prevTree(a5)

function prevTree2(root){
    if(!root){
        return null;
    }
    let arr = [root];
    while(arr.length > 0) {
        let node = arr.pop();
        console.log(node.value);
        if(node.right){
            arr.push(node.right)
        }   
        if(node.left){
            arr.push(node.left)
        }
    }
}
// prevTree2(a5)



function middleTree(root){
    if(!root){
        return null;
    }
    root.left && middleTree(root.left);
    console.log(root.value);
    root.right && middleTree(root.right);
}
// middleTree(a5)

function middleTree2(root){
    if(!root){
        return null;
    }
    let arr = [];
    let node = root;
    while (node || arr.length > 0){
        if(node){
            arr.push(node);
            node = node.left;
        }else{
          let cur = arr.pop();
          console.log(cur.value)
          node = cur.right;
        }
    }
}

// middleTree2(a5)


function List(value){
    this.value = value;
    this.next = null;
}

let a = new List('a');
let b = new List('b');
let c = new List('c');
let d = new List('d');

a.next = b;
b.next = c;
c.next = d;
// console.log(a)

function reverseList(node){
    if(node.next == null){
        return node;
    }

    let result = reverseList(node.next);
    node.next.next = node;
    node.next = null;
    return result;
}
// let test = reverseList(a)
function reverseList2(root){
    if(!root){
        return null;
    }
    let prev = null;
    let node = root;
    while(node){
        let next = node.next;
        node.next = prev;
        prev = node;
        node = next;
    }
    return prev
}
// let test = reverseList2(a)
// console.log(99,test)


/**
 * 3.数组中最大出现次数
 */

 let arr3 = [7,3,5,9,3,0,8,5,1,5,9,3,3]
 
 function getMostTimes(arr){
    arr.sort((a,b)=>{
        return a - b 
    })
    console.log(arr)
    let time = 1;
    let max = 0;
    for(let i = 0 ; i < arr.length - 1;i ++){
       if(arr[i+1] == arr[i]){
           time++;
       }else{
           max = time > max ? time : max;
           time = 1;
       }
    }
    return max;
 }
//  let max3 = getMostTimes(arr3)
//  console.log(max3)

/**
 4.查询子串首次出现的位置,abcbcxyxyz  字串为bc  结果为1
 */
var str4 = 'abcbcxyxyz';
var arr4 = str4 .split('');
var sArr4 = ['x', 'y', 'z'];

function getFirstHere(origin,target){
    let index = -1;
    for(let i = 0 ;i < origin.length ; i++){
        for(let j = 0; j < target.length ; j++){
            if(target[j] == origin[i+j]){
                if(j == target.length - 1){
                    index = i;
                }else{
                    continue;
                }
            }else{
                break;
            }
        }   
    }
    return index
}
// let index4 = getFirstHere(arr4,sArr4);
// console.log(index4)



/**
5. 计算数组中,最大连续增长序列的长度,[1,2,3,4,1,2,3,4,5,1,2,3] 结果为5
       
 */
var arr5 = [1,2,3,4,1,2,3,4,5,1,2,3] ;

function getMaxLen(arr){
    let count = 1;
    let max = 0;
    for(let i = 0 ; i < arr.length - 1 ; i++){
        if(arr[i+1] > arr[i]){
            count++;
        }else{
            max = count > max ? count : max;
            count = 1;
        }
    }
    return max;
}
// let len5 = getMaxLen(arr5)
// console.log(len5 )


/**
 * 
 * 6. filter
 */
var arr6 = [1,2,3,4,1,2,3,4,5,1,2,3] ;

Array.prototype.myFilter = function(func){
    let arr = this;
    let result = [];
    for(let i = 0 ;i < arr.length ;i ++){
        func(arr[i],i,arr) ? result.push(arr[i]) : '';
    }
    return result;
}

let filterResult = arr6.myFilter((item,index,ele)=>{
    return item > 1;
})
// console.log(filterResult)

/**
 * 7.reduce
 */


 let arr7 = [1,2,3];
 
 Array.prototype.myReduce = function(){
     let arr = this;
     let func = arguments[0];
     let count = arguments[1];
     if(count){
        for(let i = 0 ; i < arr.length; i++){
            count = func(count,arr[i],i);
         }
     }else{
         count = arr[0];
         for(let i = 1 ; i < arr.length ; i++) {
             count = func(count,arr[i],i)
         }
     }
     return count;
 }
  
 let result7 = arr7.myReduce((cur,item,index)=>{
     return cur + item;
 })
//  console.log(result7)

/**
 9. 数组去重
 var arr = [4, 5, 6, 5, 1, 4, 5, 8, 5];
 */
var test = [1,2,3]
var arr9 = [4, 5, 6, 5, 1, 4, 5, 8, 5,test,test,[1,2,3]];
// console.log([...new Set(arr9)])


function arrUnique(arr){
    let result = [];
    for(let i = 0 ; i < arr.length; i++){
        if(!result.includes(arr[i])){
            result.push(arr[i])
        }else{
            continue;
        }
    }
    return result;
 }
// console.log(arrUnique(arr9))


function arrUnique2(arr){
    let obj = {};
    let result = [];
    for(let i = 0 ; i< arr.length; i++){
        if(obj[arr[i]]){
            continue;
        }else{
            obj[arr[i]] = 'abc';
            result.push(arr[i]);
        }
    }
    console.log( obj)
    return result;
}
// console.log(arrUnique2(arr9))
/**
 10. 两个字符串找最大公共子串
 */

var str1 = 'abcdcef';
var str2 = 'bcdacd';

function findStr(str1,str2){
  let temp;
  if(str1.length > str2.length){
      temp = str1;
      str1 = str2;
      str2 = temp;
  }
  //'bcdacd'
  for(let i = str1.length; i > 0 ; i--){
      for(let j = 0 ; j <= str1.length - i; j++){
          let curStr = str1.substr(j,i);
          if(str2.indexOf(curStr) != -1){
              return curStr;
          }
      }
  }

}
// let curStr = findStr(str1,str2)
// console.log(curStr)



/**
 * 11.手写call,apply,
 */


Function.prototype.myCall = function(){
    let obj = arguments[0] || window;
    let arg = Array.prototype.slice.call(arguments,1);
    let func = this;
    obj.func = func;
    let result = obj.func(...arg);
    delete obj.func;
    return result;
}



Function.prototype.myApply = function(){
    let obj = arguments[0] || window;
    let arg = arguments[1] || [];
    let func = this;
    obj.func = func;
    let result = obj.func(...arg);
    delete obj.func;
    return result;
}

function test12(num,num2,num3){
  console.log(this,num,num2,num3)
}
let obj = {

}
// console.log(test12.length)
// test12.myApply(obj,[1,2,0])


/**
 * 12.函数柯里化
 */

 
 function add(a,b,c){
    return a + b + c;
 }

 function cur(){
    let func = arguments[0];
    let arg = Array.prototype.slice.call(arguments,1);
    let returnFunc =  function(){
        let curArg = [].slice.call(arguments);
        curArg = curArg.concat(arg);
        if(curArg.length < func.length) {
            return cur(func,...curArg)
        }else{
            return func.apply(this,curArg);
        }
    }
    return returnFunc;
 }
 
 let returnCur = cur(add);
//  curResult3 = returnCur(1)(2)(3)
//  console.log(111,curResult3)

/**
 * 13.函数扁平化
 */


var arrs13 = [[1,2,3],[4],[[[[[1,3,6]]]]],'sx',[[['xx']]],{a:'b',b:'v'},];
// let result13 = arrs13.flat(Infinity)
// console.log(result13)


function bian(arr){
    if(arr.length == 0){
        return [];
    }
    let result = [];
    for(let i = 0 ; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            result = result.concat(bian(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
    return result;
}
// console.log(bian(arrs13))




/**
 * 14.防抖、节流
 */






 function debounce(delay){
    let timer = null;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            console.log(111)
        },delay)
    }
 }
//  let fFunc = debounce(1000);

function throttle(delay){
    let lastTime = 0;
    return function(){
        let curTime = new Date().getTime()
        if(curTime - lastTime < delay){
            return;
        }
        lastTime = curTime;
        setTimeout(()=>{
            console.log(9999)
        },delay)
    }
}
// let throttleFunc = throttle(1000);


/**
 * 15. fibonaci
 */

 function fibonaci(n){
     if(n == 1){
         return 1;
     }
     if(n == 2) {
         return 1;
     }
     return fibonaci(n -1) + fibonaci(n-2);

 }
//  console.log(fibonaci(6))





 function fibonaci2(n){
    let n1 = n2 = 1;
    let sum = 1;
    for(let i = 3; i <= n ; i++){
        sum = n1 + n2;
        n2 = n1;
        n1 = sum;
    }
    return sum
 }
//  console.log(fibonaci2(6))

 function fibonaci3(n){
    let n1 = n2 = 1;
    let sum = 1;
    let index = 3;
    while(index <= n){//5
        sum = n1 + n2;
        n2 = n1;
        n1 = sum;
        index++;
    }
    return sum
 }
//  console.log(fibonaci3(4))

/**
 * fibonaci4
 * 做缓存
 * 空间换时间
 */

function createFibonaci(){
    let cache = [];
    return function fobonaci4(n){
        if(n <= 2){
            cache[n] = 1;
            return 1;
        }
        if(cache[n]){
            return cache[n];
        }
        cache.push(fobonaci4(n - 1) + fobonaci4(n - 2))
        return cache[n]
    }
}
function speed(n) {
    let start = performance.now()
    fibonaci(n)
    let end = performance.now()
    console.log(end - start)
}

let fobonaci4 = createFibonaci();
// console.log(fobonaci4(6))
// function speed2(n) {
//     let start = performance.now()
//     fobonaci4(n)
//     let end = performance.now()
//     console.log(end - start)
// }


/**
 * 
 * 16. 圣杯模式继承
 */
 

 Father.prototype.love = 'sing';
 function Father(){
    this.name = 'father';
 }

 function Son(){
    this.ss = 'fff';
 }

//  Son.prototype = Father.prototype; //共享原型方法，子原型的修改会影响父级原型


let inheirt = (function(){
    function F(){}
    return function(son,father){
        F.prototype =  father.prototype;
        son.prototype = new F();
        son.constructor = son;
    }
}())
// inheirt(Son,Father)

// Object.setPrototypeOf(Son.prototype,Father.prototype)
// Son.prototype.__proto__ = Father.prototype

// let son = new Son()
// let father = new Father();


/**
 * 17.深度克隆
 */
        var obj17 = {
            name: 'hwt',
            age: 20,
            skills: {
                sing: 'song',
                eat: ['fish', 'meat'],
            }
        }

let result17 = {}
function deepClone(object,target){
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            if(typeof element == 'object'){
                if(element instanceof Array){
                    target[key] = [];
                }else{  
                    target[key] = {};
                }
                deepClone(object[key],target[key]);
            }else{
                target[key] = object[key];
            }
        }
    }
    return target;
}
// let target17 = deepClone(obj17,result17)


/**
 * 18. 实现对一个数组进行乱序
 */

 var arr18 = [1,2,3,4,5]


 function random18(){
    arr18.sort((a,b)=>{
        return Math.random() - 0.5;
    })
    return arr18;    
 }


