function Mypromise(func){
    this.status = 'pedding';
    var self = this;
    this.resovleVal = null;
    this.rejectVal = null;
    this.resolveArr = [];
    this.rejectArr = [];

    function resolve(data){
        if(self.status == 'pedding'){//成功的函数只能执行一次
            self.status = 'success';   
            self.resovleVal = data;  
            console.log(self.resolveArr)    
            self.resolveArr.forEach(function(ele){
                ele();
            })
        }   
    }

    function reject(reason){
        if(self.status == 'pedding'){//失败的函数只能执行一次
            self.status = 'fail';
            self.rejectVal = reason;
            self.rejectArr.forEach(function(ele){
                ele();
            })
        }     
    }

    try {
        func(resolve,reject);
    } catch (error) {
        reject(error);
    }
}
// 处理返回值的函数
function dealReturnVal(nextPromise,retrunVal,res,rej){
    if(retrunVal instanceof Mypromise){//处理返回值是Mypromise对象
        retrunVal.then(function(data){//通过这种方式关联起来
            res(data);
        },function(reason){
            rej(reason);
        })
    }else{
        res(retrunVal);
    }
}


// 将上一个返回的非Promise对象的数值
// 传给下一个then函数
Mypromise.prototype.then = function(onfulling,onreject){
    if(!onfulling){
        // 如果函数不存在  就把上面的值继续传给下一位
        onfulling = function(data){
            return data;
        }
    }
    if(!onreject){
        // 如果上一个函数抛出错误
        // 就把上面的错误继续传给下一位
        onreject = function(error){
            throw new Error(error);
        }
    }


    var self = this;
    var nextPromise = new Mypromise(function(res,rej){
        //因为Mypromise中的函数是同步执行的函数
        //所以不影响下面代码执行

        if(self.status == 'success'){
            //接受返回值
            //用setTimeout模拟异步操作
          setTimeout(function(){
            //实现上一个then抛出错误 
            //下一个then执行失败函数
             try {
                // var nextResoVal = onfulling(self.resovleVal);
                // res(nextResoVal);
                var nextResoVal = onfulling(self.resovleVal);
                dealReturnVal(nextPromise,nextResoVal,res,rej);//因为是异步方式处理
                //所以可以传递nextPromise参数
             } catch (error) {
                 rej(error);
             }
            
          },0)
        }
        if(self.status == 'fail'){
            //接受返回值
          setTimeout(function(){
             try {
                // var nextRejVal = onreject(self.rejectVal);
                // res(nextRejVal);
                var nextRejVal = onreject(self.rejectVal);
                dealReturnVal(nextPromise,nextRejVal,res,rej);
             } catch (error) {
                 rej(error);
             }
          },0) 
        }
        //解决异步问题的关键是先把成功和失败的函数放置到一个数组中
        //然后等待满足异步的回调的时候,再执行数组中的函数 
        if(self.status == 'pedding'){
            if(onfulling){
                self.resolveArr.push(function(){
                   setTimeout(function(){
                       try {
                        // var nextResoVal = onfulling(self.resovleVal);
                        // res(nextResoVal); 
                        var nextResoVal = onfulling(self.resovleVal);
                        dealReturnVal(nextPromise,nextResoVal,res,rej);    
                       } catch (error) {
                         rej(error);  
                       }
                   },0)      
                })
            }
            if(onreject){
                self.rejectArr.push(function(){
                    setTimeout(function(){
                        try {
                            // var nextRejVal = onreject(self.rejectVal);
                            // res(nextRejVal);
                            var nextRejVal = onreject(self.rejectVal);
                            dealReturnVal(nextPromise,nextRejVal,res,rej);
                        } catch (error) {
                            rej(error);
                        }
                      
                    })     
                })
            }
        }
    })
    return nextPromise;  
}



// 模拟catch捕捉错误
// 用then中的失败函数来捕捉错误
Mypromise.prototype.catch = function(onreject){
    this.then(null,onreject);
}

// 无论是成功还是失败最后总会执行的函数
Mypromise.prototype.finally = function(func){
    this.then(function(data){
        func(data);
    },function(reason){
        func();
        throw reason;
    })
}

// 加强实现 Promise.race()功能

    Mypromise.race = function(promiseArr){
        return new Promise(function(res,rej){
            promiseArr.forEach(function(ele,index){
                ele.then(res,rej);
            })
        })
    }
// 这是构造函数身上的方法
    Mypromise.all = function(promiseArr){
        if(! promiseArr instanceof Array){
            return false;
        }
        var len = promiseArr.length;
     

        return new Promise(function(res,rej){
            var show = after(len,res);
            var arr = [];
            promiseArr.forEach(function(ele,index){
                  ele.then(function(data){
                      arr.push(data);
                      show(arr);
                  },function(data){
                      rej(data);
                  });
            })
        });
    }
   
    function after(num,res,rej){
        return function(arr){
            if(--num == 0){
                res(arr);
            }
        }
    }

    // let oq = new Mypromise((reslove)=>{
    //     setTimeout(()=>{
    //        reslove('pppp')
    //     })
    //  });
    //  oq.then((data)=>{
    //     console.log('sss',data)
    //     return 'sss'
    //  }).then((res)=>{
    //      console.log(888,res)
    //  })