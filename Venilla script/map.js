let users = [
    {
        name: "asdf",
        role: "admin",
        status: "active"
    },
    {
        name: "abcd",
        role: "student",
        status: "active"
    },
    {
        name: "zxcv",
        role: "student",
        status: "inactive"
    },
    {
        name: "qwert",
        role: "student",
        status: "active"
    }
]

let admins = [];
let students = [];

let active = [];
let inactive = [];

admins = users.filter((item) => item.role === "admin");
students = users.filter((item) => item.role === "student");

active = users.filter((item) => item.status === "active")
inactive = users.filter((item) => item.status === "active")

let random = Math.round(Math.random() *100000);

console.log(random);
// users.map((item) => {
//     if(item.role === "admin"){
//         admins.push(item)
//     }
//     return null;
// })

// users.forEach((item, index) => {
    
//     //return null; optional 
// })


/**to generate random string of provided length */
const randomStr = (len) => {

    let random = "";

    return random;
}

console.log(randomStr(100)); // a string of 100 char