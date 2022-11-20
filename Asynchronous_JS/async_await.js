const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
   return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
         if (err) reject('I could not find that file');
         resolve(data);
      });
   });
};

const writeFilePro = (file, data) => {
   return new Promise((resolve, reject) => {
      fs.writeFile(file, data, (err) => {
         if (err) reject('I could not find that file');
         resolve('Successfully wrote');
      });
   });
};

const getDogPic = async () => {
   try {
      const data = await readFilePro(`${__dirname}/dog.txt`);
      console.log(`Breed: ${data}`);
      const res = await superagent.get(
         `https://dog.ceo/api/breed/${data}/images/random`
      );
      console.log(res.body.message);
      await writeFilePro('dog-image.txt', res.body.message);
      console.log('Random dog image saved successfully');
   } catch (err) {
      console.log(err);
      throw 'err'; 
   }
   return '2: ready';
};
(async () => {
   try{
      console.log('1. will get dog image');
      const x = await getDogPic();
      console.log(x);
      console.log('3. done getting dog image');

   } catch(error) {
      console.log('error: ' + error)
   }
})

// console.log('1. will get dog image');
// getDogPic().then((x) => {
//    console.log(x);
//    console.log('3. done getting dog image');
// }).catch((err) => {
//    console.log('error: ')
// });
