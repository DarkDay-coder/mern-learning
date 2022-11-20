/**
 * P
 * P    R
 * P    R   O
 * P    R   O   G
 * P    R   O   G   R
 * P    R   O   G   R   A
 * P    R   O   G   R   A   M
 * P    R   O   G   R   A   M   M
 * P    R   O   G   R   A   M   M   E
 * P    R   O   G   R   A   M   M   E   R
 */
for (let i = 80;i<90;i++){
    let str = "";
    for (let j = 80;j<=i;j++){
        str += (String.fromCharCode(j))+ " ";
    }
    console.log(str);
}
let text = "PROGRAMMING";
size = text.length;
for (let i = 0;i<size;i++){
    let str = "";
    for (let j = 0;j<=i;j++){
        str += text[j]+ " ";
    }
    console.log(str);
}