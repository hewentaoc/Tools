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



function bucketSort(arr){
    let min = Math.min.apply(0,arr);
    let max = Math.max.apply(0,arr);
    console.log(min,max)
    let bucketSize = max - min + 1;
    console.log('len',bucketSize)
    let bucketArr = new Array(bucketSize);
    for(let i = 0 ; i < bucketSize ;i ++){
        bucketArr[i] = [];
    }
    for(let j = 0 ; j < arr.length ; j++){
        console.log('sss',arr[j],min)
        let hash = (arr[j] - min) / bucketSize;
        console.log(hash)
    }
}
function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
      return arr;
    }

    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
          minValue = arr[i];                // 输入数据的最小值
      } else if (arr[i] > maxValue) {
          maxValue = arr[i];                // 输入数据的最大值
      }
    }

    //桶的初始化
    var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;  
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        // console.log((arr[i] - minValue) / bucketSize,bucketSize)
        console.log(';',(arr[i] - minValue) / bucketSize)
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
        console.log(buckets)
    }

    // arr.length = 0;
    // for (i = 0; i < buckets.length; i++) {
    //     insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
    //     for (var j = 0; j < buckets[i].length; j++) {
    //         arr.push(buckets[i][j]);                      
    //     }
    // }

    return arr;
}
bucketSort(arr)

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

