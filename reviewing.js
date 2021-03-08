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
middleTree(a5)

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

middleTree2(a5)













console.log(a5)









