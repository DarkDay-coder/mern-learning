
        let name = ["sibu", "suman", "ram", "hari", "shyam"];
        console.log(name[2]);

        let all_products = [
            [
            "product Name",
            "price",
            "brand",
            "seller",
            "stock",
            "discount"
        ]
        ]
        console.log(all_products[0][0]); //accessing array of array


        /**
         * Push / insertion
         * Pop / fetch
         * delete
         * search
         * access/loop
         * */

// push or insertion
         let users = []; //null
         users.push("Sibu"); //0

         users[1] = "Suman";

         users.unshift("username"); //0

         let size = users.length; //3    0,1,2;

         users[size] = "raman";
         console.log(users)

// pop or fetch

        let first = users.shift();
        let last = users.pop();

        console.log(users);
        users.splice(1,1);

        users.slice(0,2);

        delete users[0];


// search
        console.log(name.includes("suman"));




