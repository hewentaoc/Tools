let arr = [5,7,9,10,1,3];



let mySort = function(arr = []){
    this.arr = arr;
}
mySort.prototype.swap = function(a,b){
    let arr = this.arr;
    if(!Array.isArray(arr) || arr.length == 0) {
        return null;
    }
    let temp ;
    temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

//冒泡排序
//两两相比　逐级冒泡
//两两相比每次选择一个最大的元素放在最后,最后最大的一定在后面
mySort.prototype.bubbleSort = function(){
    let arr = this.arr;
    if(!Array.isArray(arr) || arr.length == 0) {
        return null;
    }
    let len = arr.length;
    for(let i = 0 ; i < len -1  ;i ++) {
        for(let j = 0 ; j < len -1- i ; j++){
            if(arr[j]> arr[j+1]){
                this.swap(j,j+1);
            }
        }
    }
    return arr;
}
//选择排序　每次选择一个最小值
mySort.prototype.chooseSort = function(){
    let arr = this.arr;
    if(!Array.isArray(arr) || arr.length == 0) {
        return null;
    }
    let len = arr.length;
    for(let i = 0 ; i < len ;i ++) {
        for(let j = i+1 ; j < len;j ++){
            if(arr[i] > arr[j]) {
              this.swap(i,j);
            }
        }
        console.log(arr)
    }
    return arr;
}
//插入排序
mySort.prototype.insertSort = function(){
    let arr = this.arr;
    if(!Array.isArray(arr) || arr.length == 0) {
        return null;
    }
    let len = arr.length;
    for(let i = 1 ; i < len ;i++){
        for(let j = i ; j > 0 ; j --){
            if(arr[j-1] > arr[j]){
                this.swap(j-1,j)
            }
        }
    }
    return arr;
}
//快速排序
mySort.prototype.quickFast = function(){
    let arr = this.arr;
    if(!Array.isArray(arr) || arr.length == 0) {
        return null;
    }
    let recFunc = function(arr){
        if(arr.length == 0){
            return [];
        }
        let mid = arr[0];
        let left = [];
        let right = [];
        let newArr =  [];
        for(let i = 1 ; i < arr.length ;i ++) {
            if(arr[i] < mid) {
                left.push(arr[i]);
            }else{
                right.push(arr[i]);
            }
        }
       return newArr.concat(recFunc(left),[mid],recFunc(right));
    }
   return recFunc(arr);
}




let osort = new mySort(arr);
// console.log(osort.bubbleSort())
// console.log(osort.chooseSort())
// console.log(osort.insertSort())
// console.log(osort.quickFast())

        // 二分法需要排好队
        var arrs = [1, 3, 4, 5, 6, 7, 8, 10, 21];

        function findIndex(arr, value) {
            if (arr.length == 0) {
                return undefined;
            }
            var low = 0;
            var hight = arr.length - 1;
            while (low <= hight) {
                var mid = parseInt((low + hight) / 2);
                console.log('xx',mid)
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
        findIndex(arrs, 5)
        // console.log(findIndex(arrs, 5))

    