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

/**
 * 链表反转
 * @param {*} node 
 * @returns 
 */

function reverseList(node){
    if(!node){
       return; 
    }
    if(node.next.next == null){
        node.next.next = node;
        return node.next;
    }
    let result = reverseList(node.next);
    node.next.next = node;
    node.next = null;
    return result;
}

function reverseList2(root){
    if(!root){
        return null;
    }
    let node = root;
    let prev = null;
    while(node){
        let next = node.next;
        node.next = prev;
        prev = node;
        node = next;
    }
    console.log('two',prev)
}

// let res = reverseList2(a);

// var lengthOfLongestSubstring = function(s) {
//     let max = 1;
//     for(let i = 0 ; i < s.length ;i++){
//        var  res = {
//             [s[i]]:true
//         }
//         for(let j = i+1; j < s.length ;j++){
//             if(res[s[j]]){
//                 max = Object.keys(res).length > max  ?  Object.keys(res).length : max;
//                 break;
//             }else{
//                 res[s[j]] = true;
//             }
//             if(j == s.length -1){
//                 max = Object.keys(res).length > max  ?  Object.keys(res).length : max;
//             }
//         }
//     }
//     console.log(max)
//     return max;
// };
// lengthOfLongestSubstring("au")

function findLargestSum2(arr) {
    let max = arr[0];
    arr.reduce((total,cur)=>{
        console.log(44,total,cur)
        if(total > 0){
            total = total + cur;
        }else{
            total = cur;
        }
        max = max > total ? max : total;
        return total;
    })
    return max;
}
// let res = findLargestSum2([1,4,3,6]);

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
        str = str + arr[i];
        arrangeHelper(arr,str);
        if(str.length == arr.length){
            sotre.push(str);
            str = '';
            return;
        }
    }
} 

// arrangement('abc')
// console.log(sotre)







var permutation = function(s) {
    let obj = {};
    let set = new Set();
    let arr = s.split('');
    var def = function(path){
        if(path.length == arr.length){
            set.add(path);
            return '';
        }
        for(let i = 0 ; i < arr.length; i ++){
            let cur = arr[i];
            if(obj[cur + i]){
                continue;
            }
            obj[cur + i] = true;
            def(path + cur);
            obj[cur + i] = false;
        }
    }
    def("");
    return [...set];
};
// let result = permutation('aab');
// console.log(result)

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
 this.val = val;
 this.left = this.right = null;
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
 var buildTree = function(preorder, inorder) {
    if(preorder.length == 0 || inorder.length == 0){
        return null;
    }
    let root = preorder[0];
    let index = inorder.indexOf(root);
    let node = new TreeNode(root);
    let preorderLeft = preorder.slice(1,index+1);
    let preorderRight = preorder.slice(index+1)
    let inorderLeft = inorder.slice(0,index);
    let inorderRight = inorder.slice(index+1)
    node.left = buildTree(preorderLeft,inorderLeft);
    node.right = buildTree(preorderRight,inorderRight)
    return node;
 };
let  preorder = [3,9,20,15,7];
let  inorder =  [9,3,15,20,7];
// let node = buildTree(preorder,inorder);
// console.log(node)
// 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
// 例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，
// 但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。


var isNumber = function(s){
    return (!isNaN(s)&&s!=" ")? true:false;
}

// console.log(isNumber("12e"))

/**
 * @param {number[][]} matrix
 * @return {number[]}
 * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
   输出：[1,2,3,6,9,8,7,4,5]
   输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */
 /**
 * @param {number[][]} matrix
 * @return {number[]}
 *      [1,2,3]
        [4,5,6]
        [7,8,9]
    
 */

var spiralOrder = function(matrix) {
    if (matrix.length === 0) return [];
    
    let start_x = 0,
        start_y = 0,
        limit_y = matrix.length,//3
        limit_x = matrix[0].length,//3
        ans = [],
        direct = 'top';
     
    let directions = {
      top: function() {
        for (let i = start_x; i < limit_x; i++) {
            console.log(i)
          ans.push( matrix[start_y][i] );
        }
        direct = 'right';
        start_y++;
        console.log('----')
      },
      right: function() {
        for (let i = start_y; i < limit_y; i++) {
            console.log(i)
          ans.push( matrix[i][limit_x - 1] );
        }
        direct = 'bottom';
        limit_x--;
        console.log('----')
      },
      bottom: function() {
        for (let i = limit_x - 1; i >= start_x; i--) {
            console.log(i)
          ans.push( matrix[limit_y - 1][i] );
        }
        direct = 'left';
        limit_y--;
        console.log('----')
      },
      left: function() {
        for (let i = limit_y - 1; i >= start_y; i--) {
            console.log(i)
          ans.push( matrix[i][start_x] );
        }
        direct = 'top';
        console.log('----')
        start_x++;
      }
    }
    while (ans.length < matrix.length * matrix[0].length) {
      directions[direct]();
    }
    
    return ans;
  };
//   spiralOrder([[1,2,3],[4,5,6],[7,8,9]])

let spiralOrder2 = function(matrix){
    if(matrix.length == 0){
        return [];
    }
    let startX = 0;
    let startY = 0;
    let limitX = matrix[0].length;
    let limitY = matrix.length;
    let result = [];
    let direct = 'top';

    let directions = {
        top:function(){
            for(let i = startX ; i < limitX; i++){
                result.push(matrix[startY][i]);
            }
            direct = 'right';
            startY++;
        },
        right:function(){
            for(let i = startY ; i < limitY; i++){
                result.push(matrix[i][limitX - 1]);
            }
            direct = 'bottom';
            limitX--;
        },
        bottom:function(){
            for(let i = limitX - 1; i >= startX; i-- ) {
                result.push(matrix[limitY-1][i]);
            }
            direct = 'left';
            limitY--;
        },
        left:function(){
            for(let i = limitY -1; i >= startY;i--) {
                result.push(matrix[i][startX]);
            }
            startX++;
            direct = 'top';
        }
    }

    while(result.length < matrix[0].length * matrix.length){
        directions[direct]();
    }
}
//   spiralOrder2([[1,2,3],[4,5,6],[7,8,9]])
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
 function ListNode(val) {
    this.val = val;
    this.next = null;
 }
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    if(headA==null || headB==null){
        return null;
    }
    var pA=headA;
    var pB=headB;
    while(pA!=pB){     //PA=PB时即相遇为交叉节点
       console.log(pA,pB)
       pA=pA==null?headB:pA.next; //遍历到最后一个节点时，指向另一条链表形成一个环
       pB=pB== null? headA : pB.next;  
       
    } 
    console.log(pA)
    return pA;     //两环相交点即为交叉点，有交叉两个指针在某一个时刻即能相遇
};

let headA = new ListNode(4);
let head1 = new ListNode(1);

let mix = new ListNode(8)
let mix1 = new ListNode(4)
let mix2 = new ListNode(5)


let headB = new ListNode(5);
let headB1 = new ListNode(0);
let headB2 = new ListNode(1);

headA.next = head1;
head1.next = mix;

mix.next = mix1;
mix1.next = mix2;

headB.next = headB1;
headB1.next = headB2;
headB2.next = mix;

// getIntersectionNode(headA,headB)


// 1000000007
/**
 * @param {number} n
 * @return {number}
 */
 var fib = function(n) {
    if(n == 0){
        return 0;
    }
    if(n == 1){
        return 1;
    }
    let n1 = 0,n2 = 1, sum = 0;
    for(let i = 2 ; i <= n ; i ++){
        sum =( n1 + n2 ) % 1000000007;
        n1 = n2;
        n2 = sum;
    }
    return sum;
};
// 1000000007
/**
 * @param {number} n
 * @return {number}
 */
 let cache = [];
 var fib = function(n) {
    if(n <= 1){
        cache[n] = n;
        return n;
    }
    if(cache[n]){
        return cache[n];
    }
    cache.push(fib(n - 1)+ fib(n -2 ));
    return cache[n] % 1000000007;
};


// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
// 一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），
// 也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，
// 因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子

 

// 示例 1：

// 输入：m = 2, n = 3, k = 1
// 输出：3






/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var movingCount２ = function(m, n, k) {
    // 创造一个二维数组
    const arr = new Array(m).fill().map(_ => new Array(n).fill(0))
    // 创建一个队列，从 (0, 0) 开始搜索
    const queue = [[0, 0]]
    // 计数器
    let counter = 0
  
    while (queue.length) {
      const [x, y] = queue.shift()
      // 越界
      if (x >= m || y >= n)  continue
      // 遍历过
      if (arr[x][y]) continue
      // 设置遍历过的标识
      arr[x][y] = 1
      if (bitSum(x) + bitSum(y) <= k) {
          console.log('ss',x,y)
        // 符合条件的计数
        counter++
        // 将右、下两格加入队列
        queue.push([x + 1, y], [x, y + 1])
      }
    }
    console.log(counter)
    return counter
  
    function bitSum(n) {
      let res = 0
      while (n) {
        res += n % 10
        n = Math.floor(n / 10)
      }
      return res
    }
  }




// 0,1,2   0
// 0,1,2   1

//坐标x,y,z, 广度优先搜索
var movingCount1 = function(m, n, k) {
    var arr = new Array(m).fill().map(()=>{
        return new Array(n).fill(0);
    })
    let queue = [[0,0]];
    let count = 0;
    while(queue.length){
        let [x,y] = queue.shift();
        if (x >= m || y >= n)  continue;
        // 遍历过
        if (arr[x][y]){
            continue
        };
        arr[x,y] = 1;
        if(bitSum(x) + bitSum(y) <= k　){
            count++;
            queue.push([x+1,y],[x,y+1]);
        }   
    }
    function bitSum(n) {
        let res = 0
        while (n) {
          res += n % 10
          n = Math.floor(n / 10)
        }
        return res
    }
    console.log('33',count)
    return count;
}
function helper(number){
    let res = 0;
    while(number){
        res += number % 10;//5
        number = Math.floor(number / 10);
    }
    return res;
}

var movingCount = function(m, n, k){
    var arr = new Array(m).fill().map(()=>{
        return new Array(n).fill(0);
    })
    let stack = [[0,0]];
    let count = 0;
    while(stack.length > 0){
        let [x,y] = stack.pop();
        if (x >= m || y >= n)  continue;
        if(arr[x][y]){
            continue;
        }
        arr[x][y] = 1;
        if(helper(x) + helper(y) <= k){
            count++;
            stack.push([x+1,y])
            stack.push([x,y+1])
        }   
    }
    console.log(count)
    return count;
}
// movingCount２(3,2,17);
// movingCount1(3,2,17);








//全排列
function getAllCount(arr){
    if(arr.length == 0){
        return [];
    }
    let obj = {};
    let res = []
    var helper = function(path){
        if(path.length == arr.length){
            res.push([...path]);
        }
        for(let i = 0 ; i < arr.length ; i++){
            if(obj[arr[i]+'' + i]){
                continue;
            }
            obj[arr[i] + '' + i] = true;
            helper(path.concat([arr[i]]));
            obj[arr[i] + '' + i] = false;
        }
    }
    helper([])
    console.log(res)
}
// getAllCount([1,2,3]);












let mergeArr = [[1,3],[2,6],[8,10],[15,18]];
//[1,6];
function getMergeArr(arr){
    arr.sort((a,b)=>{
        return a[0] - b[0]
    })
    let prev = arr[0];//[1,3]
    let res = [];
    for(let i = 1 ; i < arr.length ; i++){
        let cur = arr[i];
        if(prev[1] >= cur[0]){
            prev[1] = Math.max(prev[1],cur[1])
        }else{
            res.push(prev);
            prev = cur;
        }
    }
    res.push(prev);
    return res;
}
// getMergeArr(mergeArr)



var merge = function(intervals) {
    if (!intervals || !intervals.length) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    let ans = [intervals[0]];
    console.log(333,intervals[0])
    for (let i = 1; i < intervals.length; i++) {
        if (ans[ans.length - 1][1] >= intervals[i][0]) {
            ans[ans.length - 1][1] = Math.max(ans[ans.length - 1][1], intervals[i][1])
        } else {
            ans.push(intervals[i])
        }
    }
    return ans;
};
var merge = function(intervals) {
    intervals.sort(function(a,b){ // 这是比较函数
        return a[0] - b[0];    // 升序
    })
    let ans=[];
    let ans1 = intervals[0];   
    let len = intervals.length;
    if(len <= 1){
        return intervals ;
    }
    for(let i = 1; i < len; i++){
        if(intervals[i][0] <= ans1[1]){
            ans1[1] = Math.max(intervals[i][1],ans1[1]);
        }else{
            let a = ans1;
            ans.push(a);
            ans1 = intervals[i];
        }
        if(i == len - 1){
            ans.push(ans1);
        }
    }   
    return ans;
};
// merge(mergeArr)



var trap = function(height) {
    const n = height.length;
    if (n == 0) {
        return 0;
    }

    const leftMax = new Array(n).fill(0);
    leftMax[0] = height[0];
    for (let i = 1; i < n; ++i) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    console.log(leftMax)
    const rightMax = new Array(n).fill(0);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; --i) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let ans = 0;
    for (let i = 0; i < n; ++i) {
        ans += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    console.log(ans)
    return ans;
};
// trap([0,1,0,2,1,0,1,3,2,1,2,1])

















var trap2 = function(height){
    const len = height.length;
    if(len == 0){
        return 0;
    }
    let leftMax = new Array(len).fill(0);
    leftMax[0] = height[0];
    for(let i = 1 ; i < len ; i++){
        leftMax[i] = Math.max(leftMax[i - 1],height[i]);
    }
    let rightMax = new Array(len).fill(0);
    rightMax[len - 1] = height[len - 1];
    for(let i = len - 2 ; i >= 0 ; i--){
        rightMax[i] = Math.max(rightMax[i + 1],height[i]);
    }
    let sum = 0;
    for(let i = 0 ; i < len ;i ++){
        sum += Math.min(rightMax[i],leftMax[i]) - height[i];
    }
    return sum;
}
// trap2([0,1,0,2,1,0,1,3,2,1,2,1])
















var lengthOfLongestSubstring = function(s) {
    if(!s){
        return 0
    }
    let max = 0,obj = {};
    for(let i = 0 ; i  < s.length ; i++){
        max = Object.keys(obj).length > max ? Object.keys(obj).length : max;
        obj = {
            [s[i]]:true
        }
        for(let j = i + 1; j < s.length ; j++){
            if(obj[s[j]]){
                break;
            }else{
                obj[s[j]] = true;
            }
        }
    }
    return Math.max(max,Object.keys(obj).length);
};

var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let max = 0;
    for(let i=0, j=0; j < s.length; j++) {
        if(map.has(s[j])) {
            i = Math.max(map.get(s[j]) + 1, i)
        }
        max = Math.max(max, j - i + 1);
        map.set(s[j], j);
    }

    return max;

};










var lengthOfLongestSubstring2 = function(s){
    let map = new Map();
    let max = 0; 
    for(let i = 0,j = 0 ; j < s.length ; j++){
        if(map.has(s[j])){
            i = Math.max(map.get(s[j]) + 1,i);
        }
        max = Math.max(max,j -i + 1);
        map.set(s[j],j);
    }
    return max;
}

var lengthOfLongestSubstring3 = function(s){
    if(!s){
        return 0
    }
    let set = new Set();
    let max = 0;
    for(let i = 0 , j = 0 ; j < s.length ; j++){
        if(!set.has(s[j])){
            set.add(s[j]);
            max = Math.max(set.size,max);
        }else{
            while(set.has(s[j])){
                set.delete(s[i]);
                i++;
            }
            set.add(s[j]);
        }
    }
    return max;
}

// let res = lengthOfLongestSubstring3("nfpdmpi");
// console.log(res);
/**
 *
 * a 0 i = 0
 * b 1 i = 0
 * c 2
 * 
 * 
 * 
 * 
 * 
 * 
 */




[-2,1,-3,4,-1,2,1,-5,4]

var getSum = function(arr){

}


/**
 * @param {number[]} numbers
 * @return {number}
 */
//  var minArray = function(numbers) { 
//     if(!numbers.length){
//         return null;
//     }
//     let stack = [];
//     let min = numbers[0];
//     for(let i = 0, j = 0 ; i < numbers.length - 1 ; i++){
//         if(numbers[i + 1] < numbers[i]){
//             stack.push(numbers[i + 1]);
//             j = i + 1;
//         }else{
//             min = Math.min(numbers[j],min);
//         }
//     }
//     return Math.min.call(null,...stack,min);
// };  
var minArray = function(numbers) {
    console.log('ss')
    for(let i=1;i<numbers.length;i++){
        if(numbers[i]<numbers[i-1]){
            return numbers[i];
        }
    }
    return numbers[0];
};
var minArray = function(numbers) {
    console.log('ss')
        let index=0
        for(let i=0;i<numbers.length;i++){
            if(numbers[i]>numbers[i+1]) {
                index=i+1
        }
        }
        return numbers[index]
    };



// let min = minArray([0,4,5,1,2]);
// console.log('res',min)

// 0 1 2 3 4
// n + 1  /3 = 2
// 0 1 3 4
// 0 1

//0 1 2 , 

var lastRemaining = function(n, m) {
    let result = 0;
    for(let i = 2; i <= n; i++) {
        result = (m + result) % i;
        console.log(333,result)
    }
    return result
};
// lastRemaining(3,3);

/**
 * @param {number} target
 * @return {number[][]}
 */
 var findContinuousSequence = function(target) {
    let max = Math.floor(target /2 ) + 1;
    let ans = [],store = [];
    let start = 1,sum = 0;
    while(start <= max){
        while(sum < target){
            sum += start; 
            store.push(start++);
        }  
        while(sum >= target){
            if(sum == target){
               ans.push([...store])
            }
            sum = sum - store.shift();
        }
    }
    console.log(ans)
    return ans;
};
// var findContinuousSequence = function(target) {
//     let max = Math.floor(target / 2) + 1;
//     let r = 1, sum = 0, ans = [], temp = [];
//     while (r <= max) {
//         while (sum < target) {
//             sum += r;
//             temp.push(r++)
//         }
//         while (sum >= target) {
//             if (sum === target) ans.push([...temp]);
//             sum -= temp.shift();
//         }
//     }
//     return ans;
// };
// findContinuousSequence(6)
var firstUniqChar = function(s) {
    let stack = [];
    for(let i = 0 ; i < s.length ; i ++){
            let index = stack.indexOf(s[i]);
            if(index >= 0){
                stack.splice(index,1)
            }
            stack.push(s[i]);
    }
    return stack[0] || ' ';
};
// console.log(firstUniqChar('cc'))

// for (let i = 0; i< s.length; i++) {
//     if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) return s[i]
// }
// return ' '

/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    if(prices.length == 0) {
        return 0
    }
    let sell = 0;
    let i = 0 ;
    for(let  j = 1 ; j < prices.length ; j++){
        if(prices[j] < prices[i]){
            i = j;
        }else{
            sell = prices[j] - prices[i] > sell ? (prices[j] - prices[i]) : sell; 
        }
    }
    return sell;
};
// let promit = [7,6,4,3,1];
// promit = [3,2,6,5,0,3]
// let res = maxProfit(promit)
// console.log('res',res)

var treeToDoublyList = function(root) {
    if(root == null){
        return null;
    }
    let head = new Node(null);
    let stack =[];
    while(root ||stack.length > 0){
        if(root){
            stack.push(root);
            root = root.left;
        }else{
            let node = stack.pop();
            console.log(node.val);
            if(node.right){
                root = node.right;
            }
        }
    }
};

// 1
// / \
// 2   3
//   / \
//  4   5
var serialize = function(root) {
    let values = [];

    (function dfs(node) {
        if(!node) return values.push(null);

        values.push(node.val);

        dfs(node.left);
        
        dfs(node.right);
        
    })(root)

    return JSON.stringify(values);
};

function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
 }

let a1 = new TreeNode(1);
let a2 = new TreeNode(2);

let a3 = new TreeNode(3);

let a4 = new TreeNode(4);

let a5 = new TreeNode(5);
a1.left = a2;
a1.right = a3;
a3.left = a4;
a3.right = a5;

var serialize1 = function(root) {
    if(!root){
        return [];
    }
    let res = [];
    var dfs = function(arr){
        if(arr.length == 0){
            return [];
        }
        let children = [];
        for(let i = 0 ; i  < arr.length ; i ++){
            // console.log(arr[i].val)
            // if(arr[i] && arr[i].val){
            //       res.push(arr[i].val);
            // }else{
            //     res.push(null);
            // }
            if(arr[i]){
                res.push(arr[i].val);
                children.push(arr[i].left)
                children.push(arr[i].right);
            }else{
                res.push(null)
            }
            // arr[i].left && (children.push(arr[i].left))
            // arr[i].right && (children.push(arr[i].right))
        }
        return dfs(children);
    };
    console.log(res)
    dfs([root]);
};
// console.log(serialize(a1))
// serialize1(a1);
var serialize = function(root) {
    if(!root){
        return [];
    }
    let res = [];
    var dfs = function(arr){
        if(arr.length == 0){
            return [];
        }
        let children = [];
        for(let i = 0 ; i  < arr.length ; i ++){
            if(arr[i] && arr[i].val){
                  res.push(arr[i].val);
            }else{
                res.push(null);
            }
            if(arr[i]){
                children.push(arr[i].left || null)
                children.push(arr[i].right || null);
            }
 
        }
        return dfs(children);
    };
    dfs([root]);
};
var serialize2 = function(root){
    if(!root){
        return [];
    }
    let res = [];
    let stack = [root];
    while(stack.length > 0){
        let node = stack.shift();
        if(node){
            res.push(node.val)
            stack.push(node.left);
            stack.push(node.right);
        }else{
            res.push('null');
        }
    }
    return res;
}
// serialize2(a1)

function add (s1, s2){
    let r1 ,r2;
    try {
        r1 = s1.toString().split('.')[1].length;
        
    } catch (error) {
        r1 = 0;
    }
    try {
        r2 = s2.toString().split('.')[1].length;  
    } catch (error) {
        r2 = 0; 
    }
    let tem = Math.pow(10,Math.max(r1,r2));
    return (s1 * tem + s2 * tem)/tem;
}
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}
// console.log(add(0.1,0))


