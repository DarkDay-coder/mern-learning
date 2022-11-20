
/**to generate random string of provided length */




const randomStr = () => {
    let length = Number(prompt("enter the length as: "))
    var random = "";
    var charlist = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var a = charlist.length;
    for(var i =0; i<length; i++){
        random += charlist.charAt(Math.floor(Math.random()*a));
    }
    
    document.getElementById('content').innerHTML = random;
}

