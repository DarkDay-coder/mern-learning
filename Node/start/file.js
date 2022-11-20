// Read Write operation

// Write
/**
 * create or open file
 * file write
 * file close
 * 
 *  
 * 
 */

/// Filesystem (fs)
/// http
/// events
/// crypto
/// path


/***
 * Global package
 * third party package
 * 
 * 
 */


/// express 
/// bootstrap
/// typescript
/// 


// https://www.npmjs.com


const fs = require("fs")

fs.open("user.json", "w", (error, fp) => {
    if(error){
        console.log("Error Opening file")
    } else{
        let data = [{
            name: "sibu",
            email: "email@email.com",
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