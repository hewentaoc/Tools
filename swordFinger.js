//1. 反转链表
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL


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
//方法1
function reverseList(head){
   if(head.next.next == null){
       head.next.next = head;
       return head.next;
   }else{
      let result = reverseList(head.next)
      head.next.next = head;
      head.next = null;
      return result;
   }
}   
//方法2
function reverseLists(root) {
    if(root.next == null){
        return root;
    }else{
        let result = reverseLists(root.next);
        root.next.next = root;
        root.next = null;
        return result;
    }
}

function reverseList2(root) {
    let curNode = root;
    let prev = null;
    while(curNode){
        let next = curNode.next;
        curNode.next = prev;
        prev = curNode;
        curNode = next;
    }
    return prev;
}

// let result1 = reverseList(a);
// console.log(22,result1)

// let result = reverseLists(a);
// console.log(33,result)

// let res = reverseList2(a);
// console.log(22,res)



//2. 数组中重复的数字
// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3 


let arr =  [2, 3, 1, 0, 2, 5, 3];



let range = Math.random() * 2;
// 0 ~ 2
function findRepeat(arr){
    let store = [];
    let result = [];
    for(let i = 0 ; i < arr.length ; i++){
        if(store.indexOf(arr[i]) < 0){
            store.push(arr[i]);
        }else{
            result.push(arr[i]);
        }
    }
    return result[Math.floor(Math.random() * result.length)];
}

// let result = findRepeat(arr)
// console.log(result)



/**
 * 3. 用两个栈实现一个队列。
 *    队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
 *    分别完成在队列尾部插入整数和在队列头部删除整数的功能。
 *    (若队列中没有元素，deleteHead 操作返回 -1 )
 */


// ["CQueue","appendTail","deleteHead","deleteHead"]
// [[],[3],[],[]]
// 输出：[null,null,3,-1]


// stack1 [1,2,3]
// 先进后出
// 进 1  2  3 
// 出 3  2  1

// 进　3 2 1
// 出　1 2 3


class ImitateQuery {
    constructor(){
        this.stack1 = [];
        this.stack2 = [];
    }
    appendTail(val){
        this.stack1.push(val);
    }
    deleteHead(){
        if(this.stack2.length){
           return this.stack2.pop();
        }

        while(this.stack1.length > 0){
            this.stack2.push(this.stack1.pop())
        }
        return this.stack2.pop() || -1;
    }
}

let imitate = new ImitateQuery();
imitate.appendTail(1)
imitate.appendTail(2)
imitate.appendTail(3)
// console.log(imitate.deleteHead())
// console.log(imitate.deleteHead())
// console.log(imitate.deleteHead())
// console.log(imitate.deleteHead())


//4 .
// 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

// 要求时间复杂度为O(n)。
// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。



/**
 * -2 
 * -2 1
 * 
 *
 */
function findLargestSum(arr){
    let sum = 0;
    let store = [];
    for(let i = 0 ; i < arr.length ; i ++) {
        for(let j = arr.length - 1 ; j > 0 ; j--){
            if(i >= j){
                break;
            }
            let newArr = arr.slice(i,j);
            let add = newArr.reduce((i,elem)=>{
                return elem + i;
            },0)
            if(add > sum){
                sum = add;
                store = newArr;
            }
        }
    }
    console.log(store)
}

// let res = findLargestSum([-2,1,-3,4,-1,2,1,-5,4]);
// console.log(res)
/**
 * max = preNum(0,-1) + curNum
 * 
 */
function LSS(list) {
    let prev = cur = sum= list[0];

    for(let i = 1; i < list.length ; i ++) {
        cur = prev >= 0 ? prev + list[i] : list[i];
        prev = cur;
        if(cur > sum){
            sum = cur;
        }
    }
    return sum;
}

// let res = LSS([-2,1,-3,4,-1,2,1,-5,4]);
// console.log(res)


function findLargestSum2(arr) {
    let max = arr[0];
    arr.reduce((total,cur)=>{
        if(total > 0){
            total = total + cur;
        }else{
            total = cur;
        }
        max = max > total ? max : total;
        return total;
    },arr[0])
    return max;
}
// let res = findLargestSum2([-2,1,-3,4,-1,2,1,-5,4]);



//5.
// 给定一个链表: 1->2->3->4->5, 和 k = 2.
// 返回链表 4->5.

/**
 * 
 1->2-> 3->4->5->null

 1->2->3-> 4->5->null
 */
//map存储
function getKthFromEnd1(head, k) {
  let root = head;
  let store = new Map();
  let index = 0;
  while(root){
    store.set(index,root);
    index++;
    root = root.next;
  }
  return store.get(index - k)
};

//使用栈
function getKthFromEnd2(head, k) {
    let stack = [];
    let ans = null;
    while(head){
        stack.push(head);
        head = head.next;
    }
    while(k > 0){
        ans = stack.pop()
        k--;
    }
    return ans
};

//快慢指针
function getKthFromEnd3(head, k){
    let fast = slow = head;
    let index = 0;
    while(index < k){
        fast = fast.next;
        index++;
    }
    while(fast){
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
}
  


// let list = getKthFromEnd3(a, 2);
// console.log(list)

//6
/**
 * 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
 * 例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，
 * 但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。
 */


 function isNumber(str){
    return isNaN(Number(str)) ? false : true;
 }

//  console.log(isNumber("+100"))
//  console.log(isNumber("12e"))
//  console.log(isNumber("5e2"))
//  console.log(isNumber("1a3.14")) 


// 7. 
// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]
//输入一个字符串，打印出该字符串中字符的所有排列。
//你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。




// a b c

// a b c
// 
/*
a b c

a c b


*/
// b a c
// b c a 


let sotre = [];
function arrangement(str){
    let arr = str.split('')
    console.log(arr)
    arrangeHelper(arr,'')
}
function arrangeHelper(arr,str){
    for(let i  = 0 ; i < arr.length ; i ++){
        if(str.indexOf(arr[i])>= 0){
           continue;
        }
        console.log(arr[i])
        str = str + arr[i];
        arrangeHelper(arr,str);
        if(str.length == arr.length){
            // console.log(str)
            sotre.push(str);
            str = '';
            return;
        }
    }
}   

// var permutation = function(s) {
//     const res = new Set()
//     const visit = {}
//     function dfs(path) {
//         console.log(path)
//         if(path.length === s.length) return res.add(path)
//         for (let i = 0; i < s.length; i++) {
//             if (visit[i]) continue
//             visit[i] = true
//             dfs(path + s[i])
//             visit[i] = false
//         }
//     }
//     dfs('')
//     console.log(res)
//     return [...res]
// };
// permutation("abc")


/**
 * 一次循环
 * a 锁住
 * 
 * 二次循环
 * a＋b
 * a,b锁住
 * 
 * 三次循环
 * a + b + c
 * a,b,c锁住
 * 
 * 
 * c解锁
 * 
 * 
 */

 let obj = {}
 function permutation(str){
    console.log(str.slice(1))
    let arr = str.split('');
    let result = new Set();
    var dfc = function(path){
        if(path.length == arr.length) {
            return result.add(path);
        }
        for(let i = 0 ; i < arr.length ; i++){
            if(obj[i]){
                continue;
            }
            obj[i] = true;
            dfc(path + arr[i]);
            obj[i] = false;
        }
    }
    dfc('')
    return [...result]
 }
//  let result = permutation('abc');
//  console.log(result)




