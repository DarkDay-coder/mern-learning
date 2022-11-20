function addNumber(a, b = 0){
    let c = a + b;
    return c;
}
console.log(addNumber(15));


function addNumber1(array){
    let c = 0;
    for(let i = 0; i< array.length;i++){
        c += array[i]
    }
    return c;
}
console.log(addNumber1([15,20,30,25]));


function miscAdd(array){
    let size = array.length;
    let sum = {
        evenSum : 0,
        oddSum : 0
    }
    for(let i = 0 ; i<size;i++){
        if (array[i] % 2 != 0){
            sum.oddSum += array[i];
        } else {
            sum.evenSum += array[i];
        }
    }
    return (sum);
}
console.log(miscAdd([1,2,3,4,5,6,7,8,9,10]));

