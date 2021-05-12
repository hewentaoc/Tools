
let app = document.getElementById('app');
console.log(app)

let observer = new MutationObserver(function(){
    console.log('gggg');
})
// 观察器的配置（需要观察什么变动）
observer.observe(app,{
    childList:true,
    attributes: true,
    subtree: true 
})
