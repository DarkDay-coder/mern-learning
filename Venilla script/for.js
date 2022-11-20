// for in, for of;
for(let i = 1; i<=10;i++){
    let str = ""
    for (let j =1; j<=i; j++){
        str += j+" "
    }
    console.log(str);
}
console.log("")
for(let i=10;i>=1;i--){
    let str = "";
    for (let j =1; j<=i; j++){
        str += j+" ";
    }
    console.log(str);
}

console.log("")
for(let i=10;i>=1;i--){
    let str = "";
    for (let j =10; j>=i; j--){
        str += j+" ";
    }
    console.log(str);
}