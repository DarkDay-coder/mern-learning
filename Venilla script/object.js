//objects are non-iterable data whereas arrays are iterable
let user = {
    name : "Product Name",
    price : 12345,
    discount : 10,
    stock : 20,
    brand : "samsung",
    seller : "seller name"
};

console.log(user['name'])

let user1 = {
    price : 12345,
    discount : 10,
    name : "Product Name",
    stock : 20,
    brand : "samsung",
    seller : {
        first: "seller name",
        name: "Name"
    }
};
console.log(user1.price);
console.log(user1?.seller?.first);

let user2 = {
    price : 12345,
    discount : 10,
    name : "Product Name",
    stock : 20,
    brand : "samsung",
    seller : {
        first: "seller name",
        name: "Name"
    },
    category: ["mobile", "android", "smartphone"],
    getName: function(){

    },
};

//functions
user['category'] = "value";
user1.category = "value";

delete user2.brand;

Object.keys(user2); // return array containing keys of objects
Object.values(user1); // return array containing values of objects



let all_products = [
    {
        name: "iPhone 12",
        price: 12345,
        discount: 10,
        brand: "apple"
    },
    {
        name: "iPhone 13",
        price: 123456,
        discount: 12,
        brand: "apple"
    }
]

console.log(all_products[0].name)
console.log(all_products);

let all_products1 = [
    {
        name: "iPhone 12",
        price: 12345,
        discount: 10,
        brand: "apple"
    },
    {
        name: "iPhone 13",
        price: 123456,
        discount: 12,
        brand: "apple"
    }
]
console.log(all_products1);

var discount = all_products1[0].price - all_products1[0].price*all_products1[0].discount/100;
all_products1[0].price_after_discount = discount;
discount = all_products1[1].price - all_products1[1].price*all_products1[1].discount/100;
all_products1[1].price_after_discount = discount;
console.log(all_products1);
