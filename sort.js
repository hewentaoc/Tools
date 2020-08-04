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



