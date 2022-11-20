const logn = (name,pass) => {
    return new Promise((resolve, reject) => {
    let user = {
        name: "admin@admin",
        pass: "admin"
    };
    if(name == user.name && pass == user.pass){
        resolve("you are logged in");
    } else {
        reject("sorry name or pass doesn't match");
    }
})
}
// // promise 3 stages
// // fulfilled
// // reject
// // settle



logn("admin@admin","admin")
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        //common code block;
    });





//create a function that takes 2 parameter, provide value while calling the function, 

// const loginFn = (name, pass) => {
//     return new Promise((resolve, reject) => {
//         let user = {
//             name: "admin@admin",
//             pass: "admin"
//         };
//         if(name == user.name && pass == user.pass){
//             resolve("you are logged in");
//         } else {
//             reject("sorry name or pass doesn't match");
//         }
//     })
// }



