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
// let res = findLargestSum2([1,4]);



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

//快慢指针 1->2->3->4->5->, 和 k = 2.
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

var permutation = function(s) {
    const res = new Set()
    const visit = {}
    function dfs(path) {
        if(path.length === s.length) return res.add(path)
        for (let i = 0; i < s.length; i++) {
            if (visit[i]) continue
            visit[i] = true
            dfs(path + s[i])
            visit[i] = false
        }
    }
    dfs('')
    console.log(res)
    return [...res]
};
permutation("abc")


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


//8.
//输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
//输出：[1,2,3,6,9,8,7,4,5]





let resArr = [];
function getArrayByMatrix(arr){
    if(!Array.isArray(arr)){
        return arr;
    }
    for(let i = 0 ; i < arr.length ; i++){
        if(Array.isArray(arr[i])){
            getArrayByMatrix(arr[i])
        }else{
            resArr.push(arr[i]);
        }
    }
}

function getArrayByMatrix2(arr){
    if(!Array.isArray(arr) || arr.length == 0){
        return [];
    }
    let result = [];
    for(let i = 0 ; i < arr.length ; i++){
        if(Array.isArray(arr[i])){
            result = result.concat(getArrayByMatrix2(arr[i]))
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}


function getArrayByMatrix3(arr){
    if(!Array.isArray(arr) || arr.length == 0){
        return [];
    }
    return arr.flat(Infinity);
}


// let aops = getArrayByMatrix3([[1,2,3],[4,5,6],[7,8,9]]) 


// 9. 
// 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

// 示例1：

// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4


let b1 = new NodeList(1)
let b2 = new NodeList(2)
let b4 = new NodeList(4)
let c1 = new NodeList(1);
let c3 = new NodeList(3);
let c4 = new NodeList(4);

b1.next = b2;
b2.next = b4;

c1.next = c3;
// c3.next = c4;

function mergeNode(head1,head2){
    let arr = [];
    while(head1){
        arr.push(head1.val);
        head1 = head1.next;
    }
    while(head2){
        arr.push(head2.val);
        head2 = head2.next;
    }
    arr.sort((a,b)=>{
        return a -b;
    })
    arr = arr.map((item,index)=>{
        return new NodeList(item)
    })
    let root = arr[0];
    for(let i = 0 ; i < arr.length ; i++){
        let node = arr[i];
        if(i == arr.length -1){
            node.next = null;
        }else{
            node.next = arr[i+1];
        }
    }
    console.log(root)
}
/**
 * 
 1 , 2
 3 , 4


 1.next

 2
 3 , 4 

 1

 1 , 2

 1
 1,2


 3

 1,2


 */
//递归
function mergeNode2(l1,l2){
   if(l1 == null && l2){
     return l2
   }
   if(l2 == null && l1){
     return l1
   }
   if(l1 == null || l2 == null){
      return null
   }
   if(l1.val < l2.val){
      l1.next = mergeNode2(l1.next,l2);
      return l1;
   }else{
      l2.next = mergeNode2(l1,l2.next);
      return l2
   }
}

// 1.next = 2.next = 
// let nodes1 = mergeNode2(b4,c1);
// console.log(111,nodes1)
function mergeNode3(l1,l2){
    let head = new NodeList();
    let node = head;
    // 12
    // 1
    while(l1 && l2){
        if(l1.val < l2.val){
            node.next = l1;
            l1 = l1.next;
        }else{
            node.next = l2;
            l2 = l2.next;
        }
        node = node.next;
    }
    if(l1){
        node.next = l1;
    }
    if(l2){
        node.next = l2;
    }
    return head.next;
}
// let nodes = mergeNode2(b4,c1);






// 10 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。





/**
 1  1

 2  2  11 2

 3  3  111 12 21

 4  4  1111 112 121 211 22 


 */





 function fibonaci(n){
    if(n == 0) {
        return 0;
    }
    if(n == 1 ) {
        return 1;
    } 
    if(n == 2) {
        return 2
    }
    return fibonaci(n-1) + fibonaci(n-2);
 }
//  let fResult = fibonaci(4);
//  console.log(fResult)

function fibonaci2(n){
    let n1 = 1;
    let n2 = 1;
    let sum;
    if(n <= 0) {
        return 0;
    }
    if(n == 1){
        return 1;
    }
    for(let i = 2; i <= n ;i++){
        sum = n1 + n2;
        n1 = n2;
        n2 = sum;
    }
    return sum;
}

// let fResult2 = fibonaci2(4);
// console.log(fResult2)
function fn3(n) {
    const dp = [1, 1]
    for (let i = 2; i <= n; i++) {
      dp[i] = (dp[i-1] + dp[i-2]) % 1000000007
    }
    return dp[n]
}






/**
11. 
 * [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
 */


 
 let tenArr = [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ]




 function findNumFromArr(tenArr,num){
    console.log(tenArr,num)
    for(let i = 0 ; i < tenArr.length ;i++){
        for(let j = 0 ; j < tenArr[i].length ; j++){
            if(num < tenArr[i][0] || num > tenArr[i][tenArr[i].length-1]){
                break;
            }
            if(num == tenArr[i][j]){
                return true;
            }
        }
    }
    return false;
 }
 var findNumberIn2DArray = function(matrix, target) {
    return matrix.flat(Infinity).includes(target)
};


// let tenNum = findNumFromArr(tenArr,20);
// console.log(tenNum)



/**
 * 12. 
 * 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
   输入: [7,5,6,4]
   输出: 5
*/




// [7,5,6,4]
// 输出: 5









var reversePairs = function(nums) {
  let count = 0;

  for(let i = 0 ; i < nums.length ;i++){
    for(let j = i+1 ; j < nums.length ; j++){
        if(nums[i] > nums[j]){
            count++;
        }else{
            continue;
        }
    }
  }
  return count;
};

// let count11 = reversePairs([7,5,6,4])
// console.log(count11)



function mergeSort(arr){
    if(arr.length < 2){
        return arr
    }
    let mid = Math.floor(arr.length/2);
    let left = arr.slice(0,mid);
    let right = arr.slice(mid,arr.length);
    return merge(mergeSort(left),mergeSort(right))
}
let sum = 0;
function merge(left,right){
    let res = [];
    while(left.length && right.length){
        if(left[0] > right[0]){
            // for(let i = 0 ; i < right.length ;i++){
            //     test.push([left[0],right[i]]) 
            // }
            res.push(left.shift());
            sum += right.length;
        }else{
            res.push(right.shift());
        }
    }
    if(left.length || right.length){
        res = res.concat(left,right);
    }
    return res;
}
// let count11 = mergeSort([7,5,6,4])
// console.log(count11,sum)




/**13.
 * 前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
 */
















let preorder = [3,9,20,15,7]
let inorder = [9,3,15,20,7]
function NodeTree(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

var buildTree = function(preorder, inorder) {
    if(preorder == null || inorder == null || preorder.length == 0 || inorder.length == 0 || preorder.length != inorder.length){
        return null;
    }
    let root = new NodeTree(preorder[0]);
    let index = inorder.indexOf(root.val);
    let preorderLeft = preorder.slice(1,1+index);
    let preorderRight = preorder.slice(1+index,preorder.length);
    let inorderLeft = inorder.slice(0,index);
    let inorderRight = inorder.slice(index + 1,inorder.length);
    root.left = buildTree(preorderLeft,inorderLeft);
    root.right = buildTree(preorderRight,inorderRight);
    return root;
};
let root22 = buildTree(preorder,inorder);
// console.log('111',root22)


function backOrder(root,arr){
    if(root == null){
        return null;
    }
    console.log(root)
    root.left && backOrder(root.left,arr);
    root.right && backOrder(root.right,arr);
    arr.push(root.val);
    return arr;
}
// let backorder = backOrder(root22,[])
// console.log(111,backorder)
//  3
// / \
// 9  20
//  /  \
// 15   7

//
// [3]
// [Node(20),Node(9)]
// [3,20,9,7,15]
function preorderTraversal1(root) {
	if (!root) {
		return;
	}
	var stack = [root];
	while (stack.length > 0) {
		//取第一个。
		var item = stack.shift();
		// console.log(item.val);
        console.log(item)
		if (item.right) {
			stack.unshift(item.right);
		}
        // console.log(JSON.parse(JSON.stringify(stack)))
		if (item.left) {
			stack.unshift(item.left);
		}
	}
}
// preorderTraversal1(root22); //1 2 4 5 3 6 7 

// function buildTree2(root){
//     while(root){
//         let node = root;
//     }
// }
// let backorders = backOrder(root22)
// console.log(backorders)


// let inorder = [9,3,15,20,7]
// let backorder = [9, 15, 7, 20, 3]


//后序遍历之逆序


// [3,20,9,7,15]
//  3
// / \
// 9  20
//  /  \
// 15   7
// 左右根
// 根右左
// function LRD(root){
//     var arr=[],res=[];
//     arr.push(root);
//     while(arr.length!=0){
//         var p=arr.pop();
//         res.push(p.val);
//         console.log(p.val)
//         if(p.left!=null){
//             arr.push(p.left);
//         }
//         if(p.right!=null){
//             arr.push(p.right);
//         }
//     }
//     return res.reverse();
// }
// LRD(root22)








/**
 * 14. 二叉树的遍历方法汇总
  a
 / \
b  c
   / \
  d   e
  [a,b,c,d,e]
 */


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



let prevTreeArr = [];
//前序 - [a,b,c,d,e]
function prevTreeShow(root){
    if(root == null){
        return null;
    }
    prevTreeArr.push(root.value);
    root.left && prevTreeShow(root.left);
    root.right && prevTreeShow(root.right)
}
// prevTreeShow(a5)
// console.log('前序',prevTreeArr)

function prevTreeShow2(root){
    if(!root){
        return null;
    }

    let save = [root];
    let node = root;
    let res = [];
    while(node && save.length > 0){
        let cur = save.pop();
        res.push(cur.value);
        if(cur.right){
           save.push(cur.right);
        }
        if(cur.left){
            save.push(cur.left);
        }
    }
    return res;
}
// let returnPrevTreeShow2 = prevTreeShow2(a5);
// console.log(returnPrevTreeShow2)




/**
 * 14
  a
 / \
b   c
   / \
  d   e
  [b,a,d,c,e]
 */
let midTreeArr = [];
//中序
function midTreeShow(root){
    if(root == null){
        return null;
    }
    root.left && midTreeShow(root.left);
    midTreeArr.push(root.value);
    root.right && midTreeShow(root.right)
}
// midTreeShow(a5)
// console.log('中序',midTreeArr)
//  a
// / \
// b   c
//   / \
//  d   e
function midTreeShow2(root){
    if(!root){
        return
    }
    let save = [];
    let res = [];
    let node = root;
    while(node || save.length > 0){
        if(node){
            console.log(11,node)
            save.push(node)
            node = node.left;
        }else{
          let cur = save.pop();
          res.push(cur.value);
          node = cur.right;
        }
    }
    console.log(res);
}
// midTreeShow2(a5)
// const inorder2 = (root) => {
//     if (!root) return;
//     const stack = [];
//     let p = root;
//     while (stack.length || p) {
//       // 类似于遍历链表，把当前根节点的所有左节点 push 到 stack 中
//       while (p) {
//         stack.push(p);
//         console.log(111,p)
//         p = p.left;
//       }
//       // 访问最底层的左节点
//       const n = stack.pop();
//       console.log(n.value);
//       // 然后将指针指向当前根节点的右节点，以该右节点作为根节点继续下轮的遍历
//       p = n.right;
//     }
//   };
//   inorder2(a5);
  
//后序 [b,d,e,c,a]
let backTreeArr = [];
function backTreeShow(root){
    if(root == null){
        return;
    }
    root.left && backTreeShow(root.left);
    root.right && backTreeShow(root.right);
    backTreeArr.push(root.value)
}
// backTreeShow(a5)
// console.log('后序',backTreeArr)

//左右根
//根右左
function backTreeShow2(root){
    if(!root){
        return null;
    }
    let save = [root];
    let res = [];
    while(save.length > 0){
        let cur = save.pop();
        res.unshift(cur.value);
        if(cur.left){
            save.push(cur.left)
        }
        if(cur.right){
            save.push(cur.right);
        }
    }
    console.log(res);
}
// backTreeShow2(a5)



/**
 * 15. 还原二叉树
 * 
 * 前序遍历＋中序遍历
 * 后序遍历＋中序遍历
  a
 / \
b  c
   / \
  d   e
  [a,b,c,d,e]
 */

































// function Node(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
// }

// function f1(qian, zhong) {
//     console.log(444,qian, zhong)
//     if (qian == null || zhong == null || qian.length == 0 || zhong.length == 0 || qian.length != zhong.length) return null;
//     var root = new Node(qian[0]);
//     var index = zhong.indexOf(root.value);//找到根节点在中序遍历中的位置
//     var qianLeft = qian.slice(1, 1 + index);//前序遍历的左子树
//     var qianRight = qian.slice(1 + index, qian.length);//前序遍历的右子树
//     var zhongLeft = zhong.slice(0, index);//中序遍历的左子树
//     var zhongRight = zhong.slice(index + 1, zhong.length);//中序遍历的右子树
//     root.left = f1(qianLeft, zhongLeft);//根据左子树的前序和中序还原左子树并赋值给root.left
//     root.right = f1(qianRight, zhongRight);//根绝右子树的前序和中序还原右子树并赋值给root.right
//     return root;
// }

// var root = f1(qian, zhong);

// console.log(root);





















