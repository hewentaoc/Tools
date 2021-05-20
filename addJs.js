/**
 * 补充js的相关知识
 */

// 1. with

let obj = {
    name:'wthe'
}

var name = 'window_name';

function getName(){
  console.log(111,name);//window_name
  with(obj){
    console.log(222,name)//wthe
  }
}
getName();