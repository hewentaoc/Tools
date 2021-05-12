Array.prototype.myReduce = function(func,extra = Symbol('a')){
    let arr = this;
    if(arr.length == 1 && typeof extra == 'symbol'){
        return arr[0];
    }
    //不存在
    if(typeof extra == 'symbol'){
       extra = arr[0];
       for(let i = 1; i < arr.length; i++){
           extra = func(extra,arr[i]);
       }
       return extra;
    }else{
        for(let i = 0 ; i < arr.length ; i++){
            extra = func(extra,arr[i])
        }
        return extra;
    }
}
// Array.prototype.myReduce=function(func,initValue){
//     var _arr=this,len = _arr.length,param2=arguments[2] || window;
//     for(var i = 0;i < len ;i++){
//         initValue = func.apply(param2,[initValue,_arr[i],i,_arr]);
//     }
//     return initValue;
// }

// var arr = [1]
// let res = arr.reduce((item,cur)=>{
//     console.log('aa',item,cur)
// })
// let res2 = arr.reduce(function(item,cur){
//     console.log('bb',this,item,cur)
// },undefined)


// arr.myReduce((item,cur)=>{
//     console.log('aa2',item,cur)
// })




function MyPromise(func){
    this.status = 'pedding';
    this.resolveArr = [];
    this.rejectArr = [];
    this.resolverParams = null;
    this.rejectParams = null;
    var resolve = (params)=> {
        if(this.status  != 'pedding'){
            return;
        }
        this.status  = 'resolve';
        this.resolverParams = params;
        this.resolveArr.forEach((func)=>{
            func();
        })
    }

    var reject = function(params){
        if(this.status  != 'pedding'){
            return;
        }
        this.status  = 'reject';
        this.rejectParams = params;
        this.rejectArr.forEach((func)=>{
            func();
        })
    }
    try {
      func(resolve,reject);
    } catch (error) {
      reject(error)
    }
}
MyPromise.prototype.handReturnParams = function(returnVal,res,rej){
    if(returnVal instanceof MyPromise){
        returnVal.then((msg)=>{
          res(msg);
        },function(err){
          res(err)
        })
    }else{
        try {
            res(returnVal);
        } catch (error) {
            rej(error);
        }
    }
}   

MyPromise.prototype.then = function(onResolve,onReject){
    if(!onResolve){
        onResolve = function(params){
            return params;
        }
    }
    if(!onReject){//抛出错误
        onReject = function(error){
            throw new Error(error);
        }
    }
    let promise = new MyPromise((res,rej)=>{
        if(this.status == 'pedding'){
            if(onResolve){
                this.resolveArr.push(()=>{
                    setTimeout(()=>{
                        try {
                          let returnParams =  onResolve(this.resolverParams);
                          this.handReturnParams(returnParams,res,rej)
                        } catch (error) {
                           reject(error);  
                        }
                    })
                })
            }
            if(onReject){
                this.rejectArr.push(()=>{
                    setTimeout(()=>{
                        try {
                          let returnParams = onResolve(this.rejectParams)
                          this.handReturnParams(returnParams,res,rej)
                        } catch (error) {
                           reject(error);  
                        }
                    })
                })
            }
        }
        if(this.status == 'resolve'){
            setTimeout(()=>{
                try {
                  let returnParams = onResolve(this.resolverParams)
                  this.handReturnParams(returnParams,res,rej)
                  res(returnParams)
                } catch (error) {
                    reject(error)
                }
            })
        }
        if(this.status == 'reject'){
            setTimeout(()=>{
                try {
                   let returnParams = onReject(this.rejectParams)
                   res(returnParams);
                } catch (error) {
                   reject(error)
                }
            })
        }
    })
    return promise;
}
// var x = new Promise((res,rej)=>{
//     rej('s')
// })
var x = new MyPromise((res,rej)=>{
    res('s')
})
// console.log(x.then)

// let p = x.then((res)=>{
//     console.log('dd')
//     return 'ppp'
// }).then((msg)=>{
//     console.log(999,msg)
//     return new MyPromise((res)=>{
//         setTimeout(()=>{
//             res('1000')
//         },3000)
//     })
// }).then().then((m)=>{
//     console.log(777,m)
// })


var arrs = [1, 3, 4, 5, 6, 7, 8, 10, 21];
function findIndex2(arr,target){
    if(arr.length == 0){
        return false;
    }
    let start = 0;
    let end = arr.length - 1;
    while(start <= end){
        console.log('x')
        let mid = Math.floor((start + end) /2);
        if(arr[mid] == target){
            return true;
        }else if(arr[mid] > target){
            end = mid - 1;
        }else{
            start = mid + 1;
        }
    }
    return false;
}
// console.log(findIndex2(arrs,3))

function findIndex(arr, value) {
    if (arr.length == 0) {
        return undefined;
    }
    var low = 0;
    var hight = arr.length - 1;
    while (low <= hight) {
        var mid = parseInt((low + hight) / 2);
        console.log('sss',mid)
        if (arr[mid] == value) {
            return mid;
        } else if (arr[mid] > value) {
            hight--;
        } else {
            low++;
        }
    }
    return -1;
}
// findIndex(arrs, 3)

function NodeTree2(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

let a5 = new NodeTree2('a');
let b5= new NodeTree2('b');
let c5 = new NodeTree2('c');
let d5 = new NodeTree2('d');
let e5 = new NodeTree2('e');
let f5 = new NodeTree2('f');
a5.left = b5;
a5.right = c5;
c5.left = d5;
c5.right = e5;


// console.log(a5)

let res = [];
function midTree(root){
    if(root == null){
        return null;
    }
    root.left && midTree(root.left);
    res.push(root.value);
    root.right && midTree(root.right);
}
// midTree(a5);
// console.log(a5)
// console.log(res)

function midTree2(root){
    if(root == null){
        return null;
    }
    let node = root;
    let stack = [];
    let res = [];
    while(node || stack.length){
        if(node){
           stack.push(node);
           node = node.left; 
        }else{
           let cur = stack.pop();
           res.push(cur.value);
           if(cur.right){
              node = cur.right;
           }
        }
    }
    console.log(res);
}
// midTree2(a5);
function NodeList(val){
    this.val = val;
    this.next = null;
}

let a = new NodeList(1);
let b = new NodeList(2);
let c = new NodeList(3);
let d = new NodeList(4);
let e = new NodeList(5);
a.next = b;
b.next = c;
c.next = d;
d.next = e;

function reverseList(node){
    if(node.next == null){
        return node;
    }
    let result = reverseList(node.next);
    node.next.next = node;
    node.next = null;
    return result;
}
// console.log(reverseList(a));


function reverseList2(root){
    if(root == null){
        return root;
    }
    console.log(888)
    let prev = null;
    let node = root;
    while(node){
        let next = node.next;
        node.next = prev;
        prev = node;
        node = next;
    }
    return prev;
}
// console.log(reverseList2(a));

//防抖
function debounce(debounce){
    let timer = null;
    return function(fn){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn();
        },debounce)
    }
}

//节流
function throttle(debounce){
    let timer = null;
    return function(fn){
        if(timer) {
            return ;
        }
        timer = setTimeout(()=>{
            fn();
            timer = null;
        },debounce)
    }   
}

//this

Test.prototype.name = 'hwt';
function Test(){
    var _this = {
        __proto__: Test.prototype
    }
    return {};
}
// let t = new Test();


//继承
Father.prototype.name = 'wthehh'
function Father(name){
  this.name = name;
  this.test = function(){
      console.log('test')
  }
}

function Son(name){
    Father.call(this,name)
}

function extend(Son,Father){
    var F = function(){}
    F.prototype = Father.prototype;
    Son.prototype = new F();
    Son.constructor = Son;
}
extend(Son,Father);

// let son = new Son('tt');



class F {
    constructor(name){
        this.name = name;
    }
    goZj(){
        console.log('go')
    }
    goDy = ()=>{
        console.log('gody')
    }
}

class S extends F{
    constructor(name){
        super(name)
        this.goZj()
        this.goDy()
        console.log(this.name)
    }
}

// let s = new S('wthe');  


function add(a,b){
    let n,r,m;
    try {
      n = a.toString().split('.')[1].length;
    } catch (error) {
      n = 0;  
    }
    try {
      r = b.toString().split('.')[0].length;   
    } catch (error) {
      r = 0;
    }
    m= Math.pow(10,Math.max(n,r));
    return (a*m + b*m)/m;
}
// console.log(add(0.1,0.2))















function getListHead(root,k){
    if(!root || k == 0){
        return root;
    }
    let fast = slow = root;
    let head = slow;
    let index = 0;
    while(index < k){
        fast = fast.next;
        index++;
    }
    while(fast && slow){
        fast = fast.next;
        if(fast == null){
            slow.next = slow.next.next;
        }else{
            slow = slow.next;
        }
    }
    console.log(head)
}   
// getListHead(a,5)

let arry = [5,7,9,10,1,3];






function popSort(arr){
    let temp;
    for(let i = 0 ;  i < arr.length - 1 ; i++){
        for(let j = 0 ; j < arr.length - 1 - i ; j ++){
            if(arr[j] > arr[j + 1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    console.log(arr)
}
// popSort(arry);








function choose(arr){
    let min,temp;
    for(let i = 0 ; i < arr.length - 1 ; i++){
        min = i;
        for(let  j = i+1 ; j < arr.length; j ++){
            if(arr[j] < arr[min]){
                min = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
    console.log('choose',arr)
}
// choose(arry)



function insert(arr){
    let temp;
    for(let i = 1 ; i < arr.length ; i++){
        for(let j = i; j > 0 ; j --){
            if(arr[j] < arr[j - 1]){
                temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
            }
        }
    }
    console.log('insert',arr)
}

// insert(arry);






function quick(arr){
    if(arr.length <= 1){
        return arr;
    }
    let len = arr.length;
    let index = Math.floor(len /2);
    let mid = arr.splice(index,1);
    let left = [];
    let right =[];
    for(let i = 0 ; i < arr.length ; i++){
        if(arr[i] < mid){
           left.push(arr[i]);
        }else{
           right.push(arr[i]); 
        }
    }
    return quick(left).concat(mid,quick(right))
}
// console.log(quick(arry))



function mergeS(arr){
    if(arr.length < 2){
        return arr;
    }
    let index = Math.floor(arr.length /2);
    let left = arr.slice(0,index);
    let right = arr.slice(index);
    return merge(mergeS(left),mergeS(right));
}
function merge(left,right){
    let res = [];
    while(left.length && right.length){
        if(left[0] < right[0]){
            res.push(left.shift());
        }else{
            res.push(right.shift());
        }
    }
    while(left.length){
        res.push(left.shift());
    }
    while(right.length){
        res.push(right.shift());
    }
    return res;
}

// console.log(mergeS(arry))

function getNumComplement(number){
    if(number == 0){
        return 0;
    }
    let tNum = number.toString(2);
    tNum.replace(/1|0/g,($)=>{
        return $ == "0" ? "1" : "0"
    })

}
var twoComple = (num)=> {
    const reg = /1|0/g; 
    var binary = num.toString(2);
    var twoC = binary.replace(reg,(x) => {return x === "0" ? "1" : "0"}); //取反
    // twoC = twoC.substr(1); //除去符号位
    // num = Number(twoC) + 1; //加一
    // twoC = '1' + num.toString(2); //添加符号位
    return parseInt(twoC,2);
}
// console.log(twoComple(5))


function findFirstOnlyNum(str){
    for(let i = 0 ; i < str.length ; i++){
        if(str.indexOf(str[i]) == str.lastIndexOf(str[i])){
            return i;
        }
    }
}
// console.log(findFirstOnlyNum('leetcode'))

1111222
1112222

11112223
11122223

function findMoreNum(arr){
    arr.sort((a,b)=>{
        return a - b;
    })
    if(arr.length % 2 == 0){
       return arr[arr.length/2 - 1]
    }else{
       return  arr[Math.floor(arr.length/2)]
    }
}
// console.log(findMoreNum([2,2,1,1,1,1,2]))
// console.log(findMoreNum([2,2,2,1,1,1,2]))





let obj = {
    name:'hwt',
    love:{
        sing:'song'
    }
}

function proxy(obj){
    if(typeof obj != 'object'){
        return obj;
    }

    for (const key in obj) {
        let val = obj[key];
        proxy(obj[key]);
        Object.defineProperty(obj,key,{
            set(newVal){
                console.log('set')
                proxy(newVal);
                val = newVal;
            },
            get(){
                console.log('get')
                return val;
            }
        })
    }

}
// proxy(obj)
// function observer(obj){
//     if(typeof obj != 'object'){
//         return obj;
//     }
    
//     let result = new Proxy(obj,{
//         set(target,key,value){
//             console.log('set',key)
//             value = observer(value)//是否需要返回值给value
//             Reflect.set(target,key,value);
//         },
//         get(target,key){
//           console.log('get',key)
//           let value = observer(Reflect.get(target,key));
//           return value;
//         }
//     })
//     return result;
// }
// observer(obj)
function proxy(obj){
    if(typeof obj != 'object'){
        return obj;
    }
    // var result = map.get(obj);
    // if(result){//做个缓存，提升性能
    //     return result;
    // }
    return new Proxy(obj,{
        set(target,key,value){
            console.log('set',key)
            target[key] = proxy(value);
        },
        get(target,key){
            console.log('get',key)
            let value = proxy(target[key]);
            return value;
        }
    })
    // map.set(obj,result);
}
// let demo = proxy(obj)
let intervals = [[1,3],[8,10],[2,6],[15,18]]

var merge = function(intervals) {
    if(intervals.length == 0){
        return []
    }
    intervals.sort((a,b)=>{
        return a[0] - b[0];
    })
    let prev = intervals[0];
    let res = [];
    for(let i = 1 ;i < intervals.length ; i++){
        let cur = intervals[i];
        if(prev[1] > cur[0]){
            prev[1] = Math.max(prev[1],cur[1]);
        }else{
            res.push(prev);
            prev = intervals[i];
        }
    }
    res.push(prev)
    return res;
}
// merge(intervals)

// let arr = [1,2,3,4,5]
// arr.sort((a,b)=>{
//     return Math.random() - 0.5
// })
let active = null;
class Dep{
    constructor(){
        this.set = new Set();
    }
    depend = ()=>{
        if(active){
            this.set.add(active);
        }
    }
    notify = ()=>{
       this.set.forEach((func)=>{
           func()
       })
    }
}

function observer(obj){
    if(typeof obj != 'object'){
        return obj;
    }
    Object.keys(obj).forEach((item)=>{
        let value = obj[item];
        let dep = new Dep();
        observer(obj[item]);
        Object.defineProperty(obj,item,{
            get(){
               console.log('get')
               dep.depend();
               return value;
            },
            set(newVal){
               console.log('set')
                observer(newVal);
                value = newVal;
                dep.notify();
            }
        })
    })
}
// observer(obj)
function autoFunc(func){
    function wrapper(){
        active = func;
        func();
        active = null;
    }
    wrapper();
}

// autoFunc(()=>{
//     console.log('我的名字'+ obj.name)
// })
// autoFunc(()=>{
//     console.log('我的爱好'+ obj.love.sing)
// })

//判断双向链表是否有环
function getList(list){
    if(list == null) {
        return false;
    }
    let set = new Set();
    while(list){
        if(set.has(list)){
            return true
        }
        set.add(list);
        list = list.next;
    }
    return false;
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    const result = []
    nums.sort((a,b) => a-b)
    for(let i = 0;i<nums.length;i++) {
        // 跳过重复数字
        if (i && nums[i] === nums[i-1]) continue
        let left = i+1
        let right = nums.length-1
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum > 0) {
                right--;
            } else if(sum < 0) {
                left++;
            } else {
                result.push([nums[i], nums[left++], nums[right--]])
                console.log(333,nums[left])
                // 跳过重复数字
                while(nums[left] === nums[left-1]) {
                    left++
                }
                // 跳过重复数字
                while(nums[right] ===  nums[right+1]) {
                    right--
                }
            }
        }
    }
    return result
};

threeSum([1,-1,-1,0])
// 
//0
// [4,5,6,7,0,1,2]
// [2,4,5,6,7,0,1]
// [5,6,7,0,1,2,4]
// [6,7,0,1,2,4,5]


var sumAdd = [-1,0,1,2,-1,-4];

function getSumAdd(nums){
    if(nums.length == 0){
        return []
    }
    nums.sort((a,b)=>{
        return a - b;
    })
    let res = [];
    for(let i = 0 ; i < nums.length; i++){
        if(i && nums[i] == nums[i - 1]){
            continue;
        }
        let left = i + 1;
        let right = nums.length - 1;
        while(left < right){
           let sum = nums[i] + nums[left] + nums[right];
           if(sum > 0){
              left++;
           }else if(sum == 0){
              res.push([nums[i] ,nums[left++],nums[right--]])
              while(nums[left] == nums[left -1]){
                  left++;
              }
              while(nums[right] == nums[right + 1]){
                  right--;
              } 
           }else{
              right--;
           }
        }
    }
    console.log(res)
}
// getSumAdd(sumAdd)
// getSumAdd([-2,0,0,2,2])

function getThreeSumAdd(nums){
    nums.sort((a,b)=>{
        return a - b;
    })
    let res = [];
    for(let i = 0 ; i < nums.length - 2 ;i ++){
        if(i & nums[i] == nums[i - 1]){
            continue;
        }
        let left = i + 1;
        let right = nums.length -1;
        while(left < right){
            let sum = nums[i] + nums[left] + nums[right];
            if(sum > 0){
                left ++;
            }else if(sum == 0){
                res.push([nums[i],nums[left++],nums[right--]]);
                while(nums[left] == nums[left -1]){
                    left++;
                }
                while(nums[right] == nums[right + 1]){
                    right--;
                }
            }else{
                right--;
            }
        }
    }
    return res;
}
// getThreeSumAdd(sumAdd)
// getThreeSumAdd([-2,0,0,2,2])
// getThreeSumAdd([-1,0,1,2,-1,-4])

var nums =  [4,5,6,7,0,1,2]
//target = 0
var search = function(nums, target) {
    if(nums.length == 0){
        return -1;
    }
    if(nums.length ==1){
        return nums[0] == target ? 0 : -1;
    }
    let left = 0;
    let right = nums.length -1;
    while(left <= right){
        let mid = Math.floor((nums[left] + nums[right])/2);
        // const mid = left + Math.floor((right - left) / 2);
        if(nums[mid] == target){
            return mid;
        }
        if(nums[0] <= nums[mid]){
            if(nums[0] < target && target < nums[mid]){
                right =  mid -1;
            }else{
                left = mid + 1;
            }
        }else{
            if(nums[mid] < target && target < nums[right]){
                left = mid + 1;
            }else{
                right = mid-1;
            }
        }
    }
    return -1
}
// search([4,5,6,7,0,1,2],0)
// console.log(search([4,5,6,7,0,1,2],0))




var findKthLargest = function(nums, k) {
    var fast = function(arr){
        if(arr.length <= 1){
            return arr;
        }
        let index = parseFloat(arr.length / 2);
        let mid = arr.splice(index,1);
        let left = [];
        let right = [];
        for(let i = 0 ; i < arr.length ; i++){
            if(arr[i] <= mid[0]){
                left.push(arr[i]);
            }else{
                right.push(arr[i]);
            }
        }
        return fast(right).concat(mid,fast(left));
    }
    let res = fast(nums);
    return res[k-1]
};
// findKthLargest( [3,2,1,5,6,4], 2)


function findFistNum(str){
    if(str.length == 0){
        return -1;
    }
    let obj = {}
    for(let i = 0; i < str.length ;i ++){
        if(obj[str[i]]){
            obj[str[i]] = obj[str[i]] + 1;
        }else{
            obj[str[i]] = 1;
        }
    }
    let itemArr = Object.keys(obj)
    for(let i = 0 ; i < itemArr.length ; i++){
        if(obj[itemArr[i]] == 1){
            console.log(itemArr[i])
            return
        }
    }
}
// findFistNum("leetcode")
// 给定一个链表，判断链表中是否有环。
// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
// 如果链表中存在环，则返回 true 。 否则，返回 false 。





function isListH(list){
    if(list == null){
        return false;
    }
    let set = new Set();
    while(list){
        if(set.has(list)){
            return true;
        }
        set.add(list);
        list = list.head;
    }
    return false;
}
var hasCycle = function(head) {
    if(head == null){
        return false;
    }
    let set = new Set();
    while(head){
        if(set.has(head)){
            return true;
        }
        set.add(head);
        head = head.next;
    }
    return false;
};

// 请判断一个链表是否为回文链表。
var isPalindrome = function(head) {
    if(head == null){
        return false;
    }
    let stack = [];
    while(head){
        stack.push(head);
        head = head.next;
    }
    let left = 0;
    let right = stack.length - 1;
    while(left <= right){
        if(stack[left].val == stack[right].val){
            left++;
            right--;
        }else{
            return false;
        }
    }
    return true;
};

var isSymmetric = function(root) {
    if(root == null) {
        return true;
    }

    var compare = function(left,right){
        if(!left && !right){
            return true;
        }
        if(!left || !right){
            return false;
        }
        if(left.val != right.val){
            return false;
        }
        return compare(left.left,right.right) && compare(left.right,right.left);
    }
    return compare(root.left,root.right)
};

var isBalanced = function(root) {
    if(root == null) {
        return true;
    }
    var getDepth = function(root){
        if(root == null){
            return 0;
        }
        return Math.max(getDepth(root.left),getDepth(root.right))+1
    }

    let leftDepth = getDepth(root.left);
    let rightDepath = getDepth(root.right);
    if(Math.abs(leftDepth - rightDepath) > 1){
        return false;
    }else{
        return isBalanced(root.left) && isBalanced(root.right);
    }
};

    var hasPathSum = function(root, targetSum) {
        if(root == null) {
            return false;
        }
        let result = [];
        var dfs = function(root,temp){
            if(root == null){
                return;
            }
            temp.push(root.val);
            root.left && dfs(root.left,temp.slice(0))
            root.right && dfs (root.right,temp.slice(0));
            if(root.left == null && root.right == null){
                let res = temp.reduce((prev,cur)=>{
                    return prev + cur;
                },0)
                if(res == targetSum){
                    result.push(true);
                }
            }
        }
        dfs(root);
        return Object.keys(result) > 0 ? true : false;
    };
    var pathSum = function(root, targetSum) {
        if(root == null) {
            return false;
        }
        let result = [];
        var dfs = function(root,temp){
            if(root == null){
                return;
            }
            temp.push(root.val);
            root.left && dfs(root.left,temp.slice(0))
            root.right && dfs (root.right,temp.slice(0));
            if(root.left == null && root.right == null){
                let res = temp.reduce((prev,cur)=>{
                    return prev + cur;
                },0)
                if(res == targetSum){
                    result.push(temp);
                }
            }
        }
        dfs(root,[]);
        return result;
    };

    var invertTree = function(root) {
        if(root == null){
            return root;
        }
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
        root.left && invertTree(root.left);
        root.right && invertTree(root.right);
        return root;
    };

    var mergeTrees = function(root1, root2) {
        if(root1 == null && root2 == null){
            return null;
        }
        if(root1 == null && root2){
            return root2;
        }
        if(root1 && root2 == null){
            return root1;
        }
        let newRoot = new TreeNode();
        newRoot.val = root1.val + root2.val;
        newRoot.left = mergeTrees(root1.left,root2.left);
        newRoot.right = mergeTrees(root1.right,root2.right);
        return newRoot;
    };
    var climbStairs = function(n) {
        let n1 =1,n2 = 2;
        if(n ==1){
            return 1;
        }
        if(n == 2){
            return 2;
        }
        let sum = 0;
        for(let i = 3 ;i <= n;i++){
            sum = n1 + n2;
            n1 = n2;
            n2 = sum;
        }
        return sum;
    };
    // [7,1,5,3,6,4]
    var lengthOfLongestSubstring = function(s) {
        if(s.length == 0){
            return 0;
        }
        let max = 0;
        let i = 0 ,len = s.length;
        let arr =[]
        while(i < len){
            if(arr.indexOf(s[i]) == -1){
                arr.push(s[i]);
            }else{
                arr.shift();
                console.log(arr)
                continue;
            }
            max = Math.max(max,arr.length);
            i++;
        }
        return max;
    };
    // "abcabcbb"
    // lengthOfLongestSubstring("abcabcbb")

    var longestPalindrome = function(s) {
        if(s.length < 2){
            return s;
        }
        let res = '';
        var helper = function(left,right){
            while(left>=0 && right < s.length && s[left] == s[right]){
                left--;
                right++;
            }
            if(right -left - 1 > res.length){
                res = s.slice(left+1,right)
            }
        }
        for(let i = 0 ; i < s.length ;i++){
            helper(i,i);
            helper(i,i+1)
        }
        return res;
    }


    Promise.myAll = function(arg){
        if(! arg instanceof Array){
            return false;
        }
        let len = arg.length;
        let result = [];
        return new Promise((res,rej)=>{
            arg.forEach((item)=>{
                item.then((data)=>{
                  result.push(data);
                  if(--len == 0){
                    res(result);
                  }
                },(error)=>{
                    rej(error);
                })
            })  
        })
    }
    Promise.myRace = function(arg){
        if(! arg instanceof Array){
            return false;
        }
        arg.forEach((res,rej)=>{
            arg.then(res,rej)
        })
    }

 let op_1 = new Promise((res,rej)=>{
     setTimeout(()=>{
        res('op_1')
     },1000)
 })
 let op_2 = new Promise((res)=>{
    setTimeout(()=>{
       res('op_2')
    },4000)
})
    
// Promise.myAll([op_1,op_2]).then((data)=>{
//     console.log(data)
// })

var str="100000000000";
let regs = /(?=(\B)(\d{3})+$)/g;
function sleep(fn, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn);
        }, time);
    });
}
let saySomething = (name) => console.log(`hello,${name}`)
async function autoPlay() {
    let demo = await sleep(saySomething('TianTian'),1000)
    let demo2 = await sleep(saySomething('李磊'),1000)
    let demo3 = await sleep(saySomething('掘金的好友们'),1000)
}
// autoPlay()


var getHui = function(s){
    if(s.length < 2){
        return s;
    }
    let res = '';
    var helper = function(left,right){
        while(left>=0 && right< s.length && s[left] == s[right]){
            left--;
            right++;
        }
        if(right - left -1 > res.length){
            res = s.slice(left+1,right);
        }
    }
    for(let i = 0 ; i < s.length ;i ++){
        helper(i,i);
        helper(i,i+1);
    }
    console.log(res)
    return res;
}
// getHui('babad');

var trap =  function(height){
    if(height.length == 0){
        return 0;
    }
    let len = height.length;
    let leftMax = new Array(len).fill(0);
    leftMax[0] = height[0];
    for(let i = 1; i < len ; i++){
        leftMax[i] = Math.max(leftMax[i -1],height[i]);
    }
    let rightMax = new Array(len).fill(0);
    rightMax[len - 1] = height[len -1];
    for(let i = len -2 ; i >= 0 ;i--){
        rightMax[i] = Math.max(rightMax[i +1],height[i]);
    }
    let sum = 0;
    for(let i = 0 ; i < len ;i++){
        sum += Math.min(leftMax[i],rightMax[i]) - height[i];
    }
    return sum;
}
    

/**
 * 正则匹配
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * s = "aa" p = "a"
 */
 var isMatch = function(s, p) {
    let reg = new RegExp("^"+ p + "$")
    let result = reg.test(s);
    return result;
};
isMatch('aa', ".*")