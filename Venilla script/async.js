//callback
//promise, delay

// const func1 = () => {
//     console.log("In func 1")
// }
// const func2 = () => {
//     console.log("in func 2")
// }
// setTimeout(func1, 3000) //millisecond
// console.log("im here");
// func1()
// setTimeout(func2, 4000);

// const func3 = (cb) => {
//     cb();
//     console.log("im in func3")
// }
// func3(() => {
//     console.log("I am in func3 Call")
// })

const login = (email, password, cb) =>{
    let login_state = true; //false
    if(login_state){
        cb(null,true)
    } else{
        cb(true);
    }
    
    
    // cb(error, success)
}

// login("email","pass",(err,succcess)=>{
//     if(err){
//         console.log("login error")
//     } else{
//         console.log("login success")
//     }
// })

let loginResponse = (err, success) => {
    if(err){
        console.log("login error")
    } else{
        console.log("login success")
    }
}

login("email","pass",loginResponse)