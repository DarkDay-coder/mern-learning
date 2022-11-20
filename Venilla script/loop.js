/**
 * loop
 *      a. while 
 *      b. for
 *      c. array loop
 *          - .map
 *          - .each
 *          - .foreach
 *          - .filter
 */
/* let i=1;

//printing sequence number
while(i<=5){
    console.log(i);
    i++;
}

//printing odd number
while(i<=100){
    console.log(i)
    i += 2;
}

//printing odd number
while(i<=100){
    if(i % 2 != 0){
        console.log(i);
    }
    i++;
}

//printing prime number
while(i<=100){
   counter = 0;
   let j = 1;
   while(j<=i/2){
    if(i % j == 0){
        counter++;
    }
    j++;
   }
   if (counter <2){
    console.log(i)
   }
   i++;
}  */

// let users = {
//     name : "Product Name",
//     email: "user@user.com",
//     address: 

// };


// let i=0;
// let size = users.length;
// while(i < size){
//     console.log(
//         "Name: ", users[i].name,
//         ", Email: ", users[i].email,
//         ", Address: ", users[i].address,
//         ", Role: ", users[i].role,
//         ", Phone: ", users[i].phone
//     );
//      i++
// }

//create a variable called products, assign atleast 5 elements in that array, every element should contain name, price, category, discount and WAP to calculate after discount price and assign that to the array itself and print information. 

let products = [
    {
        name: "product-1",
        category: "cat-1",
        price: 100,
        discount: 10
    },
    {
        name: "product-2",
        category: "cat-2",
        price: 200,
        discount: 15
    },
    {
        name: "product-3",
        category: "cat-3",
        price: 250,
        discount: 8
    },
    {
        name: "product-4",
        category: "cat-4",
        price: 380,
        discount: 9
    },
    {
        name: "product-5",
        category: "cat-5",
        price: 30,
        discount: 4
    },
];

let i=0;
let size = products.length;
while(i < size){
   let after_discount = products[i].price - (products[i].price * products[i].discount / 100);
    console.log(
        "Name: ", products[i].name,
        ", Category: ", products[i].category,
        ", Price: ", products[i].price,
        ", Discount: ", products[i].discount,
        ", Price after discount: ", after_discount
    );
        i++;
}
console.log(products);