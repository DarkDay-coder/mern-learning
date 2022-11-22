/* eslint-disable prettier/prettier */
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
console.log(app.get('env'));

const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => {
   console.log(`Server is running using port number: ${port}`);
   console.log(`app listening on endpoint ${port}`);
});
