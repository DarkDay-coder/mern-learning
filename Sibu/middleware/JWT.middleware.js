const jwt = require('jsonwebtoken');

class jwtToken {
   // JWT TOKEN GENERATION
   signToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN,
      });
   };
   createAndSendSignToken = (user, statusCode, res) => {
      const token = this.signToken(user._id);
      res.status(statusCode).json({
         status: 'success',
         token,
         data: user,
      });
   };
}

module.exports = jwtToken;
