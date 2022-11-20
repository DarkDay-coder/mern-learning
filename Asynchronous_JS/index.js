const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
   console.log('promoise resolved');
   console.log(`Breed: ${data}`);

   superagent
      .get(`https://dog.ceo/api/breed/${data}/images/random`)
      .then((res) => {
         console.log(res.body.message);
         fs.writeFile('dog-image.txt', res.body.message, (err) => {
            console.log('random dog image: ');
         });
      })
      .catch((err) => {
         console.log(err.message);
         console.log('promoise reject');
      });
});
