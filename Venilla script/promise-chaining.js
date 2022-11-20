const something = () => {
    return new Promise((res,rej) => {
    let a = true;
    if(a){
        res("resolve of something")
    } else {
        rej("reject of something")
    }
})}
const nothing = () => ((res,rej) => {
    let b = true;
    if(b){
        res("resolve of nothing")
    } else {
        rej("reject of nothing")
    }
})
const doSomething = ((res,rej) => {
    let c = true;
    if(c){
        res("resolve of doSomething")
    } else {
        rej("reject of doSomething")
    }
})

something()
.then((res) => {
    console.log(res);
    return nothing();
})
.then((res) => {
    console.log(res);
    return doSomething();
})
.then((res) => {
    console.log(res);
})
.catch((rej) => {
    console.log(rej);
})