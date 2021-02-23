let arr = [5,7,9,10,1,3];
let x = 0;



/**
 * arr.length  ==  6
 * i < 5 　5次就够了 
 * 
 * 
 */

function bubbleSort(arr){
    let temp;
    for(let i = 0 ; i < arr.length - 1 ; i++){
        for(let j = 0 ; j < arr.length - 1 - i ; j++){
            if(arr[j] > arr[j+1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}


function chooseSort(arr){
    let min,temp;
    for(let i = 0 ; i < arr.length; i++){
        min = i;
        for(let j = i+1 ;  j < arr.length ; j++){
            if(arr[j] < arr[min]){
                min = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
    return arr;
}


/**
 * 插入排序
 * let arr = [5,7,9,10,1,3];
 * 
 * 5 左边为排序好的
 * 
 * 7,9,10,1,3右边往左边插入
 * 
 * ５,7   9,10,1,3
 * 
 * 
 * 5,7,9,10 1,3
 * 5,7,9,1,10,3
 * 
 */


function insertSort(arr){
    let temp;
    for(let i = 1 ; i < arr.length ; i++){
        for(let j = i ; j > 0 ; j --){
            if(arr[j-1] > arr[j]){
                temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}


function quickSort(arr){
    if(arr.length == 0){
        return []
    }
    let mid = arr[0];
    let left = [];
    let right = [];
    let newArr = [];
    for(let i = 1 ; i < arr.length ; i++){
        if(arr[i] >= mid){
            right.push(arr[i])
        }else{
            left.push(arr[i]);
        }
    }
    return newArr.concat(quickSort(left),[mid],quickSort(right));
}

function mergeSort(arr){
    let len = arr.length;
    if(len < 2){
        return arr;
    }
    let midIndex = Math.floor(len / 2);
    let left = arr.slice(0,midIndex);
    let right = arr.slice(midIndex);
    return merge(mergeSort(left),mergeSort(right))
}

function merge(left,right){
    var result = [];
    while(left.length && right.length){
        if(left[0] <= right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    while(left.length){
       result.push(left.shift()); 
    }
    while(right.length){
        result.push(right.shift()); 
    }
    return result
}


// let sortArr = mergeSort(arr);
// console.log(sortArr)

// let sortArr = quickSort(arr); 
// console.log(sortArr)

// let sortArr = insertSort(arr);
// console.log(sortArr)

// let sortArr = chooseSort(arr);
// console.log(sortArr)

// let sortArr = bubbleSort(arr);
// console.log(sortArr)

