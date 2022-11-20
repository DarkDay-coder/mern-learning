const fs = require("fs")

fs.open("user.json", "w", (error, fp) => {
    if(error){
        console.log("Error Opening file")
    } else{
        let data = [{
            name: "dhital",
            email: "me.dhital@email.com",
            address: "jhapa"
        }];
        data = JSON.stringify(data);
        fs.write(fp, data, (error, success) => {
            if(error){
                console.log("Error while writing in file")
            } else{
                console.log("File write success");
            }
        })
    }
})
// fs.writeFile("user.json",data, () => {});

fs.open("user.json", "r", (error, fp) => {
    if(error){
        console.log("Error Opening file")
    } else{
        fs.readFile("user.json", {encoding: "utf-8"},(error, data_json) => {
            console.log(data_json);
        })
    }
})
fs.readFile("user.json", {encoding: "utf-8"},(error, data_json) => {
    console.log(data_json);
})








